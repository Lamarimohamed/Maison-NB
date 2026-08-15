import React from "react";
import logoImg from "@/imports/photo_2026-08-14_21-39-31.jpg";
import { Phone, Mail, MapPin, Instagram, Facebook, ShieldCheck, Truck, Clock } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1F1A17] text-[#FAF8F5] pt-12 pb-8 border-t border-[#B88A44]/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#B88A44]/20">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <img
              src={logoImg}
              alt="MAISON NB"
              className="h-14 w-auto object-contain bg-white/10 p-2 rounded-xl"
            />
            <p className="text-xs text-[#D9D2C7] leading-relaxed">
              MAISON NB — علامة تجارية جزائرية متخصصة في الأزياء النسائية الراقية، الفساتين، والعبايات العصرية.
            </p>
            <p className="text-xs text-[#D4AF37] font-serif italic">
              "L'élégance dans chaque détail"
            </p>
          </div>

          {/* Col 2: Fast Ordering Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#D4AF37] border-b border-[#B88A44]/20 pb-2">
              خدمة التوصيل والطلب
            </h3>
            <ul className="space-y-2 text-xs text-[#D9D2C7]">
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B88A44] shrink-0" />
                <span>توصيل لجميع 58 ولاية جزائرية</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B88A44] shrink-0" />
                <span>الدفع نقدًا عند استلام الطلبية</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B88A44] shrink-0" />
                <span>معالجة الطلب خلال 24 ساعة</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Support */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#D4AF37] border-b border-[#B88A44]/20 pb-2">
              التواصل والدعم
            </h3>
            <ul className="space-y-2 text-xs text-[#D9D2C7]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B88A44] shrink-0" />
                <span dir="ltr">0540 29 75 62</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B88A44] shrink-0" />
                <span>maison.nb11@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B88A44] shrink-0" />
                <span>الجزائر العاصمة - الجزائر</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Socials & Guarantee */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#D4AF37] border-b border-[#B88A44]/20 pb-2">
              تابعي جديدنا
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/maisonnbdz?igsh=MXR3Z24zejk4a3UxZQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#B88A44]/20 text-[#D4AF37] flex items-center justify-center hover:bg-[#B88A44] hover:text-[#1F1A17] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://web.facebook.com/Maisonnbdz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#B88A44]/20 text-[#D4AF37] flex items-center justify-center hover:bg-[#B88A44] hover:text-[#1F1A17] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-[#A3998E] pt-2">
              جميع المنتجات مطابقة للصور ومصنوعة بأعلى المعايير.
            </p>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3998E]">
          <p>© 2026 MAISON NB Women's Fashion. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>تم التطوير خصيصاً للمتجر الإلكتروني في الجزائر 🇩🇿</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
