-- COPY AND PASTE THIS INTO SUPABASE SQL EDITOR TO FIX RLS POLICIES

-- Drop existing policies on products table
DROP POLICY IF EXISTS "Allow public read access on products" ON products;
DROP POLICY IF EXISTS "Allow all operations on products" ON products;

-- Create new policies that allow full CRUD operations
CREATE POLICY "Enable read access for all users" ON products
FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON products
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON products
FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for all users" ON products
FOR DELETE USING (true);

-- Verify the changes
SELECT 'RLS Policies updated successfully!' as message;