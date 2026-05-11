import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FloorPlanSlide } from "@herramientas/content/types";

type MediaCarouselProps = {
  slides: FloorPlanSlide[];
  label: string;
};

export function MediaCarousel({ slides, label }: MediaCarouselProps) {
  const validSlides = useMemo(() => slides.filter((slide) => slide.imageUrl), [slides]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [label, validSlides.length]);

  if (validSlides.length === 0) {
    return (
      <div className="media-carousel media-carousel--empty">
        <span>{label}</span>
      </div>
    );
  }

  const current = validSlides[active] ?? validSlides[0];
  const isVideo = /\.(mp4|mov|webm)$/i.test(current.imageUrl);

  function move(direction: -1 | 1) {
    setActive((currentIndex) => (currentIndex + direction + validSlides.length) % validSlides.length);
  }

  return (
    <div className="media-carousel">
      <div className="media-carousel__stage">
        {isVideo ? (
          <video src={current.imageUrl} autoPlay muted loop playsInline />
        ) : (
          <img src={current.imageUrl} alt={current.imageAlt || current.imageCaption || label} loading="lazy" />
        )}
        {(current.imageCaption || current.imageAlt) && (
          <div className="media-carousel__caption">
            {current.imageCaption && <strong>{current.imageCaption}</strong>}
            {current.imageAlt && <span>{current.imageAlt}</span>}
          </div>
        )}
      </div>

      {validSlides.length > 1 && (
        <>
          <button className="media-carousel__arrow media-carousel__arrow--prev" type="button" onClick={() => move(-1)} aria-label="Previous media">
            <ChevronLeft size={22} />
          </button>
          <button className="media-carousel__arrow media-carousel__arrow--next" type="button" onClick={() => move(1)} aria-label="Next media">
            <ChevronRight size={22} />
          </button>
          <div className="media-carousel__dots">
            {validSlides.map((slide, index) => (
              <button
                key={`${slide.imageUrl}-${index}`}
                type="button"
                aria-label={`Show media ${index + 1}`}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
