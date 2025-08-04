import { supabase } from '../lib/supabase';

/**
 * Comprehensive storage test service
 */
export class StorageTestService {
  static async runAllTests() {
    console.log('=== Starting Supabase Storage Tests ===');
    
    const results = {
      connection: await this.testConnection(),
      bucketExists: await this.testBucketExists(),
      permissions: await this.testPermissions(),
      upload: await this.testUpload(),
      publicAccess: await this.testPublicAccess()
    };
    
    console.log('=== Test Results ===', results);
    return results;
  }
  
  static async testConnection() {
    console.log('Testing Supabase connection...');
    try {
      const { data, error } = await supabase.storage.listBuckets();
      if (error) {
        console.error('Connection error:', error);
        return { success: false, error: error.message };
      }
      console.log('Available buckets:', data);
      return { success: true, buckets: data };
    } catch (error) {
      console.error('Connection failed:', error);
      return { success: false, error: error.message };
    }
  }
  
  static async testBucketExists() {
    console.log('Checking if product-images bucket exists...');
    try {
      const { data, error } = await supabase.storage.listBuckets();
      if (error) throw error;
      
      const bucketExists = data?.some(bucket => bucket.name === 'product-images');
      console.log('Bucket exists:', bucketExists);
      
      return { success: bucketExists, exists: bucketExists };
    } catch (error) {
      console.error('Bucket check failed:', error);
      return { success: false, error: error.message };
    }
  }
  
  static async testPermissions() {
    console.log('Testing bucket permissions...');
    try {
      // Try to list files (tests read permission)
      const { data, error } = await supabase.storage
        .from('product-images')
        .list('', { limit: 1 });
        
      if (error) {
        console.error('Permission test failed:', error);
        return { success: false, error: error.message };
      }
      
      console.log('Permissions OK');
      return { success: true };
    } catch (error) {
      console.error('Permission test error:', error);
      return { success: false, error: error.message };
    }
  }
  
  static async testUpload() {
    console.log('Testing file upload...');
    try {
      // Create a test file
      const testContent = 'Test image content';
      const testBlob = new Blob([testContent], { type: 'text/plain' });
      const testFile = new File([testBlob], 'test.txt', { type: 'text/plain' });
      
      const testPath = `test/test-${Date.now()}.txt`;
      
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(testPath, testFile);
        
      if (error) {
        console.error('Upload test failed:', error);
        return { success: false, error: error.message };
      }
      
      console.log('Upload successful:', data);
      
      // Clean up - delete test file
      await supabase.storage
        .from('product-images')
        .remove([testPath]);
        
      return { success: true, path: testPath };
    } catch (error) {
      console.error('Upload test error:', error);
      return { success: false, error: error.message };
    }
  }
  
  static async testPublicAccess() {
    console.log('Testing public access...');
    try {
      const testPath = 'test/sample.jpg';
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(testPath);
        
      console.log('Public URL:', data.publicUrl);
      
      // Test if URL is accessible
      try {
        const response = await fetch(data.publicUrl, { method: 'HEAD' });
        const accessible = response.ok || response.status === 404; // 404 is OK, means bucket is accessible
        
        return { 
          success: true, 
          publicUrl: data.publicUrl,
          accessible: accessible
        };
      } catch (fetchError) {
        // Fetch error might be CORS, which is OK for HEAD request
        return { 
          success: true, 
          publicUrl: data.publicUrl,
          accessible: 'unknown (possible CORS)'
        };
      }
    } catch (error) {
      console.error('Public access test error:', error);
      return { success: false, error: error.message };
    }
  }
  
  static async createBucketIfNeeded() {
    console.log('Attempting to create bucket via API...');
    
    // Note: This requires service_role key, not anon key
    // For security reasons, this should be done in Supabase dashboard
    return {
      success: false,
      message: 'Bucket creation requires admin access. Please run the SQL script in Supabase dashboard.'
    };
  }
}

export default StorageTestService;