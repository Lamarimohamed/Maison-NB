import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, Truck, Phone, MapPin, Sparkles, User, FileText, ShoppingBag, Eye } from "lucide-react";
import { Product, Order } from "@/data/initialData";
import { ALGERIA_WILAYAS, getCommunesByWilayaCode } from "@/data/algeriaData";
import { getShippingRate } from "@/data/shippingRates";
import { toast } from "sonner";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmitOrder: (newOrder: Order) => void;
  onOpenLightbox?: (images: string[], index: number, name: string) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubmitOrder,
  onOpenLightbox,
}) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState(ALGERIA_WILAYAS[15].name); // Default 16 - Alger
  const [selectedCommune, setSelectedCommune] = useState("");
  const [communesList, setCommunesList] = useState<string[]>([]);
  const [deliveryType, setDeliveryType] = useState<"home" | "desk">("home");
  const [address, setAddress] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [notes, setNotes] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  // Phone validation error state
  const [phoneError, setPhoneError] = useState("");

  // Update communes whenever wilaya changes
  useEffect(() => {
    if (selectedWilaya) {
      const foundWilaya = ALGERIA_WILAYAS.find((w) => w.name === selectedWilaya);
      if (foundWilaya) {
        setCommunesList(foundWilaya.communes);
        setSelectedCommune(foundWilaya.communes[0] || "");
      } else {
        setCommunesList([]);
        setSelectedCommune("");
      }
    }
  }, [selectedWilaya]);

  // Set default size when product loads
  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    } else {
      setSelectedColor("");
    }
    setIsSubmittedSuccess(false);
    setSubmittedOrder(null);
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const currentWilaya = ALGERIA_WILAYAS.find((w) => w.name === selectedWilaya);
  const shippingRate = currentWilaya ? getShippingRate(currentWilaya.code) : null;
  const deliveryPrice = shippingRate ? (deliveryType === "home" ? shippingRate.home : shippingRate.desk) : 0;
  const totalPrice = product.price + deliveryPrice;

  const validatePhone = (val: string) => {
    const clean = val.trim();
    // Algerian phone format starts with 05, 06, 07, 02 followed by 8 digits
    const regex = /^(05|06|07|02)[0-9]{8}$/;
    if (!clean) return "رقم الهاتف مطلوب";
    if (!regex.test(clean)) return "يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0550123456)";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const err = validatePhone(phone);
    if (err) {
      setPhoneError(err);
      toast.error(err);
      return;
    }
    setPhoneError("");

    if (!fullName.trim()) {
      toast.error("يرجى إدخال الاسم الكامل");
      return;
    }

    if (!address.trim()) {
      toast.error("يرجى إدخال عنوان التوصيل بالتفصيل");
      return;
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("يرجى اختيار اللون المطلوب");
      return;
    }

    if (!shippingRate) {
      toast.error("عذراً، التوصيل غير متوفر حالياً لهذه الولاية. يرجى اختيار ولاية أخرى أو التواصل معنا هاتفياً");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        product_id: product.id,
        product_name: product.name,
        product_image: product.images[0] || "",
        price: product.price,
        full_name: fullName.trim(),
        phone: phone.trim(),
        wilaya: selectedWilaya,
        commune: selectedCommune,
        address: address.trim(),
        size: selectedSize || product.sizes[0] || "Standard",
        color: selectedColor || undefined,
        delivery_type: deliveryType,
        delivery_price: deliveryPrice,
        total_price: totalPrice,
        notes: notes.trim(),
        status: "pending",
        created_at: new Date().toISOString(),
      };

      onSubmitOrder(newOrder);
      setSubmittedOrder(newOrder);
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
      toast.success("تم استلام طلبك بنجاح!");
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#B88A44]/30 overflow-hidden my-8">
        
        {/* Header Modal */}
        <div className="bg-[#1F1A17] text-[#FAF8F5] p-5 flex items-center justify-between border-b border-[#B88A44]/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-lg font-bold text-[#FAF8F5]">
              {isSubmittedSuccess ? "تأكيد استقبال الطلب" : "استمارة الطلب المباشر"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSubmittedSuccess && submittedOrder ? (
            /* Confirmation Success State */
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#1F1A17]">تم استلام طلبك بنجاح!</h3>
                <p className="text-sm text-[#786F66] max-w-md mx-auto">
                  شكراً لثقتك بـ <strong className="text-[#B88A44]">MAISON NB</strong>. وسنتصل بك قريباً عبر الهاتف لتأكيد التوصيل والعنوان.
                </p>
              </div>

              <div className="bg-[#F5F1EA] p-5 rounded-2xl border border-[#B88A44]/20 text-right max-w-lg mx-auto space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-[#B88A44]/20 pb-2">
                  <span className="font-bold text-[#1F1A17]">رقم الطلب:</span>
                  <span className="font-mono text-sm font-bold text-[#B88A44]">{submittedOrder.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#786F66]">المنتج:</span>
                  <span className="font-bold text-[#1F1A17] max-w-[240px] truncate">{submittedOrder.product_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#786F66]">المقاس المختصر:</span>
                  <span className="font-bold font-mono text-[#1F1A17]">{submittedOrder.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#786F66]">الولاية والبلدية:</span>
                  <span className="font-bold text-[#1F1A17]">{submittedOrder.wilaya} — {submittedOrder.commune}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#786F66]">طريقة التوصيل:</span>
                  <span className="font-bold text-[#1F1A17]">
                    {submittedOrder.delivery_type === "home" ? "توصيل للمنزل" : "استلام من المكتب"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#786F66]">سعر المنتج:</span>
                  <span className="font-bold text-[#1F1A17]">{submittedOrder.price.toLocaleString("fr-DZ")} د.ج</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#786F66]">سعر التوصيل:</span>
                  <span className="font-bold text-[#1F1A17]">{submittedOrder.delivery_price.toLocaleString("fr-DZ")} د.ج</span>
                </div>
                <div className="flex justify-between items-center border-t border-[#B88A44]/20 pt-2 text-sm">
                  <span className="font-bold text-[#1F1A17]">المبلغ الإجمالي (عند الاستلام):</span>
                  <span className="font-extrabold text-[#B88A44]">{submittedOrder.total_price.toLocaleString("fr-DZ")} د.ج</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#1F1A17] text-[#D4AF37] font-bold rounded-full text-sm hover:bg-[#B88A44] hover:text-white transition-all shadow-md"
              >
                متابعة التسوق
              </button>
            </div>
          ) : (
            /* Order Form */
            <div className="space-y-6">
              
              {/* Product Summary Box */}
              <div className="flex items-center gap-4 p-4 bg-[#F5F1EA] rounded-2xl border border-[#B88A44]/20">
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-200 shrink-0 border border-[#B88A44]/30">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {onOpenLightbox && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(product.images, 0, product.name)}
                      className="absolute inset-0 bg-black/30 hover:bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-bold text-[#B88A44] bg-[#B88A44]/10 px-2 py-0.5 rounded-full">
                    طلب مباشر على الموقع
                  </span>
                  <h3 className="text-sm font-bold text-[#1F1A17] leading-snug">{product.name}</h3>
                  <div className="text-base font-extrabold text-[#B88A44]">
                    {product.price.toLocaleString("fr-DZ")} <span className="text-xs font-normal text-[#1F1A17]">د.ج</span>
                  </div>
                  {shippingRate && (
                    <div className="text-[11px] text-[#786F66]">
                      + توصيل {deliveryPrice.toLocaleString("fr-DZ")} د.ج = <strong className="text-[#1F1A17]">{totalPrice.toLocaleString("fr-DZ")} د.ج</strong>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1F1A17] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#B88A44]" />
                    <span>الاسم الكامل <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: مريم بن ناصر"
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#B88A44]/30 rounded-xl text-sm text-[#1F1A17] focus:outline-none focus:ring-2 focus:ring-[#B88A44] transition-all"
                  />
                </div>

                {/* 2. Phone Number with Validation */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1F1A17] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#B88A44]" />
                    <span>رقم الهاتف <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) setPhoneError("");
                    }}
                    placeholder="0550123456 أو 0661234567"
                    className={`w-full px-4 py-2.5 bg-[#FAF8F5] border rounded-xl text-sm font-mono text-[#1F1A17] focus:outline-none focus:ring-2 transition-all ${
                      phoneError ? "border-red-500 focus:ring-red-400" : "border-[#B88A44]/30 focus:ring-[#B88A44]"
                    }`}
                  />
                  {phoneError && (
                    <p className="text-[11px] text-red-600 font-medium">{phoneError}</p>
                  )}
                </div>

                {/* 3. Wilaya (All 58 Algerian Wilayas) & 4. Commune */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Wilaya Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#1F1A17] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B88A44]" />
                      <span>الولاية (58 ولاية) <span className="text-red-500">*</span></span>
                    </label>
                    <select
                      value={selectedWilaya}
                      onChange={(e) => setSelectedWilaya(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#B88A44]/30 rounded-xl text-xs sm:text-sm text-[#1F1A17] font-medium focus:outline-none focus:ring-2 focus:ring-[#B88A44] cursor-pointer"
                    >
                      {ALGERIA_WILAYAS.map((w) => (
                        <option key={w.code} value={w.name}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Commune Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#1F1A17] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B88A44]" />
                      <span>البلدية <span className="text-red-500">*</span></span>
                    </label>
                    <select
                      value={selectedCommune}
                      onChange={(e) => setSelectedCommune(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#B88A44]/30 rounded-xl text-xs sm:text-sm text-[#1F1A17] font-medium focus:outline-none focus:ring-2 focus:ring-[#B88A44] cursor-pointer"
                    >
                      {communesList.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* 4b. Delivery Type: Home or Stop Desk */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1F1A17] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#B88A44]" />
                    <span>طريقة التوصيل <span className="text-red-500">*</span></span>
                  </label>

                  {shippingRate ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryType("home")}
                        className={`p-3 rounded-xl border text-right transition-all ${
                          deliveryType === "home"
                            ? "bg-[#1F1A17] text-[#D4AF37] border-[#1F1A17] shadow-md"
                            : "bg-[#FAF8F5] text-[#1F1A17] border-[#B88A44]/30 hover:bg-[#F3ECE2]"
                        }`}
                      >
                        <div className="text-xs font-bold">توصيل للمنزل</div>
                        <div className="text-[11px] opacity-80 mt-0.5">{shippingRate.home.toLocaleString("fr-DZ")} د.ج</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryType("desk")}
                        className={`p-3 rounded-xl border text-right transition-all ${
                          deliveryType === "desk"
                            ? "bg-[#1F1A17] text-[#D4AF37] border-[#1F1A17] shadow-md"
                            : "bg-[#FAF8F5] text-[#1F1A17] border-[#B88A44]/30 hover:bg-[#F3ECE2]"
                        }`}
                      >
                        <div className="text-xs font-bold">استلام من المكتب</div>
                        <div className="text-[11px] opacity-80 mt-0.5">{shippingRate.desk.toLocaleString("fr-DZ")} د.ج</div>
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-[11px] text-red-600">
                      عذراً، التوصيل غير متوفر حالياً لهذه الولاية. يرجى اختيار ولاية أخرى أو التواصل معنا هاتفياً لترتيب التوصيل.
                    </div>
                  )}
                </div>

                {/* 5. Address Details */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1F1A17]">
                    العنوان / تفاصيل التوصيل <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="اسم الحي، الشارع، أو بالقرب من مَعلَم معروف"
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#B88A44]/30 rounded-xl text-sm text-[#1F1A17] focus:outline-none focus:ring-2 focus:ring-[#B88A44] transition-all"
                  />
                </div>

                {/* 6. Size Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1F1A17]">
                    اختر المقاس المناسب <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {product.sizes.map((sz) => (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === sz
                            ? "bg-[#1F1A17] text-[#D4AF37] border-[#1F1A17] shadow-md scale-105"
                            : "bg-[#FAF8F5] text-[#1F1A17] border-[#B88A44]/30 hover:bg-[#F3ECE2]"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6b. Color Selector (only if product has defined colors) */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#1F1A17]">
                      اختر اللون المناسب <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {product.colors.map((col) => (
                        <button
                          type="button"
                          key={col}
                          onClick={() => setSelectedColor(col)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                            selectedColor === col
                              ? "bg-[#1F1A17] text-[#D4AF37] border-[#1F1A17] shadow-md scale-105"
                              : "bg-[#FAF8F5] text-[#1F1A17] border-[#B88A44]/30 hover:bg-[#F3ECE2]"
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Additional Notes */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1F1A17] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#B88A44]" />
                    <span>ملاحظات إضافية (اختياري)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أي تفاصيل خاصة بتوقيت التوصيل، اللون، أو مقاس خاص..."
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#B88A44]/30 rounded-xl text-sm text-[#1F1A17] focus:outline-none focus:ring-2 focus:ring-[#B88A44] transition-all resize-none"
                  />
                </div>

                {/* Order Guarantee Note */}
                <div className="p-3 bg-[#F3ECE2]/80 rounded-xl border border-[#B88A44]/20 text-[11px] text-[#786F66] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#B88A44] shrink-0" />
                  <span>
                    الدفع نقدًا عند الاستلام بعد معاينة الطلبية. لا يتطلب أي تحويل بنكي مسبق.
                  </span>
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || !shippingRate}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-[#1F1A17] to-[#362E28] text-[#D4AF37] font-bold rounded-2xl text-sm hover:brightness-125 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>جارٍ إرسال الطلب...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>تاكيد وإرسال الطلب الآن ({totalPrice.toLocaleString("fr-DZ")} د.ج)</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};