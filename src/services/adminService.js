// Admin service for secure operations
import { supabase } from '../lib/supabase';

// Store admin status in memory (not in localStorage for security)
let isAdminAuthenticated = false;

export const authenticateAdmin = (password) => {
  // Check password (in real app, this should be hashed)
  if (password === 'asi0505') {
    isAdminAuthenticated = true;
    // Store in session storage (cleared when browser closes)
    sessionStorage.setItem('adminAuth', 'true');
    return true;
  }
  return false;
};

export const isAdmin = () => {
  // Check both memory and session storage
  return isAdminAuthenticated || sessionStorage.getItem('adminAuth') === 'true';
};

export const logoutAdmin = () => {
  isAdminAuthenticated = false;
  sessionStorage.removeItem('adminAuth');
};

// Admin operations that validate admin status before executing
export const adminUpdateStore = async (storeData) => {
  if (!isAdmin()) {
    throw new Error('Unauthorized: Admin access required');
  }
  
  // Your existing update logic here
  return storeData;
};

export const adminUpdateProduct = async (productData) => {
  if (!isAdmin()) {
    throw new Error('Unauthorized: Admin access required');
  }
  
  // Your existing update logic here
  return productData;
};