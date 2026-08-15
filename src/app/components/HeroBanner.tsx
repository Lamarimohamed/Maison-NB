import React from "react";
import heroBannerImg from "@/imports/photo_2026-08-14_21-40-24.jpg";
import { Sparkles } from "lucide-react";

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#1F1A17] text-[#FAF8F5] mb-5 sm:mb-8 rounded-xl sm:rounded-2xl shadow-lg mx-3 sm:mx-6 lg:mx-8 border border-[#B88A44]/30">
      {/* Background Image with Warm Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBannerImg}
          alt="MAISON NB Women's Fashion Collection"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A17] via-[#1F1A17]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-5 sm:py-14 text-center space-y-2 sm:space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B88A44]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-wide">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>تشكيلة الموسم الجديد 2026 — الجزائر</span>
        </div>

        {/* Compact Title Window for Mobile */}
        <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-[#FAF8F5] leading-snug font-serif tracking-tight">
          L'élégance dans chaque détail
          <span className="block text-[#D4AF37] text-sm sm:text-2xl md:text-3xl mt-1 font-arabic font-bold">
            الأناقة والفخامة في كل تفصيلة
          </span>
        </h1>

        <p className="text-[11px] sm:text-sm text-[#D9D2C7] max-w-xl mx-auto font-light leading-relaxed">
          أرقى الموديلات النسائية المصممة بعناية. طلب مباشر بتوصيل سريع لجميع 58 ولاية والدفع عند الاستلام.
        </p>

        {/* Feature Badges */}
        <div className="pt-3 border-t border-[#B88A44]/20 grid grid-cols-3 gap-1 text-center text-[10px] sm:text-xs text-[#D9D2C7]/90 max-w-md mx-auto">
          <div>
            <span className="block font-bold text-[#D4AF37]">58 ولاية</span>
            <span className="text-[9px] sm:text-[11px] font-light">توصيل للمنزل</span>
          </div>
          <div className="border-r border-l border-[#B88A44]/20">
            <span className="block font-bold text-[#D4AF37]">الدفع عند الاستلام</span>
            <span className="text-[9px] sm:text-[11px] font-light">نقدًا مع المعاينة</span>
          </div>
          <div>
            <span className="block font-bold text-[#D4AF37]">جودة ممتازة</span>
            <span className="text-[9px] sm:text-[11px] font-light">أقمشة فاخرة</span>
          </div>
        </div>
      </div>
    </div>
  );
};
