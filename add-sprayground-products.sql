-- ==========================================
-- Add Sprayground Products to Database
-- ==========================================

-- Add all the Sprayground bags that were in the sample data
INSERT INTO products (name, brand, category, description, colors, sizes, images, is_new, featured) VALUES
-- Bag 1
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/jvvk2f1p/Backpack0103.jpg', 'https://i.ibb.co/BVKDWKKh/Backpack0102.jpg', 'https://i.ibb.co/sd6qNM2y/Backpack0101.jpg'],
 true, true),

-- Bag 2
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/60WgfJqg/Backpack0203.jpg', 'https://i.ibb.co/0yT3ZMzP/Backpack0202.jpg', 'https://i.ibb.co/bMhG2GjF/Backpack0201.jpg'],
 false, false),

-- Bag 3
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/8L8cZ3yX/Backpack0303.jpg', 'https://i.ibb.co/4RJZs42H/Backpack0302.jpg', 'https://i.ibb.co/k6X7GPsz/Backpack0301.jpg'],
 false, false),

-- Bag 4
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/4nRMJ85f/Backpack0401.jpg', 'https://i.ibb.co/6Jvwq5nL/Backpack0403.jpg', 'https://i.ibb.co/KxQTD1kh/Backpack0402.jpg'],
 false, false),

-- Bag 5
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/HpF6FN4f/Backpack0502.jpg', 'https://i.ibb.co/twBHs2JY/Backpack0501.jpg', 'https://i.ibb.co/k2hKN2X6/Backpack0503.jpg'],
 false, false),

-- Bag 6
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/xKkMsmBt/Backpack0604.jpg', 'https://i.ibb.co/0jX9V0rw/Backpack0603.jpg', 'https://i.ibb.co/fYx7dkLR/Backpack0601.jpg'],
 false, false),

-- Bag 7
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/Xrj0L2R5/Backpack0705.jpg', 'https://i.ibb.co/QvvTb6GN/Backpack0704.jpg'],
 false, false),

-- Bag 8
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/5x2WN56S/Backpack0702.jpg', 'https://i.ibb.co/X6skvTF/Backpack0701.jpg', 'https://i.ibb.co/d0xmCJYk/Backpack0703.jpg'],
 false, false),

-- Bag 9
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/HTS0CbN0/Backpack0804.jpg', 'https://i.ibb.co/SwwGLQc4/Backpack0803.jpg', 'https://i.ibb.co/1Y3gY595/Backpack0802.jpg', 'https://i.ibb.co/jvMpP6Z5/Backpack0801.jpg'],
 false, false),

-- Bag 10
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/2pYdqst/Backpack0904.jpg', 'https://i.ibb.co/pjhVV5c6/Backpack0903.jpg', 'https://i.ibb.co/rfGvj36f/Backpack0902.jpg', 'https://i.ibb.co/Ndrt2K49/Backpack0901.jpg'],
 false, false),

-- Bag 11
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/Ndh0fPWJ/Sprayground135.jpg', 'https://i.ibb.co/399Vg9HV/Sprayground108.jpg', 'https://i.ibb.co/XfHLCpQN/Sprayground184.jpg'],
 false, false),

-- Bag 12
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/h1gVvLGL/Sprayground51.jpg', 'https://i.ibb.co/fPY5MQD/Sprayground57.jpg', 'https://i.ibb.co/5XJnKQzB/Sprayground100.jpg'],
 false, false),

-- Bag 13
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/xqBYG9PQ/Sprayground45.jpg', 'https://i.ibb.co/Nnm507W1/Sprayground68.jpg', 'https://i.ibb.co/rfRs7frx/Sprayground66.jpg'],
 false, false),

-- Bag 14
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/Y49WJpDq/Sprayground46.jpg', 'https://i.ibb.co/S7W9TB5D/Sprayground77.jpg', 'https://i.ibb.co/spScHSf4/Sprayground64.jpg'],
 false, false),

-- Bag 15
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/G350LyZP/Sprayground84.jpg', 'https://i.ibb.co/8LjdcB4Y/Sprayground148.jpg', 'https://i.ibb.co/Y4p0cLRv/Sprayground181.jpg', 'https://i.ibb.co/LXRqXGgb/Sprayground171.jpg'],
 false, false),

-- Bag 16
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/fVtY2dHv/Sprayground104.jpg', 'https://i.ibb.co/RTfjQp5Z/Sprayground113.jpg', 'https://i.ibb.co/3y40THrb/Sprayground156.jpg', 'https://i.ibb.co/LXRqXGgb/Sprayground171.jpg'],
 false, false),

-- Bag 17
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/jkgnw52D/Sprayground161.jpg', 'https://i.ibb.co/4RdXswXK/Sprayground168.jpg', 'https://i.ibb.co/svw3nhd2/Backpack0706.jpg'],
 false, false),

-- Bag 18
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/yBBDzTW9/Sprayground150.jpg', 'https://i.ibb.co/rCLbc8p/Sprayground174.jpg'],
 false, false),

-- Bag 19
('תיק גב Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק גב בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/zVrxTp9P/Sprayground79.jpg', 'https://i.ibb.co/60BpHgvF/Sprayground82.jpg', 'https://i.ibb.co/nqy1PmjK/Sprayground87.jpg', 'https://i.ibb.co/FL2K4YCt/Sprayground92.jpg', 'https://i.ibb.co/gbbBvY8d/Sprayground96.jpg'],
 false, false),

-- Bag 20 - Side bag
('תיק צד Sprayground', 'SPRAYGROUND', 'lifestyle', 'תיק צד בעיצוב ייחודי ואיכותי.', 
 ARRAY['MULTI'], ARRAY['ONE SIZE'], 
 ARRAY['https://i.ibb.co/Z6SpPyN3/Sprayground99.jpg', 'https://i.ibb.co/vCxD8yPn/Backpack1003.jpg', 'https://i.ibb.co/1GbqgJXc/Backpack1004.jpg'],
 false, false);

-- Count the products
SELECT COUNT(*) as total_products FROM products;
SELECT brand, COUNT(*) as count FROM products GROUP BY brand ORDER BY count DESC;