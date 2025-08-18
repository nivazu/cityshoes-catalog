-- Create stores table to save store configuration
CREATE TABLE IF NOT EXISTS stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_key TEXT UNIQUE NOT NULL DEFAULT 'default', -- Allows multiple stores in future
  name TEXT NOT NULL,
  slogan TEXT,
  phone TEXT,
  address TEXT,
  instagram TEXT,
  facebook TEXT,
  tiktok TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  banner_image TEXT,
  about_title TEXT,
  about_text TEXT,
  about_banners JSONB DEFAULT '[]'::jsonb,
  privacy_policy_text TEXT,
  terms_of_service_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_stores_store_key ON stores(store_key);

-- Enable Row Level Security
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on stores" ON stores
  FOR SELECT USING (true);

-- Allow all operations (for admin functionality)
CREATE POLICY "Allow all operations on stores" ON stores
  FOR ALL USING (true);

-- Create trigger to update timestamp
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON stores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default store data
INSERT INTO stores (
  store_key,
  name,
  slogan,
  phone,
  address,
  instagram,
  facebook,
  tiktok,
  hero_title,
  hero_subtitle,
  banner_image,
  about_title,
  about_text,
  about_banners,
  privacy_policy_text,
  terms_of_service_text
) VALUES (
  'default',
  'נעלי העיר',
  'הכי מיוחדים אצלנו',
  '04-9988776',
  'רחוב הרברט סמואל 93, חדרה',
  'https://www.instagram.com/naaleihair.il?igshid=MzRlODBiNWFlZA%3D%3D',
  'https://www.facebook.com/share/1B32LKgMpx/',
  'https://www.tiktok.com/@asi0505798761?_t=ZS-8xzXQyLNjcI&_r=1',
  'PREMIUM FOOTWEAR EXPERIENCE',
  'קולקציה אקסקלוסיבית של נעלי ספורט ואופנה מהמותגים המובילים בעולם.',
  'https://i.ibb.co/gMXLwMg6/b447649c-d70a-400e-bf50-f22a1c291eca-1.gif',
  'אודות נעלי העיר',
  'ברוכים הבאים לנעלי העיר - החנות המובילה לנעלי ספורט ואופנה בחדרה. אנו מתמחים במכירת נעליים מהמותגים המובילים בעולם ומספקים שירות מקצועי ואישי לכל לקוח.',
  '[]'::jsonb,
  E'מדיניות פרטיות\n\nאנו בנעלי העיר מחויבים להגנה על פרטיותך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.\n\nאיסוף מידע:\nאנו אוספים מידע שאתה מספק לנו ישירות, כגון שם, כתובת, מספר טלפון וכתובת דוא"ל כאשר אתה יוצר איתנו קשר או מבצע רכישה.\n\nשימוש במידע:\nאנו משתמשים במידע שנאסף כדי לספק לך שירות טוב יותר, לעבד הזמנות, לשלוח עדכונים על מוצרים חדשים ומבצעים, ולשפר את חווית הקנייה שלך.\n\nאבטחת מידע:\nאנו נוקטים באמצעי אבטחה מתאימים כדי להגן על המידע שלך מפני גישה בלתי מורשית, שינוי, גילוי או השמדה.\n\nיצירת קשר:\nאם יש לך שאלות לגבי מדיניות הפרטיות שלנו, אנא צור איתנו קשר.',
  E'תנאי שימוש\n\nברוכים הבאים לאתר נעלי העיר. השימוש באתר זה כפוף לתנאים הבאים:\n\nתנאי שימוש כלליים:\nבכניסתך לאתר ובשימוש בו, אתה מסכים לתנאי השימוש. אם אינך מסכים לתנאים אלה, אנא הימנע משימוש באתר.\n\nקניין רוחני:\nכל התכנים באתר זה, כולל טקסטים, תמונות, לוגו ועיצוב, הם רכושה של נעלי העיר ומוגנים בזכויות יוצרים.\n\nמוצרים ומחירים:\nאנו שומרים לעצמנו את הזכות לשנות מחירים ומבצעים ללא הודעה מוקדמת. המחירים באתר כוללים מע"מ.\n\nהגבלת אחריות:\nנעלי העיר לא תישא באחריות לכל נזק ישיר או עקיף הנובע משימוש או מחוסר יכולת להשתמש באתר.\n\nשינויים בתנאי השימוש:\nאנו שומרים לעצמנו את הזכות לעדכן את תנאי השימוש מעת לעת. המשך השימוש באתר לאחר שינויים כאלה מהווה הסכמה לתנאים המעודכנים.'
) ON CONFLICT (store_key) DO NOTHING;

-- Verify setup
SELECT 'Stores table created successfully!' as message;
SELECT COUNT(*) as store_count FROM stores;