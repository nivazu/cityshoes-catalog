import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Instagram, Search, Filter, Grid, List, ArrowLeft, ArrowRight, Heart, X, Settings, Save, Edit3, Trash2, Eye, EyeOff, Plus, Download } from 'lucide-react';

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
      colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
      images: formData.images.split('\n').map(i => i.trim()).filter(Boolean)
    };
    onSave(productData);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-8"><h3 className="text-2xl font-bold text-stone-800">{product.id ? 'ערוך מוצר' : 'הוסף מוצר חדש'}</h3><button onClick={onCancel} className="text-stone-400 hover:text-stone-700"><X className="w-6 h-6" /></button></div>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-stone-700 mb-2">שם המוצר</label><input type="text" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
                <div><label className="block text-sm font-medium text-stone-700 mb-2">מותג</label><input type="text" value={formData.brand} onChange={(e) => setFormData(p => ({...p, brand: e.target.value}))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
                <div><label className="block text-sm font-medium text-stone-700 mb-2">מחיר</label><input type="number" value={formData.price} onChange={(e) => setFormData(p => ({...p, price: e.target.value}))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
                <div><label className="block text-sm font-medium text-stone-700 mb-2">מחיר מקורי (אופציונלי)</label><input type="number" value={formData.originalPrice} onChange={(e) => setFormData(p => ({ ...p, originalPrice: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" /></div>
            </div>
            <div><label className="block text-sm font-medium text-stone-700 mb-2">תיאור</label><textarea value={formData.description} onChange={(e) => setFormData(p => ({...p, description: e.target.value}))} rows={3} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
            <div><label className="block text-sm font-medium text-stone-700 mb-2">קישורי תמונות (כל קישור בשורה חדשה)</label><textarea value={formData.images} onChange={(e) => setFormData(p => ({...p, images: e.target.value}))} rows={4} className="w-full px-4 py-3 border border-stone-300 rounded-xl" /></div>
            <div className="flex gap-4"><label className="flex items-center gap-2"><input type="checkbox" checked={formData.isNew} onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))} className="rounded" /><span className="text-sm text-stone-700">מוצר חדש</span></label><label className="flex items-center gap-2"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))} className="rounded" /><span className="text-sm text-stone-700">מוצר מומלץ</span></label></div>
            <div className="flex gap-4 pt-6"><button type="submit" className="flex-1 bg-stone-800 text-white py-3 rounded-xl font-medium"><Save className="w-4 h-4 inline-block ml-2" />שמור</button><button type="button" onClick={onCancel} className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium">ביטול</button></div>
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
        <div className="flex justify-between items-center mb-8"><h3 className="text-2xl font-bold text-stone-800">ערוך פרטי החנות</h3><button onClick={onCancel} className="text-stone-400 hover:text-stone-700"><X className="w-6 h-6" /></button></div>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-stone-700 mb-2">שם החנות</label><input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
                <div><label className="block text-sm font-medium text-stone-700 mb-2">סלוגן</label><input type="text" value={formData.slogan} onChange={(e) => setFormData(p => ({ ...p, slogan: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
                <div><label className="block text-sm font-medium text-stone-700 mb-2">טלפון</label><input type="text" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
                <div><label className="block text-sm font-medium text-stone-700 mb-2">וואטסאפ</label><input type="text" value={formData.whatsapp} onChange={(e) => setFormData(p => ({ ...p, whatsapp: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-stone-700 mb-2">כתובת</label><input type="text" value={formData.address} onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-stone-700 mb-2">אינסטגרם</label><input type="text" value={formData.instagram} onChange={(e) => setFormData(p => ({ ...p, instagram: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
            </div>
            <hr/>
            <div><label className="block text-sm font-medium text-stone-700 mb-2">כותרת באנר ראשית</label><input type="text" value={formData.heroTitle} onChange={(e) => setFormData(p => ({ ...p, heroTitle: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
            <div><label className="block text-sm font-medium text-stone-700 mb-2">כותרת משנה (Hero)</label><textarea value={formData.heroSubtitle} onChange={(e) => setFormData(p => ({ ...p, heroSubtitle: e.target.value }))} rows={2} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
            <div><label className="block text-sm font-medium text-stone-700 mb-2">קישור לתמונת הבאנר</label><input type="text" value={formData.bannerImage} onChange={(e) => setFormData(p => ({ ...p, bannerImage: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" /></div>
            <div className="flex gap-4 pt-6"><button type="submit" className="flex-1 bg-stone-800 text-white py-3 rounded-xl font-medium"><Save className="w-4 h-4 inline-block ml-2" />שמור שינויים</button><button type="button" onClick={onCancel} className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium">ביטול</button></div>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([ { id: 1, name: "תיק גב Sprayground", brand: "SPRAYGROUND", price: 350, category: "lifestyle", images: ["https://i.ibb.co/Xx3jh94t/Sprayground96.jpg", "https://i.ibb.co/HL8fWng9/Sprayground92.jpg"], description: "תיק גב בעיצוב ייחודי ואיכותי.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: true, featured: true }, { id: 2, name: "תיק גב Sprayground", brand: "SPRAYGROUND", price: 350, category: "lifestyle", images: ["https://i.ibb.co/TqWYFrDN/Sprayground82.jpg", "https://i.ibb.co/Y7BGVshR/Sprayground79.jpg"], description: "תיק גב בעיצוב ייחודי ואיכותי.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: true, featured: false }, { id: 3, name: "תיק גב Sprayground", brand: "SPRAYGROUND", price: 350, category: "lifestyle", images: ["https://i.ibb.co/Y7BGVshR/Sprayground79.jpg", "https://i.ibb.co/TqWYFrDN/Sprayground82.jpg"], description: "תיק גב בעיצוב ייחודי ואיכותי.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: false, featured: false }, { id: 4, name: "תיק גב Sprayground", brand: "SPRAYGROUND", price: 350, category: "lifestyle", images: ["https://i.ibb.co/NgW7L3Lg/Sprayground83.jpg", "https://i.ibb.co/7NyzMHz2/Sprayground80.jpg"], description: "תיק גב בעיצוב ייחודי ואיכותי.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: false, featured: false }]);
  const [storeInfo, setStoreInfo] = useState({ name: "נעלי העיר", slogan: "כל המיוחדים אצלנו", phone: "050-123-4567", whatsapp: "+972501234567", address: "רחוב הרצל 123, תל אביב", instagram: "@shoes_hair", heroTitle: "PREMIUM FOOTWEAR EXPERIENCE", heroSubtitle: "קולקציה אקסקלוסיבית של נעלי ספורט ואופנה מהמותגים המובילים בעולם.", bannerImage: "https://i.ibb.co/LdtBjBNY/Sprayground32.jpg" });
  
  // שאר משתני ה-state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingStore, setEditingStore] = useState(false);

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
  const handleLogout = () => { setIsAdminMode(false); setEditingProduct(null); setEditingStore(false); };
  const saveStoreInfo = (newStoreInfo) => { setStoreInfo(newStoreInfo); setEditingStore(false); };
  const handleCategoryChange = (categoryId) => { setIsTransitioning(true); setTimeout(() => { setSelectedCategory(categoryId); setIsTransitioning(false); }, 300); };
  const handleProductSelect = (product) => { if (!isAdminMode) { setSelectedProduct(product); } };
  const saveProduct = (productData) => { if (productData.id) { setProducts(prev => prev.map(p => p.id === productData.id ? productData : p)); } else { const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1; setProducts(prev => [...prev, { ...productData, id: newId }]); } setEditingProduct(null); };
  const deleteProduct = (id) => { if (window.confirm('האם אתה בטוח שברצונך למחוק את המוצר?')) { setProducts(prev => prev.filter(p => p.id !== id)); } };
  
  const exportDataForCode = () => {
    const dataString = `const newProducts = ${JSON.stringify(products, null, 2)};`;
    const blob = new Blob([dataString], { type: 'text/javascript; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'updated_products.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportHumanReadableList = () => {
    let list = `רשימת מוצרים - ${storeInfo.name}\n\n`;
    products.forEach(p => {
        list += `שם: ${p.name}\nמחיר: ${p.price}\n\n`;
    });
    const blob = new Blob([list], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'רשימת_מוצרים.txt';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (isLoading) { return ( <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30 flex items-center justify-center"><div className="text-center"><div className="relative mb-8"><div className="w-20 h-1 bg-gradient-to-r from-stone-800 via-amber-600 to-stone-800 mx-auto animate-pulse"></div><div className="absolute inset-0 w-20 h-1 bg-gradient-to-r from-amber-400 to-stone-600 mx-auto animate-pulse opacity-50 blur-sm"></div></div><div className="text-xs tracking-[0.4em] text-stone-600 font-light">LOADING LUXURY EXPERIENCE</div><div className="mt-4 text-lg tracking-[0.2em] text-stone-800 font-extralight">{storeInfo.name}</div></div></div>); }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/10 via-stone-50/50 to-amber-100/30 text-stone-900 font-light overflow-hidden">
        {isAdminMode && (<div className="fixed top-0 left-0 right-0 z-[60] bg-yellow-400 text-black px-6 py-2 flex items-center justify-between shadow-lg"><div className="flex items-center gap-4"><span className="font-bold">מצב ניהול</span><button onClick={() => setEditingStore(true)} className="flex items-center gap-2 text-sm hover:bg-yellow-500 p-2 rounded-md"><Settings className="w-4 h-4" /> ערוך פרטי חנות</button><button onClick={() => setEditingProduct({})} className="flex items-center gap-2 text-sm hover:bg-yellow-500 p-2 rounded-md"><Plus className="w-4 h-4" /> הוסף מוצר</button></div><button onClick={handleLogout} className="text-sm font-bold hover:underline">התנתק</button></div>)}
        <header className={`fixed ${isAdminMode ? 'top-11' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm' : 'bg-transparent'}`}><div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-4"><div className="text-2xl font-black tracking-tight bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent cursor-pointer" onClick={() => !isAdminMode && setShowAdminLogin(true)}>{storeInfo.name}</div><div className="hidden md:block text-xs tracking-widest text-stone-500 font-light">{storeInfo.slogan}</div></div><nav className="hidden lg:flex items-center gap-12">{categories.map(category => (<button key={category.id} onClick={() => handleCategoryChange(category.id)} className={`text-sm tracking-wide transition-all duration-500 relative group ${selectedCategory === category.id ? 'text-stone-800 font-medium' : 'text-stone-400 hover:text-stone-700'}`}>{category.name}<div className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-amber-400 to-stone-600 transition-all duration-500 ${selectedCategory === category.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></div></button>))}</nav><a href={`https://wa.me/${storeInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-stone-800 to-amber-800 text-white px-5 py-2 text-sm tracking-wide hover:from-amber-800 hover:to-stone-800 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 rounded-full">צור קשר</a></div></header>
        <main>
            <section className={`relative ${isAdminMode ? 'pt-28' : 'pt-20'} pb-12`}><div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div className="animate-fadeInUp"><div className="text-xs tracking-[0.4em] text-amber-600 mb-6 font-light">SUMMER COLLECTION 2025</div><h1 className="text-6xl lg:text-8xl font-black leading-none mb-8 tracking-tight"><span className="bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">{storeInfo.heroTitle.split(' ').slice(0, 2).join(' ')}</span><br /><span className="text-stone-500 text-5xl lg:text-6xl">{storeInfo.heroTitle.split(' ').slice(2).join(' ')}</span></h1><p className="text-lg text-stone-600 mb-12 leading-relaxed max-w-md">{storeInfo.heroSubtitle}</p></div><div className="relative animate-fadeInUp" style={{animationDelay: '300ms'}}>{featuredProducts[0] && featuredProducts[0].images && featuredProducts[0].images.length > 0 && (<div className="relative group"><div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-stone-200/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-700"></div><div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform group-hover:scale-105"><img src={featuredProducts[0].images[0]} alt={featuredProducts[0].name} className="w-full h-96 lg:h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" /></div></div>)}</div></div></section>
            <section className="py-16 bg-gradient-to-r from-stone-800 to-amber-800 text-white"><div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"><div className="text-center md:text-right"><h2 className="text-sm tracking-[0.3em] text-amber-400 mb-4">מבצעי הקיץ</h2><p className="text-4xl font-black leading-tight mb-6">קולקציה חדשה <br />עכשיו בחנות!</p><button className="bg-white text-stone-800 font-bold px-8 py-3 rounded-full hover:bg-amber-100 transition-colors duration-300">לכל הדגמים</button></div><div className="h-80 bg-cover bg-center rounded-2xl" style={{backgroundImage: `url('${storeInfo.bannerImage}')`}}></div></div></section>
            <section className="py-12 border-y border-stone-200/50 bg-white/60 backdrop-blur-sm sticky top-[72px] z-30"><div className="max-w-7xl mx-auto px-6 flex items-center justify-between"><div className="text-sm tracking-wide text-stone-600">{filteredProducts.length} פריטים</div><div className="flex items-center gap-4"><button onClick={exportDataForCode} className="flex items-center gap-2 text-sm hover:text-amber-700 p-2 rounded-md"><Download className="w-4 h-4" /> ייצא נתונים לקוד</button><button onClick={exportHumanReadableList} className="flex items-center gap-2 text-sm hover:text-amber-700 p-2 rounded-md"><Download className="w-4 h-4" /> ייצא רשימה פשוטה</button></div></div></section>
            <section className="py-20 bg-gradient-to-b from-transparent via-stone-50/20 to-transparent"><div className="max-w-7xl mx-auto px-6"><div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>{filteredProducts.map((product, index) => (<div key={product.id} className="group cursor-pointer animate-fadeInUp relative" onClick={() => handleProductSelect(product)} onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)} style={{animationDelay: `${index * 100}ms`}}>{isAdminMode && (<div className="absolute top-4 left-4 z-20 flex gap-2"><button onClick={(e) => {e.stopPropagation(); setEditingProduct(product);}} className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"><Edit3 className="w-4 h-4" /></button><button onClick={(e) => {e.stopPropagation(); deleteProduct(product.id);}} className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"><Trash2 className="w-4 h-4" /></button></div>)}<div className="relative overflow-hidden mb-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">{product.isNew && <div className="absolute top-4 right-4 z-10 text-xs bg-stone-800 text-white px-3 py-1 rounded-full">חדש</div>}{product.images && product.images.length > 0 && (<img src={hoveredProduct === product.id && product.images.length > 1 ? product.images[1] : product.images[0]} alt={product.name} className="w-full h-80 lg:h-96 object-cover" />)}</div><div className="text-center"><div className="text-xs tracking-widest text-amber-700 font-medium">{product.brand}</div><h3 className="text-xl font-medium mt-2">{product.name}</h3><div className="text-lg font-semibold mt-1">₪{product.price}</div></div></div>))}</div></div></section>
        </main>
        <footer className="py-16 border-t border-stone-200/50"><div className="max-w-7xl mx-auto px-6 text-center text-stone-500"><p>© 2025 {storeInfo.name}. כל הזכויות שמורות.</p></div></footer>
        {showAdminLogin && !isAdminMode && ( <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6"><div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"><h3 className="text-2xl font-bold text-stone-800 mb-2 text-center">כניסת מנהל</h3><div className="relative mt-4"><input type={showPassword ? "text" : "password"} value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="סיסמה" className="w-full px-4 py-3 border border-stone-300 rounded-xl" onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div><div className="flex gap-4 mt-6"><button onClick={handleAdminLogin} className="flex-1 bg-stone-800 text-white py-3 rounded-xl font-medium">כניסה</button><button onClick={() => setShowAdminLogin(false)} className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium">ביטול</button></div></div></div> )}
        {editingProduct && <ProductEditModal product={editingProduct} onSave={saveProduct} onCancel={() => setEditingProduct(null)} categories={categories} />}
        {editingStore && <StoreEditModal storeInfo={storeInfo} onSave={saveStoreInfo} onCancel={() => setEditingStore(null)} />}
        {selectedProduct && <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl" onClick={() => setSelectedProduct(null)}><div className="h-full flex items-center justify-center p-6"><div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-8" onClick={e => e.stopPropagation()}> {/* Product Detail Modal Content */} </div></div></div>}
    </div>
  );
};

export default App;
