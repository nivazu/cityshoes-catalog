-- ==========================================
-- Fix Storage RLS Issues
-- ==========================================

-- First, check current RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'storage';

-- Temporarily disable RLS to test
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;

-- Make sure bucket is public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'product-images';

-- Re-enable RLS with proper policies
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start fresh
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
    END LOOP;
END $$;

-- Create simple, permissive policies for public bucket
CREATE POLICY "Allow public access to product-images" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- Alternative: Create individual policies for each operation
-- CREATE POLICY "Anyone can upload to product-images" 
-- ON storage.objects 
-- FOR INSERT 
-- WITH CHECK (bucket_id = 'product-images');

-- CREATE POLICY "Anyone can view product-images" 
-- ON storage.objects 
-- FOR SELECT 
-- USING (bucket_id = 'product-images');

-- CREATE POLICY "Anyone can update product-images" 
-- ON storage.objects 
-- FOR UPDATE 
-- USING (bucket_id = 'product-images')
-- WITH CHECK (bucket_id = 'product-images');

-- CREATE POLICY "Anyone can delete from product-images" 
-- ON storage.objects 
-- FOR DELETE 
-- USING (bucket_id = 'product-images');

-- Verify the policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
ORDER BY policyname;

-- Test: This should return true if bucket is accessible
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'product-images' AND public = true)
        THEN 'Bucket is PUBLIC ✓'
        ELSE 'Bucket is NOT public ✗'
    END as bucket_status;

-- Show current RLS status
SELECT 
    'storage.objects' as table_name,
    CASE 
        WHEN rowsecurity THEN 'RLS is ENABLED'
        ELSE 'RLS is DISABLED'
    END as rls_status
FROM pg_tables 
WHERE schemaname = 'storage' 
AND tablename = 'objects';