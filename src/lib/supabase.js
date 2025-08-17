import { createClient } from '@supabase/supabase-js'

// Since Vercel-Supabase integration should handle env vars automatically
// but it's not working, we'll use the project values directly
const supabaseUrl = 'https://oywfddfwttncjayglvoy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95d2ZkZGZ3dHRuY2pheWdsdm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzQ1NjEsImV4cCI6MjA2OTY1MDU2MX0.TH1dkwedk_5AMCcmNlKkCfq_eKImnlK0CMtnOVgbUfc'

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