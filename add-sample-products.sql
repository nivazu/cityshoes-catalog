-- Add sample products for testing
INSERT INTO products (name, brand, category, description, colors, sizes, images, is_new, featured) VALUES
(
  'Air Jordan 1 Retro High OG',
  'Nike',
  'basketball',
  'נעלי כדורסל קלאסיות עם עיצוב אייקוני',
  ARRAY['שחור', 'לבן', 'אדום'],
  ARRAY['40', '41', '42', '43', '44', '45'],
  ARRAY['https://example.com/placeholder1.jpg'],
  true,
  true
),
(
  'Ultraboost 22',
  'Adidas',
  'running',
  'נעלי ריצה עם טכנולוגיית Boost מתקדמת',
  ARRAY['שחור', 'לבן', 'כחול'],
  ARRAY['39', '40', '41', '42', '43', '44'],
  ARRAY['https://example.com/placeholder2.jpg'],
  false,
  true
),
(
  'Blazer Mid 77',
  'Nike',
  'lifestyle',
  'נעלי לייפסטייל בעיצוב וינטג\'',
  ARRAY['לבן', 'שחור', 'ירוק'],
  ARRAY['38', '39', '40', '41', '42', '43'],
  ARRAY['https://example.com/placeholder3.jpg'],
  false,
  false
),
(
  'Stan Smith',
  'Adidas',
  'casual',
  'נעלי קז\'ואל קלאסיות ונוחות',
  ARRAY['לבן', 'ירוק'],
  ARRAY['36', '37', '38', '39', '40', '41', '42'],
  ARRAY['https://example.com/placeholder4.jpg'],
  false,
  false
),
(
  'Mercurial Vapor 14',
  'Nike',
  'football',
  'נעלי כדורגל מקצועיות למגרש דשא',
  ARRAY['כתום', 'שחור'],
  ARRAY['39', '40', '41', '42', '43', '44', '45'],
  ARRAY['https://example.com/placeholder5.jpg'],
  true,
  false
);