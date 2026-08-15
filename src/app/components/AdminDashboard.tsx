import React, { useState } from "react";
import { Product, Category, Order, OrderStatus } from "@/data/initialData";
import {
  Lock,
  ShoppingBag,
  Package,
  FolderPlus,
  BarChart3,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Plus,
  Trash2,
  Edit,
  Eye,
  MousePointerClick,
  DollarSign,
  TrendingUp,
  LogOut,
  Sparkles,
  Search,
  FileText
} from "lucide-react";
import { toast } from "sonner";

interface AdminDashboardProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onAddCategory: (categoryName: string) => void;
  onDeleteCategory: (categoryId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  categories,
  orders,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onAddCategory,
  onDeleteCategory,
  onUpdateOrderStatus,
  onExitAdmin,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default true for seamless demo preview
  const [email, setEmail] = useState("admin@maison-nb.dz");
  const [password, setPassword] = useState("admin123");

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "categories" | "analytics">("orders");

  // Filter Orders
  const [orderFilter, setOrderFilter] = useState<"all" | OrderStatus>("all");
  const [orderSearch, setOrderSearch] = useState("");

  // Product Form Modal state (For Add/Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New/Edit Product Form Fields
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState<number>(5000);
  const [prodOrigPrice, setProdOriginalPrice] = useState<number | undefined>(undefined);
  const [prodCat, setProdCat] = useState(categories[1]?.id || "dresses");
  const [prodSizes, setProdSizes] = useState<string[]>(["S", "M", "L", "XL"]);
  const [prodImages, setProdImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&fit=crop&auto=format"
  ]);
  const [prodImageInput, setProdImageInput] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodInStock, setProdInStock] = useState(true);
  const [prodIsFeatured, setProdIsFeatured] = useState(false);

  // Category Add Field
  const [newCatName, setNewCatName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsAuthenticated(true);
      toast.success("مرحباً بك في لوحة تحكم MAISON NB");
    } else {
      toast.error("يرجى إدخال بيانات الدخول");
    }
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProdName("");
    setProdPrice(6500);
    setProdOriginalPrice(undefined);
    setProdCat(categories[1]?.id || "dresses");
    setProdSizes(["S", "M", "L", "XL"]);
    setProdImages(["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&fit=crop&auto=format"]);
    setProdDesc("");
    setProdInStock(true);
    setProdIsFeatured(false);
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (p: Product) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice);
    setProdCat(p.category_id);
    setProdSizes(p.sizes);
    setProdImages(p.images);
    setProdDesc(p.description);
    setProdInStock(p.in_stock);
    setProdIsFeatured(!!p.is_featured);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) {
      toast.error("اسم المنتج مطلوب");
      return;
    }

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: prodName.trim(),
        price: Number(prodPrice),
        originalPrice: prodOrigPrice ? Number(prodOrigPrice) : undefined,
        category_id: prodCat,
        sizes: prodSizes,
        images: prodImages,
        description: prodDesc,
        in_stock: prodInStock,
        is_featured: prodIsFeatured,
      };
      onUpdateProduct(updated);
      toast.success("تم تحديث المنتج بنجاح");
    } else {
      const created: Product = {
        id: `prod-${Date.now()}`,
        name: prodName.trim(),
        price: Number(prodPrice),
        originalPrice: prodOrigPrice ? Number(prodOrigPrice) : undefined,
        category_id: prodCat,
        sizes: prodSizes,
        images: prodImages,
        description: prodDesc,
        in_stock: prodInStock,
        is_featured: prodIsFeatured,
        created_at: new Date().toISOString(),
        views: 0,
        clicks: 0,
      };
      onAddProduct(created);
      toast.success("تم إضافة المنتج الجديد بنجاح");
    }
    setIsProductModalOpen(false);
  };

  const handleAddImageUrl = () => {
    if (prodImageInput.trim()) {
      setProdImages([...prodImages, prodImageInput.trim()]);
      setProdImageInput("");
      toast.success("تم إضافة رابط الصورة");
    }
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      onAddCategory(newCatName.trim());
      setNewCatName("");
      toast.success("تم إضافة القسم الجديد بنجاح");
    }
  };

  // Filter Orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderFilter === "all" || o.status === orderFilter;
    const matchesSearch =
      !orderSearch ||
      o.full_name.includes(orderSearch) ||
      o.phone.includes(orderSearch) ||
      o.id.includes(orderSearch) ||
      o.wilaya.includes(orderSearch);
    return matchesStatus && matchesSearch;
  });

  // Calculate Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "cancelled" ? o.price : 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === "pending").length;
  const totalViews = products.reduce((sum, p) => sum + p.views, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1F1A17] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl p-8 shadow-2xl border border-[#B88A44]/30 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#1F1A17] text-[#D4AF37] flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#1F1A17]">لوحة تحكم MAISON NB</h2>
            <p className="text-xs text-[#786F66]">سجلي الدخول لمتابعة الطلبات وتعديل المنتجات</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1F1A17]">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#B88A44]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B88A44]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1F1A17]">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#B88A44]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B88A44]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1F1A17] text-[#D4AF37] font-bold rounded-xl text-sm hover:bg-[#B88A44] hover:text-white transition-all shadow-md"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onExitAdmin}
              className="text-xs text-[#786F66] hover:text-[#1F1A17] underline"
            >
              العودة إلى المتجر الرئيسي
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-16">
      
      {/* Top Admin Header */}
      <header className="bg-[#1F1A17] text-[#FAF8F5] border-b border-[#B88A44]/30 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#B88A44]/20 text-[#D4AF37] rounded-xl border border-[#D4AF37]/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-lg font-bold text-[#FAF8F5] flex items-center gap-2">
                لوحة التحكم الإدارية
                <span className="text-xs font-mono bg-[#B88A44] text-white px-2 py-0.5 rounded-full">Admin</span>
              </h1>
              <p className="text-xs text-[#D9D2C7]">إدارة الطلبات والمنتجات والتصنيفات - MAISON NB</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF8F5] text-[#1F1A17] text-xs font-bold hover:bg-[#D4AF37] transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>مشاهدة المتجر</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#B88A44]/20 no-scrollbar">
          
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-[#1F1A17] text-[#D4AF37] shadow-md scale-105"
                : "bg-white text-[#1F1A17] border border-[#B88A44]/20 hover:bg-[#F3ECE2]"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>طلبات الزبائن ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                {pendingOrdersCount} جديد
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "products"
                ? "bg-[#1F1A17] text-[#D4AF37] shadow-md scale-105"
                : "bg-white text-[#1F1A17] border border-[#B88A44]/20 hover:bg-[#F3ECE2]"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>إدارة المنتجات ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "categories"
                ? "bg-[#1F1A17] text-[#D4AF37] shadow-md scale-105"
                : "bg-white text-[#1F1A17] border border-[#B88A44]/20 hover:bg-[#F3ECE2]"
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>الأقسام ({categories.length - 1})</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "analytics"
                ? "bg-[#1F1A17] text-[#D4AF37] shadow-md scale-105"
                : "bg-white text-[#1F1A17] border border-[#B88A44]/20 hover:bg-[#F3ECE2]"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>الإحصائيات والأداء</span>
          </button>

        </div>

        {/* TAB 1: ORDERS VIEW */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            
            {/* Filter & Search Bar for Orders */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#B88A44]/20 shadow-2xs">
              
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute right-3 top-3 text-[#786F66]" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="ابحث بالاسم، الهاتف، الولاية، أو رقم الطلب..."
                  className="w-full pr-9 pl-3 py-2 bg-[#FAF8F5] border border-[#B88A44]/30 rounded-xl text-xs text-[#1F1A17] focus:outline-none focus:ring-2 focus:ring-[#B88A44]"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
                {[
                  { id: "all", label: "الكل" },
                  { id: "pending", label: "قيد الانتظار" },
                  { id: "confirmed", label: "مؤكد" },
                  { id: "shipped", label: "تم الشحن" },
                  { id: "delivered", label: "تم التسليم" },
                  { id: "cancelled", label: "ملغى" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderFilter(st.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                      orderFilter === st.id
                        ? "bg-[#B88A44] text-white shadow-xs"
                        : "bg-[#F3ECE2] text-[#1F1A17] hover:bg-[#B88A44]/10"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#B88A44]/20">
                <p className="text-sm font-bold text-[#1F1A17]">لا توجد طلبات في القائمة</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-2xl p-5 border border-[#B88A44]/20 hover:border-[#B88A44] transition-all shadow-xs space-y-4"
                  >
                    
                    {/* Top Row: Order ID, Timestamp & Status Selector */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#B88A44]/15 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-extrabold text-[#B88A44] bg-[#F3ECE2] px-2.5 py-1 rounded-lg">
                          {ord.id}
                        </span>
                        <span className="text-xs text-[#786F66] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(ord.created_at).toLocaleString("ar-DZ")}
                        </span>
                      </div>

                      {/* Status Update Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#786F66]">حالة الطلب:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer focus:outline-none ${
                            ord.status === "pending"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : ord.status === "confirmed"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : ord.status === "shipped"
                              ? "bg-purple-50 text-purple-800 border-purple-300"
                              : ord.status === "delivered"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-red-50 text-red-800 border-red-300"
                          }`}
                        >
                          <option value="pending">قيد الانتظار (Pending)</option>
                          <option value="confirmed">مؤكد (Confirmed)</option>
                          <option value="shipped">تم الشحن (Shipped)</option>
                          <option value="delivered">تم التسليم (Delivered)</option>
                          <option value="cancelled">ملغى (Cancelled)</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Product Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      
                      {/* Product details */}
                      <div className="flex gap-3 bg-[#FAF8F5] p-3 rounded-xl border border-[#B88A44]/15">
                        <img
                          src={ord.product_image}
                          alt=""
                          className="w-16 h-20 object-cover rounded-lg shrink-0 border"
                        />
                        <div className="space-y-1">
                          <h4 className="font-bold text-[#1F1A17] line-clamp-2">{ord.product_name}</h4>
                          <div className="text-xs text-[#786F66]">
                            المقاس: <strong className="font-mono text-[#1F1A17]">{ord.size}</strong>
                          </div>
                          <div className="font-extrabold text-[#B88A44]">
                            {ord.price.toLocaleString("fr-DZ")} د.ج
                          </div>
                        </div>
                      </div>

                      {/* Customer Info */}
                      <div className="space-y-2 bg-[#FAF8F5] p-3 rounded-xl border border-[#B88A44]/15">
                        <div className="font-bold text-[#1F1A17] text-sm flex items-center justify-between">
                          <span>{ord.full_name}</span>
                          <a
                            href={`tel:${ord.phone}`}
                            className="text-[#B88A44] hover:underline flex items-center gap-1 font-mono text-xs"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span dir="ltr">{ord.phone}</span>
                          </a>
                        </div>
                        <div className="text-[#786F66] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#B88A44] shrink-0" />
                          <span className="font-semibold text-[#1F1A17]">{ord.wilaya}</span> — {ord.commune}
                        </div>
                        <div className="text-[#786F66]">
                          العنوان: <span className="text-[#1F1A17]">{ord.address}</span>
                        </div>
                      </div>

                      {/* Notes / Special Instructions */}
                      <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#B88A44]/15 flex flex-col justify-between space-y-2">
                        <div>
                          <span className="font-bold text-[#1F1A17] flex items-center gap-1 mb-1">
                            <FileText className="w-3.5 h-3.5 text-[#B88A44]" />
                            ملاحظات الزبونة:
                          </span>
                          <p className="text-[#786F66] italic">
                            {ord.notes ? `"${ord.notes}"` : "لا توجد ملاحظات إضافية."}
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD */}
        {activeTab === "products" && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#B88A44]/20">
              <h2 className="text-base font-bold text-[#1F1A17]">قائمة كافة التشكيلات والمنتجات</h2>
              <button
                onClick={openNewProductModal}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#1F1A17] text-[#D4AF37] font-bold rounded-xl text-xs hover:bg-[#B88A44] hover:text-white transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة موديل جديد</span>
              </button>
            </div>

            {/* Product Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white p-4 rounded-2xl border border-[#B88A44]/20 flex gap-3 shadow-2xs hover:shadow-md transition-all">
                  <img
                    src={p.images[0]}
                    alt=""
                    className="w-20 h-28 object-cover rounded-xl shrink-0 border"
                  />
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#B88A44] bg-[#F3ECE2] px-2 py-0.5 rounded-md">
                          {categories.find((c) => c.id === p.category_id)?.name || p.category_id}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${p.in_stock ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                          {p.in_stock ? "متوفر" : "غير متوفر"}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#1F1A17] text-xs line-clamp-2 mt-1">{p.name}</h3>
                      <div className="font-extrabold text-[#B88A44] text-sm mt-1">
                        {p.price.toLocaleString("fr-DZ")} د.ج
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-[#B88A44]/15">
                      <button
                        onClick={() => openEditProductModal(p)}
                        className="flex-1 py-1.5 bg-[#FAF8F5] text-[#1F1A17] border border-[#B88A44]/30 rounded-lg text-xs font-semibold hover:bg-[#B88A44] hover:text-white transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكدي من حذف الموديل: ${p.name}؟`)) {
                            onDeleteProduct(p.id);
                            toast.success("تم الحذف بنجاح");
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: CATEGORY MANAGEMENT */}
        {activeTab === "categories" && (
          <div className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-2xl border border-[#B88A44]/20">
            <h2 className="text-lg font-bold text-[#1F1A17] border-b border-[#B88A44]/20 pb-3">
              إدارة الأقسام والتصنيفات
            </h2>

            {/* Add New Category */}
            <form onSubmit={handleAddCategorySubmit} className="flex gap-2">
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="اسم القسم الجديد (مثال: فساتين خطوبة، طرحات)..."
                className="flex-1 px-4 py-2 bg-[#FAF8F5] border border-[#B88A44]/30 rounded-xl text-xs text-[#1F1A17] focus:outline-none focus:ring-2 focus:ring-[#B88A44]"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#1F1A17] text-[#D4AF37] font-bold rounded-xl text-xs hover:bg-[#B88A44] hover:text-white transition-colors"
              >
                إضافة القسم
              </button>
            </form>

            {/* Category List */}
            <div className="space-y-2 pt-2">
              {categories.filter((c) => c.id !== "all").map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#B88A44]/15">
                  <span className="font-bold text-xs text-[#1F1A17]">{cat.name}</span>
                  <button
                    onClick={() => {
                      if (confirm(`حذف القسم "${cat.name}"؟`)) {
                        onDeleteCategory(cat.id);
                        toast.success("تم الحذف");
                      }
                    }}
                    className="text-red-500 hover:text-red-700 p-1 text-xs"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#B88A44]/20 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[#B88A44]">
                  <span className="text-xs font-bold text-[#786F66]">إجمالي المبيعات المؤكدة</span>
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-[#1F1A17]">
                  {totalRevenue.toLocaleString("fr-DZ")} <span className="text-xs font-normal">د.ج</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#B88A44]/20 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[#B88A44]">
                  <span className="text-xs font-bold text-[#786F66]">عدد الطلبات الكلي</span>
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-[#1F1A17]">{orders.length} طلب</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#B88A44]/20 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[#B88A44]">
                  <span className="text-xs font-bold text-[#786F66]">مشاهدات المنتجات</span>
                  <Eye className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-[#1F1A17]">{totalViews} زائرة</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#B88A44]/20 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-[#B88A44]">
                  <span className="text-xs font-bold text-[#786F66]">نسبة تحويل الطلبات</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-emerald-600">8.4%</div>
              </div>
            </div>

            {/* Most viewed / clicked products */}
            <div className="bg-white p-6 rounded-2xl border border-[#B88A44]/20 space-y-4">
              <h3 className="text-sm font-bold text-[#1F1A17]">أكثر الموديلات مشاهدة واهتماماً من الزبونات</h3>
              <div className="space-y-3">
                {products.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-4 p-3 bg-[#FAF8F5] rounded-xl border border-[#B88A44]/15 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} className="w-10 h-12 object-cover rounded-md" alt="" />
                      <span className="font-bold text-[#1F1A17]">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[#786F66]">
                      <span className="flex items-center gap-1 font-mono"><Eye className="w-3.5 h-3.5 text-[#B88A44]" /> {p.views} مشاهدة</span>
                      <span className="flex items-center gap-1 font-mono"><MousePointerClick className="w-3.5 h-3.5 text-[#B88A44]" /> {p.clicks} نقرة</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* PRODUCT FORM MODAL (ADD / EDIT) */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xl border border-[#B88A44]/30 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base text-[#1F1A17]">
                {editingProduct ? "تعديل بيانات الموديل" : "إضافة موديل جديد"}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)}>
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#1F1A17]">اسم الموديل</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full mt-1 p-2.5 border rounded-xl bg-[#FAF8F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1F1A17]">السعر (د.ج)</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full mt-1 p-2.5 border rounded-xl bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#1F1A17]">السعر الأصلي قبل التخفيض (اختياري)</label>
                  <input
                    type="number"
                    value={prodOrigPrice || ""}
                    onChange={(e) => setProdOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full mt-1 p-2.5 border rounded-xl bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1F1A17]">القسم</label>
                <select
                  value={prodCat}
                  onChange={(e) => setProdCat(e.target.value)}
                  className="w-full mt-1 p-2.5 border rounded-xl bg-[#FAF8F5]"
                >
                  {categories.filter((c) => c.id !== "all").map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1F1A17]">الوصف والتفاصيل</label>
                <textarea
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full mt-1 p-2.5 border rounded-xl bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1F1A17]">روابط الصور (معاينة وتحكم)</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="url"
                    value={prodImageInput}
                    onChange={(e) => setProdImageInput(e.target.value)}
                    placeholder="رابط صورة Unsplash أو رابط مباشر..."
                    className="flex-1 p-2 border rounded-xl bg-[#FAF8F5]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3 py-1 bg-[#1F1A17] text-[#D4AF37] font-bold rounded-xl"
                  >
                    إضافة
                  </button>
                </div>

                <div className="flex gap-2 mt-2 overflow-x-auto">
                  {prodImages.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-20 rounded-lg overflow-hidden border shrink-0">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setProdImages(prodImages.filter((_, i) => i !== idx))}
                        className="absolute top-0 right-0 bg-red-600 text-white p-0.5 rounded-bl-md"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={prodInStock}
                    onChange={(e) => setProdInStock(e.target.checked)}
                    className="rounded"
                  />
                  <span>متوفر في المخزون</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={prodIsFeatured}
                    onChange={(e) => setProdIsFeatured(e.target.checked)}
                    className="rounded"
                  />
                  <span>عرض في الواجهة الكبرى</span>
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1F1A17] text-[#D4AF37] font-bold rounded-2xl text-sm hover:bg-[#B88A44] hover:text-white transition-all shadow-md"
                >
                  حفظ البيانات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
