-- הסרת המדיניות הקיימת (הלא מאובטחת)
DROP POLICY IF EXISTS "Allow all operations on products" ON products;
DROP POLICY IF EXISTS "Allow all operations on categories" ON categories;
DROP POLICY IF EXISTS "Allow all operations on stores" ON stores;

-- יצירת מדיניות מאובטחת יותר
-- כולם יכולים לקרוא (SELECT)
CREATE POLICY "Public can read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public can read stores" ON stores
  FOR SELECT USING (true);

-- רק אדמין עם סיסמה יכול לערוך
-- נשתמש בפונקציה שבודקת את ה-JWT token
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  -- בדיקה אם המשתמש מחובר ויש לו תפקיד admin
  RETURN auth.uid() IS NOT NULL AND 
         (auth.jwt() ->> 'role' = 'admin' OR 
          auth.jwt() ->> 'email' = 'admin@naaleihair.com');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- מדיניות לעדכון רק למנהלים
CREATE POLICY "Only admins can insert products" ON products
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Only admins can update products" ON products
  FOR UPDATE USING (is_admin());

CREATE POLICY "Only admins can delete products" ON products
  FOR DELETE USING (is_admin());

-- אותו דבר לקטגוריות
CREATE POLICY "Only admins can insert categories" ON categories
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Only admins can update categories" ON categories
  FOR UPDATE USING (is_admin());

CREATE POLICY "Only admins can delete categories" ON categories
  FOR DELETE USING (is_admin());

-- אותו דבר לחנות
CREATE POLICY "Only admins can insert stores" ON stores
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Only admins can update stores" ON stores
  FOR UPDATE USING (is_admin());

CREATE POLICY "Only admins can delete stores" ON stores
  FOR DELETE USING (is_admin());

-- הודעת אישור
SELECT 'Security policies updated successfully!' as message;