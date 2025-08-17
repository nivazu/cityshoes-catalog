const { createClient } = require('@supabase/supabase-js');

// Test with different auth configurations
const supabaseUrl = 'https://xdfsuynadmnvkyhsxbhi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZnN1eW5hZG1udmt5aHN4YmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Mjk4MzUsImV4cCI6MjA3MDQwNTgzNX0.-SP9CXpjuljrrrq5W8Vd9tF6n2nfeUq9zV-WlmTTKO0';

console.log('=== Comprehensive Storage Test ===\n');

// Test 1: Client with persistSession: true
console.log('1. Testing with persistSession: true');
const supabase1 = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true }
});

// Test 2: Client with persistSession: false (like your current setup)
console.log('2. Testing with persistSession: false');
const supabase2 = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false }
});

// Function to create a test image
function createTestImage() {
  const canvas = require('canvas');
  const cnv = canvas.createCanvas(100, 100);
  const ctx = cnv.getContext('2d');
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(0, 0, 100, 100);
  return cnv.toBuffer('image/png');
}

// Simple PNG buffer (1x1 pixel)
const simplePNG = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
  0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
  0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41,
  0x54, 0x08, 0xD7, 0x63, 0xF8, 0xCF, 0xC0, 0x00,
  0x00, 0x03, 0x01, 0x01, 0x00, 0x18, 0xDD, 0x8D,
  0xB4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E,
  0x44, 0xAE, 0x42, 0x60, 0x82
]);

async function testUpload(supabase, testName) {
  console.log(`\n--- ${testName} ---`);
  
  try {
    // Test bucket access
    const { data: listData, error: listError } = await supabase.storage
      .from('product-images')
      .list('', { limit: 1 });
    
    if (listError) {
      console.log('❌ Bucket access error:', listError.message);
    } else {
      console.log('✅ Bucket accessible');
    }
    
    // Test upload
    const fileName = `test-${Date.now()}.png`;
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, simplePNG, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.log('❌ Upload failed:', error.message, `(${error.statusCode})`);
      
      // Try different upload methods
      console.log('\nTrying alternative upload methods:');
      
      // Method 1: Without options
      const { error: error1 } = await supabase.storage
        .from('product-images')
        .upload(`test-simple-${Date.now()}.png`, simplePNG);
      console.log('Without options:', error1 ? `❌ ${error1.message}` : '✅ Success');
      
      // Method 2: With Blob
      const blob = new Blob([simplePNG], { type: 'image/png' });
      const { error: error2 } = await supabase.storage
        .from('product-images')
        .upload(`test-blob-${Date.now()}.png`, blob);
      console.log('With Blob:', error2 ? `❌ ${error2.message}` : '✅ Success');
      
    } else {
      console.log('✅ Upload successful:', data.path);
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
      console.log('✅ Public URL:', publicUrl);
      
      // Clean up
      await supabase.storage
        .from('product-images')
        .remove([fileName]);
      console.log('✅ Cleanup successful');
    }
  } catch (err) {
    console.log('❌ Exception:', err.message);
  }
}

async function runTests() {
  await testUpload(supabase1, 'Client with persistSession: true');
  await testUpload(supabase2, 'Client with persistSession: false');
  
  console.log('\n=== Test Complete ===');
}

runTests();