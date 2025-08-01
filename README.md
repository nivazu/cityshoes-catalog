# CityShoes Catalog - React + Supabase + Vercel

A modern, responsive product catalog for CityShoes store built with React, integrated with Supabase for data management, and deployed on Vercel.

## 🌟 Features

- **Modern React UI** with Tailwind CSS
- **Supabase Integration** for real-time database operations
- **Image Upload** with drag-and-drop functionality
- **Admin Panel** for product management
- **Responsive Design** optimized for all devices
- **Real-time Updates** powered by Supabase
- **Vercel Deployment** with automatic CI/CD

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Supabase account
- Vercel account (for deployment)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo-url>
cd cityshoes-catalog
npm install
```

2. **Set up environment variables:**
Create a `.env.local` file:
```bash
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Set up Supabase:**
- Create a new Supabase project
- Copy and run `SUPABASE_AI_SCRIPT.sql` in the SQL Editor
- This creates all necessary tables and sample data

4. **Start development server:**
```bash
npm start
```

## 📁 Project Structure

```
src/
├── components/
│   └── ImageUpload.jsx          # Drag-and-drop image upload
├── lib/
│   └── supabase.js             # Supabase client configuration
├── services/
│   └── productService.js       # Database operations
├── App.jsx                     # Main application component
└── index.js                    # React entry point

supabase-setup.sql              # Complete database schema
SUPABASE_AI_SCRIPT.sql         # Quick setup for AI agent
vercel.json                    # Vercel deployment config
```

## 🗄️ Database Schema

### Products Table
- `id` (UUID) - Primary key
- `name` (TEXT) - Product name
- `brand` (TEXT) - Brand name
- `category` (TEXT) - Product category
- `description` (TEXT) - Product description
- `colors` (TEXT[]) - Available colors
- `sizes` (TEXT[]) - Available sizes
- `images` (TEXT[]) - Image URLs
- `is_new` (BOOLEAN) - New product flag
- `featured` (BOOLEAN) - Featured product flag
- `created_at` / `updated_at` - Timestamps

### Categories Table
- `id` (TEXT) - Category ID
- `name` (TEXT) - Hebrew name
- `name_en` (TEXT) - English name
- `description` (TEXT) - Category description

## 🔧 Configuration

### Supabase Setup
1. Create project at [supabase.com](https://supabase.com)
2. Run the SQL setup script
3. Configure environment variables
4. Set up Storage bucket for images (optional)

### Vercel Deployment
1. Connect your Git repository
2. Configure environment variables
3. Deploy automatically with each push

## 📱 Usage

### Adding Products
1. Access admin mode on the website
2. Click "Add Product" button
3. Fill in product details
4. Upload images via drag-and-drop
5. Save to Supabase database

### Managing Content via Supabase
Use the Supabase dashboard or AI agent with these SQL commands:

```sql
-- Add a new product
INSERT INTO products (name, brand, category, description, colors, sizes, images, is_new, featured) 
VALUES ('Product Name', 'Brand', 'category', 'Description', 
        ARRAY['Color1', 'Color2'], ARRAY['Size1', 'Size2'], 
        ARRAY['image1.jpg'], true, false);

-- Update a product
UPDATE products SET name = 'New Name' WHERE id = 'product-id';

-- Delete a product
DELETE FROM products WHERE id = 'product-id';
```

## 🎨 Customization

### Styling
- Built with Tailwind CSS
- Responsive design patterns
- RTL support for Hebrew text
- Modern gradient and shadow effects

### Categories
Modify categories in `src/services/productService.js` or add them to the database:

```javascript
const categories = [
  { id: 'lifestyle', name: 'לייפסטייל' },
  { id: 'basketball', name: 'כדורסל' },
  // Add more categories...
];
```

## 📊 Performance

- **Database**: Indexed queries for fast filtering
- **Images**: Lazy loading and optimization
- **Caching**: Automatic edge caching via Vercel
- **Real-time**: Supabase real-time subscriptions

## 🔒 Security

- **RLS Policies**: Row-level security configured
- **Environment Variables**: Sensitive data protected
- **HTTPS**: Automatic SSL via Vercel
- **API Keys**: Properly secured and rotated

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel

# Or connect your Git repository for automatic deployments
```

### Manual Build
```bash
npm run build
# Upload build/ folder to your hosting provider
```

## 🛠️ Development

### Available Scripts
- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Environment Variables
```bash
REACT_APP_SUPABASE_URL=your_url_here
REACT_APP_SUPABASE_ANON_KEY=your_key_here
REACT_APP_ENVIRONMENT=development
```

## 📄 Documentation

- [Deployment Instructions](./DEPLOYMENT_INSTRUCTIONS.md) - Complete setup guide
- [Supabase Schema](./supabase-setup.sql) - Database schema
- [AI Agent Script](./SUPABASE_AI_SCRIPT.sql) - Quick setup script

## 🆘 Troubleshooting

### Common Issues
- **Products not loading**: Check Supabase URL and API key
- **Images not uploading**: Verify Storage bucket configuration
- **Build errors**: Ensure all environment variables are set

### Support
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ❤️ for CityShoes**