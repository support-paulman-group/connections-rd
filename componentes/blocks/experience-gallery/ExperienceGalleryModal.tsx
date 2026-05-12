import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CSSProperties } from "react";
import type { GalleryMedia } from "@herramientas/content/types";
import type { ExperienceModalMode } from "./galleryModel";

type ExperienceGalleryModalProps = {
  activeIndex: number;
  items: GalleryMedia[];
  mode: ExperienceModalMode;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  title: string;
};

const formatCount = (value: number) => String(value).padStart(2, "0");

const isNearbySlide = (index: number, activeIndex: number, total: number) => {
  if (total <= 3) return true;
  const previousIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  return index === activeIndex || index === previousIndex || index === nextIndex;
};

export function ExperienceGalleryModal({
  activeIndex,
  items,
  mode,
  onClose,
  onNext,
  onPrevious,
  title,
}: ExperienceGalleryModalProps) {
  return (
    <div
      className="experience-gallery-modal is-open"
      role="dialog"
      aria-modal="true"
      aria-label="Media gallery"
    >
      <div className="experience-gallery-modal__header">
        <div className="experience-gallery-modal__brand">
          <span>{title}</span>
          <small>{mode === "private" ? "Private Gallery" : "Cabarete, RD"}</small>
        </div>
        <div className="experience-gallery-modal__tools">
          <div className="experience-gallery-modal__count" aria-label={`Slide ${activeIndex + 1} of ${items.length}`}>
            <strong>{formatCount(activeIndex + 1)}</strong>
            <span>/</span>
            <span>{formatCount(items.length)}</span>
          </div>
          <button
            className="experience-gallery-modal__close"
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X size={20} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <button
        className="experience-gallery-modal__nav experience-gallery-modal__nav--prev"
        type="button"
        onClick={onPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} strokeWidth={1.7} />
      </button>
      <button
        className="experience-gallery-modal__nav experience-gallery-modal__nav--next"
        type="button"
        onClick={onNext}
        aria-label="Next slide"
      >
        <ChevronRight size={28} strokeWidth={1.7} />
      </button>

      <div
        className="experience-gallery-modal__track"
        style={{ "--active-index": activeIndex } as CSSProperties}
      >
        {items.map((item, index) => {
          const label = item.caption || item.alt || `Slide ${index + 1}`;
          const isActive = index === activeIndex;
          const shouldLoadEagerly = isNearbySlide(index, activeIndex, items.length);

          return (
            <figure
              className={`experience-gallery-modal__slide${isActive ? " is-active" : ""}`}
              key={`${item.imageUrl || item.videoUrl}-${index}`}
              aria-hidden={!isActive}
            >
              <div className="experience-gallery-modal__media-shell">
                {item.type === "video" && item.videoUrl ? (
                  <video src={item.videoUrl} autoPlay={isActive} loop muted playsInline />
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.alt || label}
                    decoding="async"
                    loading={shouldLoadEagerly ? "eager" : "lazy"}
                  />
                )}
              </div>
              <figcaption>
                <strong>{label}</strong>
                <span>{item.type === "video" ? "Video" : "Photography"} {index + 1} of {items.length}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
