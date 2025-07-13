import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Instagram, Search, Filter, Grid, List, ArrowLeft, ArrowRight, Heart, X, Settings, Save, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';

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
    setFormData(prev => ({ ...prev, images: previews.join('\n') }));
  };

  const removeImage = (index) => {
    const newFiles = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setSelectedImages(newFiles);
    setImagePreview(newPreviews);
    setFormData(prev => ({ ...prev, images: newPreviews.join('\n') }));
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
          <h3 className="text-2xl font-bold text-stone-800">{product.id ? 'ערוך מוצר' : 'הוסף מוצר חדש'}</h3>
          <button onClick={onCancel} className="text-stone-400 hover:text-stone-700"><X className="w-6 h-6" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields here */}
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
          {/* Form fields here */}
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingStore, setEditingStore] = useState(false);

  const [products, setProducts] = useState(() => {
    const imageUrls = ["https://i.ibb.co/8gP4Mzpz/Sprayground1.jpg","https://i.ibb.co/XfM5f8WD/Sprayground2.jpg","https://i.ibb.co/YFSpH0YR/Sprayground3.jpg","https://i.ibb.co/dwZHmrXV/Sprayground4.jpg","https://i.ibb.co/TxhxvFBh/Sprayground5.jpg","https://i.ibb.co/ccJjXn7L/Sprayground6.jpg","https://i.ibb.co/tp41b1kw/Sprayground7.jpg","https://i.ibb.co/BKTTM4xQ/Sprayground8.jpg","https://i.ibb.co/GQmw3Yj2/Sprayground9.jpg","https://i.ibb.co/cSfhx4dN/Sprayground10.jpg","https://i.ibb.co/RTFmjHCK/Sprayground11.jpg","https://i.ibb.co/b5jRb3Jx/Sprayground12.jpg","https://i.ibb.co/21SmbDGR/Sprayground13.jpg","https://i.ibb.co/mCnSK3d8/Sprayground14.jpg","https://i.ibb.co/6Cn48mV/Sprayground15.jpg","https://i.ibb.co/mVKsZq97/Sprayground16.jpg","https://i.ibb.co/cXX9v9X1/Sprayground17.jpg","https://i.ibb.co/PzmF0RVh/Sprayground18.jpg","https://i.ibb.co/fzSrgq0S/Sprayground19.jpg","https://i.ibb.co/NdstpSpQ/Sprayground20.jpg","https://i.ibb.co/BHRHtw0v/Sprayground21.jpg","https://i.ibb.co/nZ88VVy/Sprayground22.jpg","https://i.ibb.co/JjFJDTJm/Sprayground23.jpg","https://i.ibb.co/1JXh3hb0/Sprayground24.jpg","https://i.ibb.co/VZnC1bv/Sprayground25.jpg","https://i.ibb.co/tMzxNmLq/Sprayground26.jpg","https://i.ibb.co/m5TvzphD/Sprayground27.jpg","https://i.ibb.co/39D0sSYg/Sprayground28.jpg","https://i.ibb.co/XfQCbdg1/Sprayground29.jpg","https://i.ibb.co/1tcY4kbn/Sprayground30.jpg","https://i.ibb.co/4qGkSqL/Sprayground31.jpg","https://i.ibb.co/LdtBjBNY/Sprayground32.jpg","https://i.ibb.co/qFYRm4pS/Sprayground33.jpg","https://i.ibb.co/0pngGVN2/Sprayground34.jpg","https://i.ibb.co/67HVjYnS/Sprayground35.jpg","https://i.ibb.co/d4ypcVwL/Sprayground36.jpg","https://i.ibb.co/SDv3GrDX/Sprayground37.jpg","https://i.ibb.co/WvCrR2WC/Sprayground38.jpg","https://i.ibb.co/LXDKPPm8/Sprayground39.jpg","https://i.ibb.co/7Jwrr4VQ/Sprayground40.jpg","https://i.ibb.co/7dLKXGtx/Sprayground41.jpg","https://i.ibb.co/5Q5chFc/Sprayground42.jpg","https://i.ibb.co/YF2pgrg5/Sprayground43.jpg","https://i.ibb.co/RtNvGJ7/Sprayground44.jpg","https://i.ibb.co/R4YkNFzY/Sprayground45.jpg","https://i.ibb.co/kgVnqDQ7/Sprayground46.jpg","https://i.ibb.co/7NN1sg65/Sprayground47.jpg","https://i.ibb.co/1Gh6GdMG/Sprayground48.jpg","https://i.ibb.co/nMLq3X3B/Sprayground49.jpg","https://i.ibb.co/S7H9pFV0/Sprayground50.jpg","https://i.ibb.co/mgCPsmn/Sprayground51.jpg","https://i.ibb.co/S4LFGhDS/Sprayground52.jpg","https://i.ibb.co/N8X28yN/Sprayground53.jpg","https://i.ibb.co/rRcySq5z/Sprayground54.jpg","https://i.ibb.co/QFF1Q6KB/Sprayground55.jpg","https://i.ibb.co/BV1cKkDm/Sprayground56.jpg","https://i.ibb.co/4nn2JDrw/Sprayground57.jpg","https://i.ibb.co/8gR6mCCf/Sprayground58.jpg","https://i.ibb.co/gLdz4xQ8/Sprayground59.jpg","https://i.ibb.co/S7K1v11X/Sprayground60.jpg","https://i.ibb.co/dJMMpmBm/Sprayground61.jpg","https://i.ibb.co/5hFFyK9f/Sprayground62.jpg","https://i.ibb.co/M58G2Qmw/Sprayground63.jpg","https://i.ibb.co/zHsxJBQb/Sprayground64.jpg","https://i.ibb.co/nsN6B5LQ/Sprayground65.jpg","https://i.ibb.co/1SvRtTZ/Sprayground66.jpg","https://i.ibb.co/rGJBSfP3/Sprayground67.jpg","https://i.ibb.co/Z1XZWRPX/Sprayground68.jpg","https://i.ibb.co/0pgxB43x/Sprayground69.jpg","https://i.ibb.co/FLHPQrcw/Sprayground70.jpg","https://i.ibb.co/VYpkBmKS/Sprayground71.jpg","https://i.ibb.co/8L7RSgvG/Sprayground72.jpg","https://i.ibb.co/CpDt8rLC/Sprayground73.jpg","https://i.ibb.co/Lwxjqq4/Sprayground74.jpg","https://i.ibb.co/Kx9pLgv2/Sprayground75.jpg","https://i.ibb.co/WvRMq5sr/Sprayground76.jpg","https://i.ibb.co/xWtjd4z/Sprayground77.jpg","https://i.ibb.co/WW4SmHmp/Sprayground78.jpg","https://i.ibb.co/Y7BGVshR/Sprayground79.jpg","https://i.ibb.co/7NyzMHz2/Sprayground80.jpg","https://i.ibb.co/TBLLg4rT/Sprayground81.jpg","https://i.ibb.co/TqWYFrDN/Sprayground82.jpg","https://i.ibb.co/NgW7L3Lg/Sprayground83.jpg","https://i.ibb.co/Mk2tYC7g/Sprayground84.jpg","https://i.ibb.co/WpvBCM4z/Sprayground85.jpg","https://i.ibb.co/M3X7MZF/Sprayground86.jpg","https://i.ibb.co/xWRZ278/Sprayground87.jpg","https://i.ibb.co/Y636MHR/Sprayground88.jpg","https://i.ibb.co/Ldghn1h7/Sprayground89.jpg","https://i.ibb.co/DDRJ7F28/Sprayground90.jpg","https://i.ibb.co/ZpvPqWpm/Sprayground91.jpg","https://i.ibb.co/HL8fWng9/Sprayground92.jpg","https://i.ibb.co/VcXZ07q3/Sprayground93.jpg","https://i.ibb.co/HfzRgptD/Sprayground94.jpg","https://i.ibb.co/nNDtj4HP/Sprayground95.jpg","https://i.ibb.co/Xx3jh94t/Sprayground96.jpg","https://i.ibb.co/cc9YFtPX/Sprayground97.jpg","https://i.ibb.co/FfWTGFB/Sprayground98.jpg","https://i.ibb.co/b5q7x4Hb/Sprayground99.jpg","https://i.ibb.co/v68hbVTW/Sprayground100.jpg","https://i.ibb.co/rKBkrcgV/Sprayground101.jpg","https://i.ibb.co/JjP4ZYxx/Sprayground102.jpg","https://i.ibb.co/mFB7nRxZ/Sprayground103.jpg","https://i.ibb.co/Q3xYrjBx/Sprayground104.jpg","https://i.ibb.co/wNBgTmDb/Sprayground105.jpg","https://i.ibb.co/ZRDXy5F9/Sprayground106.jpg","https://i.ibb.co/67nDXMgh/Sprayground107.jpg","https://i.ibb.co/TVTS6h5/Sprayground108.jpg","https://i.ibb.co/9HJGj7DN/Sprayground109.jpg","https://i.ibb.co/LzYG6f2F/Sprayground110.jpg","https://i.ibb.co/dJJ61jV5/Sprayground111.jpg","https://i.ibb.co/Ngc0FNvb/Sprayground112.jpg","https://i.ibb.co/CpHxLWHQ/Sprayground113.jpg","https://i.ibb.co/0y84XbG5/Sprayground114.jpg","https://i.ibb.co/dJQtR9rY/Sprayground115.jpg","https://i.ibb.co/Cp41xS7W/Sprayground116.jpg","https://i.ibb.co/nq7sjYws/Sprayground117.jpg","https://i.ibb.co/p514jWz/Sprayground118.jpg","https://i.ibb.co/SwWTJpw5/Sprayground119.jpg","https://i.ibb.co/KJvMq2t/Sprayground120.jpg","https://i.ibb.co/Q3CZSGR6/Sprayground121.jpg","https://i.ibb.co/TxFPmk8S/Sprayground122.jpg","https://i.ibb.co/Jw0pZR1G/Sprayground123.jpg","https://i.ibb.co/LjP7dTw/Sprayground124.jpg","https://i.ibb.co/s9DPydVF/Sprayground125.jpg","https://i.ibb.co/ZzBzY9nV/Sprayground126.jpg","https://i.ibb.co/gMNfZGyd/Sprayground127.jpg","https://i.ibb.co/WCwr957/Sprayground128.jpg","https://i.ibb.co/Kp3HPsmN/Sprayground129.jpg","https://i.ibb.co/Kj3X09C5/Sprayground130.jpg","https://i.ibb.co/zVQQTRc3/Sprayground131.jpg","https://i.ibb.co/YF3XB4sc/Sprayground132.jpg","https://i.ibb.co/1fgWZggZ/Sprayground133.jpg","https://i.ibb.co/QvTF2c8t/Sprayground134.jpg","https://i.ibb.co/qXM2NHm/Sprayground135.jpg","https://i.ibb.co/MydHyzd5/Sprayground136.jpg","https://i.ibb.co/qLV4p8nk/Sprayground137.jpg","https://i.ibb.co/VYTvhXxS/Sprayground138.jpg","https://i.ibb.co/d05jNgwT/Sprayground139.jpg","https://i.ibb.co/nMtj4NsB/Sprayground140.jpg","https://i.ibb.co/JRKmxws0/Sprayground141.jpg","https://i.ibb.co/xqNkk684/Sprayground142.jpg","https://i.ibb.co/606j3SpK/Sprayground143.jpg","https://i.ibb.co/N2q8psZ2/Sprayground144.jpg","https://i.ibb.co/DD0mDtCw/Sprayground145.jpg","https://i.ibb.co/LDf2H8bW/Sprayground146.jpg","https://i.ibb.co/xqr5YM7W/Sprayground147.jpg","https://i.ibb.co/YFPjbLBK/Sprayground148.jpg","https://i.ibb.co/rR6wV5fr/Sprayground149.jpg","https://i.ibb.co/cc4Wz8Dj/Sprayground150.jpg","https://i.ibb.co/1fWHhghg/Sprayground151.jpg","https://i.ibb.co/TDvCxmsQ/Sprayground152.jpg","https://i.ibb.co/CXpWbCm/Sprayground153.jpg","https://i.ibb.co/Bb09Pbj/Sprayground154.jpg","https://i.ibb.co/TDPjBgFC/Sprayground155.jpg","https://i.ibb.co/xqk7hFrW/Sprayground156.jpg","https://i.ibb.co/ns6BQnTH/Sprayground157.jpg","https://i.ibb.co/ccNg0ScN/Sprayground158.jpg","https://i.ibb.co/Ng07N4L9/Sprayground159.jpg","https://i.ibb.co/w5kcWRM/Sprayground160.jpg","https://i.ibb.co/84cvKNfb/Sprayground161.jpg","https://i.ibb.co/F4rj1bwL/Sprayground162.jpg","https://i.ibb.co/chTrYZmc/Sprayground163.jpg","https://i.ibb.co/7JZKhYPB/Sprayground164.jpg","https://i.ibb.co/6RqHMptv/Sprayground165.jpg","https://i.ibb.co/KcQjDK6d/Sprayground166.jpg","https://i.ibb.co/JFK4DVqV/Sprayground167.jpg","https://i.ibb.co/kgTRwxTf/Sprayground168.jpg","https://i.ibb.co/5WZzbhFS/Sprayground169.jpg","https://i.ibb.co/vCNbPWMV/Sprayground170.jpg","https://i.ibb.co/VcCh5RJm/Sprayground171.jpg","https://i.ibb.co/3mspnsz2/Sprayground172.jpg","https://i.ibb.co/dsdbGzxd/Sprayground173.jpg","https://i.ibb.co/4nzF2wg3/Sprayground174.jpg","https://i.ibb.co/NG9XgNR/Sprayground175.jpg","https://i.ibb.co/qYJTBdX4/Sprayground176.jpg","https://i.ibb.co/VYxRFY38/Sprayground177.jpg","https://i.ibb.co/WpMyKYmK/Sprayground178.jpg","https://i.ibb.co/6cHZfnzd/Sprayground179.jpg","https://i.ibb.co/79kc08M/Sprayground180.jpg","https://i.ibb.co/6cG6C3LH/Sprayground181.jpg","https://i.ibb.co/jZv1g9kK/Sprayground182.jpg","https://i.ibb.co/q3zz2pBp/Sprayground183.jpg","https://i.ibb.co/jv4xYbQ1/Sprayground184.jpg"];
        const extractNumber = (url) => {
            const match = url.match(/Sprayground(\d+)\.jpg/);
            return match ? parseInt(match[1], 10) : Infinity;
        };
        const sortedUrls = imageUrls.sort((a, b) => extractNumber(a) - extractNumber(b));
        const newProducts = [];
        for (let i = 0; i < sortedUrls.length; i += 3) {
            const chunk = sortedUrls.slice(i, i + 3);
            newProducts.push({
                id: i / 3 + 1, name: `תיק ספריגראונד ${i / 3 + 1}`, brand: "SPRAYGROUND", price: 349, category: "lifestyle",
                images: chunk, description: "תיק גב בעיצוב ייחודי ואיכותי.", colors: ["MULTI"], sizes: ["ONE SIZE"],
                isNew: true, featured: i < 9
            });
        }
        return newProducts;
    });

    const [storeInfo, setStoreInfo] = useState({
        name: "נעלי העיר", slogan: "כל המיוחדים אצלנו", phone: "050-123-4567", whatsapp: "+972501234567",
        address: "רחוב הרצל 123, תל אביב", instagram: "@shoes_hair", heroTitle: "PREMIUM LIFESTYLE GEAR",
        heroSubtitle: "קולקציה אקסקלוסיבית של תיקים ואביזרים מהמותגים המובילים בעולם."
    });

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        setTimeout(() => setIsLoading(false), 1500);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = [ { id: 'all', name: 'כל המוצרים' }, { id: 'lifestyle', name: 'לייפסטייל' }];
    const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);
    const featuredProducts = products.filter(p => p.featured);

    if (isLoading) { return <div className="min-h-screen bg-stone-50 flex items-center justify-center"><div className="text-stone-600">טוען...</div></div>; }

    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/10 to-amber-100/30 text-stone-900 font-light overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-amber-100/30 to-stone-200/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-gradient-to-tr from-stone-200/20 to-amber-100/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s', animationDelay: '4s'}}></div>
        </div>
  
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-2xl border-b border-stone-200/50 shadow-lg' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-2xl font-black tracking-tight bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent">{storeInfo.name}</div>
                <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-stone-600 mx-4 shadow-sm"></div>
                <div className="text-xs tracking-[0.3em] text-stone-500 font-light">{storeInfo.slogan}</div>
              </div>
              <div className="flex items-center gap-6">
                <a href={`tel:${storeInfo.phone}`} className="hidden md:flex items-center gap-2 text-sm tracking-wide hover:text-amber-700 transition-colors duration-300 group">
                  <Phone className="w-4 h-4" /> {storeInfo.phone}
                </a>
                <a href={`https://wa.me/${storeInfo.whatsapp}`} className="bg-gradient-to-r from-stone-800 to-amber-800 text-white px-6 py-2 text-sm tracking-wide hover:from-amber-800 hover:to-stone-800 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105">
                  צור קשר
                </a>
              </div>
            </div>
          </div>
        </header>
  
        <section className={`relative pt-32 pb-20 min-h-screen flex items-center`}>
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-fadeInUp">
                <div className="text-xs tracking-[0.4em] text-amber-600 mb-6 font-light">SUMMER COLLECTION 2025</div>
                <h1 className="text-6xl lg:text-8xl font-black leading-none mb-8 tracking-tight">
                  <span className="bg-gradient-to-r from-stone-900 to-amber-800 bg-clip-text text-transparent">{storeInfo.heroTitle.split(' ').slice(0, 2).join(' ')}</span><br />
                  <span className="text-stone-500 text-5xl lg:text-6xl">{storeInfo.heroTitle.split(' ').slice(2).join(' ')}</span>
                </h1>
                <p className="text-lg text-stone-600 mb-12 leading-relaxed max-w-md">{storeInfo.heroSubtitle}</p>
              </div>
              <div className="relative animate-fadeInUp" style={{animationDelay: '300ms'}}>
                {featuredProducts[0] && featuredProducts[0].images && featuredProducts[0].images.length > 0 && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-stone-200/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-700"></div>
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform group-hover:scale-105">
                      <img src={featuredProducts[0].images[0]} alt={featuredProducts[0].name} className="w-full h-96 lg:h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-stone-800 to-amber-800 text-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-right">
              <h2 className="text-sm tracking-[0.3em] text-amber-400 mb-4">מבצעי הקיץ</h2>
              <p className="text-4xl font-black leading-tight mb-6">קולקציה חדשה <br />עכשיו בחנות!</p>
              <p className="text-amber-100/80 mb-8 max-w-md mx-auto md:mx-0">גלה את הדגמים החמים ביותר של העונה והתחדש בזוג שישדרג לך את הלוק.</p>
              <button className="bg-white text-stone-800 font-bold px-8 py-3 hover:bg-amber-100 transition-colors duration-300">לכל הדגמים</button>
            </div>
            <div className="h-80 bg-cover bg-center" style={{backgroundImage: `url('https://i.ibb.co/LdtBjBNY/Sprayground32.jpg')`}}></div>
          </div>
        </section>
  
        <section className="py-12 border-t border-stone-200/50 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="text-sm tracking-wide text-stone-600">{products.length} פריטים</div>
          </div>
        </section>
  
        <section className="py-20 bg-gradient-to-b from-transparent via-stone-50/20 to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12`}>
              {products.map((product, index) => (
                <div key={product.id} className="group cursor-pointer animate-fadeInUp relative" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="relative overflow-hidden mb-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-700 transform hover:scale-105">
                    {product.isNew && (
                      <div className="absolute top-4 right-4 z-10 text-xs tracking-[0.3em] bg-gradient-to-r from-amber-600 to-stone-800 text-white px-3 py-1 rounded-full shadow-lg">חדש</div>
                    )}
                    {product.images && product.images.length > 0 && (
                      <img src={hoveredProduct === product.id ? (product.images[1] || product.images[0]) : product.images[0]} alt={product.name} className="w-full h-80 lg:h-96 object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    )}
                  </div>
                  <div className="space-y-3 bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-xs tracking-[0.3em] text-amber-700 font-medium">{product.brand}</div>
                      <span className="text-lg font-medium bg-gradient-to-r from-stone-800 to-amber-800 bg-clip-text text-transparent">₪{product.price}</span>
                    </div>
                    <h3 className="text-xl font-medium group-hover:text-amber-700 transition-colors duration-300">{product.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        <footer className="py-16 border-t border-stone-200/50 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-xl font-black bg-gradient-to-r from-stone-800 to-amber-700 bg-clip-text text-transparent">{storeInfo.name}</div>
            </div>
            <div className="text-xs text-stone-400">© 2025 {storeInfo.name}</div>
          </div>
        </footer>
      </div>
    );
};
  
export default App;
