import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Instagram, Search, Filter, Grid, List, ArrowLeft, ArrowRight, Heart, X, Settings, Save, Edit3, Trash2, Eye, EyeOff, Plus, Download, MessageSquare, Facebook, Youtube, Share2, ZoomIn, ZoomOut } from 'lucide-react';

// --- MODALS ---

const ProductEditModal = ({ product, onSave, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    name: product.name || '', brand: product.brand || '', price: product.price || '', originalPrice: product.originalPrice || '',
    category: product.category || 'תיקים', description: product.description || '', colors: product.colors?.join(', ') || '',
    sizes: product.sizes?.join(', ') || '', images: product.images?.join('\n') || '', isNew: product.isNew || false, featured: product.featured || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...product, ...formData, price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
      images: formData.images.split('\n').map(i => i.trim()).filter(Boolean),
      category: formData.category,
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
                 <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">קטגוריה</label>
                    <select value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl bg-white">
                        {categories.filter(c => c.id !== 'all').map(cat => (<option key={cat.id} value={cat.name}>{cat.name}</option>))}
                    </select>
                </div>
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
                <div className="md:col-span-2"><label className="block text-sm font-medium text-stone-700 mb-2">אינסטגרם</label><input type="text" value={formData.instagram} onChange={(e) => setFormData(p => ({ ...p, instagram: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" /></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-stone-700 mb-2">פייסבוק</label><input type="text" value={formData.facebook} onChange={(e) => setFormData(p => ({ ...p, facebook: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" /></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-stone-700 mb-2">טיקטוק</label><input type="text" value={formData.tiktok} onChange={(e) => setFormData(p => ({ ...p, tiktok: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" /></div>
            </div>
            <hr/>
            <div><label className="block text-sm font-medium text-stone-700 mb-2">כותרת ראשית (Hero)</label><input type="text" value={formData.heroTitle} onChange={(e) => setFormData(p => ({ ...p, heroTitle: e.target.value }))} className="w-full px-4 py-3 border border-stone-300 rounded-xl" /></div>
            <div><label className="block text-sm font-medium text-stone-700 mb-2">כותרת משנה (Hero)</label><textarea value={formData.heroSubtitle} onChange={(e) => setFormData(p => ({ ...p, heroSubtitle: e.target.value }))} rows={2} className="w-full px-4 py-3 border border-stone-300 rounded-xl" /></div>
            <div className="flex gap-4 pt-6"><button type="submit" className="flex-1 bg-stone-800 text-white py-3 rounded-xl font-medium"><Save className="w-4 h-4 inline-block ml-2" />שמור שינויים</button><button type="button" onClick={onCancel} className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium">ביטול</button></div>
        </form>
      </div>
    </div>
  );
};

const AddCategoryModal = ({ onSave, onCancel }) => {
    const [name, setName] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (name.trim()) { onSave({ id: name.trim().toLowerCase().replace(/\s+/g, '-'), name: name.trim() }); } };
    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <h3 className="text-2xl font-bold text-stone-800 mb-6 text-center">הוספת קטגוריה חדשה</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="block text-sm font-medium text-stone-700 mb-2">שם הקטגוריה</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-stone-300 rounded-xl" required /></div>
                    <div className="flex gap-4 pt-4"><button type="submit" className="flex-1 bg-stone-800 text-white py-3 rounded-xl font-medium">הוסף</button><button type="button" onClick={onCancel} className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium">ביטול</button></div>
                </form>
            </div>
        </div>
    );
};

const App = () => {
  const [products, setProducts] = useState([ { id: 1, name: "תיק גב Sprayground 1", brand: "SPRAYGROUND", price: 350, category: "תיקים", images: ["https://i.ibb.co/vvsQwRSy/Sprayground63.jpg", "https://i.ibb.co/jZ450d5g/Sprayground80.jpg", "https://i.ibb.co/nsSXv82B/Sprayground67.jpg", "https://i.ibb.co/zHVPdBT2/Sprayground85.jpg", "https://i.ibb.co/Ps1t5Y5s/Sprayground83.jpg"], description: "תיקי Sprayground ידועים בעיצובם הייחודי והאוונגרדי, המשלב אמנות רחוב עם פונקציונליות גבוהה. כל תיק עשוי מחומרים עמידים, עם כיס קדמי בסגירת רוכסן, כיסים צדדיים, וכיס נסתר לאחסון מאובטח. בפנים, תא נפרד למחשב נייד וריפוד גב ארגונומי מרשת לנוחות מקסימלית.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: true, featured: true }, { id: 2, name: "תיק גב Sprayground 2", brand: "SPRAYGROUND", price: 350, category: "תיקים", images: ["https://i.ibb.co/zp0dm4H/Sprayground87.jpg", "https://i.ibb.co/GfS4KcPr/Sprayground92.jpg", "https://i.ibb.co/fdnqhbSH/Sprayground96.jpg"], description: "תיקי Sprayground ידועים בעיצובם הייחודי והאוונגרדי, המשלב אמנות רחוב עם פונקציונליות גבוהה. כל תיק עשוי מחומרים עמידים, עם כיס קדמי בסגירת רוכסן, כיסים צדדיים, וכיס נסתר לאחסון מאובטח. בפנים, תא נפרד למחשב נייד וריפוד גב ארגונומי מרשת לנוחות מקסימלית.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: true, featured: false }, { id: 3, name: "תיק גב Sprayground 3", brand: "SPRAYGROUND", price: 350, category: "תיקים", images: ["https://i.ibb.co/fYVRrN4g/Sprayground46.jpg", "https://i.ibb.co/0Vq2t6mZ/Sprayground64.jpg", "https://i.ibb.co/zpTRDkP/Sprayground77.jpg"], description: "תיקי Sprayground ידועים בעיצובם הייחודי והאוונגרדי, המשלב אמנות רחוב עם פונקציונליות גבוהה. כל תיק עשוי מחומרים עמידים, עם כיס קדמי בסגירת רוכסן, כיסים צדדיים, וכיס נסתר לאחסון מאובטח. בפנים, תא נפרד למחשב נייד וריפוד גב ארגונומי מרשת לנוחות מקסימלית.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: false, featured: false }, { id: 4, name: "תיק גב Sprayground 4", brand: "SPRAYGROUND", price: 350, category: "תיקים", images: ["https://i.ibb.co/DHnYNzvF/Sprayground100.jpg", "https://i.ibb.co/TdBNXZQ/Sprayground51.jpg", "https://i.ibb.co/RkkN7MwG/Sprayground57.jpg"], description: "תיקי Sprayground ידועים בעיצובם הייחודי והאוונגרדי, המשלב אמנות רחוב עם פונקציונליות גבוהה. כל תיק עשוי מחומרים עמידים, עם כיס קדמי בסגירת רוכסן, כיסים צדדיים, וכיס נסתר לאחסון מאובטח. בפנים, תא נפרד למחשב נייד וריפוד גב ארגונומי מרשת לנוחות מקסימלית.", colors: ["MULTI"], sizes: ["ONE SIZE"], isNew: false, featured: false }]);
  const [storeInfo, setStoreInfo] = useState({ name: "נעלי העיר", slogan: "כל המיוחדים אצלנו", phone: "050-5798761", whatsapp: "+972505798761", address: "שד' רוטשילד 17, חדרה", instagram: "https://www.instagram.com/asi_abergel_city_shoes?igsh=MTU4Mm16Z2VxbzVxYw==", facebook: "https://www.facebook.com/share/1B32LKgMpx/", tiktok: "https://www.tiktok.com/@asi0505798761?_t=ZS-8xzXQyLNjcI&_r=1", heroTitle: "PREMIUM LIFESTYLE GEAR", heroSubtitle: "קולקציה אקסקלוסיבית של תיקים ואביזרים מהמותגים המובילים בעולם."});
  const [categories, setCategories] = useState([ { id: 'all', name: 'כל המוצרים' }, { id: 'תיקים', name: 'תיקים' } ]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingStore, setEditingStore] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => { const handleScroll = () => setScrollY(window.scrollY); window.addEventListener('scroll', handleScroll); setTimeout(() => setIsLoading(false), 2500); return () => window.removeEventListener('scroll', handleScroll); }, []);
  
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);
  
  const handleAdminLogin = () => { if (adminPassword === 'admin123') { setIsAdminMode(true); setShowAdminLogin(false); setAdminPassword(''); } else { alert('סיסמה שגויה'); } };
  const handleLogout = () => { setIsAdminMode(false); };
  const saveStoreInfo = (newStoreInfo) => { setStoreInfo(newStoreInfo); setEditingStore(false); };
  const handleCategoryChange = (categoryId) => { setIsTransitioning(true); setTimeout(() => { setSelectedCategory(categoryId); setIsTransitioning(false); }, 300); };
  const handleProductSelect = (product) => { if (!isAdminMode) { setSelectedProduct(product); setCurrentImageIndex(0); setIsZoomed(false); } };
  const saveProduct = (productData) => { if (productData.id) { setProducts(prev => prev.map(p => p.id === productData.id ? productData : p)); } else { const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1; setProducts(prev => [...prev, { ...productData, id: newId }]); } setEditingProduct(null); };
  const deleteProduct = (id) => { if (window.confirm('האם אתה בטוח?')) { setProducts(prev => prev.filter(p => p.id !== id)); } };
  const addCategory = (newCategory) => { setCategories(prev => [...prev, newCategory]); setIsAddingCategory(false); };
  const exportDataForCode = () => { const dataString = `const products = ${JSON.stringify(products, null, 2)};`; const blob = new Blob([dataString], { type: 'text/javascript; charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'updated_products.js'; a.click(); URL.revokeObjectURL(url); };
  const exportHumanReadableList = () => { let list = `רשימת מוצרים - ${storeInfo.name}\n\n`; products.forEach(p => { list += `שם: ${p.name}\nמחיר: ${p.price}\n\n`; }); const blob = new Blob([list], { type: 'text/plain; charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'product_list.txt'; a.click(); URL.revokeObjectURL(url); };
  const handleShare = async (product) => { const shareData = { title: product.name, text: `מצאתי את זה ב-${storeInfo.name}: ${product.name}`, url: window.location.href }; if (navigator.share) { try { await navigator.share(shareData); } catch (err) { console.error("Error sharing:", err); } } else { navigator.clipboard.writeText(shareData.url); alert("הקישור הועתק!"); } };
  const nextImage = (e) => { e.stopPropagation(); if (selectedProduct) { setCurrentImageIndex(prev => (prev + 1) % selectedProduct.images.length); } };
  const prevImage = (e) => { e.stopPropagation(); if (selectedProduct) { setCurrentImageIndex(prev => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length); } };
  
  if (isLoading) { return ( <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30 flex items-center justify-center"><div className="text-center"><div className="relative mb-8"><div className="w-20 h-1 bg-gradient-to-r from-stone-800 via-amber-600 to-stone-800 mx-auto animate-pulse"></div><div className="absolute inset-0 w-20 h-1 bg-gradient-to-r from-amber-400 to-stone-600 mx-auto animate-pulse opacity-50 blur-sm"></div></div><div className="text-xs tracking-[0.4em] text-stone-600 font-light">LOADING LUXURY EXPERIENCE</div><div className="mt-4 text-lg tracking-[0.2em] text-stone-800 font-extralight">{storeInfo.name}</div></div></div>); }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/10 via-stone-50/50 to-amber-100/30 text-stone-900 font-light overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none"><div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-amber-100/30 to-stone-200/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div><div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-gradient-to-tr from-stone-200/20 to-amber-100/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s', animationDelay: '4s'}}></div><div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-50/10 to-stone-100/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '15s', animationDelay: '2s'}}></div><div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-bl from-amber-100/20 to-stone-100/15 rounded-full blur-2xl animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}}></div><div className="absolute top-1/3 -left-20 w-32 h-64 bg-gradient-to-r from-stone-100/25 to-amber-100/15 rounded-full blur-2xl animate-pulse" style={{animationDuration: '14s', animationDelay: '6s'}}></div><div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-tr from-amber-50/20 to-stone-50/25 rounded-full blur-2xl animate-pulse" style={{animationDuration: '9s', animationDelay: '3s'}}></div><div className="absolute top-20 right-20 w-2 h-20 bg-gradient-to-b from-amber-300/20 to-transparent transform rotate-12"></div><div className="absolute bottom-40 left-20 w-1 h-16 bg-gradient-to-t from-stone-400/30 to-transparent transform -rotate-12"></div><div className="absolute top-1/3 left-1/4 w-px h-12 bg-gradient-to-b from-amber-400/40 to-transparent"></div><div className="absolute top-2/3 right-1/5 w-px h-8 bg-gradient-to-b from-amber-300/30 to-transparent transform rotate-45"></div><div className="absolute bottom-1/5 left-1/3 w-2 h-2 bg-amber-200/40 rounded-full"></div><div className="absolute top-1/5 left-2/3 w-1 h-1 bg-stone-300/50 rounded-full"></div></div>
      {isAdminMode && (<div className="fixed top-0 left-0 right-0 z-[60] bg-yellow-400 text-black px-6 py-2 flex items-center justify-between shadow-lg"><div className="flex items-center gap-4"><span className="font-bold">מצב ניהול</span><button onClick={() => setEditingStore(true)} className="flex items-center gap-2 text-sm hover:bg-yellow-500 p-2 rounded-md"><Settings className="w-4 h-4" /> ערוך פרטי חנות</button><button onClick={() => setEditingProduct({})} className="flex items-center gap-2 text-sm hover:bg-yellow-500 p-2 rounded-md"><Plus className="w-4 h-4" /> הוסף מוצר</button><button onClick={() => setIsAddingCategory(true)} className="flex items-center gap-2 text-sm hover:bg-yellow-500 p-2 rounded-md"><Plus className="w-4 h-4" /> הוסף קטגוריה</button></div><button onClick={handleLogout} className="text-sm font-bold hover:underline">התנתק</button></div>)}
      <header className={`fixed ${isAdminMode ? 'top-11' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm' : 'bg-transparent'}`}><div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-4"><div className="text-2xl font-black tracking-tight bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent cursor-pointer" onClick={() => !isAdminMode && setShowAdminLogin(true)}>{storeInfo.name}</div><div className="hidden md:block text-xs tracking-widest text-stone-500 font-light">{storeInfo.slogan}</div></div><nav className="hidden lg:flex items-center gap-12">{categories.map(category => (<button key={category.id} onClick={() => handleCategoryChange(category.id)} className={`text-sm tracking-wide transition-all duration-500 relative group ${selectedCategory === category.id ? 'text-stone-800 font-medium' : 'text-stone-400 hover:text-stone-700'}`}>{category.name}<div className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-amber-400 to-stone-600 transition-all duration-500 ${selectedCategory === category.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></div></button>))}</nav><a href={`https://wa.me/${storeInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 text-sm tracking-wide hover:from-green-600 hover:to-green-700 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 rounded-full flex items-center gap-2"><MessageSquare className="w-4 h-4" /> דברו איתנו ב-Whatsapp</a></div></header>
      <main>
          <section className={`relative ${isAdminMode ? 'pt-28' : 'pt-20'} pb-12`}><div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div className="animate-fadeInUp"><div className="text-xs tracking-[0.4em] text-amber-600 mb-6 font-light">SUMMER COLLECTION 2025</div><h1 className="text-6xl lg:text-8xl font-black leading-none mb-8 tracking-tight"><span className="bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">{storeInfo.heroTitle.split(' ').slice(0, 2).join(' ')}</span><br /><span className="text-stone-500 text-5xl lg:text-6xl">{storeInfo.heroTitle.split(' ').slice(2).join(' ')}</span></h1><p className="text-lg text-stone-600 mb-12 leading-relaxed max-w-md">{storeInfo.heroSubtitle}</p></div><div className="relative animate-fadeInUp" style={{animationDelay: '300ms'}}><div className="aspect-w-16 aspect-h-9 rounded-3xl shadow-2xl overflow-hidden"><img src="https://i.ibb.co/TMXJFSMj/b447649c-d70a-400e-bf50-f22a1c291eca-1-1.gif" alt="Hero Banner" className="w-full h-full object-cover" /></div></div></section>
          <section className="py-16 bg-white/50 border-y border-stone-200/50"><div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-around items-center text-center gap-8"><div className="flex items-center gap-4"><MapPin className="w-8 h-8 text-amber-600" /><div className="text-right"><div className="font-bold text-lg text-stone-800">כתובתנו</div><p className="text-stone-600">{storeInfo.address}</p></div></div><div className="flex items-center gap-4"><Phone className="w-8 h-8 text-amber-600" /><div className="text-right"><div className="font-bold text-lg text-stone-800">טלפון להזמנות</div><p className="text-stone-600">{storeInfo.phone}</p></div></div></div></section>
          <section className="py-12 border-y border-stone-200/50 bg-white/60 backdrop-blur-sm sticky top-[72px] z-30"><div className="max-w-7xl mx-auto px-6 flex items-center justify-between"><div className="text-sm tracking-wide text-stone-600">{filteredProducts.length} פריטים</div><div className="flex items-center gap-4"><button onClick={exportDataForCode} className="flex items-center gap-2 text-sm hover:text-amber-700 p-2 rounded-md"><Download className="w-4 h-4" /> ייצא נתונים לקוד</button><button onClick={exportHumanReadableList} className="flex items-center gap-2 text-sm hover:text-amber-700 p-2 rounded-md"><Download className="w-4 h-4" /> ייצא רשימה פשוטה</button></div></div></section>
          <section className="py-20 bg-gradient-to-b from-transparent via-stone-50/20 to-transparent"><div className="max-w-7xl mx-auto px-6"><div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>{filteredProducts.map((product, index) => (<ProductCard key={product.id} product={product} isAdminMode={isAdminMode} setEditingProduct={setEditingProduct} deleteProduct={deleteProduct} handleProductSelect={handleProductSelect} setHoveredProduct={setHoveredProduct} hoveredProduct={hoveredProduct} handleShare={handleShare} />))}</div></div></section>
      </main>
      <footer className="py-16 border-t border-stone-200/50"><div className="max-w-7xl mx-auto px-6 text-center text-stone-500"><div className="flex justify-center gap-6 mb-4"><a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-600"><Instagram className="w-6 h-6" /></a><a href={storeInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-600"><Facebook className="w-6 h-6" /></a><a href={storeInfo.tiktok} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-600"><Youtube className="w-6 h-6" /></a></div><p>© 2025 {storeInfo.name}. כל הזכויות שמורות.</p></div></footer>
      {showAdminLogin && !isAdminMode && ( <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6"><div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"><h3 className="text-2xl font-bold text-stone-800 mb-2 text-center">כניסת מנהל</h3><div className="relative mt-4"><input type={showPassword ? "text" : "password"} value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="סיסמה" className="w-full px-4 py-3 border border-stone-300 rounded-xl" onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div><div className="flex gap-4 mt-6"><button onClick={handleAdminLogin} className="flex-1 bg-stone-800 text-white py-3 rounded-xl font-medium">כניסה</button><button onClick={() => setShowAdminLogin(false)} className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium">ביטול</button></div></div></div> )}
      {editingProduct && <ProductEditModal product={editingProduct} onSave={saveProduct} onCancel={() => setEditingProduct(null)} categories={categories} />}
      {editingStore && <StoreEditModal storeInfo={storeInfo} onSave={saveStoreInfo} onCancel={() => setEditingStore(null)} />}
      {isAddingCategory && <AddCategoryModal onSave={addCategory} onCancel={() => setIsAddingCategory(false)} />}
      {selectedProduct && <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center" onClick={() => setSelectedProduct(null)}><div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}><div className="p-4 border-b flex justify-between items-center"><h3 className="text-xl font-bold">{selectedProduct.name}</h3><button onClick={() => setSelectedProduct(null)}><X className="w-6 h-6" /></button></div><div className="flex-grow overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8"><div className="relative group"><img src={selectedProduct.images[currentImageIndex]} alt={selectedProduct.name} className={`w-full h-full object-contain transition-transform duration-300 cursor-pointer ${isZoomed ? 'scale-125' : 'scale-100'}`} onClick={() => setIsZoomed(!isZoomed)} />{selectedProduct.images.length > 1 && ( <> <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white"><ArrowLeft className="w-5 h-5" /></button> <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white"><ArrowRight className="w-5 h-5" /></button> </> )}<div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{currentImageIndex + 1} / {selectedProduct.images.length}</div><button onClick={() => setIsZoomed(!isZoomed)} className="absolute top-2 right-2 bg-white/50 rounded-full p-2 hover:bg-white">{isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}</button></div><div><p className="text-2xl font-bold">₪{selectedProduct.price}</p><p className="mt-4 text-stone-700">{selectedProduct.description}</p></div></div></div></div>}
    </div>
  );
};

export default App;
