import type { ImgHTMLAttributes } from "react";
import { MediaFrame } from "./MediaFrame";
import { getMediaKey, type SharedMediaItem } from "./mediaTypes";

const MEDIA_STAGE_EFFECTS = ["fade", "drift-left", "drift-up", "zoom-soft", "reveal-soft"] as const;

type MediaStageProps = {
  activeIndex: number;
  className?: string;
  effectSeed?: number;
  imageLoading?: ImgHTMLAttributes<HTMLImageElement>["loading"];
  items: SharedMediaItem[];
  label: string;
  reducedMotion?: boolean;
  videoActive?: boolean;
};

export function MediaStage({
  activeIndex,
  className,
  effectSeed = 0,
  imageLoading = "lazy",
  items,
  label,
  reducedMotion = false,
  videoActive = true,
}: MediaStageProps) {
  const normalizedActiveIndex = items.length > 0 ? (activeIndex + items.length) % items.length : 0;

  return (
    <div className={`media-stage${reducedMotion ? " media-stage--reduced-motion" : ""}${className ? ` ${className}` : ""}`}>
      {items.map((item, index) => {
        const isActive = index === normalizedActiveIndex;
        const effect = MEDIA_STAGE_EFFECTS[(effectSeed + index) % MEDIA_STAGE_EFFECTS.length];

        return (
          <div
            aria-hidden={!isActive}
            className={`media-stage__layer media-stage__layer--${effect}${isActive ? " is-active" : ""}`}
            key={getMediaKey(item, index)}
          >
            <MediaFrame
              active={isActive && videoActive}
              className="media-stage__media"
              imageProps={{ loading: isActive ? imageLoading : "lazy" }}
              item={item}
              label={label}
            />
          </div>
        );
      })}
    </div>
  );
}
