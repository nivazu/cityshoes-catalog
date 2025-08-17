const { createClient } = require('@supabase/supabase-js');

// Direct Supabase configuration
const supabaseUrl = 'https://xdfsuynadmnvkyhsxbhi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZnN1eW5hZG1udmt5aHN4YmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Mjk4MzUsImV4cCI6MjA3MDQwNTgzNX0.-SP9CXpjuljrrrq5W8Vd9tF6n2nfeUq9zV-WlmTTKO0'

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a test image buffer
function createTestImage() {
  // Create a simple 1x1 pixel PNG image
  const pngHeader = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, // IHDR chunk size
    0x49, 0x48, 0x44, 0x52, // IHDR
    0x00, 0x00, 0x00, 0x01, // width = 1
    0x00, 0x00, 0x00, 0x01, // height = 1
    0x08, 0x02, // bit depth = 8, color type = 2 (RGB)
    0x00, 0x00, 0x00, // compression, filter, interlace
    0x90, 0x77, 0x53, 0xDE, // CRC
    0x00, 0x00, 0x00, 0x0C, // IDAT chunk size
    0x49, 0x44, 0x41, 0x54, // IDAT
    0x08, 0xD7, 0x63, 0xF8, 0xCF, 0xC0, 0x00, 0x00, 0x03, 0x01, 0x01, 0x00, // compressed data
    0x18, 0xDD, 0x8D, 0xB4, // CRC
    0x00, 0x00, 0x00, 0x00, // IEND chunk size
    0x49, 0x45, 0x4E, 0x44, // IEND
    0xAE, 0x42, 0x60, 0x82  // CRC
  ]);
  
  return pngHeader;
}

async function testImageUpload() {
  console.log('=== Testing Image Upload ===\n');
  
  try {
    const imageBuffer = createTestImage();
    const fileName = `test-image-${Date.now()}.png`;
    
    console.log('Uploading test image...');
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        cacheControl: '3600'
      });
      
    if (error) {
      console.log('Upload error:', error);
    } else {
      console.log('✅ Upload successful:', data.path);
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
      console.log('✅ Public URL:', urlData.publicUrl);
      
      // Clean up - delete the test file
      const { error: deleteError } = await supabase.storage
        .from('product-images')
        .remove([fileName]);
        
      if (deleteError) {
        console.log('❌ Cleanup error:', deleteError);
      } else {
        console.log('✅ Test file cleaned up');
      }
    }
  } catch (err) {
    console.log('❌ Exception:', err.message);
  }
}

testImageUpload();