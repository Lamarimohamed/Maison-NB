import React, { useState } from "react";
import { X, ChevronRight, ChevronLeft, Copy, Check, ZoomIn, ZoomOut, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  productName: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  productName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const handleCopyImage = async () => {
    try {
      await navigator.clipboard.writeText(currentImage);
      setCopied(true);
      toast.success("تم نسخ رابط الصورة بنجاح!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("تعذر نسخ رابط الصورة");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity">
      {/* Top Header Bar */}
      <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between text-white z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#D4AF37] max-w-xs sm:max-w-md truncate">
            {productName}
          </span>
          <span className="text-xs text-gray-400 font-mono">
            ({currentIndex + 1} / {images.length})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy image URL */}
          <button
            onClick={handleCopyImage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition-colors border border-white/20"
            title="نسخ الصورة"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />}
            <span>{copied ? "تم النسخ" : "نسخ الصورة"}</span>
          </button>

          {/* Toggle Zoom */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={isZoomed ? "تصغير" : "تكبير"}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Close Lightbox */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-red-500/80 text-white transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12">
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </>
        )}

        <div className={`transition-all duration-300 ${isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"}`} onClick={() => setIsZoomed(!isZoomed)}>
          <img
            src={currentImage}
            alt={productName}
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl select-none"
          />
        </div>
      </div>

      {/* Thumbnails Footer */}
      {images.length > 1 && (
        <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 p-2 bg-black/60 backdrop-blur-xs max-w-md mx-auto rounded-full border border-white/10 z-20 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentIndex(idx); setIsZoomed(false); }}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex ? "border-[#D4AF37] scale-110" : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
