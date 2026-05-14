import { useEffect, useMemo, useState } from "react";
import type { FloorPlanSlide } from "@herramientas/content/types";
import { MediaControls, MediaDots, MediaStage, type SharedMediaItem } from "./media";

type MediaCarouselProps = {
  slides: FloorPlanSlide[];
  label: string;
};

export function MediaCarousel({ slides, label }: MediaCarouselProps) {
  const validSlides = useMemo<SharedMediaItem[]>(
    () =>
      slides
        .filter((slide) => slide.imageUrl)
        .map((slide) => ({
          alt: slide.imageAlt,
          caption: slide.imageCaption,
          imageUrl: slide.imageUrl,
        })),
    [slides],
  );
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

  function move(direction: -1 | 1) {
    setActive((currentIndex) => (currentIndex + direction + validSlides.length) % validSlides.length);
  }

  return (
    <div className="media-carousel">
      <div className="media-carousel__stage">
        <MediaStage items={validSlides} activeIndex={active} label={label} imageLoading="lazy" />
        {(current.caption || current.alt) && (
          <div className="media-carousel__caption">
            {current.caption && <strong>{current.caption}</strong>}
            {current.alt && <span>{current.alt}</span>}
          </div>
        )}
      </div>

      {validSlides.length > 1 && (
        <>
          <MediaControls
            className="media-carousel__arrow"
            previousClassName="media-carousel__arrow--prev"
            nextClassName="media-carousel__arrow--next"
            onPrevious={() => move(-1)}
            onNext={() => move(1)}
          />
          <MediaDots className="media-carousel__dots" items={validSlides} activeIndex={active} onSelect={setActive} />
        </>
      )}
    </div>
  );
}
