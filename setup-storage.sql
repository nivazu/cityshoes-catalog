-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for the product-images bucket

-- Allow public uploads (anyone can upload images)
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'product-images');

-- Allow public read access (anyone can view images)
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- Allow public updates (anyone can update images)
CREATE POLICY "Allow public updates" ON storage.objects
FOR UPDATE USING (bucket_id = 'product-images');

-- Allow public deletes (anyone can delete images)
CREATE POLICY "Allow public deletes" ON storage.objects
FOR DELETE USING (bucket_id = 'product-images');