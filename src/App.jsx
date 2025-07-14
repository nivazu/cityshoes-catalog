import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Instagram, ChevronRight, Search, Filter, Grid, List, ArrowLeft, ArrowRight, Star, Heart, Plus, X, Settings, Save, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

const LuxuryShoeCatalogWithAdmin = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productImageIndexes, setProductImageIndexes] = useState({});
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
    {
      id: 3,
      name: "RETRO HIGH OG",
      brand: "JORDAN",
      price: 899,
      originalPrice: 1099,
      category: "lifestyle",
      images: [
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=600&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=600&fit=crop&crop=center"
      ],
      description: "Iconic heritage meets contemporary craftsmanship. Legend reborn for the modern connoisseur.",
      colors: ["BRED", "ROYAL", "SHADOW"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      isNew: true,
      featured: true
    }
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

  const [products, setProducts] = useState(() => {
    const saved = JSON.parse(JSON.stringify(defaultProducts));
    return saved;
  });

  const [storeInfo, setStoreInfo] = useState(() => {
    const saved = JSON.parse(JSON.stringify(defaultStoreInfo));
    return saved;
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setIsLoading(false), 2500);
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

  const exportImagesList = () => {
    const imagesList = generateImagesList(products, storeInfo);
    
    const blob = new Blob([imagesList], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'רשימת-תמונות-לקטלוג.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setTimeout(() => {
      const shouldOpenEmail = window.confirm('הרשימה הורדה בהצלחה!\n\nהאם תרצה לשלוח אותה עכשיו?');
      if (shouldOpenEmail) {
        const whatsappText = encodeURIComponent(`רשימת מוצרים לקטלוג:\n\n${imagesList.substring(0, 1000)}...`);
        const whatsappLink = `https://wa.me/?text=${whatsappText}`;
        window.open(whatsappLink);
      }
    }, 500);
  };

  const generateImagesList = (products, storeInfo) => {
    const date = new Date().toLocaleDateString('he-IL');
    let imagesList = `📋 רשימת תמונות ופרטים לקטלוג ${storeInfo.name}
תאריך: ${date}

========================================
פרטי החנות:
========================================
🏪 שם החנות: ${storeInfo.name}
📢 סלוגן: ${storeInfo.slogan}  
📞 טלפון: ${storeInfo.phone}
📱 וואטסאפ: ${storeInfo.whatsapp}
📍 כתובת: ${storeInfo.address}
📷 אינסטגרם: ${storeInfo.instagram}

========================================
רשימת מוצרים (${products.length} פריטים):
========================================

`;

    products.forEach((product, index) => {
      imagesList += `🔸 מוצר #${index + 1}: ${product.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👟 מותג: ${product.brand}
💰 מחיר: ₪${product.price}`;

      if (product.originalPrice && product.originalPrice > product.price) {
        imagesList += ` (במקום ₪${product.originalPrice})`;
      }

      imagesList += `
📂 קטגוריה: ${product.category}
📝 תיאור: ${product.description}
🎨 צבעים: ${product.colors.join(', ')}
📏 מידות: ${product.sizes.join(', ')}`;

      if (product.isNew) imagesList += `\n⭐ מוצר חדש`;
      if (product.featured) imagesList += `\n🏆 מוצר מומלץ`;

      imagesList += `\n📸 תמונות נדרשות: ${product.images.length} תמונות
`;

      product.images.forEach((img, imgIndex) => {
        if (img.startsWith('blob:') || img.startsWith('data:')) {
          imagesList += `   ${imgIndex + 1}. [תמונה נבחרה מהמחשב - צריך העלאה]\n`;
        } else {
          imagesList += `   ${imgIndex + 1}. ${img}\n`;
        }
      });

      imagesList += `\n`;
    });

    imagesList += `========================================
הנחיות לעבודה:
========================================

1. 📷 אני אשלח תמונות איכותיות של כל מוצר
2. 📱 התמונות יישלחו בוואטסאפ/אימייל לפי הסדר שברשימה
3. 📝 כל תמונה תסומן לפי המוצר שלה
4. ✅ המפתח יעלה את התמונות ויכין את הקטלוג

📞 לתיאום: ${storeInfo.whatsapp}

תודה! 🚀`;

    return imagesList;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/20 via-stone-50/30 to-amber-100/40 text-stone-900 font-light overflow-hidden relative">
      {/* Enhanced Background Graphics - Much More Visible */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large Primary Circles */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-br from-amber-200/40 to-stone-300/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-stone-300/35 to-amber-200/45 rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s', animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-100/25 to-stone-200/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '15s', animationDelay: '2s'}}></div>
        
        {/* Medium Secondary Circles */}
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-bl from-amber-200/35 to-stone-200/25 rounded-full blur-2xl animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-gradient-to-r from-stone-200/40 to-amber-200/30 rounded-full blur-2xl animate-pulse" style={{animationDuration: '14s', animationDelay: '6s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-tr from-amber-100/30 to-stone-100/35 rounded-full blur-2xl animate-pulse" style={{animationDuration: '9s', animationDelay: '3s'}}></div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-1/6 left-1/4 w-48 h-48 bg-gradient-to-br from-amber-300/25 to-stone-400/20 rounded-full blur-2xl animate-pulse" style={{animationDuration: '11s', animationDelay: '5s'}}></div>
        <div className="absolute bottom-1/6 right-1/5 w-56 h-56 bg-gradient-to-tl from-stone-300/30 to-amber-300/25 rounded-full blur-2xl animate-pulse" style={{animationDuration: '13s', animationDelay: '7s'}}></div>
        
        {/* Decorative Lines - More Visible */}
        <div className="absolute top-20 right-20 w-4 h-32 bg-gradient-to-b from-amber-400/40 to-transparent transform rotate-12 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-40 left-20 w-3 h-28 bg-gradient-to-t from-stone-500/40 to-transparent transform -rotate-12 animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-20 bg-gradient-to-b from-amber-500/50 to-transparent animate-pulse" style={{animationDuration: '9s', animationDelay: '4s'}}></div>
        <div className="absolute top-2/3 right-1/5 w-2 h-16 bg-gradient-to-b from-amber-400/45 to-transparent transform rotate-45 animate-pulse" style={{animationDuration: '7s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-3 h-24 bg-gradient-to-t from-stone-400/45 to-transparent transform rotate-30 animate-pulse" style={{animationDuration: '12s', animationDelay: '3s'}}></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/5 left-3/4 w-16 h-16 bg-gradient-to-br from-amber-300/30 to-stone-400/25 transform rotate-45 animate-pulse" style={{animationDuration: '15s', animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/5 left-1/6 w-12 h-12 bg-gradient-to-tr from-stone-300/35 to-amber-300/30 rounded-full animate-pulse" style={{animationDuration: '11s', animationDelay: '6s'}}></div>
        <div className="absolute top-1/2 right-1/6 w-20 h-20 bg-gradient-to-bl from-amber-200/25 to-stone-300/30 transform rotate-12 animate-pulse" style={{animationDuration: '14s', animationDelay: '2s'}}></div>
        
        {/* Small Accent Dots - More Visible */}
        <div className="absolute bottom-1/5 left-1/3 w-6 h-6 bg-amber-300/50 rounded-full animate-pulse" style={{animationDuration: '6s', animationDelay: '3s'}}></div>
        <div className="absolute top-1/5 left-2/3 w-4 h-4 bg-stone-400/60 rounded-full animate-pulse" style={{animationDuration: '8s', animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-amber-400/55 rounded-full animate-pulse" style={{animationDuration: '7s', animationDelay: '5s'}}></div>
        <div className="absolute bottom-1/3 left-1/5 w-4 h-4 bg-stone-500/50 rounded-full animate-pulse" style={{animationDuration: '9s', animationDelay: '2s'}}></div>
        
        {/* Flowing Wave Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-100/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-100/25 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent animate-pulse" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Admin Bar */}
      {isAdminMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">מצב ניהול פעיל</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setEditingStore(true)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors duration-300"
              >
                ערוך פרטי חנות
              </button>
              <button
                onClick={() => setEditingProduct({})}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors duration-300"
              >
                הוסף מוצר
              </button>
              <button
                onClick={() => exportImagesList()}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition-colors duration-300 font-medium"
              >
                📤 הכן רשימה לשליחה
              </button>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors duration-300"
              >
                יציאה
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`fixed ${isAdminMode ? 'top-12' : 'top-0'} left-0 right-0 z-40 transition-all duration-700 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-2xl border-b border-stone-200/50 shadow-lg shadow-stone-200/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent">{storeInfo.name}</div>
              <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-stone-600 mx-4 shadow-sm"></div>
              <div className="text-xs tracking-[0.3em] text-stone-500 font-light">{storeInfo.slogan}</div>
            </div>

            <nav className="hidden lg:flex items-center gap-12">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`text-sm tracking-wide transition-all duration-500 relative group ${
                    selectedCategory === category.id
                      ? 'text-stone-800 font-medium'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  {category.name}
                  <div className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-amber-400 to-stone-600 transition-all duration-500 ${
                    selectedCategory === category.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                </button>
              ))}
            </nav>

            <a href={`https://wa.me/${storeInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 text-sm tracking-wide hover:from-green-600 hover:to-green-700 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-green-200/50 transform hover:scale-105 rounded-full flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> 
              דברו איתנו ב-Whatsapp
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className={`relative ${isAdminMode ? 'pt-44' : 'pt-32'} pb-20 min-h-screen flex items-center`}>
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`transition-all duration-1000 ${isTransitioning ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'}`}>
                <div className="text-xs tracking-[0.4em] text-amber-600 mb-6 font-light">COLLECTION 2025</div>
                <h1 className="text-6xl lg:text-8xl font-black leading-none mb-8 tracking-tight">
                  <span className="bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">{storeInfo.heroTitle.split(' ').slice(0, 1).join(' ')}</span><br />
                  <span className="text-stone-800">{storeInfo.heroTitle.split(' ').slice(1, 2).join(' ')}</span><br />
                  <span className="text-stone-400 text-5xl lg:text-6xl">{storeInfo.heroTitle.split(' ').slice(2).join(' ')}</span>
                </h1>
                <p className="text-lg text-stone-600 mb-12 leading-relaxed max-w-md">
                  {storeInfo.heroSubtitle}
                </p>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
                    className="bg-gradient-to-r from-stone-900 to-amber-900 text-white px-8 py-4 text-sm tracking-wide hover:from-amber-900 hover:to-stone-900 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-amber-200/30 transform hover:scale-105"
                  >
                    גלה את הקולקציה
                  </button>
                  <button 
                    onClick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}
                    className="border-2 border-stone-300 px-8 py-4 text-sm tracking-wide hover:bg-gradient-to-r hover:from-stone-800 hover:to-amber-800 hover:text-white hover:border-transparent transition-all duration-500 shadow-lg hover:shadow-xl"
                  >
                    צור קשר
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={storeInfo.bannerImage}
                  alt="Banner"
                  className="w-full h-96 lg:h-[600px] object-cover transition-all duration-700 rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="text-xs tracking-[0.3em] mb-2">SPRAYGROUND</div>
                  <div className="text-2xl font-bold mb-2">תיק גב Sprayground</div>
                  <div className="text-lg">₪350</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-stone-200/50 bg-gradient-to-r from-amber-50/60 via-stone-50/70 to-amber-50/60 backdrop-blur-sm relative overflow-hidden">
          {/* Enhanced Controls Section Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 -right-20 w-80 h-80 bg-gradient-to-bl from-amber-200/35 to-stone-300/25 rounded-full blur-2xl animate-pulse" style={{animationDuration: '8s'}}></div>
            <div className="absolute top-1/2 -left-20 w-72 h-72 bg-gradient-to-br from-stone-200/40 to-amber-200/35 rounded-full blur-2xl animate-pulse" style={{animationDuration: '12s', animationDelay: '3s'}}></div>
            <div className="absolute top-0 left-1/3 w-3 h-16 bg-gradient-to-b from-amber-400/40 to-transparent animate-pulse" style={{animationDuration: '6s'}}></div>
            <div className="absolute bottom-0 right-1/4 w-2 h-12 bg-gradient-to-t from-stone-500/35 to-transparent animate-pulse" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-300/25 to-transparent animate-pulse" style={{animationDuration: '15s'}}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="text-sm tracking-wide text-stone-600">
                  {filteredProducts.length} פריטים
                </div>
                <div className="flex items-center gap-4 bg-white/50 rounded-full p-1 shadow-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-r from-stone-800 to-amber-800 text-white shadow-lg' : 'text-stone-400 hover:text-stone-700'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-r from-stone-800 to-amber-800 text-white shadow-lg' : 'text-stone-400 hover:text-stone-700'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <button onClick={exportDataForCode} className="flex items-center gap-2 text-sm tracking-wide text-stone-600 hover:text-amber-700 transition-colors duration-300 bg-white/50 px-4 py-2 rounded-full shadow-lg hover:shadow-xl">
                  <Download className="w-4 h-4" />
                  ייצא נתונים לקוד
                </button>
                <button onClick={exportHumanReadableList} className="flex items-center gap-2 text-sm tracking-wide text-stone-600 hover:text-amber-700 transition-colors duration-300 bg-white/50 px-4 py-2 rounded-full shadow-lg hover:shadow-xl">
                  <Download className="w-4 h-4" />
                  ייצא רשימה פשוטה
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="products-section" className="py-20 bg-gradient-to-br from-amber-50/50 via-stone-50/60 via-amber-50/40 to-stone-100/50 relative overflow-hidden">
          {/* Dramatically Enhanced Products Section Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large Flowing Circles */}
            <div className="absolute top-1/6 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-amber-300/30 to-stone-400/25 rounded-full blur-3xl animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/4 -left-40 w-[450px] h-[450px] bg-gradient-to-tr from-stone-400/35 to-amber-300/40 rounded-full blur-3xl animate-pulse" style={{animationDuration: '14s', animationDelay: '5s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-200/25 to-stone-300/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s', animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/6 right-1/3 w-80 h-80 bg-gradient-to-bl from-stone-300/35 to-amber-200/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '16s', animationDelay: '3s'}}></div>
            <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-gradient-to-br from-amber-400/25 to-stone-200/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '11s', animationDelay: '6s'}}></div>
            
            {/* Dynamic Lines and Patterns */}
            <div className="absolute top-1/4 left-1/6 w-6 h-48 bg-gradient-to-b from-amber-400/35 to-transparent transform rotate-12 animate-pulse" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-1/3 right-1/5 w-4 h-40 bg-gradient-to-t from-stone-500/40 to-transparent transform -rotate-12 animate-pulse" style={{animationDuration: '11s', animationDelay: '2s'}}></div>
            <div className="absolute top-2/3 left-1/3 w-3 h-32 bg-gradient-to-b from-amber-500/45 to-transparent animate-pulse" style={{animationDuration: '9s', animationDelay: '4s'}}></div>
            <div className="absolute top-1/6 right-2/3 w-3 h-36 bg-gradient-to-b from-stone-400/50 to-transparent transform rotate-45 animate-pulse" style={{animationDuration: '13s', animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/5 left-2/3 w-5 h-28 bg-gradient-to-t from-amber-300/40 to-transparent transform rotate-30 animate-pulse" style={{animationDuration: '7s', animationDelay: '3s'}}></div>
            
            {/* Geometric Elements */}
            <div className="absolute top-1/5 left-3/4 w-24 h-24 bg-gradient-to-br from-amber-300/30 to-stone-400/25 transform rotate-45 animate-pulse" style={{animationDuration: '18s', animationDelay: '4s'}}></div>
            <div className="absolute bottom-1/5 left-1/6 w-20 h-20 bg-gradient-to-tr from-stone-300/35 to-amber-300/30 rounded-full animate-pulse" style={{animationDuration: '12s', animationDelay: '7s'}}></div>
            <div className="absolute top-1/2 right-1/6 w-16 h-16 bg-gradient-to-bl from-amber-400/30 to-stone-300/25 transform rotate-30 animate-pulse" style={{animationDuration: '15s', animationDelay: '2s'}}></div>
            <div className="absolute top-1/3 left-1/2 w-18 h-18 bg-gradient-to-tr from-stone-400/30 to-amber-200/35 rounded-full animate-pulse" style={{animationDuration: '10s', animationDelay: '5s'}}></div>
            
            {/* Accent Dots - Much More Visible */}
            <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-amber-400/60 rounded-full animate-pulse" style={{animationDuration: '7s', animationDelay: '3s'}}></div>
            <div className="absolute bottom-1/4 left-1/5 w-6 h-6 bg-stone-500/65 rounded-full animate-pulse" style={{animationDuration: '10s', animationDelay: '6s'}}></div>
            <div className="absolute top-1/2 right-1/6 w-4 h-4 bg-amber-500/70 rounded-full animate-pulse" style={{animationDuration: '15s', animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/6 left-1/3 w-5 h-5 bg-stone-400/60 rounded-full animate-pulse" style={{animationDuration: '8s', animationDelay: '4s'}}></div>
            
            {/* Flowing Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-amber-200/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-stone-200/25 to-transparent"></div>
            <div className="absolute top-1/3 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent animate-pulse" style={{animationDuration: '20s'}}></div>
            <div className="absolute bottom-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-400/25 to-transparent animate-pulse" style={{animationDuration: '25s', animationDelay: '5s'}}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12' : 'space-y-8'} transition-all duration-700 ${isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
              {filteredProducts.map((product, index) => {
                const currentProductImageIndex = productImageIndexes[product.id] || 0;
                return (
                  <div
                    key={product.id}
                    className={`group cursor-pointer animate-fadeInUp relative ${viewMode === 'list' ? 'flex gap-8 items-center bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg' : ''}`}
                    onClick={() => handleProductSelect(product)}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    style={{animationDelay: `${index * 150}ms`}}
                  >
                    {isAdminMode && (
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProduct(product);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors duration-300"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(product.id);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <div className={`relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-700 transform hover:scale-105 ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'mb-6'}`}>
                      {product.isNew && (
                        <div className="absolute top-4 right-4 z-10 text-xs tracking-[0.3em] bg-gradient-to-r from-amber-600 to-stone-800 text-white px-3 py-1 rounded-full shadow-lg">
                          חדש
                        </div>
                      )}
                      
                      {!isAdminMode && (
                        <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                          <Heart className="w-5 h-5 text-white hover:text-amber-400 cursor-pointer transition-colors duration-300 drop-shadow-lg" />
                        </div>
                      )}
                      
                      {product.images && product.images.length > 0 && (
                        <img 
                          src={product.images[currentProductImageIndex]}
                          alt={product.name}
                          className={`w-full object-cover transition-all duration-700 ${viewMode === 'list' ? 'h-full' : 'h-80 lg:h-96'}`}
                        />
                      )}
                      
                      {/* Navigation arrows for multiple images */}
                      {product.images && product.images.length > 1 && (
                        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button 
                            className="pointer-events-auto bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductImageChange(product.id, 'prev');
                            }}
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button 
                            className="pointer-events-auto bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductImageChange(product.id, 'next');
                            }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      
                      {!isAdminMode && (
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                          <button className="bg-white/90 backdrop-blur-sm text-stone-800 px-6 py-2 text-sm tracking-wide hover:bg-white transition-all duration-300 rounded-full shadow-xl">
                            צפה בפרטים
                          </button>
                        </div>
                      )}
                    </div>

                    <div className={`space-y-3 ${viewMode === 'list' ? 'flex-1' : 'bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg'}`}>
                      <div className="flex items-center justify-between">
                        <div className="text-xs tracking-[0.3em] text-amber-700 font-medium">{product.brand}</div>
                        <div className="flex items-center gap-2">
                          {product.originalPrice && product.originalPrice > product.price && (
                            <>
                              <span className="text-sm text-stone-400 line-through">₪{product.originalPrice}</span>
                              <div className="w-1 h-4 bg-stone-300"></div>
                            </>
                          )}
                          <span className="text-lg font-medium bg-gradient-to-r from-stone-800 to-amber-800 bg-clip-text text-transparent">₪{product.price}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-medium group-hover:text-amber-700 transition-colors duration-300">
                        {product.name}
                      </h3>
                      
                      <div className="text-sm text-stone-600 leading-relaxed">
                        {product.description}
                      </div>
                      
                      <div className="flex items-center gap-3 pt-2">
                        {product.colors && product.colors.slice(0, 3).map((color, index) => (
                          <span key={index} className="text-xs tracking-wide text-stone-500">
                            {color}
                            {index < Math.min(product.colors.length - 1, 2) && <span className="mx-2 text-amber-400">•</span>}
                          </span>
                        ))}
                        {product.colors && product.colors.length > 3 && (
                          <span className="text-xs text-amber-600 font-medium">+{product.colors.length - 3}</span>
                        )}
                      </div>
                      
                      {/* Image indicators for multiple images */}
                      {product.images && product.images.length > 1 && (
                        <div className="flex justify-center gap-2 pt-2">
                          {product.images.map((_, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                currentProductImageIndex === imgIndex ? 'bg-amber-600' : 'bg-stone-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact-section" className="py-32 bg-gradient-to-br from-stone-100 to-amber-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="text-xs tracking-[0.4em] text-amber-600 mb-6">צור קשר</div>
          <h2 className="text-4xl lg:text-6xl font-black mb-12 tracking-tight bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">
            מוכנים להזמין?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm tracking-wide mb-2 text-stone-600">טלפון</div>
              <a href={`tel:${storeInfo.phone}`} className="text-lg font-medium hover:text-amber-700 transition-colors duration-300">{storeInfo.phone}</a>
            </div>
            
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-stone-600 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm tracking-wide mb-2 text-stone-600">כתובת</div>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(storeInfo.address)}`} target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-amber-700 transition-colors duration-300">{storeInfo.address}</a>
            </div>
            
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm tracking-wide mb-2 text-stone-600">אינסטגרם</div>
              <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-amber-700 transition-colors duration-300">@asi_abergel_city_shoes</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href={`https://wa.me/${storeInfo.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-12 py-4 text-sm tracking-wide hover:from-green-700 hover:to-green-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              הזמן בווטסאפ
            </a>
            <a 
              href={`tel:${storeInfo.phone}`}
              className="bg-gradient-to-r from-stone-800 to-amber-800 text-white px-12 py-4 text-sm tracking-wide hover:from-amber-800 hover:to-stone-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              התקשר עכשיו
            </a>
          </div>

          <div className="flex justify-center gap-6 mt-16">
            <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-600 transition-all duration-300 transform hover:scale-110">
              <Instagram className="w-6 h-6" />
            </a>
            <a href={storeInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-600 transition-all duration-300 transform hover:scale-110">
              <Facebook className="w-6 h-6" />
            </a>
            <a href={storeInfo.tiktok} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-600 transition-all duration-300 transform hover:scale-110">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
          </div>
          
          <div className="mt-8 text-xs text-stone-400">© 2025 {storeInfo.name}. כל הזכויות שמורות.</div>
        </div>
      </footer>
      </footer>

      {showAdminLogin && !isAdminMode && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-stone-50 via-amber-50/10 via-stone-50/50 to-amber-100/30 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-8">
              <Settings className="w-12 h-12 mx-auto mb-4 text-stone-600" />
              <h3 className="text-2xl font-black tracking-tight bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent mb-2">כניסת מנהל</h3>
              <p className="text-stone-600">הזן סיסמה לגישה לפאנל הניהול</p>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="סיסמה"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="text-xs text-stone-500 bg-white/50 backdrop-blur-sm p-3 rounded-lg">
                <strong>הזן את סיסמת הניהול שלך</strong>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 bg-gradient-to-r from-stone-800 to-amber-800 text-white py-3 rounded-xl font-medium hover:from-amber-800 hover:to-stone-800 transition-all duration-300"
                >
                  כניסה
                </button>
                <button
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword('');
                  }}
                  className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium hover:bg-stone-50 transition-colors duration-300"
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingProduct && <ProductEditModal product={editingProduct} onSave={saveProduct} onCancel={() => setEditingProduct(null)} categories={categories} />}
      {editingStore && <StoreEditModal storeInfo={storeInfo} onSave={saveStoreInfo} onCancel={() => setEditingStore(false)} />}
      
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl transition-all duration-500" onClick={() => setSelectedProduct(null)}>
          <div className="h-full flex items-center justify-center p-6">
            <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-stone-50 via-amber-50/10 via-stone-50/50 to-amber-100/30 rounded-3xl shadow-2xl transition-all duration-500 transform" onClick={e => e.stopPropagation()}>
              <div className="p-8">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <div className="text-xs tracking-[0.3em] text-amber-600 mb-2">{selectedProduct.brand}</div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">{selectedProduct.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-stone-400 hover:text-stone-700 transition-colors duration-300 p-2 hover:bg-stone-100 rounded-full"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                    <div className="relative mb-6 bg-stone-50 rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src={selectedProduct.images && selectedProduct.images[currentImageIndex]} 
                        alt={selectedProduct.name}
                        className="w-full h-96 lg:h-[600px] object-cover"
                      />
                      
                      {selectedProduct.images && selectedProduct.images.length > 1 && (
                        <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
                          <button 
                            className="pointer-events-auto bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                            onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedProduct.images.length - 1)}
                          >
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                          <button 
                            className="pointer-events-auto bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                            onClick={() => setCurrentImageIndex(prev => prev < selectedProduct.images.length - 1 ? prev + 1 : 0)}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {selectedProduct.images && selectedProduct.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-4">
                        {selectedProduct.images.map((img, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={img} 
                              alt={`${selectedProduct.name} ${index + 1}`}
                              className={`w-full h-24 object-cover cursor-pointer transition-all duration-300 rounded-lg shadow-lg ${
                                currentImageIndex === index ? 'ring-2 ring-amber-400' : ''
                              }`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-medium bg-gradient-to-r from-stone-800 to-amber-800 bg-clip-text text-transparent">₪{selectedProduct.price}</span>
                        {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                          <>
                            <span className="text-xl text-stone-400 line-through">₪{selectedProduct.originalPrice}</span>
                            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                              -{Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                      
                      <p className="text-lg text-stone-600 leading-relaxed mb-8">
                        {selectedProduct.description}
                      </p>
                    </div>
                    
                    {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                        <h4 className="text-sm tracking-[0.3em] mb-4 text-amber-700">צבעים זמינים</h4>
                        <div className="space-y-2">
                          {selectedProduct.colors.map((color, index) => (
                            <div key={index} className="text-lg text-stone-700 py-1">{color}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                        <h4 className="text-sm tracking-[0.3em] mb-4 text-amber-700">מידות זמינות</h4>
                        <div className="grid grid-cols-6 gap-3">
                          {selectedProduct.sizes.map((size, index) => (
                            <button 
                              key={index} 
                              className="border-2 border-stone-300 py-3 text-center hover:border-amber-500 hover:bg-gradient-to-r hover:from-stone-800 hover:to-amber-800 hover:text-white transition-all duration-300 rounded-lg shadow-lg transform hover:scale-105"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-4 pt-8">
                      <a 
                        href={`https://wa.me/${storeInfo.whatsapp.replace('+', '')}?text=היי, אני מעוניין ב${selectedProduct.name} במחיר ₪${selectedProduct.price}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 text-center text-sm tracking-wide hover:from-green-700 hover:to-green-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
                      >
                        הזמן בווטסאפ
                      </a>
                      <a 
                        href={`tel:${storeInfo.phone}`}
                        className="flex-1 bg-gradient-to-r from-stone-800 to-amber-800 text-white py-4 text-center text-sm tracking-wide hover:from-amber-800 hover:to-stone-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
                      >
                        התקשר
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;id
                      ? 'text-stone-800 font-medium'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  {category.name}
                  <div className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-amber-400 to-stone-600 transition-all duration-500 ${
                    selectedCategory === category.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                </button>
              ))}
            </nav>

            <a href={`https://wa.me/${storeInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 text-sm tracking-wide hover:from-green-600 hover:to-green-700 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-green-200/50 transform hover:scale-105 rounded-full flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> 
              דברו איתנו ב-Whatsapp
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className={`relative ${isAdminMode ? 'pt-44' : 'pt-32'} pb-20 min-h-screen flex items-center`}>
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`transition-all duration-1000 ${isTransitioning ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'}`}>
                <div className="text-xs tracking-[0.4em] text-amber-600 mb-6 font-light">COLLECTION 2025</div>
                <h1 className="text-6xl lg:text-8xl font-black leading-none mb-8 tracking-tight">
                  <span className="bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">{storeInfo.heroTitle.split(' ').slice(0, 1).join(' ')}</span><br />
                  <span className="text-stone-800">{storeInfo.heroTitle.split(' ').slice(1, 2).join(' ')}</span><br />
                  <span className="text-stone-400 text-5xl lg:text-6xl">{storeInfo.heroTitle.split(' ').slice(2).join(' ')}</span>
                </h1>
                <p className="text-lg text-stone-600 mb-12 leading-relaxed max-w-md">
                  {storeInfo.heroSubtitle}
                </p>
                <div className="flex items-center gap-6">
                  <button className="bg-gradient-to-r from-stone-900 to-amber-900 text-white px-8 py-4 text-sm tracking-wide hover:from-amber-900 hover:to-stone-900 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-amber-200/30 transform hover:scale-105">
                    גלה את הקולקציה
                  </button>
                  <button className="border-2 border-stone-300 px-8 py-4 text-sm tracking-wide hover:bg-gradient-to-r hover:from-stone-800 hover:to-amber-800 hover:text-white hover:border-transparent transition-all duration-500 shadow-lg hover:shadow-xl">
                    צור קשר
                  </button>
                </div>
              </div>
              
              <div className="relative">
                {featuredProducts[0] && featuredProducts[0].images && featuredProducts[0].images.length > 0 && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-stone-200/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-700"></div>
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform group-hover:scale-105">
                      <img 
                        src={featuredProducts[0].images[0]}
                        alt={featuredProducts[0].name}
                        className="w-full h-96 lg:h-[600px] object-cover transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                        <div className="text-xs tracking-[0.3em] mb-2">{featuredProducts[0].brand}</div>
                        <div className="text-2xl font-bold mb-2">{featuredProducts[0].name}</div>
                        <div className="text-lg">₪{featuredProducts[0].price}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

        <section className="py-12 border-t border-stone-200/50 bg-gradient-to-r from-white/70 via-amber-50/40 to-white/70 backdrop-blur-sm relative overflow-hidden">
          {/* Controls Section Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 -right-20 w-40 h-40 bg-gradient-to-bl from-amber-100/25 to-stone-200/20 rounded-full blur-2xl animate-pulse" style={{animationDuration: '8s'}}></div>
            <div className="absolute top-1/2 -left-20 w-32 h-32 bg-gradient-to-br from-stone-100/30 to-amber-100/25 rounded-full blur-2xl animate-pulse" style={{animationDuration: '12s', animationDelay: '3s'}}></div>
            <div className="absolute top-0 left-1/3 w-1 h-8 bg-gradient-to-b from-amber-300/30 to-transparent"></div>
            <div className="absolute bottom-0 right-1/4 w-px h-6 bg-gradient-to-t from-stone-400/25 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="text-sm tracking-wide text-stone-600">
                  {filteredProducts.length} פריטים
                </div>
                <div className="flex items-center gap-4 bg-white/50 rounded-full p-1 shadow-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-r from-stone-800 to-amber-800 text-white shadow-lg' : 'text-stone-400 hover:text-stone-700'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-r from-stone-800 to-amber-800 text-white shadow-lg' : 'text-stone-400 hover:text-stone-700'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <button onClick={exportDataForCode} className="flex items-center gap-2 text-sm tracking-wide text-stone-600 hover:text-amber-700 transition-colors duration-300 bg-white/50 px-4 py-2 rounded-full shadow-lg hover:shadow-xl">
                  <Download className="w-4 h-4" />
                  ייצא נתונים לקוד
                </button>
                <button onClick={exportHumanReadableList} className="flex items-center gap-2 text-sm tracking-wide text-stone-600 hover:text-amber-700 transition-colors duration-300 bg-white/50 px-4 py-2 rounded-full shadow-lg hover:shadow-xl">
                  <Download className="w-4 h-4" />
                  ייצא רשימה פשוטה
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-stone-50/30 via-amber-50/20 via-stone-50/40 to-amber-100/30 relative overflow-hidden">
          {/* Additional Background Graphics for Products Section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/6 -right-40 w-80 h-80 bg-gradient-to-bl from-amber-200/20 to-stone-300/15 rounded-full blur-3xl animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/4 -left-40 w-72 h-72 bg-gradient-to-tr from-stone-300/20 to-amber-200/25 rounded-full blur-3xl animate-pulse" style={{animationDuration: '14s', animationDelay: '5s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-amber-100/15 to-stone-200/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s', animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/6 right-1/3 w-56 h-56 bg-gradient-to-bl from-stone-200/25 to-amber-100/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '16s', animationDelay: '3s'}}></div>
            
            {/* Decorative Lines and Shapes */}
            <div className="absolute top-1/4 left-1/6 w-2 h-32 bg-gradient-to-b from-amber-300/25 to-transparent transform rotate-12 animate-pulse" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-1/3 right-1/5 w-1 h-24 bg-gradient-to-t from-stone-400/30 to-transparent transform -rotate-12 animate-pulse" style={{animationDuration: '11s', animationDelay: '2s'}}></div>
            <div className="absolute top-2/3 left-1/3 w-px h-16 bg-gradient-to-b from-amber-400/35 to-transparent animate-pulse" style={{animationDuration: '9s', animationDelay: '4s'}}></div>
            <div className="absolute top-1/6 right-2/3 w-px h-20 bg-gradient-to-b from-stone-300/40 to-transparent transform rotate-45 animate-pulse" style={{animationDuration: '13s', animationDelay: '1s'}}></div>
            
            {/* Small Dots */}
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-amber-300/30 rounded-full animate-pulse" style={{animationDuration: '7s', animationDelay: '3s'}}></div>
            <div className="absolute bottom-1/4 left-1/5 w-2 h-2 bg-stone-400/35 rounded-full animate-pulse" style={{animationDuration: '10s', animationDelay: '6s'}}></div>
            <div className="absolute top-1/2 right-1/6 w-1 h-1 bg-amber-400/40 rounded-full animate-pulse" style={{animationDuration: '15s', animationDelay: '2s'}}></div>
            
            {/* Floating Geometric Elements */}
            <div className="absolute top-1/5 left-3/4 w-8 h-8 bg-gradient-to-br from-amber-200/20 to-stone-300/15 transform rotate-45 animate-pulse" style={{animationDuration: '18s', animationDelay: '4s'}}></div>
            <div className="absolute bottom-1/5 left-1/6 w-6 h-6 bg-gradient-to-tr from-stone-200/25 to-amber-200/20 rounded-full animate-pulse" style={{animationDuration: '12s', animationDelay: '7s'}}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 transition-all duration-700 ${isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group cursor-pointer animate-fadeInUp relative"
                  onClick={() => handleProductSelect(product)}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  {isAdminMode && (
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProduct(product);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors duration-300"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(product.id);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="relative overflow-hidden mb-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-700 transform hover:scale-105">
                    {product.isNew && (
                      <div className="absolute top-4 right-4 z-10 text-xs tracking-[0.3em] bg-gradient-to-r from-amber-600 to-stone-800 text-white px-3 py-1 rounded-full shadow-lg">
                        חדש
                      </div>
                    )}
                    
                    {!isAdminMode && (
                      <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                        <Heart className="w-5 h-5 text-white hover:text-amber-400 cursor-pointer transition-colors duration-300 drop-shadow-lg" />
                      </div>
                    )}
                    
                    {product.images && product.images.length > 0 && (
                      <img 
                        src={hoveredProduct === product.id && product.images.length > 1 ? product.images[1] : product.images[0]}
                        alt={product.name}
                        className="w-full h-80 lg:h-96 object-cover transition-all duration-700"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    
                    {!isAdminMode && (
                      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                        <button className="bg-white/90 backdrop-blur-sm text-stone-800 px-6 py-2 text-sm tracking-wide hover:bg-white transition-all duration-300 rounded-full shadow-xl">
                          צפה בפרטים
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-xs tracking-[0.3em] text-amber-700 font-medium">{product.brand}</div>
                      <div className="flex items-center gap-2">
                        {product.originalPrice && product.originalPrice > product.price && (
                          <>
                            <span className="text-sm text-stone-400 line-through">₪{product.originalPrice}</span>
                            <div className="w-1 h-4 bg-stone-300"></div>
                          </>
                        )}
                        <span className="text-lg font-medium bg-gradient-to-r from-stone-800 to-amber-800 bg-clip-text text-transparent">₪{product.price}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-medium group-hover:text-amber-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    <div className="text-sm text-stone-600 leading-relaxed">
                      {product.description}
                    </div>
                    
                    <div className="flex items-center gap-3 pt-2">
                      {product.colors && product.colors.slice(0, 3).map((color, index) => (
                        <span key={index} className="text-xs tracking-wide text-stone-500">
                          {color}
                          {index < Math.min(product.colors.length - 1, 2) && <span className="mx-2 text-amber-400">•</span>}
                        </span>
                      ))}
                      {product.colors && product.colors.length > 3 && (
                        <span className="text-xs text-amber-600 font-medium">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </section>
      </main>

      <footer className="py-32 bg-gradient-to-br from-stone-100 to-amber-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="text-xs tracking-[0.4em] text-amber-600 mb-6">צור קשר</div>
          <h2 className="text-4xl lg:text-6xl font-black mb-12 tracking-tight bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">
            מוכנים להזמין?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm tracking-wide mb-2 text-stone-600">טלפון</div>
              <div className="text-lg font-medium">{storeInfo.phone}</div>
            </div>
            
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-stone-600 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm tracking-wide mb-2 text-stone-600">כתובת</div>
              <div className="text-lg font-medium">{storeInfo.address}</div>
            </div>
            
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm tracking-wide mb-2 text-stone-600">אינסטגרם</div>
              <div className="text-lg font-medium">@{storeInfo.instagram.split('@')[1] || 'store'}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href={`https://wa.me/${storeInfo.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-12 py-4 text-sm tracking-wide hover:from-green-700 hover:to-green-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              הזמן בווטסאפ
            </a>
            <a 
              href={`tel:${storeInfo.phone}`}
              className="bg-gradient-to-r from-stone-800 to-amber-800 text-white px-12 py-4 text-sm tracking-wide hover:from-amber-800 hover:to-stone-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              התקשר עכשיו
            </a>
          </div>

          <div className="flex justify-center gap-6 mt-16">
            <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-600 transition-all duration-300 transform hover:scale-110">
              <Instagram className="w-6 h-6" />
            </a>
            <a href={storeInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-600 transition-all duration-300 transform hover:scale-110">
              <Facebook className="w-6 h-6" />
            </a>
            <a href={storeInfo.tiktok} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-amber-600 transition-all duration-300 transform hover:scale-110">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
          
          <div className="mt-8 text-xs text-stone-400">© 2025 {storeInfo.name}. כל הזכויות שמורות.</div>
        </div>
      </footer>

      {showAdminLogin && !isAdminMode && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
          <div className="bg-gradient-to-br from-stone-50 via-amber-50/10 via-stone-50/50 to-amber-100/30 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-8">
              <Settings className="w-12 h-12 mx-auto mb-4 text-stone-600" />
              <h3 className="text-2xl font-black tracking-tight bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent mb-2">כניסת מנהל</h3>
              <p className="text-stone-600">הזן סיסמה לגישה לפאנל הניהול</p>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="סיסמה"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="text-xs text-stone-500 bg-white/50 backdrop-blur-sm p-3 rounded-lg">
                <strong>סיסמה לדוגמה:</strong> admin123
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 bg-gradient-to-r from-stone-800 to-amber-800 text-white py-3 rounded-xl font-medium hover:from-amber-800 hover:to-stone-800 transition-all duration-300"
                >
                  כניסה
                </button>
                <button
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword('');
                  }}
                  className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium hover:bg-stone-50 transition-colors duration-300"
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingProduct && <ProductEditModal product={editingProduct} onSave={saveProduct} onCancel={() => setEditingProduct(null)} categories={categories} />}
      {editingStore && <StoreEditModal storeInfo={storeInfo} onSave={saveStoreInfo} onCancel={() => setEditingStore(false)} />}
      
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl transition-all duration-500" onClick={() => setSelectedProduct(null)}>
          <div className="h-full flex items-center justify-center p-6">
            <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-stone-50 via-amber-50/10 via-stone-50/50 to-amber-100/30 rounded-3xl shadow-2xl transition-all duration-500 transform" onClick={e => e.stopPropagation()}>
              <div className="p-8">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <div className="text-xs tracking-[0.3em] text-amber-600 mb-2">{selectedProduct.brand}</div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">{selectedProduct.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-stone-400 hover:text-stone-700 transition-colors duration-300 p-2 hover:bg-stone-100 rounded-full"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                    <div className="relative mb-6 bg-stone-50 rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src={selectedProduct.images && selectedProduct.images[currentImageIndex]} 
                        alt={selectedProduct.name}
                        className="w-full h-96 lg:h-[600px] object-cover"
                      />
                      
                      {selectedProduct.images && selectedProduct.images.length > 1 && (
                        <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
                          <button 
                            className="pointer-events-auto bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                            onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedProduct.images.length - 1)}
                          >
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                          <button 
                            className="pointer-events-auto bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                            onClick={() => setCurrentImageIndex(prev => prev < selectedProduct.images.length - 1 ? prev + 1 : 0)}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {selectedProduct.images && selectedProduct.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-4">
                        {selectedProduct.images.map((img, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={img} 
                              alt={`${selectedProduct.name} ${index + 1}`}
                              className={`w-full h-24 object-cover cursor-pointer transition-all duration-300 rounded-lg shadow-lg ${
                                currentImageIndex === index ? 'ring-2 ring-amber-400' : ''
                              }`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-medium bg-gradient-to-r from-stone-800 to-amber-800 bg-clip-text text-transparent">₪{selectedProduct.price}</span>
                        {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                          <>
                            <span className="text-xl text-stone-400 line-through">₪{selectedProduct.originalPrice}</span>
                            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                              -{Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                      
                      <p className="text-lg text-stone-600 leading-relaxed mb-8">
                        {selectedProduct.description}
                      </p>
                    </div>
                    
                    {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                        <h4 className="text-sm tracking-[0.3em] mb-4 text-amber-700">צבעים זמינים</h4>
                        <div className="space-y-2">
                          {selectedProduct.colors.map((color, index) => (
                            <div key={index} className="text-lg text-stone-700 py-1">{color}</div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                        <h4 className="text-sm tracking-[0.3em] mb-4 text-amber-700">מידות זמינות</h4>
                        <div className="grid grid-cols-6 gap-3">
                          {selectedProduct.sizes.map((size, index) => (
                            <button 
                              key={index} 
                              className="border-2 border-stone-300 py-3 text-center hover:border-amber-500 hover:bg-gradient-to-r hover:from-stone-800 hover:to-amber-800 hover:text-white transition-all duration-300 rounded-lg shadow-lg transform hover:scale-105"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-4 pt-8">
                      <a 
                        href={`https://wa.me/${storeInfo.whatsapp.replace('+', '')}?text=היי, אני מעוניין ב${selectedProduct.name} במחיר ₪${selectedProduct.price}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 text-center text-sm tracking-wide hover:from-green-700 hover:to-green-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
                      >
                        הזמן בווטסאפ
                      </a>
                      <a 
                        href={`tel:${storeInfo.phone}`}
                        className="flex-1 bg-gradient-to-r from-stone-800 to-amber-800 text-white py-4 text-center text-sm tracking-wide hover:from-amber-800 hover:to-stone-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
                      >
                        התקשר
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
                  <div className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-amber-400 to-stone-600 transition-all duration-500 ${
                    selectedCategory === category.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              {!isAdminMode && (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="hidden md:flex items-center gap-2 text-sm tracking-wide hover:text-amber-700 transition-colors duration-300 group"
                >
                  <Settings className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  ניהול
                </button>
              )}
              <button className="hidden md:flex items-center gap-2 text-sm tracking-wide hover:text-amber-700 transition-colors duration-300 group">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                {storeInfo.phone}
              </button>
              <div className="w-1 h-4 bg-stone-300 hidden md:block"></div>
              <a
                href={`tel:${storeInfo.whatsapp}`}
                className="bg-gradient-to-r from-stone-800 to-amber-800 text-white px-6 py-2 text-sm tracking-wide hover:from-amber-800 hover:to-stone-800 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-amber-200/50 transform hover:scale-105"
              >
                התקשר עכשיו
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative ${isAdminMode ? 'pt-44' : 'pt-32'} pb-20 min-h-screen flex items-center`}>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${isTransitioning ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'}`}>
              <div className="text-xs tracking-[0.4em] text-amber-600 mb-6 font-light">COLLECTION 2025</div>
              <h1 className="text-6xl lg:text-8xl font-black leading-none mb-8 tracking-tight">
                <span className="bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">{storeInfo.heroTitle.split(' ').slice(0, 1).join(' ')}</span><br />
                <span className="text-stone-800">{storeInfo.heroTitle.split(' ').slice(1, 2).join(' ')}</span><br />
                <span className="text-stone-400 text-5xl lg:text-6xl">{storeInfo.heroTitle.split(' ').slice(2).join(' ')}</span>
              </h1>
              <p className="text-lg text-stone-600 mb-12 leading-relaxed max-w-md">
                {storeInfo.heroSubtitle}
              </p>
              <div className="flex items-center gap-6">
                <button className="bg-gradient-to-r from-stone-900 to-amber-900 text-white px-8 py-4 text-sm tracking-wide hover:from-amber-900 hover:to-stone-900 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-amber-200/30 transform hover:scale-105">
                  גלה את הקולקציה
                </button>
                <button className="border-2 border-stone-300 px-8 py-4 text-sm tracking-wide hover:bg-gradient-to-r hover:from-stone-800 hover:to-amber-800 hover:text-white hover:border-transparent transition-all duration-500 shadow-lg hover:shadow-xl">
                  צור קשר
                </button>
              </div>
            </div>
            
            <div className="relative">
              {featuredProducts[0] && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-stone-200/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-700"></div>
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform group-hover:scale-105">
                    <img 
                      src={featuredProducts[0].images[0]}
                      alt={featuredProducts[0].name}
                      className="w-full h-96 lg:h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                      <div className="text-xs tracking-[0.3em] mb-2">{featuredProducts[0].brand}</div>
                      <div className="text-2xl font-bold mb-2">{featuredProducts[0].name}</div>
                      <div className="text-lg">₪{featuredProducts[0].price}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-12 border-t border-stone-200/50 bg-gradient-to-r from-white/60 via-amber-50/30 to-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-sm tracking-wide text-stone-600">
                {filteredProducts.length} פריטים
              </div>
              <div className="flex items-center gap-4 bg-white/50 rounded-full p-1 shadow-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-r from-stone-800 to-amber-800 text-white shadow-lg' : 'text-stone-400 hover:text-stone-700'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-r from-stone-800 to-amber-800 text-white shadow-lg' : 'text-stone-400 hover:text-stone-700'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm tracking-wide text-stone-600 hover:text-amber-700 transition-colors duration-300 bg-white/50 px-4 py-2 rounded-full shadow-lg hover:shadow-xl">
                <Filter className="w-4 h-4" />
                מסנן
              </button>
              <button className="flex items-center gap-2 text-sm tracking-wide text-stone-600 hover:text-amber-700 transition-colors duration-300 bg-white/50 px-4 py-2 rounded-full shadow-lg hover:shadow-xl">
                <Search className="w-4 h-4" />
                חיפוש
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gradient-to-b from-transparent via-stone-50/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-12 transition-all duration-700 ${isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group cursor-pointer animate-fadeInUp relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductSelect(product)}
                style={{animationDelay: `${index * 150}ms`}}
              >
                {isAdminMode && (
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProduct(product);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors duration-300"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="relative overflow-hidden mb-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-700 transform hover:scale-105">
                  {product.isNew && (
                    <div className="absolute top-4 right-4 z-10 text-xs tracking-[0.3em] bg-gradient-to-r from-amber-600 to-stone-800 text-white px-3 py-1 rounded-full shadow-lg">
                      חדש
                    </div>
                  )}
                  
                  {!isAdminMode && (
                    <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                      <Heart className="w-5 h-5 text-white hover:text-amber-400 cursor-pointer transition-colors duration-300 drop-shadow-lg" />
                    </div>
                  )}
                  
                  <img 
                    src={hoveredProduct === product.id ? (product.images[1] || product.images[0]) : product.images[0]}
                    alt={product.name}
                    className="w-full h-80 lg:h-96 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  
                  {!isAdminMode && (
                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                      <button className="bg-white/90 backdrop-blur-sm text-stone-800 px-6 py-2 text-sm tracking-wide hover:bg-white transition-all duration-300 rounded-full shadow-xl">
                        צפה בפרטים
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-3 bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-xs tracking-[0.3em] text-amber-700 font-medium">{product.brand}</div>
                    <div className="flex items-center gap-2">
                      {product.originalPrice && product.originalPrice > product.price && (
                        <>
                          <span className="text-sm text-stone-400 line-through">₪{product.originalPrice}</span>
                          <div className="w-1 h-4 bg-stone-300"></div>
                        </>
                      )}
                      <span className="text-lg font-medium bg-gradient-to-r from-stone-800 to-amber-800 bg-clip-text text-transparent">₪{product.price}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium group-hover:text-amber-700 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <div className="text-sm text-stone-600 leading-relaxed">
                    {product.description}
                  </div>
                  
                  <div className="flex items-center gap-3 pt-2">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <span key={index} className="text-xs tracking-wide text-stone-500">
                        {color}
                        {index < Math.min(product.colors.length - 1, 2) && <span className="mx-2 text-amber-400">•</span>}
                      </span>
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-amber-600 font-medium">+{product.colors.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-gradient-to-br from-stone-100 to-amber-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="text-xs tracking-[0.4em] text-amber-600 mb-6">צור קשר</div>
          <h2 className="text-4xl lg:text-6xl font-black mb-12 tracking-tight bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">
            מוכנים להזמין?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm tracking-wide mb-2 text-stone-600">טלפון</div>
              <div className="text-lg font-medium">{storeInfo.phone}</div>
            </div>
            
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-stone-600 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm tracking-wide mb-2 text-stone-600">כתובת</div>
              <div className="text-lg font-medium">{storeInfo.address}</div>
            </div>
            
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-stone-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm tracking-wide mb-2 text-stone-600">אינסטגרם</div>
              <div className="text-lg font-medium">{storeInfo.instagram}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href={`https://wa.me/${storeInfo.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-12 py-4 text-sm tracking-wide hover:from-green-700 hover:to-green-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              הזמן בווטסאפ
            </a>
            <a 
              href={`tel:${storeInfo.whatsapp}`}
              className="bg-gradient-to-r from-stone-800 to-amber-800 text-white px-12 py-4 text-sm tracking-wide hover:from-amber-800 hover:to-stone-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              התקשר עכשיו
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-stone-200/50 bg-gradient-to-r from-stone-50/50 via-white/80 to-amber-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-xl font-black bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent">{storeInfo.name}</div>
              <div className="w-1 h-4 bg-gradient-to-b from-amber-400 to-stone-600 mx-4"></div>
              <div className="text-xs tracking-[0.3em] text-stone-400">{storeInfo.slogan}</div>
            </div>
            
            <div className="flex items-center gap-6">
              <Instagram className="w-5 h-5 text-stone-400 hover:text-amber-600 cursor-pointer transition-all duration-300 transform hover:scale-110" />
              <div className="text-xs text-stone-400">© 2025 {storeInfo.name}</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-8">
              <Settings className="w-12 h-12 mx-auto mb-4 text-stone-600" />
              <h3 className="text-2xl font-bold text-stone-800 mb-2">כניסת מנהל</h3>
              <p className="text-stone-600">הזן סיסמה לגישה לפאנל הניהול</p>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="סיסמה"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="text-xs text-stone-500 bg-stone-50 p-3 rounded-lg">
                <strong>סיסמה לדוגמה:</strong> admin123
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 bg-gradient-to-r from-stone-800 to-amber-800 text-white py-3 rounded-xl font-medium hover:from-amber-800 hover:to-stone-800 transition-all duration-300"
                >
                  כניסה
                </button>
                <button
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword('');
                  }}
                  className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium hover:bg-stone-50 transition-colors duration-300"
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Edit Modal */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onSave={saveProduct}
          onCancel={() => setEditingProduct(null)}
          categories={categories}
        />
      )}

      {/* Store Edit Modal */}
      {editingStore && (
        <StoreEditModal
          storeInfo={storeInfo}
          onSave={saveStoreInfo}
          onCancel={() => setEditingStore(false)}
        />
      )}

      {/* Product Modal */}
      {selectedProduct && !isAdminMode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl transition-all duration-500" onClick={() => setSelectedProduct(null)}>
          <div className="h-full flex items-center justify-center p-6">
            <div className={`max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} onClick={e => e.stopPropagation()}>
              <div className="p-8">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <div className="text-xs tracking-[0.3em] text-amber-600 mb-2">{selectedProduct.brand}</div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">{selectedProduct.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-stone-400 hover:text-stone-700 transition-colors duration-300 p-2 hover:bg-stone-100 rounded-full"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                    <div className="relative mb-6 bg-stone-50 rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src={selectedProduct.images[currentImageIndex]} 
                        alt={selectedProduct.name}
                        className="w-full h-96 lg:h-[600px] object-cover"
                      />
                      
                      {selectedProduct.images.length > 1 && (
                        <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
                          <button 
                            className="pointer-events-auto bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                            onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedProduct.images.length - 1)}
                          >
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                          <button 
                            className="pointer-events-auto bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                            onClick={() => setCurrentImageIndex(prev => prev < selectedProduct.images.length - 1 ? prev + 1 : 0)}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {selectedProduct.images.length > 1 && (
                      <div className="grid grid-cols-3 gap-4">
                        {selectedProduct.images.map((img, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={img} 
                              alt={`${selectedProduct.name} ${index + 1}`}
                              className={`w-full h-24 object-cover cursor-pointer transition-all duration-300 rounded-lg shadow-lg ${
                                currentImageIndex === index ? 'grayscale-0 ring-2 ring-amber-400' : 'grayscale hover:grayscale-0'
                              }`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-medium bg-gradient-to-r from-stone-800 to-amber-800 bg-clip-text text-transparent">₪{selectedProduct.price}</span>
                        {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                          <>
                            <span className="text-xl text-stone-400 line-through">₪{selectedProduct.originalPrice}</span>
                            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                              -{Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                      
                      <p className="text-lg text-stone-600 leading-relaxed mb-8">
                        {selectedProduct.description}
                      </p>
                    </div>
                    
                    <div className="bg-stone-50 rounded-xl p-6 shadow-lg">
                      <h4 className="text-sm tracking-[0.3em] mb-4 text-amber-700">צבעים זמינים</h4>
                      <div className="space-y-2">
                        {selectedProduct.colors.map((color, index) => (
                          <div key={index} className="text-lg text-stone-700 py-1">{color}</div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-stone-50 rounded-xl p-6 shadow-lg">
                      <h4 className="text-sm tracking-[0.3em] mb-4 text-amber-700">מידות זמינות</h4>
                      <div className="grid grid-cols-6 gap-3">
                        {selectedProduct.sizes.map((size, index) => (
                          <button 
                            key={index} 
                            className="border-2 border-stone-300 py-3 text-center hover:border-amber-500 hover:bg-gradient-to-r hover:from-stone-800 hover:to-amber-800 hover:text-white transition-all duration-300 rounded-lg shadow-lg transform hover:scale-105"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-8">
                      <a 
                        href={`https://wa.me/${storeInfo.whatsapp.replace('+', '')}?text=היי, אני מעוניין ב${selectedProduct.name} במחיר ₪${selectedProduct.price}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 text-center text-sm tracking-wide hover:from-green-700 hover:to-green-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
                      >
                        הזמן בווטסאפ
                      </a>
                      <a 
                        href={`tel:${storeInfo.whatsapp}`}
                        className="flex-1 bg-gradient-to-r from-stone-800 to-amber-800 text-white py-4 text-center text-sm tracking-wide hover:from-amber-800 hover:to-stone-800 transition-all duration-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105"
                      >
                        התקשר
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Product Edit Modal Component
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

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
    
    setFormData(prev => ({
      ...prev,
      images: previews.join('\n')
    }));
  };

  const removeImage = (index) => {
    const newFiles = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    
    setSelectedImages(newFiles);
    setImagePreview(newPreviews);
    setFormData(prev => ({
      ...prev,
      images: newPreviews.join('\n')
    }));
  };

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
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">מותג</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">מחיר</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">מחיר מקורי (אופציונלי)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">קטגוריה</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {categories.filter(c => c.id !== 'all').map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-stone-700">מוצר חדש</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-stone-700">מוצר מומלץ</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">תיאור</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">צבעים (מופרדים בפסיקים)</label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) => setFormData(prev => ({ ...prev, colors: e.target.value }))}
                placeholder="שחור, לבן, כחול"
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">מידות (מופרדות בפסיקים)</label>
              <input
                type="text"
                value={formData.sizes}
                onChange={(e) => setFormData(prev => ({ ...prev, sizes: e.target.value }))}
                placeholder="40, 41, 42, 43"
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 bg-stone-50">
            <label className="block text-sm font-medium text-stone-700 mb-4">תמונות המוצר</label>
            
            <div className="space-y-4">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-xs text-stone-500 mt-2">
                  💡 בחר תמונות מהמחשב שלך. התמונות יישמרו זמנית לתצוגה ויופיעו ברשימה לשליחה למפתח.
                </p>
              </div>

              {imagePreview.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-3">תצוגה מקדימה:</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {imagePreview.map((preview, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={preview} 
                          alt={`תצוגה מקדימה ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors duration-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          תמונה {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">או הזן קישורי תמונות (כל תמונה בשורה נפרדת)</label>
                <textarea
                  value={selectedImages.length > 0 ? '' : formData.images}
                  onChange={(e) => selectedImages.length === 0 && setFormData(prev => ({ ...prev, images: e.target.value }))}
                  rows={4}
                  placeholder="https://example.com/image1.jpg
https://example.com/image2.jpg"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  disabled={selectedImages.length > 0}
                />
                {selectedImages.length > 0 && (
                  <p className="text-xs text-amber-600 mt-1">
                    כרגע נבחרו תמונות מהמחשב. כדי להשתמש בקישורים, הסר את התמונות שנבחרו.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-stone-800 to-amber-800 text-white py-3 rounded-xl font-medium hover:from-amber-800 hover:to-stone-800 transition-all duration-300"
            >
              <Save className="w-4 h-4 inline-block ml-2" />
              שמור
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium hover:bg-stone-50 transition-colors duration-300"
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Store Edit Modal Component
const StoreEditModal = ({ storeInfo, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...storeInfo });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-stone-800">ערוך פרטי החנות</h3>
          <button onClick={onCancel} className="text-stone-400 hover:text-stone-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">שם החנות</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">סלוגן</label>
              <input
                type="text"
                value={formData.slogan}
                onChange={(e) => setFormData(prev => ({ ...prev, slogan: e.target.value }))}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">טלפון (לתצוגה)</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="050-123-4567"
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">וואטסאפ (עם קוד מדינה)</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                placeholder="+972501234567"
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">כתובת</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">אינסטגרם</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                placeholder="@username"
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">כותרת ראשית (באנגלית)</label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, heroTitle: e.target.value }))}
              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">תיאור החנות</label>
            <textarea
              value={formData.heroSubtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-stone-800 to-amber-800 text-white py-3 rounded-xl font-medium hover:from-amber-800 hover:to-stone-800 transition-all duration-300"
            >
              <Save className="w-4 h-4 inline-block ml-2" />
              שמור שינויים
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-stone-300 text-stone-600 py-3 rounded-xl font-medium hover:bg-stone-50 transition-colors duration-300"
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LuxuryShoeCatalogWithAdmin;