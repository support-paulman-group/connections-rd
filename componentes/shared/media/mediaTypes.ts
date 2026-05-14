export type SharedMediaItem = {
  alt?: string;
  caption?: string;
  imageUrl?: string;
  type?: "image" | "video";
  videoUrl?: string;
};

const VIDEO_EXTENSION_PATTERN = /\.(mp4|mov|webm)$/i;

export function getMediaSource(item: SharedMediaItem) {
  return item.videoUrl || item.imageUrl || "";
}

export function getMediaKey(item: SharedMediaItem, index: number) {
  return `${item.type || "media"}:${getMediaSource(item)}:${index}`;
}

export function isVideoMedia(item: SharedMediaItem) {
  return item.type === "video" || Boolean(item.videoUrl) || VIDEO_EXTENSION_PATTERN.test(item.imageUrl || "");
}

