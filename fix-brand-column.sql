-- ==========================================
-- Fix brand column issue
-- ==========================================

-- Check if brand column exists and add it if missing
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'brand'
    ) THEN
        ALTER TABLE products ADD COLUMN brand TEXT;
        RAISE NOTICE 'Added missing brand column';
    ELSE
        RAISE NOTICE 'Brand column already exists';
    END IF;
END $$;

-- Ensure the column allows NULL values (in case it was created with NOT NULL)
ALTER TABLE products ALTER COLUMN brand DROP NOT NULL;

-- Create index if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);

-- Refresh the schema cache
SELECT pg_notify('schema_cache_refresh', 'products');

-- Verify the table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- Test insert with brand
INSERT INTO products (name, brand, category, description) 
VALUES ('Test Product', 'Test Brand', 'lifestyle', 'Test Description')
ON CONFLICT DO NOTHING;

-- Clean up test
DELETE FROM products WHERE name = 'Test Product';

-- Show current products with brand info
SELECT id, name, brand, category FROM products LIMIT 5;