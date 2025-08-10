import React from 'react';
import { Edit3, Trash2, Eye, EyeOff, ArrowLeft, ArrowRight } from 'lucide-react';

const ProductCard = React.memo(({ 
  product, 
  viewMode, 
  isAdminMode, 
  productImageIndices,
  onProductClick,
  onEditClick,
  onDeleteClick,
  onToggleFeatured,
  onToggleNew,
  onImageChange 
}) => {
  const currentImageIndex = productImageIndices[product.id] || 0;
  const getBrandName = (product) => {
    if (typeof product.brand === 'string') return product.brand;
    return product.brand?.name || '';
  };

  return (
    <div 
      className={`group relative transform transition-optimized hover-optimized ${
        viewMode === 'grid' 
          ? 'hover:scale-105 hover:shadow-2xl' 
          : 'hover:shadow-xl'
      }`}
    >
      {viewMode === 'grid' ? (
        // Grid View
        <div 
          className="cursor-pointer bg-gradient-to-br from-stone-50 via-amber-50/10 to-stone-100/30 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col"
          onClick={() => onProductClick(product)}
        >
          {/* Admin controls */}
          {isAdminMode && (
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick(product);
                }}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-amber-50 transition-optimized"
              >
                <Edit3 className="w-4 h-4 text-stone-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(product);
                }}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-red-50 transition-optimized"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          )}

          {/* Badges */}
          {(product.is_new || product.featured) && (
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.is_new && (
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1 text-xs tracking-wide rounded-full shadow-lg">
                  חדש
                </span>
              )}
              {product.featured && (
                <span className="bg-gradient-to-r from-stone-800 to-stone-900 text-white px-3 py-1 text-xs tracking-wide rounded-full shadow-lg">
                  מומלץ
                </span>
              )}
            </div>
          )}

          {/* Image with navigation */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-stone-100 to-amber-50/30">
            <img 
              src={product.images && product.images[currentImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover transition-optimized group-hover:scale-110 contain-paint"
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            
            {product.images && product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageChange(product.id, 'prev');
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ArrowRight className="w-4 h-4 text-stone-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageChange(product.id, 'next');
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ArrowLeft className="w-4 h-4 text-stone-600" />
                </button>
              </>
            )}
          </div>

          {/* Product info */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="text-xs tracking-[0.3em] text-amber-700 font-medium mb-2">
              {getBrandName(product)}
            </div>
            <h3 className="text-xl font-medium mb-2 group-hover:text-amber-700 transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-stone-600 text-sm mb-4 line-clamp-2 flex-1">
              {product.description}
            </p>
            
            {/* Admin toggle buttons */}
            {isAdminMode && (
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFeatured(product);
                  }}
                  className={`flex-1 px-3 py-2 text-xs rounded-lg transition-optimized ${
                    product.featured 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {product.featured ? <Eye className="w-3 h-3 inline ml-1" /> : <EyeOff className="w-3 h-3 inline ml-1" />}
                  מומלץ
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleNew(product);
                  }}
                  className={`flex-1 px-3 py-2 text-xs rounded-lg transition-optimized ${
                    product.is_new 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  חדש
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        // List View
        <div 
          className="cursor-pointer flex gap-6 bg-gradient-to-r from-stone-50 via-amber-50/10 to-stone-100/30 rounded-2xl overflow-hidden shadow-lg p-6"
          onClick={() => onProductClick(product)}
        >
          {/* Image */}
          <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-stone-100 to-amber-50/30">
            <img 
              src={product.images && product.images[currentImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover transition-optimized group-hover:scale-110"
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            
            {/* Badges */}
            {(product.is_new || product.featured) && (
              <div className="absolute top-2 right-2 flex gap-2">
                {product.is_new && (
                  <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-2 py-1 text-xs tracking-wide rounded-full shadow-lg">
                    חדש
                  </span>
                )}
                {product.featured && (
                  <span className="bg-gradient-to-r from-stone-800 to-stone-900 text-white px-2 py-1 text-xs tracking-wide rounded-full shadow-lg">
                    מומלץ
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs tracking-[0.3em] text-amber-700 font-medium">
                {getBrandName(product)}
              </div>
            </div>
            
            <h3 className="text-xl font-medium group-hover:text-amber-700 transition-colors duration-300">
              {product.name}
            </h3>
            
            <p className="text-stone-600 text-sm line-clamp-2">
              {product.description}
            </p>

            {/* Display colors and sizes */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500">צבעים:</span>
                <div className="flex gap-1">
                  {product.colors.slice(0, 3).map((color, idx) => (
                    <span key={idx} className="text-xs bg-stone-100 px-2 py-1 rounded">
                      {color}
                    </span>
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-stone-400">+{product.colors.length - 3}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Admin controls */}
          {isAdminMode && (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick(product);
                }}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-amber-50 transition-optimized"
              >
                <Edit3 className="w-4 h-4 text-stone-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(product);
                }}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-red-50 transition-optimized"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;