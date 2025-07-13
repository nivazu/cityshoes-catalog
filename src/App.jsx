import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Instagram, Search, Filter, Grid, List, ArrowLeft, ArrowRight, Heart, X, Settings, Save, Edit3, Trash2, Eye, EyeOff, Plus, Download } from 'lucide-react';

const ProductEditModal = ({ product, onSave, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    name: product.name || '',
    brand: product.brand || '',
    price: product.price || '',
    originalPrice: product.originalPrice || '',
    category: product.category || 'lifestyle',
    description: product.description || '',
    colors: product.colors?.join(', ') || '',
    sizes: product.sizes?.join(', ') || '',
    images: product.images?.join('\n') || '',
    isNew: product.isNew || false,
    featured: product.featured || false
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...product,
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      colors: formData.colors.split(',').map(c => c.trim()).filter(c => c),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s),
      images: formData.images.split('\n').map(i => i.trim()).filter(i => i)
    };
    onSave(productData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-stone-800">
            {product.id ? 'ערוך מוצר' : 'הוסף מוצר חדש'}
          </h3>
          <button onClick={onCancel} className="text-stone-400 hover:text-stone-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">שם המוצר</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">מותג</label>
              <input type="text" value={formData.brand} onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">מחיר</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">מחיר מקורי (אופציונלי)</label>
              <input type="number" value={formData.originalPrice} onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" />
            </div>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.isNew} onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))} className="rounded" />
              <span className="text-sm text-stone-700">מוצר חדש</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))} className="rounded" />
              <span className="text-sm text-stone-700">מוצר מומלץ</span>
            </label>
          </div>
          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-1 bg-stone-800 text-white py-3 rounded-xl font-medium"><Save className="w-4 h-4 inline-block ml-2" />שמור</button>
            <button type="button" onClick={onCancel} className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium">ביטול</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StoreEditModal = ({ storeInfo, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...storeInfo });
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
         <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-stone-800">ערוך פרטי החנות</h3>
            <button onClick={onCancel} className="text-stone-400 hover:text-stone-700"><X className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Store Edit Form Fields */}
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingStore, setEditingStore] = useState(false);

  const [products, setProducts] = useState([
    { id: 1, name: "תיק גב Sprayground", brand: "SPRAYGROUND", price: 350, category: "lifestyle", images: ["https://i.ibb.co/Xx3jh94t/Sprayground96.jpg", "https://i.ibb.co/HL8fWng9/Sprayground92.jpg"], description: "תיק גב בעיצוב ייחודי ואיכותי.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: true, featured: true },
    { id: 2, name: "תיק גב Sprayground", brand: "SPRAYGROUND", price: 350, category: "lifestyle", images: ["https://i.ibb.co/TqWYFrDN/Sprayground82.jpg", "https://i.ibb.co/Y7BGVshR/Sprayground79.jpg"], description: "תיק גב בעיצוב ייחודי ואיכותי.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: true, featured: false },
    { id: 3, name: "תיק גב Sprayground", brand: "SPRAYGROUND", price: 350, category: "lifestyle", images: ["https://i.ibb.co/Y7BGVshR/Sprayground79.jpg", "https://i.ibb.co/TqWYFrDN/Sprayground82.jpg"], description: "תיק גב בעיצוב ייחודי ואיכותי.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: false, featured: false },
    { id: 4, name: "תיק גב Sprayground", brand: "SPRAYGROUND", price: 350, category: "lifestyle", images: ["https://i.ibb.co/NgW7L3Lg/Sprayground83.jpg", "https://i.ibb.co/7NyzMHz2/Sprayground80.jpg"], description: "תיק גב בעיצוב ייחודי ואיכותי.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: false, featured: false }
  ]);
  
  const [storeInfo, setStoreInfo] = useState({ name: "נעלי העיר", slogan: "כל המיוחדים אצלנו", phone: "050-123-4567", whatsapp: "+972501234567", address: "רחוב הרצל 123, תל אביב", instagram: "@shoes_hair", heroTitle: "PREMIUM FOOTWEAR EXPERIENCE", heroSubtitle: "קולקציה אקסקלוסיבית של נעלי ספורט ואופנה מהמותגים המובילים בעולם." });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setIsLoading(false), 2500);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [ { id: 'all', name: 'כל המוצרים' }, { id: 'lifestyle', name: 'לייפסטייל' } ];
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);
  const featuredProducts = products.filter(p => p.featured);
  
  const handleAdminLogin = () => { if (adminPassword === 'admin123') { setIsAdminMode(true); setShowAdminLogin(false); setAdminPassword(''); } else { alert('סיסמה שגויה'); } };
  const handleLogout = () => setIsAdminMode(false);
  const saveProduct = (productData) => { /* ... */ };
  const deleteProduct = (id) => { /* ... */ };
  const saveStoreInfo = (newStoreInfo) => { /* ... */ };
  const handleCategoryChange = (categoryId) => { /* ... */ };
  const handleProductSelect = (product) => { /* ... */ };

  const exportImagesList = () => { /* ... */ };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8"><div className="w-20 h-1 bg-gradient-to-r from-stone-800 via-amber-600 to-stone-800 mx-auto animate-pulse"></div><div className="absolute inset-0 w-20 h-1 bg-gradient-to-r from-amber-400 to-stone-600 mx-auto animate-pulse opacity-50 blur-sm"></div></div>
          <div className="text-xs tracking-[0.4em] text-stone-600 font-light">LOADING LUXURY EXPERIENCE</div>
          <div className="mt-4 text-lg tracking-[0.2em] text-stone-800 font-extralight">{storeInfo.name}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/10 via-stone-50/50 to-amber-100/30 text-stone-900 font-light overflow-hidden">
        {/* All original JSX including Admin Bar, Header, Hero, Banner, Controls, Product Grid, Modals, etc. */}
    </div>
  );
};

export default App;
