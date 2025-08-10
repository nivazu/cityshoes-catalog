# מדריך העלאת תמונות דרך Supabase

## סקירה כללית
המערכת מעודכנת כעת לתמוך בהעלאת תמונות מלאה דרך Supabase Storage.

## שינויים שבוצעו

### 1. עדכון קובץ Supabase Client (`src/lib/supabase.js`)
- הוספת תמיכה במשתני סביבה של Next.js
- הוספת פונקציות להעלאת תמונות:
  - `uploadImage` - העלאת תמונה בודדת
  - `uploadImages` - העלאת מספר תמונות
  - `deleteImage` - מחיקת תמונה
  - `getPublicImageUrl` - קבלת URL ציבורי לתמונה

### 2. שירות תמונות מתקדם (`src/services/imageService.js`)
- ולידציה של קבצים (גודל וסוג)
- יצירת שמות קבצים ייחודיים
- תמיכה בהעלאה לתיקיות זמניות למוצרים חדשים
- פונקציה להעברת תמונות זמניות לתיקיית המוצר הסופית
- בדיקת חיבור ל-Storage

### 3. רכיב העלאת תמונות (`src/components/ImageUpload.jsx`)
- תמיכה בגרירה ושחרור (Drag & Drop)
- העלאת מספר קבצים במקביל
- תצוגה מקדימה של תמונות
- הודעות שגיאה והצלחה
- אפשרות להוסיף תמונות מ-URL חיצוני

### 4. עדכון תצוגת תמונות
- שימוש ב-`getPublicImageUrl` בכל מקום שמוצגות תמונות
- הוספת placeholder לתמונות שנכשלות בטעינה
- תמיכה בתמונות מ-Supabase Storage וגם מ-URLs חיצוניים

## הגדרות נדרשות ב-Supabase

### 1. וודא שה-Storage Bucket קיים
```sql
-- בדוק אם ה-bucket קיים
SELECT * FROM storage.buckets WHERE id = 'product-images';

-- אם לא קיים, צור אותו
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);
```

### 2. הגדרות RLS ל-Storage
```sql
-- מתן גישת קריאה ציבורית
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- מתן גישת כתיבה למשתמשים מאומתים
CREATE POLICY "Allow authenticated write access" ON storage.objects
FOR ALL
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
```

## כיצד להשתמש

### 1. העלאת תמונות במוצר חדש
- לחץ על "הוסף מוצר חדש"
- בשדה התמונות, גרור קבצים או לחץ לבחירה
- התמונות יועלו לתיקייה זמנית
- לאחר שמירת המוצר, התמונות יועברו אוטומטית לתיקיית המוצר

### 2. עדכון תמונות במוצר קיים
- בעריכת מוצר, הוסף או הסר תמונות
- תמונות חדשות יועלו ישירות לתיקיית המוצר

### 3. הוספת תמונות מ-URL חיצוני
- לחץ על "הוסף קישור"
- הכנס את ה-URL של התמונה
- התמונה תישמר כקישור חיצוני (לא תועלה ל-Storage)

## טיפול בבעיות נפוצות

### בעיה: "Storage bucket does not exist"
**פתרון**: צור את ה-bucket ב-Supabase Dashboard או הרץ את הסקריפט למעלה

### בעיה: תמונות לא נטענות
**פתרונות אפשריים**:
1. בדוק שה-bucket מוגדר כ-public
2. וודא שה-URL של Supabase נכון ב-.env.local
3. בדוק את ה-CORS settings ב-Supabase

### בעיה: העלאה נכשלת
**פתרונות אפשריים**:
1. וודא שגודל הקובץ קטן מ-10MB
2. בדוק שסוג הקובץ נתמך (JPG, PNG, WebP, GIF)
3. וודא שיש הרשאות כתיבה ל-bucket

## תכונות מתקדמות

### אופטימיזציה של תמונות
השתמש ב-`getOptimizedImageUrl` לקבלת תמונות מותאמות:
```javascript
const optimizedUrl = ImageService.getOptimizedImageUrl(imageUrl, {
  width: 800,
  height: 600,
  quality: 85,
  format: 'webp'
});
```

### מחיקת תמונות ישנות
כשמוחקים מוצר, התמונות לא נמחקות אוטומטית מ-Storage.
ניתן להוסיף פונקציונליות זו בעתיד.

## המלצות
1. השתמש בתמונות באיכות טובה אך לא גדולות מדי (מומלץ עד 2MB)
2. העדף פורמטים מודרניים כמו WebP
3. העלה תמונות במידות דומות לתצוגה אחידה
4. הוסף תמיד לפחות תמונה אחת לכל מוצר