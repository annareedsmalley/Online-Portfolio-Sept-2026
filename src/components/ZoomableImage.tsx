import { useState, type CSSProperties } from "react";
import { Maximize2 } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  imgClassName?: string;
}

/**
 * Renders an image with a tappable zoom icon overlay (visible on mobile).
 * Tapping the icon (or the image on mobile) opens a lightbox with pinch/zoom.
 */
export const ZoomableImage = ({
  src,
  alt,
  className,
  style,
  imgClassName,
}: ZoomableImageProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`relative ${className ?? ""}`} style={style}>
        <img
          src={src}
          alt={alt}
          className={imgClassName ?? "block h-auto w-full"}
        />
        <button
          type="button"
          aria-label="Zoom image"
          onClick={() => setOpen(true)}
          className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-title/80 text-background shadow-md backdrop-blur transition hover:bg-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 md:hidden"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
      {open && <ImageLightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
};
