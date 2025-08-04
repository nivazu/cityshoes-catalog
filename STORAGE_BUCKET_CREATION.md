# הוראות ליצירת Storage Bucket ב-Supabase

## הבעיה
האפליקציה מנסה להעלות תמונות ל-bucket בשם `product-images` שלא קיים ב-Supabase Storage.

## פתרון - יצירת Bucket

### שלב 1: כניסה ל-Supabase Dashboard
1. היכנס ל-[Supabase Dashboard](https://app.supabase.com)
2. בחר את הפרויקט שלך

### שלב 2: גישה ל-Storage
1. בתפריט הצדדי, לחץ על **Storage**
2. לחץ על כפתור **New bucket**

### שלב 3: יצירת Bucket חדש
1. **Bucket name**: `product-images`
2. **Public bucket**: ✅ סמן כ-Public (חשוב!)
3. **File size limit**: 10MB (או יותר אם צריך)
4. **Allowed MIME types**: 
   - image/jpeg
   - image/png
   - image/webp
   - image/gif
5. לחץ **Create bucket**

### שלב 4: הגדרת Policies (אם נדרש)
אם ה-bucket לא מוגדר כ-public או שיש בעיות הרשאות:

1. לחץ על ה-bucket `product-images`
2. עבור ללשונית **Policies**
3. לחץ **New policy**
4. בחר **For full customization**
5. הוסף את ה-policies הבאות:

#### Policy 1: Allow public uploads
```sql
CREATE POLICY "Allow public uploads to product-images"
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');
```

#### Policy 2: Allow public read
```sql
CREATE POLICY "Allow public read access to product-images"
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');
```

#### Policy 3: Allow public updates
```sql
CREATE POLICY "Allow public updates to product-images"
ON storage.objects FOR UPDATE 
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');
```

#### Policy 4: Allow public deletes
```sql
CREATE POLICY "Allow public deletes from product-images"
ON storage.objects FOR DELETE 
USING (bucket_id = 'product-images');
```

### שלב 5: אלטרנטיבה - הרצת SQL Script
אם אתה מעדיף, תוכל להריץ את הסקריפט `create-storage-bucket.sql` ב-SQL Editor:

1. בתפריט הצדדי, לחץ על **SQL Editor**
2. לחץ **New query**
3. העתק את התוכן מהקובץ `create-storage-bucket.sql`
4. לחץ **Run**

### שלב 6: בדיקה
1. חזור לאפליקציה
2. היכנס למצב ניהול (לחץ על שם החנות והזן סיסמה: `admin123`)
3. לחץ על **🔧 אבחון Storage**
4. הרץ את הבדיקות
5. כל הבדיקות צריכות לעבור בהצלחה

## בעיות נפוצות

### "Bucket not found"
- וודא ששם ה-bucket הוא בדיוק `product-images` (עם מקף, לא underscore)
- וודא שה-bucket נוצר בהצלחה

### "Permission denied"
- וודא שה-bucket מוגדר כ-Public
- בדוק שה-policies נוצרו נכון

### "Failed to fetch"
- בדוק שמשתני הסביבה מוגדרים נכון ב-`.env.local`:
  ```
  REACT_APP_SUPABASE_URL=your-supabase-url
  REACT_APP_SUPABASE_ANON_KEY=your-anon-key
  ```

## צריך עזרה?
אם הבעיה נמשכת:
1. פתח את Console בדפדפן (F12)
2. נסה להעלות תמונה
3. העתק את השגיאות שמופיעות
4. בדוק ב-Supabase Dashboard את הלוגים ב-**Logs > API**