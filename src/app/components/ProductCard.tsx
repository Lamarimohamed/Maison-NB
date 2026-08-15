import React from "react";
import { Eye, ShoppingBag, Sparkles } from "lucide-react";
import { Product } from "@/data/initialData";

interface ProductCardProps {
  product: Product;
  onOpenOrder: (product: Product) => void;
  onOpenLightbox: (images: string[], index: number, name: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenOrder,
  onOpenLightbox,
}) => {
  const mainImage = product.images[0] || "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&fit=crop&auto=format";

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#B88A44]/20 hover:border-[#B88A44] transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[3/4] bg-[#F5F1EA] overflow-hidden cursor-pointer">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          onClick={() => onOpenLightbox(product.images, 0, product.name)}
          loading="lazy"
        />

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-2.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenLightbox(product.images, 0, product.name);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-[#1F1A17] text-[10px] sm:text-xs font-semibold hover:bg-white shadow-md transition-colors"
          >
            <Eye className="w-3 h-3 text-[#B88A44]" />
            <span>عرض الصور ({product.images.length})</span>
          </button>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end">
          {product.is_featured && (
            <span className="bg-[#1F1A17] text-[#D4AF37] border border-[#D4AF37]/50 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              الأكثر طلباً
            </span>
          )}

          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-[#C93B3B] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
              تخفيض
            </span>
          )}
        </div>

        {/* Stock Status Tag */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
              نفذت الكمية حالياً
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-2.5 sm:p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Sizes preview */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[9px] sm:text-[10px] text-[#786F66] font-medium">المقاسات:</span>
            {product.sizes.map((s) => (
              <span key={s} className="text-[9px] sm:text-[10px] font-mono px-1 py-0.2 bg-[#F3ECE2] text-[#1F1A17] rounded">
                {s}
              </span>
            ))}
          </div>

          <h3
            onClick={() => onOpenLightbox(product.images, 0, product.name)}
            className="text-xs sm:text-base font-bold text-[#1F1A17] line-clamp-2 hover:text-[#B88A44] transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Precise Compact "Order Now" Button */}
        <div className="pt-2 border-t border-[#B88A44]/15 flex items-center justify-between gap-1">
          <div>
            <div className="text-sm sm:text-lg font-black text-[#B88A44] flex items-baseline gap-0.5">
              <span>{product.price.toLocaleString("fr-DZ")}</span>
              <span className="text-[10px] sm:text-xs font-normal text-[#1F1A17]">د.ج</span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-[#786F66] line-through block">
                {product.originalPrice.toLocaleString("fr-DZ")} د.ج
              </span>
            )}
          </div>

          <button
            onClick={() => onOpenOrder(product)}
            disabled={!product.in_stock}
            className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-sm shrink-0 ${
              product.in_stock
                ? "bg-[#1F1A17] text-[#D4AF37] hover:bg-[#B88A44] hover:text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>اطلبي الآن</span>
          </button>
        </div>
      </div>
    </div>
  );
};
