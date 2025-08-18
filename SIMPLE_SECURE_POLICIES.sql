-- פתרון פשוט יותר - מדיניות מאובטחת ללא מערכת משתמשים מורכבת

-- הסרת המדיניות הקיימת
DROP POLICY IF EXISTS "Allow all operations on products" ON products;
DROP POLICY IF EXISTS "Allow all operations on categories" ON categories;
DROP POLICY IF EXISTS "Allow all operations on stores" ON stores;

-- יצירת מדיניות חדשה
-- 1. כולם יכולים לקרוא
CREATE POLICY "Anyone can read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read stores" ON stores
  FOR SELECT USING (true);

-- 2. אף אחד לא יכול לערוך ישירות (רק דרך service role)
-- לא יוצרים מדיניות INSERT/UPDATE/DELETE כלל
-- זה אומר שרק חיבור עם service role key יוכל לערוך

-- הודעה
SELECT 'Policies updated! Now only service role can modify data' as message;