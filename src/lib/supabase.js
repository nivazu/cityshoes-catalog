import { createClient } from '@supabase/supabase-js'

// Resolve env var from multiple possible keys (Vercel integration vs CRA)
const resolveEnv = (keys) => {
  for (const key of keys) {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key]
    }
  }
  return undefined
}

const rawUrl = resolveEnv([
  'REACT_APP_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_URL'
])

const rawAnonKey = resolveEnv([
  'REACT_APP_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_ANON_KEY'
])

// Sanitize common URL mistakes (spaces, encoded spaces, missing protocol)
const sanitizeUrl = (url) => {
  if (!url) return url
  let u = url.trim()
  // Remove spaces and encoded spaces
  u = u.replace(/\s+/g, '')
  u = u.replace(/%20/gi, '').replace(/%2520/gi, '')
  // Ensure protocol exists
  if (!/^https?:\/\//i.test(u)) {
    u = `https://${u}`
  }
  // Fix common typo where the dot is missing
  u = u.replace(/supabaseco$/i, 'supabase.co')
  return u
}

const supabaseUrl = sanitizeUrl(rawUrl)
const supabaseAnonKey = rawAnonKey?.trim()

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Expected one of REACT_APP_*, NEXT_PUBLIC_* or SUPABASE_*')
}

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