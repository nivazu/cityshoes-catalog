-- STORAGE SETUP FOR SUPABASE
-- Run this in Supabase Dashboard > SQL Editor
-- Make sure you are NOT in read-only mode!

-- Step 1: First, check if bucket exists
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- Step 2: If the bucket doesn't exist, create it
-- NOTE: You might need to create the bucket manually in Storage tab if this fails
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'product-images', 
  'product-images', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Step 3: Create RLS policies for the bucket
-- First, enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public uploads on product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads from product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates on product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes on product-images" ON storage.objects;

-- Create new policies
CREATE POLICY "Allow public uploads on product-images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public downloads from product-images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Allow public updates on product-images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Allow public deletes on product-images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Verify the setup
SELECT 'Storage setup completed!' as message;