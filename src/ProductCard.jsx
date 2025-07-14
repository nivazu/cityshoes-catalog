import React from 'react';
import { Edit3, Trash2, Share2 } from 'lucide-react';

const ProductCard = ({ product, isAdminMode, setEditingProduct, deleteProduct, handleProductSelect, setHoveredProduct, hoveredProduct, handleShare }) => {
  return (
    <div className="group animate-fadeInUp relative">
      <div className="cursor-pointer" onClick={() => handleProductSelect(product)}>
        <div
          className="relative overflow-hidden mb-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          {product.isNew && (
            <div className="absolute top-4 right-4 z-10 text-xs bg-stone-800 text-white px-3 py-1 rounded-full">
              חדש
            </div>
          )}
          {product.images && product.images.length > 0 && (
            <img
              src={hoveredProduct === product.id && product.images.length > 1 ? product.images[1] : product.images[0]}
              alt={product.name}
              className="w-full h-80 lg:h-96 object-cover"
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-center flex-grow">
            <div className="text-xs tracking-widest text-amber-700 font-medium">{product.brand}</div>
            <h3 className="text-xl font-medium mt-2">{product.name}</h3>
            <div className="text-lg font-semibold mt-1">₪{product.price}</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare(product);
            }}
            title="שתף"
            className="text-stone-400 hover:text-stone-800 self-start p-2"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      {isAdminMode && (
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingProduct(product);
            }}
            className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteProduct(product.id);
            }}
            className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
