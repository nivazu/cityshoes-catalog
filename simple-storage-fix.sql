-- ==========================================
-- Simple Storage Policy Fix - Testing
-- ==========================================

-- Drop ALL existing policies
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects'
        AND policyname LIKE '%product-images%'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
    END LOOP;
END $$;

-- Option 1: VERY permissive policy (for testing)
CREATE POLICY "Allow ALL on product-images" 
ON storage.objects 
FOR ALL 
TO public
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- Option 2: If Option 1 doesn't work, try disabling RLS completely (NOT RECOMMENDED for production)
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Make sure bucket is public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'product-images';

-- Check what policies exist now
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual as using_expression,
    with_check as check_expression
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
ORDER BY policyname;

-- Check RLS status
SELECT 
    'storage.objects' as table_name,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'storage' 
AND tablename = 'objects';