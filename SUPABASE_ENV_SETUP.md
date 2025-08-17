# הגדרת משתני סביבה עבור Supabase

## הבעיה
האפליקציה מציגה שגיאה:
```
Missing Supabase environment variables. Expected one of REACT_APP_*, NEXT_PUBLIC_* or SUPABASE_*
supabaseUrl is required.
```

זה קורה כי האפליקציה לא מוצאת את פרטי החיבור ל-Supabase.

## הפתרון - הגדרת קובץ .env

### שלב 1: מציאת פרטי החיבור ב-Supabase
1. היכנס ל-[Supabase Dashboard](https://supabase.com/dashboard)
2. בחר את הפרויקט שלך
3. בתפריט הצדדי, לחץ על **Settings** (הגדרות)
4. לחץ על **API**
5. תמצא שם שני ערכים חשובים:
   - **Project URL** - זו כתובת הפרויקט שלך
   - **anon/public key** - זה המפתח הציבורי

### שלב 2: יצירת קובץ .env
1. בתיקיית השורש של הפרויקט, כבר יצרתי לך קובץ `.env`
2. פתח את הקובץ `.env` בעורך טקסט
3. החלף את הערכים הבאים:

```env
REACT_APP_SUPABASE_URL=הכנס_כאן_את_ה_Project_URL
REACT_APP_SUPABASE_ANON_KEY=הכנס_כאן_את_ה_anon_key
```

### דוגמה למילוי נכון:
```env
REACT_APP_SUPABASE_URL=https://oywfddfwttncjayglvoy.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95d2ZkZGZ3dHRuY2pheWdsdm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwODIwNTEsImV4cCI6MjAwOTY1ODA1MX0.Lbj8gR9jPyQjq1234567890abcdef
```

### שלב 3: הפעלת האפליקציה מחדש
לאחר שמירת הקובץ `.env` עם הערכים הנכונים:

```bash
# עצור את האפליקציה אם היא רצה (Ctrl+C)
# הפעל מחדש
npm start
```

## בדיקה שהכל עובד
1. פתח את הדפדפן ב-http://localhost:3000
2. השגיאה אמורה להיעלם
3. נסה להעלות תמונה בעמוד האדמין

## הערות חשובות
1. **אל תשתף** את קובץ `.env` עם אף אחד
2. הקובץ כבר נמצא ב-`.gitignore` כך שלא יועלה ל-Git
3. וודא שאתה משתמש ב-**anon/public key** ולא ב-service_role key

## בעיות נפוצות

### עדיין יש שגיאה?
1. וודא שהעתקת את הערכים בדיוק כפי שהם מופיעים ב-Supabase
2. וודא שאין רווחים מיותרים לפני או אחרי הערכים
3. וודא שהשתמשת ב-`REACT_APP_` כקידומת

### האפליקציה לא מזהה את השינויים?
1. נסה לנקות את ה-cache:
   ```bash
   rm -rf node_modules/.cache
   npm start
   ```

2. או נסה:
   ```bash
   npm run build
   npm start
   ```

## לפריסה ב-Production
אם אתה מפרוס ב-Vercel או פלטפורמה אחרת:
1. הוסף את אותם משתני סביבה בהגדרות הפרויקט
2. ב-Vercel: Settings > Environment Variables
3. הוסף:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`