-- Add price field to products table
-- הוספת שדה מחיר לטבלת המוצרים

-- Step 1: Add the price column to the products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2);

-- Step 2: Add an index for better performance when filtering/sorting by price
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- Step 3: Update existing products with sample prices (optional)
-- You can remove this section if you want to add prices manually
UPDATE products SET price = 
  CASE 
    WHEN brand = 'Nike' AND category = 'basketball' THEN 899.00
    WHEN brand = 'Nike' AND category = 'running' THEN 699.00
    WHEN brand = 'Nike' AND category = 'lifestyle' THEN 599.00
    WHEN brand = 'Adidas' AND category = 'running' THEN 749.00
    WHEN brand = 'Adidas' AND category = 'lifestyle' THEN 499.00
    WHEN brand = 'Adidas' AND category = 'basketball' THEN 849.00
    WHEN brand = 'Under Armour' THEN 579.00
    WHEN brand = 'Converse' THEN 399.00
    WHEN brand = 'Vans' THEN 349.00
    WHEN brand = 'Puma' THEN 459.00
    WHEN brand = 'New Balance' THEN 649.00
    WHEN brand = 'Reebok' THEN 449.00
    WHEN brand = 'ASICS' THEN 699.00
    WHEN brand = 'Salomon' THEN 899.00
    WHEN brand = 'Mizuno' THEN 799.00
    WHEN brand = 'Skechers' THEN 349.00
    WHEN brand = 'Fila' THEN 379.00
    WHEN brand = 'Brooks' THEN 799.00
    WHEN brand = 'Hoka' THEN 899.00
    WHEN is_new = true THEN 649.00
    WHEN featured = true THEN 799.00
    ELSE 499.00
  END
WHERE price IS NULL;

-- Print success message
SELECT 'Price field added successfully to products table!' as message;