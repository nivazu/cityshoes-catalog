-- COPY AND PASTE THIS ENTIRE SCRIPT INTO SUPABASE AI AGENT
-- This will create all necessary tables and sample data for your catalog

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT NOT NULL,
  description TEXT,
  colors TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  is_new BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Insert default categories
INSERT INTO categories (id, name, name_en, description) VALUES
  ('lifestyle', 'לייפסטייל', 'lifestyle', 'נעלי לייפסטייל ויומיום'),
  ('basketball', 'כדורסל', 'basketball', 'נעלי כדורסל וספורט'),
  ('football', 'כדורגל', 'football', 'נעלי כדורגל'),
  ('running', 'ריצה', 'running', 'נעלי ריצה ואתלטיקה'),
  ('training', 'אימונים', 'training', 'נעלי אימונים כלליים'),
  ('casual', 'קז''ואל', 'casual', 'נעלי קז''ואל ונוחות')
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on categories" ON categories
  FOR SELECT USING (true);

-- Allow all operations (for admin functionality)
CREATE POLICY "Allow all operations on products" ON products
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on categories" ON categories
  FOR ALL USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products
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

-- Verify setup
SELECT 'Database setup completed successfully!' as message;
SELECT 'Categories created:' as info, COUNT(*) as count FROM categories;
SELECT 'Products created:' as info, COUNT(*) as count FROM products;