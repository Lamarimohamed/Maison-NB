import React from "react";
import { Search, ShieldCheck, Truck, Phone } from "lucide-react";
import logoImg from "@/imports/photo_2026-08-14_21-39-31.jpg";

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  categories: { id: string; name: string }[];
  currentView: "store" | "admin";
  setCurrentView: (view: "store" | "admin") => void;
  ordersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  categories,
  currentView,
  setCurrentView,
  ordersCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#B88A44]/20 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#1F1A17] text-[#D4AF37] px-3 py-1.5 text-[11px] sm:text-xs text-center font-medium flex items-center justify-center gap-2">
        <span className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          توصيل سريع لجميع 58 ولاية الجزائرية | الدفع عند الاستلام
        </span>
        <span className="hidden sm:inline text-amber-500/40">•</span>
        <span className="hidden sm:inline text-amber-100/90 font-light">
          MAISON NB — L'élégance dans chaque détail
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Right Side: Admin Access / Quick Nav */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView(currentView === "store" ? "admin" : "store")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 border ${
                currentView === "admin"
                  ? "bg-[#B88A44] text-white border-[#B88A44] shadow-md"
                  : "bg-[#F3ECE2] text-[#1F1A17] border-[#B88A44]/30 hover:bg-[#B88A44]/10"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B88A44]" />
              <span className="hidden sm:inline">
                {currentView === "admin" ? "العودة للمتجر" : "لوحة التحكم (Admin)"}
              </span>
              <span className="sm:hidden text-[11px]">
                {currentView === "admin" ? "المتجر" : "المدير"}
              </span>
              {ordersCount > 0 && currentView === "store" && (
                <span className="bg-[#B88A44] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {ordersCount}
                </span>
              )}
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex flex-col items-center cursor-pointer" onClick={() => { setCurrentView("store"); setActiveCategory("all"); }}>
            <img
              src={logoImg}
              alt="MAISON NB Women's Fashion"
              className="h-9 sm:h-12 w-auto object-contain rounded-md transition-transform hover:scale-105"
            />
          </div>

          {/* Left Side: Contact Link */}
          <div className="flex items-center gap-2">
            <a
              href="tel:0550000000"
              className="flex items-center gap-1 text-[11px] sm:text-xs text-[#786F66] hover:text-[#B88A44] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#B88A44]" />
              <span dir="ltr" className="font-mono hidden xs:inline">0550 00 00 00</span>
            </a>
          </div>
        </div>

        {/* Search Bar & Category Navigation shown identically on Mobile and PC */}
        {currentView === "store" && (
          <div className="pb-2.5 space-y-2.5">
            {/* Search Box */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#786F66]">
                <Search className="w-3.5 h-3.5 text-[#B88A44]" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحثي عن فستان، عباية، معطف، مقاس أو موديل..."
                className="w-full pr-9 pl-4 py-1.5 sm:py-2 bg-white/80 border border-[#B88A44]/30 rounded-full text-xs sm:text-sm text-[#1F1A17] placeholder-[#786F66] focus:outline-none focus:ring-2 focus:ring-[#B88A44]/50 focus:border-[#B88A44] shadow-2xs transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-[#786F66] hover:text-[#1F1A17]"
                >
                  إلغاء
                </button>
              )}
            </div>

            {/* Category Navigation - SHOWN ON BOTH MOBILE & PC VERSION */}
            <nav className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto py-1 no-scrollbar px-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                      isActive
                        ? "bg-[#1F1A17] text-[#D4AF37] shadow-xs font-bold scale-105"
                        : "bg-white/70 text-[#1F1A17]/90 hover:bg-[#F3ECE2] border border-[#B88A44]/20"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
