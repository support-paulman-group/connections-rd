import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@herramientas/content/types";

type ExperienceGalleryModalProps = {
  activeIndex: number;
  isOpen: boolean;
  items: GalleryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

const formatCount = (value: number) => String(value).padStart(2, "0");

export function ExperienceGalleryModal({
  activeIndex,
  isOpen,
  items,
  onClose,
  onNext,
  onPrevious,
}: ExperienceGalleryModalProps) {
  return (
    <div
      className={`experience-gallery-modal${isOpen ? " is-open" : ""}`}
      data-experience-gallery-modal
      role="dialog"
      aria-modal="true"
      aria-label="Media gallery"
    >
      <div className="experience-gallery-modal__header">
        <div className="experience-gallery-modal__brand">
          <span>The Experience</span>
          <small>Cabarete, RD</small>
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
            data-gallery-close
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
        data-gallery-previous
        onClick={onPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} strokeWidth={1.7} />
      </button>
      <button
        className="experience-gallery-modal__nav experience-gallery-modal__nav--next"
        type="button"
        data-gallery-next
        onClick={onNext}
        aria-label="Next slide"
      >
        <ChevronRight size={28} strokeWidth={1.7} />
      </button>

      <div className="experience-gallery-modal__track">
        {items.map((item, index) => {
          const label = item.caption || item.alt || `Slide ${index + 1}`;

          return (
            <figure
              className={`experience-gallery-modal__slide${index === activeIndex ? " is-active" : ""}`}
              key={`${item.imageUrl || item.videoUrl}-${index}`}
              data-gallery-slide={index}
              aria-hidden={!isOpen || index !== activeIndex}
            >
              {item.type === "video" && item.videoUrl ? (
                <video src={item.videoUrl} autoPlay loop muted playsInline />
              ) : (
                <img src={item.imageUrl} alt={item.alt || label} />
              )}
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
