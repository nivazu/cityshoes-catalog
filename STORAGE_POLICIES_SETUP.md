# הגדרת Policies עבור Storage ב-Supabase

## מטרת המסמך
מסמך זה מסביר כיצד להגדיר Policies (מדיניות אבטחה) עבור ה-bucket "product-images" ב-Supabase Storage כדי לאפשר העלאת תמונות באפליקציה.

## למה צריך Policies?
Supabase משתמש ב-Row Level Security (RLS) כדי לשלוט בגישה לנתונים. כאשר RLS מופעל, צריך להגדיר Policies מפורשות כדי לאפשר גישה.

## שלבי ההגדרה

### שלב 1: כניסה ל-Supabase Dashboard
1. היכנס ל-[Supabase Dashboard](https://supabase.com/dashboard)
2. בחר את הפרויקט שלך

### שלב 2: הרצת סקריפט ה-SQL
1. בתפריט הצדדי, לחץ על **SQL Editor**
2. לחץ על **New query**
3. העתק את כל התוכן מהקובץ `create-storage-policies.sql`
4. הדבק אותו בעורך ה-SQL
5. לחץ על **Run** (או Ctrl+Enter)

### שלב 3: בדיקת ההגדרות
לאחר הרצת הסקריפט, תראה טבלה עם כל ה-Policies שנוצרו. וודא שאתה רואה:
- `Public Access for product-images`
- `Public Upload to product-images`
- `Public Update in product-images`
- `Public Delete from product-images`

## מה עושות ה-Policies?

### 1. Public Access (SELECT)
מאפשרת לכל אחד לצפות בתמונות שהועלו ל-bucket

### 2. Public Upload (INSERT)
מאפשרת לכל אחד להעלות תמונות חדשות ל-bucket
- מגבילה סוגי קבצים ל: JPG, JPEG, PNG, GIF, WEBP
- מגבילה גודל metadata

### 3. Public Update
מאפשרת לעדכן תמונות קיימות

### 4. Public Delete
מאפשרת למחוק תמונות מה-bucket

### 5. File Size Limit (אופציונלי)
מגבילה גודל קובץ מקסימלי ל-10MB

## בדיקת התקנה מוצלחת

### בדיקה דרך האפליקציה
1. פתח את האפליקציה
2. עבור לעמוד האדמין (לחץ על שם החנות)
3. הזן סיסמה: `admin123`
4. לחץ על "הוסף מוצר"
5. נסה להעלות תמונה

### בדיקה דרך SQL
הרץ את השאילתה הבאה ב-SQL Editor:
```sql
SELECT COUNT(*) FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND policyname LIKE '%product-images%';
```
אתה אמור לקבל לפחות 4 policies.

## פתרון בעיות

### שגיאה: "Bucket not found"
- וודא שה-bucket "product-images" קיים
- אם לא, צור אותו דרך Storage > New bucket

### שגיאה: "Permission denied"
- וודא שה-bucket מוגדר כ-Public
- הרץ מחדש את סקריפט ה-Policies

### שגיאה: "Policy already exists"
- זה בסדר, הסקריפט מוחק policies קיימות לפני יצירת חדשות
- אם עדיין יש בעיה, מחק ידנית את ה-policies הישנות

## הערות חשובות
1. ה-Policies הללו מאפשרות גישה ציבורית לכל אחד
2. מתאים לאפליקציית קטלוג שלא דורשת אימות משתמשים
3. אם תרצה להגביל גישה בעתיד, תצטרך לשנות את ה-Policies

## קישורים שימושיים
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)