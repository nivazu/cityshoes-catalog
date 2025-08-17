-- ==========================================
-- Final Storage Policy Fix for product-images
-- ==========================================

-- Drop ALL existing policies for product-images
DROP POLICY IF EXISTS "Public Access for product-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload to product-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Update in product-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete from product-images" ON storage.objects;
DROP POLICY IF EXISTS "Limit file size for product-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to product-images" ON storage.objects;
DROP POLICY IF EXISTS "Public Full Access to product-images" ON storage.objects;

-- Create a comprehensive policy for all operations
CREATE POLICY "Public Full Access to product-images" 
ON storage.objects 
FOR ALL 
TO public
USING (bucket_id = 'product-images')
WITH CHECK (
    bucket_id = 'product-images' 
    AND (
        -- Additional checks for file types and size
        storage.extension(name) = ANY(ARRAY['jpg', 'jpeg', 'png', 'gif', 'webp'])
        AND (metadata->>'size')::int <= 10485760  -- 10MB limit
    )
);

-- Verify the policy was created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    cmd,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND policyname = 'Public Full Access to product-images';

-- Make sure the bucket is public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'product-images';

-- Final verification
SELECT 
    'Bucket Status' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'product-images' AND public = true)
        THEN '✅ Bucket is PUBLIC'
        ELSE '❌ Bucket is NOT public'
    END as status
UNION ALL
SELECT 
    'RLS Status' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'storage' AND tablename = 'objects' AND rowsecurity = true)
        THEN '✅ RLS is ENABLED'
        ELSE '❌ RLS is DISABLED'
    END as status
UNION ALL
SELECT 
    'Policy Status' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Full Access to product-images')
        THEN '✅ Policy EXISTS'
        ELSE '❌ Policy NOT FOUND'
    END as status;