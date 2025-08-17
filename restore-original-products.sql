-- ==========================================
-- Restore Original Products
-- ==========================================

-- First, clear existing products
TRUNCATE TABLE products CASCADE;

-- Restore original products
INSERT INTO products (name, brand, category, description, colors, sizes, images, is_new, featured) VALUES
  (
    'Nike Air Jordan 1 Retro High OG',
    'Nike',
    'basketball',
    'נעלי כדורסל קלאסיות עם עיצוב אייקוני של מייקל ג''ורדן',
    ARRAY['Chicago Red/Black/White', 'Bred Black/Red', 'Royal Blue/Black'],
    ARRAY['40', '41', '42', '43', '44', '45', '46'],
    ARRAY['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'],
    true,
    true
  ),
  (
    'Adidas Ultraboost 22',
    'Adidas',
    'running',
    'נעלי ריצה עם טכנולוגיית Boost לחזרת אנרגיה וביצועים מקסימליים',
    ARRAY['Core Black', 'Cloud White', 'Solar Yellow', 'Navy'],
    ARRAY['39', '40', '41', '42', '43', '44', '45', '46'],
    ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    false,
    true
  ),
  (
    'Converse Chuck Taylor All Star',
    'Converse',
    'lifestyle',
    'נעלי קנבס קלאסיות בסגנון נצחי ואיכות בלתי מתפשרת',
    ARRAY['Black', 'White', 'Red', 'Navy', 'Pink'],
    ARRAY['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    ARRAY['https://images.unsplash.com/photo-1594736797933-d0a9ba84d5d6?w=500'],
    false,
    false
  ),
  (
    'Puma Future Z 1.3 FG/AG',
    'Puma',
    'football',
    'נעלי כדורגל מקצועיות עם טכנולוגיית FUZIONFIT לביצועים ושליטה מקסימליים',
    ARRAY['Neon Citrus/Black', 'Blue/White', 'Black/Gold'],
    ARRAY['39', '40', '41', '42', '43', '44', '45'],
    ARRAY['https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=500'],
    true,
    false
  ),
  (
    'New Balance 990v5',
    'New Balance',
    'casual',
    'נעלי סניקרס פרימיום עשויות בארה"ב עם נוחות יוצאת דופן',
    ARRAY['Grey/White', 'Navy/Silver', 'Black/Silver'],
    ARRAY['40', '41', '42', '43', '44', '45'],
    ARRAY['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500'],
    false,
    true
  );

-- Verify restoration
SELECT 'Products restored:' as message, COUNT(*) as count FROM products;