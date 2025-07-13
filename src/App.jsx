import React, { useState, useEffect } from 'react';
import { Phone, Instagram, Search, Filter, Grid, List, ArrowLeft, ArrowRight, X, Settings, Save, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Admin states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingStore, setEditingStore] = useState(false);

  // Default data
  const defaultProducts = [
    {
      id: 1,
      name: "AIR FORCE 1 '07",
      brand: "NIKE",
      price: 599,
      originalPrice: 699,
      category: "lifestyle",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop&crop=center"
      ],
      description: "Classic silhouette meets modern comfort. Premium leather construction with timeless design that transcends seasons.",
      colors: ["WHITE", "BLACK", "OBSIDIAN"],
      sizes: ["40", "41", "42", "43", "44"],
      isNew: true,
      featured: true
    },
    {
      id: 2,
      name: "ULTRABOOST 22",
      brand: "ADIDAS",
      price: 749,
      category: "running",
      images: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop&crop=center"
      ],
      description: "Revolutionary energy return meets unparalleled comfort. Engineered for performance, crafted for style.",
      colors: ["CORE BLACK", "CLOUD WHITE"],
      sizes: ["39", "40", "41", "42", "43", "44"],
      isNew: false,
      featured: false
    },
  ];

  const defaultStoreInfo = {
    name: "נעלי העיר",
    slogan: "כל המיוחדים אצלנו",
    phone: "050-123-4567",
    whatsapp: "+972501234567",
    address: "רחוב הרצל 123, תל אביב",
    instagram: "@shoes_hair",
    heroTitle: "PREMIUM FOOTWEAR EXPERIENCE",
    heroSubtitle: "קולקציה אקסקלוסיבית של נעלי ספורט ואופנה מהמותגים המובילים בעולם. איכות פרימיום, עיצוב חדשני, יוקרה נצחית."
  };

  const [products, setProducts] = useState(() => JSON.parse(JSON.stringify(defaultProducts)));
  const [storeInfo, setStoreInfo] = useState(() => JSON.parse(JSON.stringify(defaultStoreInfo)));

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setIsLoading(false), 1500); // Shortened for faster testing
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'כל המוצרים' },
    { id: 'running', name: 'ריצה' },
    { id: 'lifestyle', name: 'לייפסטייל' },
    { id: 'casual', name: 'יומיומי' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const featuredProducts = products.filter(product => product.featured);

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdminMode(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('סיסמה שגויה');
    }
  };

  const handleLogout = () => {
    setIsAdminMode(false);
    setEditingProduct(null);
    setEditingStore(false);
  };

  const saveProduct = (productData) => {
    if (productData.id) {
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    } else {
      const newId = Math.max(...products.map(p => p.id)) + 1;
      setProducts(prev => [...prev, { ...productData, id: newId }]);
    }
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את המוצר?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const saveStoreInfo = (newStoreInfo) => {
    setStoreInfo(newStoreInfo);
    setEditingStore(false);
  };

  const handleCategoryChange = (categoryId) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(categoryId);
      setIsTransitioning(false);
    }, 300);
  };

  const handleProductSelect = (product) => {
    if (isAdminMode) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProduct(product);
      setCurrentImageIndex(0);
      setIsTransitioning(false);
    }, 200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-1 bg-gradient-to-r from-stone-800 via-amber-600 to-stone-800 mx-auto animate-pulse"></div>
            <div className="absolute inset-0 w-20 h-1 bg-gradient-to-r from-amber-400 to-stone-600 mx-auto animate-pulse opacity-50 blur-sm"></div>
          </div>
          <div className="text-xs tracking-[0.4em] text-stone-600 font-light">LOADING LUXURY EXPERIENCE</div>
          <div className="mt-4 text-lg tracking-[0.2em] text-stone-800 font-extralight">{storeInfo.name}</div>
        </div>
      </div>
    );
  }

  // The main component JSX
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/10 to-amber-100/30 text-stone-900 font-light overflow-hidden">
      <header className={`fixed ${isAdminMode ? 'top-12' : 'top-0'} left-0 right-0 z-40 transition-all duration-700 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-2xl border-b border-stone-200/50 shadow-lg shadow-stone-200/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent">{storeInfo.name}</div>
              <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-stone-600 mx-4 shadow-sm"></div>
              <div className="text-xs tracking-[0.3em] text-stone-500 font-light">{storeInfo.slogan}</div>
            </div>
          </div>
        </div>
      </header>

      <section className={`relative ${isAdminMode ? 'pt-44' : 'pt-32'} pb-20 min-h-screen flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 w-full">
            <h1 className="text-6xl font-black">האתר עובד!</h1>
            <p className="text-lg">החלק העליון והתחתון תקינים.</p>
        </div>
      </section>

      {/* Products Grid - Temporarily replaced for testing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center">בדיקה: רשימת המוצרים אמורה להופיע כאן.</h2>
        </div>
      </section>

      <footer className="py-16 border-t border-stone-200/50 bg-gradient-to-r from-stone-50/50 via-white/80 to-amber-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-xl font-black bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent">{storeInfo.name}</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-xs text-stone-400">© 2025 {storeInfo.name}</div>
            </div>
          </div>
        </div>
      </footer>

      {/* All modals (ProductEditModal, StoreEditModal, etc.) are kept out for this test to keep it simple */}
    </div>
  );
};

// The modal components are temporarily removed to ensure the main page loads.
// We will add them back once we confirm the main page is working.

export default App;
