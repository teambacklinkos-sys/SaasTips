-- Supabase Schema for SaaSTips

-- 1. Create the `categories` table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  color TEXT NOT NULL
);

-- 2. Create the `blogs` table
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  "authorAvatar" TEXT NOT NULL,
  "authorRole" TEXT NOT NULL,
  date TEXT NOT NULL,
  "readTime" TEXT NOT NULL,
  image TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] NOT NULL,
  body JSONB NOT NULL
);

-- 3. Set up Row Level Security (RLS)
-- Allow anyone to read blogs and categories (publicly accessible logic)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on categories" 
  ON categories FOR SELECT USING (true);

CREATE POLICY "Allow public read access on blogs" 
  ON blogs FOR SELECT USING (true);
