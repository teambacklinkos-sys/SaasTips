import { supabase } from './supabase';

export async function fetchCategories() {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data || [];
}

export async function fetchBlogs() {
  const { data, error } = await supabase.from('blogs').select('*').order('id', { ascending: false });
  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  return data || [];
}

export async function fetchBlogById(id) {
  const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
  return data;
}

export async function fetchRelatedBlogs(currentId, category, count = 3) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .neq('id', currentId)
    .eq('category', category)
    .limit(count);
    
  if (error) {
    console.error('Error fetching related blogs:', error);
    return [];
  }
  return data || [];
}

export async function createBlog(blog) {
  // Format the blog object to match our schema if needed
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
    // Wrapping content in a rough format if it's plain text
    body: typeof blog.content === 'string' ? [{ type: 'paragraph', text: blog.content }] : (blog.body || [])
  };

  const { data, error } = await supabase.from('blogs').insert(newBlog).select().single();
  if (error) throw error;
  return data;
}

export async function updateBlog(blogId, updates) {
  const payload = { ...updates };
  // map generic form fields to DB schema fields dynamically if they exist
  if (payload.description) {
    payload.excerpt = payload.description;
    delete payload.description;
  }
  if (payload.content) {
    payload.body = typeof payload.content === 'string' ? [{ type: 'paragraph', text: payload.content }] : payload.content;
    delete payload.content;
  }

  const { data, error } = await supabase.from('blogs').update(payload).eq('id', blogId).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBlog(blogId) {
  const { error } = await supabase.from('blogs').delete().eq('id', blogId);
  if (error) throw error;
  return true;
}
