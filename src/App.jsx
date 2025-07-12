import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Instagram, ChevronRight, Search, Filter, Grid, List, ArrowLeft, ArrowRight, Star, Heart, Plus, X, Settings, Save, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

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
    return JSON.parse(JSON.stringify(defaultProducts));
  });

  const [storeInfo, setStoreInfo] = useState(() => {
    return JSON.parse(JSON.stringify(defaultStoreInfo));
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
  
  // ... (All other functions like exportImagesList, etc. remain the same)
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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/10 via-stone-50/50 to-amber-100/30 text-stone-900 font-light overflow-hidden">
      {/* ... The rest of your JSX from the original component ... */}
      {/* All the JSX for Header, Hero Section, Controls, Products Grid, Modals, etc. goes here */}
    </div>
  );
};


// I'm keeping your modals as separate components as it's good practice
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
         {/* ... JSX for the modal ... */}
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
         {/* ... JSX for the modal ... */}
       </div>
    </div>
  );
};

export default App;
