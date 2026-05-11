import { Grid2X2 } from "lucide-react";
import type { GalleryItem } from "@herramientas/content/types";

type ExperienceBentoGridProps = {
  items: GalleryItem[];
  onOpen: (index: number) => void;
};

const getBentoSize = (index: number): "large" | "wide" | "square" => {
  const pattern = index % 5;
  if (pattern === 0) return "large";
  if (pattern === 3) return "wide";
  return "square";
};

export function ExperienceBentoGrid({ items, onOpen }: ExperienceBentoGridProps) {
  const showCatalogCta = items.length > 4;

  return (
    <div className="experience-gallery__bento" aria-label="Connections RD experience gallery">
      {items.map((item, index) => {
        const size = getBentoSize(index);
        const label = item.caption || item.alt || `Gallery item ${index + 1}`;

        return (
          <button
            className={`experience-gallery__item experience-gallery__item--${size}`}
            key={`${item.imageUrl || item.videoUrl}-${index}`}
            type="button"
            data-gallery-open={index}
            onClick={() => onOpen(index)}
            aria-label={`Open ${label}`}
          >
            {item.type === "video" && item.videoUrl ? (
              <video src={item.videoUrl} autoPlay loop muted playsInline />
            ) : (
              <img src={item.imageUrl} alt={item.alt || label} loading={index === 0 ? "eager" : "lazy"} />
            )}
            <span className="experience-gallery__overlay">
              {size === "large" && <span className="experience-gallery__kicker">Perspective</span>}
              <span className="experience-gallery__caption">{label}</span>
            </span>
          </button>
        );
      })}

      {showCatalogCta && (
        <button
          className="experience-gallery__catalog"
          type="button"
          data-gallery-open="0"
          onClick={() => onOpen(0)}
          aria-label="Open full gallery"
        >
          <span className="experience-gallery__catalog-icon" aria-hidden="true">
            <Grid2X2 size={24} strokeWidth={1.5} />
          </span>
          <span className="experience-gallery__catalog-title">
            Full
            <br />
            Catalog
          </span>
          <span className="experience-gallery__catalog-link">Explore {items.length} Media</span>
        </button>
      )}
    </div>
  );
}
