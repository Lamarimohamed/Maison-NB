import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroBanner } from "./components/HeroBanner";
import { ProductGrid } from "./components/ProductGrid";
import { LightboxModal } from "./components/LightboxModal";
import { OrderModal } from "./components/OrderModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { supabase } from "@/lib/supabase";
import { Footer } from "./components/Footer";
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  Product,
  Category,
  Order,
  OrderStatus,
} from "@/data/initialData";
import { Toaster, toast } from "sonner";

export default function App() {
  const [currentView, setCurrentView] = useState<"store" | "admin">("store");
  
  // Data states
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Search & Filters
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Lightbox Modal State
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: string[];
    initialIndex: number;
    productName: string;
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0,
    productName: "",
  });

  // Order Form Modal State
  const [orderModalState, setOrderModalState] = useState<{
    isOpen: boolean;
    product: Product | null;
  }>({
    isOpen: false,
    product: null,
  });

  // Simulate skeleton loader when switching categories or searching
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Set RTL direction on html
  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: cats, error: catError } = await supabase.from('categories').select('*');
        if (cats && !catError) setCategories(cats);

        const { data: prods, error: prodError } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (prods && !prodError) setProducts(prods);

        const { data: ords, error: ordError } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (ords && !ordError) setOrders(ords);
      } catch (err) {
        console.error("Supabase fetch error:", err);
      }
    };
    fetchData();
  }, []);

  // Filter products by category and search term
  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category_id === activeCategory;
    const matchesSearch =
      !searchTerm ||
      p.name.includes(searchTerm) ||
      p.description.includes(searchTerm) ||
      p.sizes.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeCategoryName =
    categories.find((c) => c.id === activeCategory)?.name || "الكل";

  // Lightbox Handler
  const handleOpenLightbox = (images: string[], index: number, name: string) => {
    // Increment view counter
    setProducts((prev) =>
      prev.map((p) => (p.name === name ? { ...p, views: p.views + 1 } : p))
    );

    setLightboxState({
      isOpen: true,
      images,
      initialIndex: index,
      productName: name,
    });
  };

  // Order Modal Handler
  const handleOpenOrder = (product: Product) => {
    // Increment click counter
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, clicks: p.clicks + 1 } : p))
    );

    setOrderModalState({
      isOpen: true,
      product,
    });
  };

  // Submit Order Action
  const handleSubmitOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Admin Actions
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleDeleteProduct = (prodId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
  };

  const handleAddCategory = (name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, "-");
    setCategories((prev) => [...prev, { id, name }]);
  };

  const handleDeleteCategory = (catId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    if (activeCategory === catId) setActiveCategory("all");
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    toast.success(`تم تحديث حالة الطلب ${orderId} إلى: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1A17] font-arabic antialiased selection:bg-[#B88A44] selection:text-white flex flex-col justify-between">
      <Toaster position="top-center" richColors dir="rtl" />

      {currentView === "admin" ? (
        /* Admin Dashboard View */
        <AdminDashboard
          products={products}
          categories={categories}
          orders={orders}
          onUpdateProduct={handleUpdateProduct}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onExitAdmin={() => setCurrentView("store")}
        />
      ) : (
        /* Public Storefront View */
        <div className="flex-1">
          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
            currentView={currentView}
            setCurrentView={setCurrentView}
            ordersCount={orders.length}
          />

          <main className="pt-[140px] sm:pt-[160px]">
            {/* Hero Section */}
            <HeroBanner />

            {/* Catalog Grid */}
            <div id="product-catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductGrid
                products={filteredProducts}
                isLoading={isLoading}
                activeCategory={activeCategory}
                categoryName={activeCategoryName}
                searchTerm={searchTerm}
                onOpenOrder={handleOpenOrder}
                onOpenLightbox={handleOpenLightbox}
              />
            </div>
          </main>

          <Footer />
        </div>
      )}

      {/* Lightbox Swipe / Zoom Modal */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        images={lightboxState.images}
        initialIndex={lightboxState.initialIndex}
        productName={lightboxState.productName}
      />

      {/* On-Site Order Modal with 58 Wilayas + Communes */}
      <OrderModal
        isOpen={orderModalState.isOpen}
        onClose={() => setOrderModalState({ isOpen: false, product: null })}
        product={orderModalState.product}
        onSubmitOrder={handleSubmitOrder}
        onOpenLightbox={handleOpenLightbox}
      />
    </div>
  );
}
