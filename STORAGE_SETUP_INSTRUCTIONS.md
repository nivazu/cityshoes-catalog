# Supabase Storage Setup Instructions

## Step 1: Create Storage Bucket

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/oywfddfwttncjayglvoy
2. Navigate to **Storage** in the sidebar
3. Click **Create Bucket**
4. Set the bucket name to: `product-images`
5. Make it **Public** (check the public checkbox)
6. Click **Create Bucket**

## Step 2: Set Storage Policies (Optional - if bucket creation didn't auto-create policies)

If you need to manually set up policies, go to the **SQL Editor** and run the contents of `setup-storage.sql`:

```sql
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
```

## Step 3: Verify Setup

After creating the bucket:
1. Go to **Storage** > **product-images**
2. Verify you can see the bucket
3. Try uploading a test image to confirm it works

## Database Tables

Your database should already have the necessary tables from `supabase-setup.sql`:
- `products` table with image URL storage
- `categories` table for product categorization

## Environment Variables

The `.env` file has been created with your Supabase credentials:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

## Next Steps

Once the storage bucket is set up, your application will be able to:
1. Upload images to Supabase Storage
2. Store image URLs in the products table
3. Display images in the catalog
4. Manage products through the admin interface

The application is already configured to handle image uploads through the `ImageUpload` component and `productService.js`.