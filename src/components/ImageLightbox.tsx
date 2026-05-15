import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageLightbox = ({ src, alt, onClose }: ImageLightboxProps) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[2147483647] flex flex-col bg-black/95"
    >
      <div className="flex items-center justify-end gap-3 p-4">
        <button
          type="button"
          onClick={() => setZoomed((z) => !z)}
          aria-label={zoomed ? "Zoom out" : "Zoom in"}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
        >
          {zoomed ? <ZoomOut className="h-6 w-6" /> : <ZoomIn className="h-6 w-6" />}
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:bg-white/90"
        >
          <X className="h-7 w-7" strokeWidth={2.5} />
        </button>
      </div>
      <div
        className="flex-1 overflow-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="flex min-h-full min-w-full items-center justify-center p-4">
          <img
            src={src}
            alt={alt}
            onClick={() => setZoomed((z) => !z)}
            className="select-none"
            style={{
              maxWidth: zoomed ? "none" : "100%",
              maxHeight: zoomed ? "none" : "calc(100vh - 100px)",
              width: zoomed ? "200%" : "auto",
              height: "auto",
              cursor: zoomed ? "zoom-out" : "zoom-in",
              transition: "max-width 200ms ease, max-height 200ms ease, width 200ms ease",
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
