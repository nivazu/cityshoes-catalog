# cityshoes-catalog
# 🎯 מדריך התאמה אישית - קטלוג נעלי העיר

## 📝 1. עדכון פרטי החנות

### שם החנות והסלוגן
```javascript
// חפש את השורות הבאות בקוד ועדכן:
<div className="text-2xl font-black tracking-tight">נעלי העיר</div>
<div className="text-xs tracking-[0.3em] text-stone-500 font-light">כל המיוחדים אצלנו</div>

// שנה ל:
<div className="text-2xl font-black tracking-tight">השם החדש של החנות</div>
<div className="text-xs tracking-[0.3em] text-stone-500 font-light">הסלוגן החדש שלך</div>
```

## 📞 2. עדכון פרטי יצירת קשר

### מספר טלפון
```javascript
// חפש ועדכן בכל המקומות:
050-123-4567  →  המספר הטלפון שלך
+972501234567  →  +972 + המספר שלך (ללא 0)

// לדוגמה:
href="tel:+972501234567"  →  href="tel:+972521234567"
```

### כתובת
```javascript
// חפש:
<div className="text-lg font-medium">רחוב הרצל 123, תל אביב</div>

// שנה ל:
<div className="text-lg font-medium">הכתובת החדשה שלך</div>
```

### אינסטגרם
```javascript
// חפש:
<div className="text-lg font-medium">@shoes_hair</div>

// שנה ל:
<div className="text-lg font-medium">@הפרופיל_שלך</div>
```

## 🛍️ 3. עדכון מוצרים

### הוספת מוצר חדש
```javascript
// הוסף למערך products:
{
  id: 7, // מספר ייחודי חדש
  name: "שם המוצר החדש",
  brand: "שם המותג",
  price: 599, // מחיר נוכחי
  originalPrice: 699, // מחיר מקורי (אופציונלי)
  category: "lifestyle", // או "running" / "casual"
  images: [
    "לינק לתמונה ראשונה",
    "לינק לתמונה שנייה",
    "לינק לתמונה שלישית" // אופציונלי
  ],
  description: "תיאור המוצר בפרטים",
  colors: ["צבע 1", "צבע 2", "צבע 3"],
  sizes: ["39", "40", "41", "42", "43"],
  isNew: true, // האם מוצר חדש
  featured: false // האם מוצר מומלץ (יופיע בראש הדף)
}
```

### עדכון מוצר קיים
```javascript
// חפש את המוצר לפי ID ועדכן את השדות הרצויים:
{
  id: 1,
  name: "השם החדש", // ← עדכן כאן
  price: 899, // ← עדכן מחיר
  images: [
    "התמונה החדשה", // ← עדכן תמונות
    // ...
  ]
  // ...שאר השדות
}
```

## 🖼️ 4. עדכון תמונות

### איך להוסיף תמונות?
יש לך 3 אפשרויות:

**א. העלאה לשירות חינמי:**
- [Imgur](https://imgur.com) - העלה תמונה וקבל לינק
- [ImageBB](https://imgbb.com) - שירות חינמי נוסף
- [Cloudinary](https://cloudinary.com) - שירות מקצועי (יש גרסה חינמית)

**ב. שימוש ב-Unsplash (תמונות לדוגמה):**
```javascript
"https://images.unsplash.com/photo-1234567890?w=600&h=600&fit=crop&crop=center"
```

**ג. שירותי אחסון (Google Drive, Dropbox):**
- העלה לGoogle Drive → שתף → קבל לינק
- שנה `view` ל-`uc` בלינק

### פורמט תמונות מומלץ:
- גודל: 600x600 פיקסלים
- פורמט: JPG/PNG
- איכות: גבוהה
- רקע: אחיד/נקי

## 🔗 5. עדכון לינקים לרשתות חברתיות

### וואטסאפ
```javascript
// חפש:
href="https://wa.me/972501234567"

// שנה ל:
href="https://wa.me/972המספר_שלך"

// הודעה מותאמת אישית:
href={`https://wa.me/972501234567?text=היי, אני מעוניין ב${selectedProduct.name}`}
```

### אינסטגרם
```javascript
// הוסף לינק לאינסטגרם (אם רוצה):
<a href="https://instagram.com/הפרופיל_שלך" target="_blank" rel="noopener noreferrer">
  <Instagram className="w-5 h-5" />
</a>
```

### פייסבוק
```javascript
// הוסף אייקון פייסבוק לצד האינסטגרם:
import { Facebook } from 'lucide-react';

<Facebook className="w-5 h-5 text-stone-400 hover:text-blue-600 cursor-pointer" />
```

## 🎨 6. עדכון קטגוריות

### שינוי שמות קטגוריות
```javascript
const categories = [
  { id: 'all', name: 'כל המוצרים' },
  { id: 'running', name: 'ריצה' }, // ← שנה כאן
  { id: 'lifestyle', name: 'לייפסטייל' }, // ← או כאן
  { id: 'casual', name: 'יומיומי' } // ← או כאן
];
```

### הוספת קטגוריה חדשה
```javascript
// הוסף למערך:
{ id: 'formal', name: 'רשמי' }

// ודאג שלמוצרים יש את הקטגוריה המתאימה:
category: "formal"
```

## 💰 7. עדכון מחירים ומבצעים

### הצגת הנחה
```javascript
{
  price: 599, // מחיר נוכחי
  originalPrice: 799, // מחיר מקורי - ההנחה תחושב אוטומטית
}
```

### הסרת הנחה
```javascript
{
  price: 599,
  // אל תכלול originalPrice או שים אותו זהה ל-price
}
```

## 📱 8. עדכון טקסטים

### טקסט בעמוד הראשי
```javascript
// חפש את הטקסט:
"קולקציה אקסקלוסיבית של נעלי ספורט ואופנה..."

// שנה לטקסט שלך:
"הטקסט החדש על החנות שלך..."
```

### כותרות
```javascript
// חפש:
"PREMIUM FOOTWEAR EXPERIENCE"

// שנה ל:
"הכותרת החדשה שלך"
```

## ⚙️ 9. עדכונים מתקדמים

### שינוי צבעי המותג
```javascript
// חפש גרדיאנטים של amber ו-stone ושנה ל:
from-blue-600 to-gray-800  // כחול-אפור
from-green-600 to-teal-800  // ירוק-טורקיז
from-purple-600 to-indigo-800  // סגול-אינדיגו
```

### הוספת שדות למוצרים
```javascript
{
  // שדות קיימים...
  material: "עור איטלקי", // חומר
  origin: "מיוצר באיטליה", // מקור
  warranty: "שנתיים אחריות", // אחריות
  inStock: true // האם במלאי
}
```

## 🚀 10. העלאה לשרת

### שירותי אחסון חינמיים מומלצים:

**Netlify (מומלץ ביותר):**
1. גש ל-[netlify.com](https://netlify.com)
2. גרור את קבצי הפרויקט
3. קבל לינק חינמי

**Vercel:**
1. גש ל-[vercel.com](https://vercel.com)
2. העלה את הקבצים
3. פרסם בחינם

**GitHub Pages:**
1. העלה ל-GitHub
2. הפעל Pages
3. קבל לינק חינמי

---

## 🎯 טיפים חשובים:

1. **תמיד עשה גיבוי** לפני שינויים
2. **בדוק על מספר מכשירים** (מחשב, טלפון, טאבלט)
3. **התמונות חשובות ביותר** - השקע באיכות גבוהה
4. **עדכן מספרי טלפון** בכל המקומות
5. **בדוק לינקי רשתות חברתיות** שעובדים

---

## 📞 זקוק לעזרה?

אם אתה נתקע, פשוט תגיד לי איזה חלק אתה רוצה לעדכן ואני אעזור לך עם הקוד המדויק! 🚀
