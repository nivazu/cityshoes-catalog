import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react';
import { uploadImage } from '../services/productService';

const ImageUpload = ({ images = [], onImagesChange, productId }) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    await handleFiles(files);
  };

  const handleFiles = async (files) => {
    if (!files.length) return;

    setUploading(true);
    const newImages = [...images];

    try {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          if (productId) {
            // If we have a product ID, try to upload to Supabase
            try {
              const imageUrl = await uploadImage(file, productId);
              newImages.push(imageUrl);
            } catch (error) {
              console.warn('Supabase upload failed, using local preview:', error);
              // Fallback to local file URL for preview
              const localUrl = URL.createObjectURL(file);
              newImages.push(localUrl);
            }
          } else {
            // For new products without ID, use local preview
            const localUrl = URL.createObjectURL(file);
            newImages.push(localUrl);
          }
        }
      }
      
      onImagesChange(newImages);
    } catch (error) {
      console.error('Error handling files:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const addImageUrl = () => {
    const url = prompt('הכנס קישור לתמונה:');
    if (url && url.trim()) {
      onImagesChange([...images, url.trim()]);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-stone-700 mb-2">
        תמונות המוצר
      </label>
      
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-300 ${
          dragActive 
            ? 'border-amber-400 bg-amber-50' 
            : 'border-stone-300 hover:border-amber-400 hover:bg-amber-50/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            {uploading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            ) : (
              <Upload className="w-12 h-12 text-stone-400" />
            )}
          </div>
          
          <div>
            <p className="text-lg font-medium text-stone-600">
              {uploading ? 'מעלה תמונות...' : 'גרור תמונות לכאן או לחץ לבחירה'}
            </p>
            <p className="text-sm text-stone-400 mt-1">
              PNG, JPG, GIF עד 10MB
            </p>
          </div>
          
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-300"
            >
              בחר קבצים
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addImageUrl();
              }}
              className="px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors duration-300"
            >
              הוסף קישור
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-stone-100">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWMTQwSDYwVjYwWiIgZmlsbD0iI0Q1RDlERCIvPgo8L3N2Zz4K';
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;