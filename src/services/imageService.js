import { supabase } from '../lib/supabase';

/**
 * Image service for handling uploads to Supabase Storage
 */
export class ImageService {
  static BUCKET_NAME = 'product-images';
  static MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  static ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  /**
   * Validate image file before upload
   */
  static validateImage(file) {
    const errors = [];

    if (!file) {
      errors.push('No file provided');
      return errors;
    }

    if (!this.ALLOWED_TYPES.includes(file.type)) {
      errors.push(`Unsupported file type: ${file.type}. Allowed types: ${this.ALLOWED_TYPES.join(', ')}`);
    }

    if (file.size > this.MAX_FILE_SIZE) {
      errors.push(`File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Max size: ${this.MAX_FILE_SIZE / 1024 / 1024}MB`);
    }

    return errors;
  }

  /**
   * Generate unique filename for uploaded image
   */
  static generateFileName(file, productId = null) {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    
    if (productId) {
      return `products/${productId}/${timestamp}-${randomId}.${fileExt}`;
    }
    
    return `products/temp/${timestamp}-${randomId}.${fileExt}`;
  }

  /**
   * Upload single image to Supabase Storage
   */
  static async uploadImage(file, productId = null) {
    try {
      // Validate file
      const validationErrors = this.validateImage(file);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      // Generate unique filename
      const filePath = this.generateFileName(file, productId);

      console.log(`Uploading image: ${file.name} -> ${filePath}`);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(filePath);

      console.log(`Image uploaded successfully: ${publicUrl}`);
      
      return {
        url: publicUrl,
        path: filePath,
        filename: data.path,
        size: file.size,
        type: file.type
      };

    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  /**
   * Upload multiple images
   */
  static async uploadMultipleImages(files, productId = null) {
    const results = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const result = await this.uploadImage(files[i], productId);
        results.push(result);
      } catch (error) {
        errors.push({
          file: files[i].name,
          error: error.message
        });
      }
    }

    return {
      success: results,
      errors: errors,
      urls: results.map(r => r.url)
    };
  }

  /**
   * Delete image from storage
   */
  static async deleteImage(imagePath) {
    try {
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([imagePath]);

      if (error) {
        throw new Error(`Delete failed: ${error.message}`);
      }

      return true;
    } catch (error) {
      console.error('Image deletion error:', error);
      throw error;
    }
  }

  /**
   * Get image info from URL
   */
  static getImageInfoFromUrl(url) {
    if (!url || !url.includes(this.BUCKET_NAME)) {
      return null;
    }

    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const bucketIndex = pathParts.findIndex(part => part === this.BUCKET_NAME);
      
      if (bucketIndex === -1) return null;
      
      const filePath = pathParts.slice(bucketIndex + 1).join('/');
      
      return {
        path: filePath,
        filename: pathParts[pathParts.length - 1],
        isSupabaseImage: true
      };
    } catch (error) {
      console.error('Error parsing image URL:', error);
      return null;
    }
  }

  /**
   * Create optimized image URL with transformations
   */
  static getOptimizedImageUrl(url, options = {}) {
    const { width, height, quality = 80, format = 'webp' } = options;
    
    if (!url || !url.includes(this.BUCKET_NAME)) {
      return url;
    }

    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams();

      if (width) params.set('width', width.toString());
      if (height) params.set('height', height.toString());
      if (quality) params.set('quality', quality.toString());
      if (format) params.set('format', format);

      if (params.toString()) {
        urlObj.search = params.toString();
      }

      return urlObj.toString();
    } catch (error) {
      console.warn('Failed to optimize image URL:', error);
      return url;
    }
  }

  /**
   * Test storage connection
   */
  static async testConnection() {
    try {
      const { data, error } = await supabase.storage.listBuckets();
      
      if (error) {
        throw new Error(`Storage connection failed: ${error.message}`);
      }

      const bucketExists = data?.some(bucket => bucket.name === this.BUCKET_NAME);
      
      return {
        connected: true,
        bucketExists,
        buckets: data?.map(b => b.name) || []
      };
    } catch (error) {
      console.error('Storage test failed:', error);
      return {
        connected: false,
        error: error.message
      };
    }
  }
}

// Legacy function for backward compatibility
export const uploadImage = ImageService.uploadImage.bind(ImageService);

export default ImageService;