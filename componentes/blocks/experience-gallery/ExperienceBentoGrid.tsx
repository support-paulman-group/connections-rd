import { Grid2X2 } from "lucide-react";
import { MediaFrame } from "@componentes/shared/media";
import type { ExperienceTile } from "./galleryModel";

type ExperienceBentoGridProps = {
  catalogCount: number;
  items: ExperienceTile[];
  onOpenCatalog: () => void;
  onOpenTile: (index: number) => void;
};

const getBentoSize = (index: number): "large" | "wide" | "square" => {
  const pattern = index % 5;
  if (pattern === 0) return "large";
  if (pattern === 3) return "wide";
  return "square";
};

export function ExperienceBentoGrid({ catalogCount, items, onOpenCatalog, onOpenTile }: ExperienceBentoGridProps) {
  const showCatalogCta = catalogCount > 1;

  return (
    <div className="experience-gallery__bento" aria-label="Connections RD experience gallery">
      {items.map((item, index) => {
        const size = getBentoSize(index);
        const label = item.caption || item.alt || `Gallery item ${index + 1}`;
        const mediaCount = item.media.length;
        const isPrivate = item.openMode !== "general" && mediaCount > 1;

        return (
          <button
            className={`experience-gallery__item experience-gallery__item--${size}`}
            key={`${item.imageUrl || item.videoUrl}-${index}`}
            type="button"
            onClick={() => onOpenTile(index)}
            aria-label={`Open ${label}`}
          >
            <MediaFrame item={item.cover} label={label} imageProps={{ loading: index === 0 ? "eager" : "lazy" }} />
            <span className="experience-gallery__overlay">
              <span className="experience-gallery__meta">{isPrivate ? `${mediaCount} Photos` : "View Gallery"}</span>
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
          onClick={onOpenCatalog}
          aria-label="Open all amenities"
        >
          <span className="experience-gallery__catalog-icon" aria-hidden="true">
            <Grid2X2 size={24} strokeWidth={1.5} />
          </span>
          <span className="experience-gallery__catalog-title">
            View
            <br />
            All
          </span>
          <span className="experience-gallery__catalog-link">Explore {catalogCount} Amenities</span>
        </button>
      )}
    </div>
  );
}
