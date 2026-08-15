-- Supabase Schema for Maison NB

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    description TEXT,
    in_stock BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    images TEXT[] DEFAULT '{}',
    sizes TEXT[] DEFAULT '{}',
    views INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    wilaya TEXT NOT NULL,
    commune TEXT NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    product_image TEXT NOT NULL,
    size TEXT NOT NULL,
    price NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories and products
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);

-- Allow public to insert orders (unauthenticated users can place orders)
DROP POLICY IF EXISTS "Allow public insert on orders" ON public.orders;
CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);

-- Admin full access policies (restricted to the specific admin user ID)
DROP POLICY IF EXISTS "Allow admin full access on categories" ON public.categories;
CREATE POLICY "Allow admin full access on categories" ON public.categories FOR ALL USING (auth.uid() = 'e596cfbf-fef1-4c34-b8fc-59152a561d99');

DROP POLICY IF EXISTS "Allow admin full access on products" ON public.products;
CREATE POLICY "Allow admin full access on products" ON public.products FOR ALL USING (auth.uid() = 'e596cfbf-fef1-4c34-b8fc-59152a561d99');

DROP POLICY IF EXISTS "Allow admin full access on orders" ON public.orders;
CREATE POLICY "Allow admin full access on orders" ON public.orders FOR ALL USING (auth.uid() = 'e596cfbf-fef1-4c34-b8fc-59152a561d99');

-- Insert initial categories
INSERT INTO public.categories (id, name) VALUES 
('all', 'الكل'),
('dresses', 'فساتين'),
('abayas', 'عبايات'),
('coats', 'معاطف')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 4. STORAGE SETUP FOR PRODUCT IMAGES
-- ============================================================

-- ============================================================
-- CREATE STORAGE BUCKET: product-images
-- ============================================================
-- NOTE: In Supabase, storage.buckets is managed by the storage service.
-- Run this INSERT via the SQL Editor in your Supabase Dashboard.
-- If this fails with permission issues, create the bucket manually in:
--   Supabase Dashboard → Storage → New Bucket
--   Name: product-images
--   Make it PUBLIC (Public bucket toggle ON)
--   File size limit: 20MB
--   Allowed mime types: image/jpeg, image/png, image/webp, image/jpg, image/gif
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  20971520,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- STORAGE POLICIES (RLS on storage.objects)
-- ============================================================
-- IMPORTANT: DO NOT run ALTER TABLE on storage.objects.
-- RLS is already enabled by default on storage.objects in Supabase.
-- storage.objects is owned by supabase_storage_admin; we cannot ALTER it.
-- Only run the DROP POLICY / CREATE POLICY statements below.

-- Drop existing policies if they exist (safe re-runs)
DROP POLICY IF EXISTS "Allow admin upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin select product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin update product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin delete product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read product images" ON storage.objects;

-- 1. Admin INSERT: Only the specific admin user can upload files
CREATE POLICY "Allow admin upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.uid() = 'e596cfbf-fef1-4c34-b8fc-59152a561d99'
);

-- 2. Admin SELECT: Admin can view uploaded file metadata
CREATE POLICY "Allow admin select product images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.uid() = 'e596cfbf-fef1-4c34-b8fc-59152a561d99'
);

-- 3. Admin UPDATE: Admin can overwrite/replace files (upsert support)
CREATE POLICY "Allow admin update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.uid() = 'e596cfbf-fef1-4c34-b8fc-59152a561d99'
)
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.uid() = 'e596cfbf-fef1-4c34-b8fc-59152a561d99'
);

-- 4. Admin DELETE: Admin can delete uploaded images
CREATE POLICY "Allow admin delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND auth.uid() = 'e596cfbf-fef1-4c34-b8fc-59152a561d99'
);

-- 5. Public READ: Everyone (storefront visitors) can view product images
CREATE POLICY "Allow public read product images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'product-images');
