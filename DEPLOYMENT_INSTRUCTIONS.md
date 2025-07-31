# CityShoes Catalog - Vercel + Supabase Deployment Guide

## 🚀 Complete Setup Instructions

### 1. Supabase Setup

#### Step 1: Create a Supabase Project
1. Go to [Supabase](https://supabase.com)
2. Sign up/login and create a new project
3. Choose a region close to your users
4. Wait for the project to be created (2-3 minutes)

#### Step 2: Get Your Supabase Credentials
1. Go to Project Settings → API
2. Copy the `Project URL` and `anon/public` key
3. Update `.env.local` with your credentials:

```bash
REACT_APP_SUPABASE_URL=your_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

#### Step 3: Set Up Database Schema
1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the entire content from `supabase-setup.sql`
3. Run the query
4. Verify tables are created in Table Editor

#### Step 4: Set Up Storage (Optional)
1. Go to Storage in Supabase dashboard
2. Create a new bucket called `product-images`
3. Make it public by going to bucket settings
4. Set up RLS policies for public access:

```sql
-- Allow public access to images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Create policy for public access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
```

### 2. Vercel Deployment

#### Step 1: Prepare Your Repository
1. Make sure all files are committed to Git
2. Push to GitHub/GitLab/Bitbucket

#### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up/login and connect your Git repository
3. Import your project
4. Configure environment variables in Vercel:
   - `REACT_APP_SUPABASE_URL`: Your Supabase project URL
   - `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase anon key

#### Step 3: Configure Build Settings (Automatic with vercel.json)
The `vercel.json` file should handle this automatically, but verify:
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

### 3. Environment Variables Setup

Create these environment variables in Vercel:

| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_SUPABASE_URL` | Your Supabase Project URL | Found in Project Settings → API |
| `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase Anon Key | Found in Project Settings → API |

### 4. Testing Your Deployment

#### Local Testing
1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Test product CRUD operations
4. Verify image upload functionality

#### Production Testing
1. Visit your Vercel deployment URL
2. Test loading products from Supabase
3. Test admin functionality (if needed)
4. Verify all images load correctly

### 5. Content Management

#### Adding Products via Supabase AI Agent

Copy and paste this script in the Supabase AI Agent to create sample products:

```sql
-- Insert a new product
INSERT INTO products (name, brand, category, description, colors, sizes, images, is_new, featured) VALUES
(
  'נעלי ספורט Nike Air Max',
  'Nike',
  'running',
  'נעלי ריצה מקצועיות עם טכנולוגיית Air Max לנוחות מקסימלית',
  ARRAY['Black/White', 'Navy/White', 'Red/Black'],
  ARRAY['40', '41', '42', '43', '44', '45'],
  ARRAY['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  true,
  true
);

-- Update an existing product
UPDATE products 
SET 
  name = 'Updated Product Name',
  description = 'Updated description',
  is_new = false
WHERE id = 'your-product-id';

-- Delete a product
DELETE FROM products WHERE id = 'your-product-id';

-- View all products
SELECT * FROM products ORDER BY created_at DESC;
```

#### Using the Web Interface
1. Visit your deployed site
2. Access admin mode (if implemented)
3. Use the product edit modal to add/edit products
4. Upload images using the drag-and-drop interface

### 6. Image Management

#### Option 1: Supabase Storage (Recommended)
- Images are automatically uploaded to Supabase Storage
- Get automatic CDN distribution
- Secure and scalable

#### Option 2: External Image Hosting
- Use services like ImageBB, Cloudinary, or similar
- Add image URLs directly in the product form
- More control over image optimization

#### Option 3: Local Development
- For testing, you can use local image previews
- Images will show as blob URLs during development
- Switch to proper hosting for production

### 7. Troubleshooting

#### Common Issues

**Q: Products not loading**
A: Check your Supabase URL and API key in environment variables

**Q: Images not uploading**
A: Verify Storage bucket is created and has public access policies

**Q: Build failing on Vercel**
A: Check that all environment variables are set correctly

**Q: CORS errors**
A: Supabase automatically handles CORS for your domain

#### Debug Steps
1. Check browser console for errors
2. Verify environment variables in Vercel dashboard
3. Test Supabase connection directly in SQL Editor
4. Check network tab for failed API calls

### 8. Security Considerations

#### Row Level Security (RLS)
- Currently set to allow all operations
- Consider implementing user authentication for admin operations
- Add policies based on user roles for production

#### API Key Security
- Use environment variables for all secrets
- Never commit API keys to Git
- Rotate keys periodically

### 9. Performance Optimization

#### Database
- Add indexes for frequently queried fields (already included)
- Consider pagination for large product lists
- Use Supabase's real-time features for live updates

#### Images
- Optimize images before upload
- Use Supabase's image transformation features
- Consider lazy loading for better performance

### 10. Monitoring and Analytics

#### Supabase Dashboard
- Monitor database usage
- Check API request patterns
- View storage usage

#### Vercel Analytics
- Enable Vercel Analytics for page view tracking
- Monitor deployment health
- Check Core Web Vitals

## 📞 Support

For issues with:
- **Supabase**: Check [Supabase Documentation](https://supabase.com/docs)
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **React**: Check [React Documentation](https://react.dev)

## 🎉 You're All Set!

Your catalog is now:
- ✅ Connected to Supabase database
- ✅ Deployed on Vercel
- ✅ Ready for content management
- ✅ Optimized for performance
- ✅ Secured with RLS policies

Start adding your products and managing your catalog!