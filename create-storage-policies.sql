-- ==========================================
-- Storage Policies for product-images bucket
-- ==========================================

-- Enable RLS on storage.objects table (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public Access for product-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload to product-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Update in product-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete from product-images" ON storage.objects;

-- ==========================================
-- 1. Policy for PUBLIC READ access (SELECT)
-- ==========================================
-- Allow anyone to view images in the product-images bucket
CREATE POLICY "Public Access for product-images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

-- ==========================================
-- 2. Policy for PUBLIC UPLOAD (INSERT)
-- ==========================================
-- Allow anyone to upload images to the product-images bucket
CREATE POLICY "Public Upload to product-images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
    bucket_id = 'product-images' 
    AND (storage.extension(name) = ANY(ARRAY['jpg', 'jpeg', 'png', 'gif', 'webp']))
    AND (octet_length(metadata::text) < 2048) -- Limit metadata size
);

-- ==========================================
-- 3. Policy for PUBLIC UPDATE
-- ==========================================
-- Allow anyone to update their uploaded images
CREATE POLICY "Public Update in product-images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- ==========================================
-- 4. Policy for PUBLIC DELETE
-- ==========================================
-- Allow anyone to delete images from the product-images bucket
CREATE POLICY "Public Delete from product-images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'product-images');

-- ==========================================
-- Additional security policies (optional)
-- ==========================================

-- If you want to restrict file sizes at the policy level
-- Note: This is in addition to bucket-level restrictions
DROP POLICY IF EXISTS "Limit file size for product-images" ON storage.objects;
CREATE POLICY "Limit file size for product-images"
ON storage.objects
FOR INSERT
WITH CHECK (
    bucket_id = 'product-images' 
    AND (metadata->>'size')::int <= 10485760 -- 10MB in bytes
);

-- ==========================================
-- Verify policies were created
-- ==========================================
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
ORDER BY policyname;

-- ==========================================
-- Make sure the bucket is public
-- ==========================================
UPDATE storage.buckets 
SET public = true 
WHERE id = 'product-images';

-- ==========================================
-- Check bucket configuration
-- ==========================================
SELECT 
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
FROM storage.buckets 
WHERE id = 'product-images';