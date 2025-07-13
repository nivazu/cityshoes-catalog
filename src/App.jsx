import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Instagram, ChevronRight, Search, Filter, Grid, List, ArrowLeft, ArrowRight, Star, Heart, Plus, X, Settings, Save, Edit3, Trash2, Eye, EyeOff, Download } from 'lucide-react';

const ProductEditModal = ({ product, onSave, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    name: product.name || '', brand: product.brand || '', price: product.price || '', originalPrice: product.originalPrice || '',
    category: product.category || 'lifestyle', description: product.description || '', colors: product.colors?.join(', ') || '',
    sizes: product.sizes?.join(', ') || '', images: product.images?.join('\n') || '', isNew: product.isNew || false, featured: product.featured || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...product, ...formData, price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      colors: formData.colors.split(',').map(c => c.trim()).filter(c => c),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s),
      images: formData.images.split('\n').map(i => i.trim()).filter(i => i)
    };
    onSave(productData);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-stone-800">{product.id ? 'ערוך מוצר' : 'הוסף מוצר חדש'}</h3>
          <button onClick={onCancel} className="text-stone-400 hover:text-stone-700"><X className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">שם המוצר</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">מותג</label>
                    <input type="text" value={formData.brand} onChange={(e) => setFormData(p => ({...p, brand: e.target.value}))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">מחיר</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData(p => ({...p, price: e.target.value}))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">מחיר מקורי (אופציונלי)</label>
                    <input type="number" value={formData.originalPrice} onChange={(e) => setFormData(p => ({ ...p, originalPrice: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" />
                </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">קישורי תמונות (כל קישור בשורה חדשה)</label>
              <textarea value={formData.images} onChange={(e) => setFormData(p => ({...p, images: e.target.value}))} rows={4} className="w-full px-4 py-3 border border-stone-300 rounded-xl" />
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
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-stone-800">ערוך פרטי החנות</h3>
            <button onClick={onCancel} className="text-stone-400 hover:text-stone-700"><X className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Store edit fields */}
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

  const categories = [ { id: 'all', name: 'כל המוצרים' }, { id: 'lifestyle', name: 'לייפסטייל' }];
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);
  const featuredProducts = products.filter(p => p.featured);
  
  const handleAdminLogin = () => { if (adminPassword === 'admin123') { setIsAdminMode(true); setShowAdminLogin(false); setAdminPassword(''); } else { alert('סיסמה שגויה'); } };
  const handleLogout = () => { setIsAdminMode(false); setEditingProduct(null); setEditingStore(false); };
  const handleCategoryChange = (categoryId) => { /* ... */ };
  const handleProductSelect = (product) => { if (!isAdminMode) setSelectedProduct(product); };

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
      {isAdminMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-black px-6 py-2 flex items-center justify-between shadow-lg">
           <div className="flex items-center gap-4"><span className="font-bold">מצב ניהול</span><button onClick={() => setEditingStore(true)} className="flex items-center gap-2 text-sm hover:bg-yellow-500 p-2 rounded-md"><Settings className="w-4 h-4" /> ערוך פרטי חנות</button><button onClick={() => setEditingProduct({})} className="flex items-center gap-2 text-sm hover:bg-yellow-500 p-2 rounded-md"><Plus className="w-4 h-4" /> הוסף מוצר</button></div>
           <button onClick={handleLogout} className="text-sm font-bold hover:underline">התנתק</button>
        </div>
      )}
      <header className={`fixed ${isAdminMode ? 'top-11' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent cursor-pointer" onClick={() => !isAdminMode && setShowAdminLogin(true)}>{storeInfo.name}</div>
            <div className="hidden md:block text-xs tracking-widest text-stone-500 font-light">{storeInfo.slogan}</div>
          </div>
          <a href={`https://wa.me/${storeInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-stone-800 to-amber-800 text-white px-5 py-2 text-sm tracking-wide hover:from-amber-800 hover:to-stone-800 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 rounded-full">צור קשר</a>
        </div>
      </header>
      <main>
        <section className={`relative ${isAdminMode ? 'pt-28' : 'pt-20'} pb-12`}>
           {/* Hero Section */}
        </section>
        <section className="py-16 bg-gradient-to-r from-stone-800 to-amber-800 text-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-right">
              <h2 className="text-sm tracking-[0.3em] text-amber-400 mb-4">מבצעי הקיץ</h2>
              <p className="text-4xl font-black leading-tight mb-6">קולקציה חדשה <br />עכשיו בחנות!</p>
              <button className="bg-white text-stone-800 font-bold px-8 py-3 rounded-full hover:bg-amber-100 transition-colors duration-300">לכל הדגמים</button>
            </div>
            <div className="h-80 bg-cover bg-center rounded-2xl" style={{backgroundImage: `url('https://i.ibb.co/LdtBjBNY/Sprayground32.jpg')`}}></div>
          </div>
        </section>
        <section className="py-12 border-y border-stone-200/50 bg-white/60 backdrop-blur-sm sticky top-0 z-30">
           {/* ... Controls Section ... */}
        </section>
        <section className="py-20 bg-gradient-to-b from-transparent via-stone-50/20 to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12`}>
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="group cursor-pointer animate-fadeInUp relative" onClick={() => handleProductSelect(product)} style={{animationDelay: `${index * 100}ms`}}>
                  {isAdminMode && (
                    <div className="absolute top-4 left-4 z-20 flex gap-2"><button onClick={(e) => {e.stopPropagation(); setEditingProduct(product);}} className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"><Edit3 className="w-4 h-4" /></button><button onClick={(e) => {e.stopPropagation(); deleteProduct(product.id);}} className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"><Trash2 className="w-4 h-4" /></button></div>
                  )}
                  <div className="relative overflow-hidden mb-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                    {product.isNew && <div className="absolute top-4 right-4 z-10 text-xs bg-stone-800 text-white px-3 py-1 rounded-full">חדש</div>}
                    {product.images && product.images.length > 0 && (
                      <img src={product.images[0]} alt={product.name} className="w-full h-80 lg:h-96 object-cover" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-xs tracking-widest text-amber-700 font-medium">{product.brand}</div>
                    <h3 className="text-xl font-medium mt-2">{product.name}</h3>
                    <div className="text-lg font-semibold mt-1">₪{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-16 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 text-center text-stone-500">
          <p>© 2025 {storeInfo.name}. כל הזכויות שמורות.</p>
        </div>
      </footer>
      {showAdminLogin && !isAdminMode && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <h3 className="text-2xl font-bold text-stone-800 mb-2 text-center">כניסת מנהל</h3>
                <div className="relative mt-4">
                    <input type={showPassword ? "text" : "password"} value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="סיסמה" className="w-full px-4 py-3 border border-stone-300 rounded-xl" onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                </div>
                <div className="flex gap-4 mt-6">
                    <button onClick={handleAdminLogin} className="flex-1 bg-stone-800 text-white py-3 rounded-xl font-medium">כניסה</button>
                    <button onClick={() => setShowAdminLogin(false)} className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium">ביטול</button>
                </div>
            </div>
        </div>
      )}
      {editingProduct && <ProductEditModal product={editingProduct} onSave={saveProduct} onCancel={() => setEditingProduct(null)} categories={categories} />}
      {editingStore && <StoreEditModal storeInfo={storeInfo} onSave={saveStoreInfo} onCancel={() => setEditingStore(null)} />}
    </div>
  );
};

export default App;
