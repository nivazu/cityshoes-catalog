import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import ImageService from '../services/imageService';

const ImageUpload = ({ images = [], onImagesChange, productId }) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errors, setErrors] = useState([]);
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
    setUploadStatus(null);
    setErrors([]);
    
    try {
      // For new products without ID, we'll upload to a temporary folder
      const uploadProductId = productId || 'temp';
      
      // Always try to upload to Supabase
      console.log('Uploading files to Supabase Storage...');
      const result = await ImageService.uploadMultipleImages(files, uploadProductId);
      
      if (result.errors.length > 0) {
        setErrors(result.errors);
        setUploadStatus('partial');
      } else {
        setUploadStatus('success');
      }
      
      if (result.success.length > 0) {
        const newImages = [...images, ...result.urls];
        onImagesChange(newImages);
      }
    } catch (error) {
      console.error('Error handling files:', error);
      setErrors([{ file: 'Upload', error: error.message }]);
      setUploadStatus('error');
    } finally {
      setUploading(false);
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setUploadStatus(null);
        setErrors([]);
      }, 3000);
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

      {/* Upload Status */}
      {uploadStatus && (
        <div className={`p-4 rounded-lg border ${
          uploadStatus === 'success' ? 'bg-green-50 border-green-200' :
          uploadStatus === 'partial' ? 'bg-yellow-50 border-yellow-200' :
          'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            {uploadStatus === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            )}
            <span className={`font-medium ${
              uploadStatus === 'success' ? 'text-green-800' :
              uploadStatus === 'partial' ? 'text-yellow-800' :
              'text-red-800'
            }`}>
              {uploadStatus === 'success' ? 'התמונות הועלו בהצלחה!' :
               uploadStatus === 'partial' ? 'חלק מהתמונות הועלו בהצלחה' :
               'שגיאה בהעלאת התמונות'}
            </span>
          </div>
          
          {errors.length > 0 && (
            <div className="mt-2 space-y-1">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-red-600">
                  <strong>{error.file}:</strong> {error.error}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

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