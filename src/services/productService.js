import { supabase, TABLES } from '../lib/supabase'

// Get all products with optional filtering
export const getProducts = async (filters = {}) => {
  try {
    let query = supabase
      .from(TABLES.PRODUCTS)
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.category && filters.category !== 'all') {
      query = query.eq('category', filters.category)
    }
    
    if (filters.brand) {
      query = query.ilike('brand', `%${filters.brand}%`)
    }
    
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }
    
    if (filters.isNew !== undefined) {
      query = query.eq('is_new', filters.isNew)
    }
    
    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching products:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error in getProducts:', error)
    throw error
  }
}

// Get a single product by ID
export const getProduct = async (id) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching product:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in getProduct:', error)
    throw error
  }
}

// Create a new product
export const createProduct = async (productData) => {
  try {
    console.log('Creating product with data:', productData);
    
    // Ensure brand field exists
    const productToCreate = {
      name: productData.name,
      brand: productData.brand || '', // Ensure brand is at least empty string
      category: productData.category,
      description: productData.description,
      colors: productData.colors || [],
      sizes: productData.sizes || [],
      images: productData.images || [],
      is_new: productData.isNew || false,
      featured: productData.featured || false
    };
    
    console.log('Product data to insert:', productToCreate);
    
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .insert([productToCreate])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      // If brand column is missing, provide helpful error
      if (error.message.includes('brand')) {
        throw new Error('נראה שיש בעיה עם עמודת המותג. אנא הרץ את הסקריפט fix-brand-column.sql ב-Supabase.');
      }
      throw error
    }

    console.log('Product created successfully:', data);
    return data
  } catch (error) {
    console.error('Error in createProduct:', error)
    throw error
  }
}

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    console.log('Updating product:', id, productData);
    
    const updateData = {
      name: productData.name,
      brand: productData.brand || '', // Ensure brand is at least empty string
      category: productData.category,
      description: productData.description,
      colors: productData.colors || [],
      sizes: productData.sizes || [],
      images: productData.images || [],
      is_new: productData.isNew || false,
      featured: productData.featured || false,
      updated_at: new Date().toISOString()
    };
    
    console.log('Update data:', updateData);
    
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error);
      
      // If brand column is missing, provide helpful error
      if (error.message.includes('brand')) {
        throw new Error('נראה שיש בעיה עם עמודת המותג. אנא הרץ את הסקריפט fix-brand-column.sql ב-Supabase.');
      }
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in updateProduct:', error)
    throw error
  }
}

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase
      .from(TABLES.PRODUCTS)
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting product:', error)
      throw error
    }

    return true
  } catch (error) {
    console.error('Error in deleteProduct:', error)
    throw error
  }
}

// Upload image to Supabase Storage (if using Supabase Storage)
export const uploadImage = async (file, productId) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${productId}-${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (error) {
      console.error('Error uploading image:', error)
      throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error in uploadImage:', error)
    throw error
  }
}

// Get categories (if you want to store them in DB)
export const getCategories = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.CATEGORIES)
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching categories:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error in getCategories:', error)
    // Return default categories if table doesn't exist
    return [
      { id: 'lifestyle', name: 'לייפסטייל', name_en: 'lifestyle' },
      { id: 'basketball', name: 'כדורסל', name_en: 'basketball' },
      { id: 'football', name: 'כדורגל', name_en: 'football' },
      { id: 'running', name: 'ריצה', name_en: 'running' },
      { id: 'training', name: 'אימונים', name_en: 'training' },
      { id: 'casual', name: 'קז\'ואל', name_en: 'casual' }
    ]
  }
}