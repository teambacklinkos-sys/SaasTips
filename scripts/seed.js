import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Provide __dirname equivalent in ES Modules
const __dirname = fileURLToPath(new URL('.', import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { categories, blogs } from '../src/data/blogs.js';

async function seed() {
  console.log("Seeding categories...");
  const { error: catError } = await supabase.from('categories').upsert(categories);
  if (catError) {
    console.error("Error inserting categories:", catError);
    return;
  }
  
  console.log("Seeding blogs...");
  const { error: blogError } = await supabase.from('blogs').upsert(blogs);
  if (blogError) {
    console.error("Error inserting blogs:", blogError);
    return;
  }
  
  console.log("✅ Seed complete!");
}

seed();
