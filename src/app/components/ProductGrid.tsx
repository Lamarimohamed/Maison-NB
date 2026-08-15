import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/data/initialData";
import { ArrowUpDown, SlidersHorizontal, Loader2, PackageX, Sparkles } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  activeCategory: string;
  categoryName: string;
  searchTerm: string;
  onOpenOrder: (product: Product) => void;
  onOpenLightbox: (images: string[], index: number, name: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  activeCategory,
  categoryName,
  searchTerm,
  onOpenOrder,
  onOpenLightbox,
}) => {
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <section className="space-y-6">
      {/* Bar: Active Category Title, Results Count, and Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#B88A44]/20">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F1A17] flex items-center gap-2">
            <span>{categoryName || "كافة التصاميم"}</span>
            <span className="text-xs bg-[#F3ECE2] text-[#B88A44] border border-[#B88A44]/30 px-2.5 py-0.5 rounded-full font-bold">
              {products.length} موديل
            </span>
          </h2>
          {searchTerm && (
            <p className="text-xs text-[#786F66] mt-1">
              نتائج البحث عن: <span className="font-bold text-[#1F1A17]">"{searchTerm}"</span>
            </p>
          )}
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label className="text-xs text-[#786F66] font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#B88A44]" />
            <span>ترتيب حسب:</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-[#B88A44]/30 rounded-lg text-xs py-1.5 px-3 text-[#1F1A17] font-medium focus:outline-none focus:ring-2 focus:ring-[#B88A44]/50 shadow-2xs cursor-pointer"
          >
            <option value="newest">الأحدث وصولاً</option>
            <option value="price-asc">السعر: من الأقل للأعلى</option>
            <option value="price-desc">السعر: من الأعلى للأقل</option>
          </select>
        </div>
      </div>

      {/* Loading Skeleton state as requested: lazy-loading state ("جارٍ تحميل الموديلات…") */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-[#B88A44] font-medium bg-[#F3ECE2]/50 rounded-2xl border border-[#B88A44]/20 animate-pulse">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>جارٍ تحميل الموديلات والتشكيلة الجديدة…</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 p-3 space-y-3 animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 bg-gray-200 rounded-full w-20" />
                  <div className="h-8 bg-gray-200 rounded-full w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : sortedProducts.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#B88A44]/20 space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#B88A44]">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#1F1A17]">عذراً، لم نجد أي موديلات مطابقة</h3>
          <p className="text-xs text-[#786F66] max-w-sm mx-auto">
            جربي البحث بكلمات أخرى أو اختر أجهزة أخرى من الأقسام العلوية.
          </p>
        </div>
      ) : (
        /* Product Cards Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenOrder={onOpenOrder}
              onOpenLightbox={onOpenLightbox}
            />
          ))}
        </div>
      )}
    </section>
  );
};
