import { createClient } from '@supabase/supabase-js'

// Resolve env var from multiple possible keys (Vercel integration vs CRA)
const resolveEnv = (keys) => {
  for (const key of keys) {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key]
    }
  }
  // Try to get from window for runtime env vars in Vercel
  if (typeof window !== 'undefined') {
    for (const key of keys) {
      // Check if it's injected as a global variable
      if (window[key]) {
        return window[key]
      }
      // Check process.env in browser context
      if (window.process?.env?.[key]) {
        return window.process.env[key]
      }
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
  console.error('Available env vars:', Object.keys(process.env || {}).filter(key => 
    key.includes('SUPABASE') || key.includes('REACT_APP') || key.includes('NEXT_PUBLIC')
  ))
  console.error('All env vars:', Object.keys(process.env || {}))
  console.error('Raw URL:', rawUrl)
  console.error('Raw Anon Key:', rawAnonKey)
  
  // For local development, provide hardcoded values as fallback
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.warn('Using hardcoded values for local development')
    const FALLBACK_URL = 'https://oywfddfwttncjayglvoy.supabase.co'
    const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95d2ZkZGZ3dHRuY2pheWdsdm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzQ1NjEsImV4cCI6MjA2OTY1MDU2MX0.TH1dkwedk_5AMCcmNlKkCfq_eKImnlK0CMtnOVgbUfc'
    
    if (!supabaseUrl) {
      Object.assign(window, { REACT_APP_SUPABASE_URL: FALLBACK_URL })
    }
    if (!supabaseAnonKey) {
      Object.assign(window, { REACT_APP_SUPABASE_ANON_KEY: FALLBACK_KEY })
    }
  }
}

// Try again with fallback values for local dev
const finalUrl = supabaseUrl || (typeof window !== 'undefined' && window.REACT_APP_SUPABASE_URL)
const finalKey = supabaseAnonKey || (typeof window !== 'undefined' && window.REACT_APP_SUPABASE_ANON_KEY)

export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    persistSession: false // Since this is a catalog app, we might not need auth sessions
  }
})

// Database table names
export const TABLES = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories'
}