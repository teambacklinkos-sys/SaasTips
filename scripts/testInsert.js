import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function runTest() {
  const newBlog = {
    title: 'Test Blog',
    excerpt: 'Test',
    category: 'growth',
    author: 'Test',
    "authorAvatar": 'TE',
    "authorRole": 'Admin',
    date: 'Apr 15, 2026',
    "readTime": '5 min',
    image: 'https://test',
    featured: false,
    tags: ['New'],
    body: [{ type: 'paragraph', text: 'Test' }]
  };
  
  console.log("Attempting insert...");
  const { data, error } = await supabase.from('blogs').insert(newBlog).select().single();
  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log("Success:", data);
  }
}

runTest();
