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
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);

-- Allow public to insert orders (unauthenticated users can place orders)
CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT WITH CHECK (true);

-- Admin full access policies (restricted to the specific admin user ID)
CREATE POLICY "Allow admin full access on categories" ON public.categories FOR ALL USING (auth.uid() = 'dbfe96ca-fe4a-40c4-a53e-d02e12a2ba72');
CREATE POLICY "Allow admin full access on products" ON public.products FOR ALL USING (auth.uid() = 'dbfe96ca-fe4a-40c4-a53e-d02e12a2ba72');
CREATE POLICY "Allow admin full access on orders" ON public.orders FOR ALL USING (auth.uid() = 'dbfe96ca-fe4a-40c4-a53e-d02e12a2ba72');

-- Insert initial categories
INSERT INTO public.categories (id, name) VALUES 
('all', 'الكل'),
('dresses', 'فساتين'),
('abayas', 'عبايات'),
('coats', 'معاطف')
ON CONFLICT (id) DO NOTHING;
