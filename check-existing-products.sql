-- ==========================================
-- Check existing products in database
-- ==========================================

-- Count total products
SELECT COUNT(*) as total_products FROM products;

-- Show all products with their details
SELECT 
    id,
    name,
    brand,
    category,
    description,
    array_length(colors, 1) as color_count,
    array_length(sizes, 1) as size_count,
    array_length(images, 1) as image_count,
    is_new,
    featured,
    created_at
FROM products
ORDER BY created_at DESC;

-- Count products by category
SELECT 
    category,
    COUNT(*) as product_count
FROM products
GROUP BY category
ORDER BY product_count DESC;

-- Count products by brand
SELECT 
    brand,
    COUNT(*) as product_count
FROM products
GROUP BY brand
ORDER BY product_count DESC;