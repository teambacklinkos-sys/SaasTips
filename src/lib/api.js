import { supabase } from './supabase';
import { blogs as staticBlogs, categories as staticCategories } from '../data/blogs';

export async function fetchCategories() {
  // Always use static categories — they are the source of truth for category IDs/labels/colors
  return staticCategories.filter((c) => c.id !== 'all');
}

export async function fetchBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    // Merge: Supabase blogs first, then static blogs (so new posts appear at top)
    return [...(data || []), ...staticBlogs];
  } catch (err) {
    console.error('fetchBlogs failed, using static data:', err.message);
    return staticBlogs;
  }
}

export async function fetchBlogById(id) {
  // Check static blogs first (numeric IDs 1–9)
  const numericId = Number(id);
  if (!isNaN(numericId)) {
    const staticBlog = staticBlogs.find((b) => b.id === numericId);
    if (staticBlog) return staticBlog;
  }

  // Then try Supabase
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function fetchRelatedBlogs(currentId, category, count = 3) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .neq('id', currentId)
      .eq('category', category)
      .limit(count);
    if (error) throw new Error(error.message);

    const supabaseResults = data || [];
    // Fill remaining slots from static blogs
    const needed = count - supabaseResults.length;
    const staticFill = staticBlogs
      .filter((b) => b.id !== currentId && b.category === category)
      .slice(0, needed);

    return [...supabaseResults, ...staticFill].slice(0, count);
  } catch {
    return staticBlogs
      .filter((b) => b.id !== Number(currentId) && b.category === category)
      .slice(0, count);
  }
}

export async function createBlog(blog) {
  const newBlog = {
    title: blog.title || '',
    excerpt: blog.description || blog.excerpt || '',
    category: blog.category?.toLowerCase() || 'other',
    author: blog.author || 'Admin',
    authorAvatar: blog.author ? blog.author.substring(0, 2).toUpperCase() : 'AD',
    authorRole: blog.authorRole || 'Contributor',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: '5 min read',
    image: blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60',
    featured: false,
    tags: ['New'],
    body: typeof blog.content === 'string'
      ? blog.content.split('\n\n').filter(Boolean).map((t) => ({ type: 'paragraph', text: t }))
      : (blog.body || []),
  };

  const { data, error } = await supabase.from('blogs').insert(newBlog).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateBlog(blogId, updates) {
  const payload = { ...updates };
  if (payload.description !== undefined) {
    payload.excerpt = payload.description;
    delete payload.description;
  }
  if (payload.content !== undefined) {
    payload.body = typeof payload.content === 'string'
      ? payload.content.split('\n\n').filter(Boolean).map((t) => ({ type: 'paragraph', text: t }))
      : payload.content;
    delete payload.content;
  }
  if (payload.category) {
    payload.category = payload.category.toLowerCase();
  }

  const { data, error } = await supabase
    .from('blogs')
    .update(payload)
    .eq('id', blogId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteBlog(blogId) {
  const { error } = await supabase.from('blogs').delete().eq('id', blogId);
  if (error) throw new Error(error.message);
  return true;
}
