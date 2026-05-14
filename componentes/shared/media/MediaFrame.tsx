import { useEffect, useRef } from "react";
import type { ImgHTMLAttributes, VideoHTMLAttributes } from "react";
import { getMediaSource, isVideoMedia, type SharedMediaItem } from "./mediaTypes";

type MediaFrameProps = {
  active?: boolean;
  className?: string;
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "src">;
  item: SharedMediaItem;
  label: string;
  videoProps?: Omit<VideoHTMLAttributes<HTMLVideoElement>, "src">;
};

export function MediaFrame({ active = true, className, imageProps, item, label, videoProps }: MediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const source = getMediaSource(item);
  const shouldAutoPlay = active && (videoProps?.autoPlay ?? true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldAutoPlay) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      video.pause();
    });
  }, [shouldAutoPlay, source]);

  if (!source) return null;

  if (isVideoMedia(item)) {
    return (
      <video
        {...videoProps}
        autoPlay={shouldAutoPlay}
        className={className}
        loop={videoProps?.loop ?? true}
        muted={videoProps?.muted ?? true}
        playsInline={videoProps?.playsInline ?? true}
        ref={videoRef}
        src={source}
      />
    );
  }

  return (
    <img
      {...imageProps}
      alt={item.alt || item.caption || label}
      className={className}
      src={source}
    />
  );
}
