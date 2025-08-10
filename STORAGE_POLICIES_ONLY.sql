-- STORAGE POLICIES ONLY
-- Run this AFTER creating the bucket manually

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public uploads on product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads from product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates on product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes on product-images" ON storage.objects;

-- Create new policies for public access
CREATE POLICY "Allow public uploads on product-images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public downloads from product-images" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Allow public updates on product-images" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Allow public deletes on product-images" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');

-- Verify
SELECT 'Policies created successfully!' as message;