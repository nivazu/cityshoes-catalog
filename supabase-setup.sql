-- Create categories table (optional, for managing categories dynamically)
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

-- Create storage bucket for product images (run this separately in Supabase dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Set up Row Level Security (RLS) policies for public read access
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access on products" ON products
  FOR SELECT USING (true);

-- Allow public read access to categories
CREATE POLICY "Allow public read access on categories" ON categories
  FOR SELECT USING (true);

-- For admin operations, you might want to create policies based on user roles
-- For now, we'll allow all operations (you can restrict this later)
CREATE POLICY "Allow all operations on products" ON products
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on categories" ON categories
  FOR ALL USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO products (name, brand, category, description, colors, sizes, images, is_new, featured) VALUES
  (
    'Air Jordan 1 Retro High OG',
    'Nike',
    'basketball',
    'נעלי כדורסל קלאסיות עם עיצוב אייקוני',
    ARRAY['Black/Red', 'White/Black', 'Chicago'],
    ARRAY['40', '41', '42', '43', '44', '45'],
    ARRAY['https://example.com/aj1-1.jpg', 'https://example.com/aj1-2.jpg'],
    true,
    true
  ),
  (
    'Adidas Ultraboost 22',
    'Adidas',
    'running',
    'נעלי ריצה עם טכנולוגיית Boost לחזרת אנרגיה מקסימלית',
    ARRAY['Core Black', 'Cloud White', 'Solar Yellow'],
    ARRAY['39', '40', '41', '42', '43', '44', '45', '46'],
    ARRAY['https://example.com/ultraboost-1.jpg'],
    false,
    true
  ),
  (
    'Stan Smith',
    'Adidas',
    'lifestyle',
    'נעלי טניס קלאסיות בעיצוב נקי ומינימליסטי',
    ARRAY['White/Green', 'White/Navy', 'All White'],
    ARRAY['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    ARRAY['https://example.com/stansmith-1.jpg', 'https://example.com/stansmith-2.jpg'],
    false,
    false
  );

-- Print success message
SELECT 'Database schema created successfully!' as message;