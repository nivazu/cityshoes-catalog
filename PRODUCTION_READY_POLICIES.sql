-- מדיניות מאוזנת - קריאה חופשית, כתיבה מוגבלת

-- הסרת מדיניות ישנה
DROP POLICY IF EXISTS "Allow all operations on products" ON products;
DROP POLICY IF EXISTS "Allow all operations on categories" ON categories;
DROP POLICY IF EXISTS "Allow all operations on stores" ON stores;

-- מדיניות קריאה - כולם יכולים
CREATE POLICY "Public read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public read stores" ON stores
  FOR SELECT USING (true);

-- מדיניות כתיבה - דרך האפליקציה בלבד
-- נשתמש בתנאי שבודק אם הבקשה מגיעה עם מפתח מיוחד
CREATE POLICY "App can insert products" ON products
  FOR INSERT WITH CHECK (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

CREATE POLICY "App can update products" ON products
  FOR UPDATE USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

CREATE POLICY "App can delete products" ON products
  FOR DELETE USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

-- אותו דבר לשאר הטבלאות
CREATE POLICY "App can modify categories" ON categories
  FOR ALL USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

CREATE POLICY "App can modify stores" ON stores
  FOR ALL USING (
    current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
  );

SELECT 'Production-ready policies applied!' as message;