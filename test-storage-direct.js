const { createClient } = require('@supabase/supabase-js');

// Direct Supabase configuration
const supabaseUrl = 'https://xdfsuynadmnvkyhsxbhi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZnN1eW5hZG1udmt5aHN4YmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Mjk4MzUsImV4cCI6MjA3MDQwNTgzNX0.-SP9CXpjuljrrrq5W8Vd9tF6n2nfeUq9zV-WlmTTKO0'

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testStorage() {
  console.log('=== Testing Supabase Storage ===\n');
  
  // Test 1: List buckets
  console.log('1. Testing listBuckets():');
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
      console.log('Error listing buckets:', error);
    } else {
      console.log('Buckets found:', buckets?.length || 0);
      if (buckets && buckets.length > 0) {
        buckets.forEach(bucket => {
          console.log(`- ${bucket.name} (${bucket.public ? 'public' : 'private'})`);
        });
      }
    }
  } catch (err) {
    console.log('Exception listing buckets:', err.message);
  }

  // Test 2: Direct bucket access
  console.log('\n2. Testing direct bucket access:');
  try {
    const bucket = supabase.storage.from('product-images');
    console.log('Bucket object created:', !!bucket);
    
    // Try to list files in the bucket
    const { data: files, error } = await bucket.list('', {
      limit: 5,
      offset: 0
    });
    
    if (error) {
      console.log('Error listing files:', error);
    } else {
      console.log('Files in bucket:', files?.length || 0);
    }
  } catch (err) {
    console.log('Exception accessing bucket:', err.message);
  }

  // Test 3: Try uploading a test file
  console.log('\n3. Testing file upload:');
  try {
    const testContent = 'This is a test file';
    const fileName = `test-${Date.now()}.txt`;
    
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, testContent, {
        contentType: 'text/plain',
        cacheControl: '3600'
      });
      
    if (error) {
      console.log('Upload error:', error);
    } else {
      console.log('Upload successful:', data.path);
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
      console.log('Public URL:', urlData.publicUrl);
      
      // Clean up - delete the test file
      await supabase.storage
        .from('product-images')
        .remove([fileName]);
      console.log('Test file cleaned up');
    }
  } catch (err) {
    console.log('Exception uploading:', err.message);
  }
}

testStorage();