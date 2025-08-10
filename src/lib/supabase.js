import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // Since this is a catalog app, we might not need auth sessions
  }
})

// Database table names
export const TABLES = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BRANDS: 'brands',
  STORE_INFO: 'store_info'
}

// Storage bucket name
export const STORAGE_BUCKET = 'product-images'

// Helper function to get public URL for uploaded images
export const getPublicImageUrl = (path) => {
  if (!path) return null
  
  // If it's already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path)
    
  return data?.publicUrl
}

// Upload image to Supabase Storage
export const uploadImage = async (file, folder = 'products') => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      console.error('Error uploading image:', error)
      throw error
    }
    
    return data.path
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

// Delete image from Supabase Storage
export const deleteImage = async (path) => {
  try {
    // Don't try to delete external URLs
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return true
    }
    
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path])
    
    if (error) {
      console.error('Error deleting image:', error)
      throw error
    }
    
    return true
  } catch (error) {
    console.error('Delete error:', error)
    throw error
  }
}

// Upload multiple images
export const uploadImages = async (files, folder = 'products') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder))
    const paths = await Promise.all(uploadPromises)
    return paths
  } catch (error) {
    console.error('Error uploading multiple images:', error)
    throw error
  }
}