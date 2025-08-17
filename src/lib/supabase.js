import { createClient } from '@supabase/supabase-js'

// Supabase project configuration
const supabaseUrl = 'https://xdfsuynadmnvkyhsxbhi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZnN1eW5hZG1udmt5aHN4YmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Mjk4MzUsImV4cCI6MjA3MDQwNTgzNX0.-SP9CXpjuljrrrq5W8Vd9tF6n2nfeUq9zV-WlmTTKO0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // Since this is a catalog app, we might not need auth sessions
  }
})

// Database table names
export const TABLES = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories'
}