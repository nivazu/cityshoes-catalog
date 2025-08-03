# תיקון בעיית העלאת תמונות בעמוד האדמין

## הבעיה
לא ניתן להעלות תמונות בעמוד האדמין כי ה-bucket "product-images" לא קיים ב-Supabase Storage.

## הפתרון

### שלב 1: כניסה ל-Supabase Dashboard
1. היכנס לכתובת: https://supabase.com/dashboard/project/oywfddfwttncjayglvoy
2. היכנס עם פרטי המשתמש שלך

### שלב 2: יצירת Storage Bucket

#### אפשרות א' - דרך ה-UI (מומלץ):
1. בתפריט הצדדי, לחץ על **Storage**
2. לחץ על כפתור **"New bucket"**
3. הזן את הפרטים הבאים:
   - **Name**: `product-images`
   - **Public bucket**: ✅ סמן את התיבה (חשוב!)
   - **File size limit**: 10MB
   - **Allowed MIME types**: `image/jpeg,image/png,image/gif,image/webp`
4. לחץ על **"Create bucket"**

#### אפשרות ב' - דרך SQL Editor:
1. בתפריט הצדדי, לחץ על **SQL Editor**
2. העתק והדבק את התוכן מהקובץ `create-storage-bucket.sql`
3. לחץ על **"Run"**

### שלב 3: אימות שה-bucket נוצר
1. חזור ל-**Storage** בתפריט הצדדי
2. וודא שאתה רואה bucket בשם `product-images`
3. לחץ עליו וודא שהוא מוגדר כ-Public

### שלב 4: בדיקת העלאת תמונות באפליקציה
1. פתח את האפליקציה בכתובת: http://localhost:3000
2. לחץ על שם החנות בכותרת
3. הזן סיסמה: `admin123`
4. לחץ על **"הוסף מוצר"**
5. נסה להעלות תמונה בחלק של "תמונות המוצר"

## בדיקות נוספות

### בדיקת חיבור ל-Storage
הרץ בטרמינל:
```bash
node test-storage.js
```

הפלט הצפוי:
- `Available buckets: ['product-images']`
- `Product-images bucket exists: true`
- `Test file uploaded successfully`

### פתרון בעיות נפוצות

#### אם עדיין יש שגיאת RLS:
1. ב-Supabase Dashboard, לך ל-**Authentication** > **Policies**
2. וודא שה-policies עבור `storage.objects` מאפשרות גישה ציבורית ל-bucket `product-images`

#### אם יש שגיאת CORS:
1. ב-Supabase Dashboard, לך ל-**Settings** > **API**
2. בחלק של CORS, הוסף את `http://localhost:3000` לרשימת הדומיינים המורשים

## סיכום
הבעיה נגרמה מכך שה-bucket `product-images` לא היה קיים ב-Supabase Storage. לאחר יצירת ה-bucket עם הרשאות ציבוריות, העלאת התמונות אמורה לעבוד כראוי.