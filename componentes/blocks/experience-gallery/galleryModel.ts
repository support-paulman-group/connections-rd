import type { GalleryItem, GalleryMedia } from "@herramientas/content/types";

export type ExperienceTile = GalleryItem & {
  cover: GalleryMedia;
  media: GalleryMedia[];
};

export type ExperienceModalMode = "general" | "private";

export type ExperienceModalState = {
  activeIndex: number;
  items: GalleryMedia[];
  mode: ExperienceModalMode;
  title: string;
};

const hasMediaSource = (media: GalleryMedia) => Boolean(media.imageUrl || media.videoUrl);

const getMediaKey = (media: GalleryMedia) => `${media.type || "image"}:${media.imageUrl || media.videoUrl}`;

export function normalizeGalleryItems(items: GalleryItem[]): ExperienceTile[] {
  return items
    .map((item) => {
      const legacyMedia: GalleryMedia = {
        alt: item.alt,
        caption: item.caption,
        imageUrl: item.imageUrl,
        type: item.type,
        videoUrl: item.videoUrl,
      };
      const media = (item.media?.length ? item.media : [legacyMedia]).filter(hasMediaSource);
      const cover = media[0] ?? legacyMedia;

      if (!hasMediaSource(cover)) return null;

      return {
        ...item,
        cover,
        imageUrl: item.imageUrl || cover.imageUrl,
        media,
        type: item.type || cover.type,
        videoUrl: item.videoUrl || cover.videoUrl,
      } satisfies ExperienceTile;
    })
    .filter((item): item is ExperienceTile => Boolean(item));
}

export function buildGeneralCatalog(tiles: ExperienceTile[]): GalleryMedia[] {
  const seen = new Set<string>();
  const catalog: GalleryMedia[] = [];

  for (const tile of tiles) {
    for (const media of tile.media) {
      const key = getMediaKey(media);
      if (seen.has(key)) continue;
      seen.add(key);
      catalog.push(media);
    }
  }

  return catalog;
}

export function resolveTileModal(tile: ExperienceTile, catalog: GalleryMedia[]): ExperienceModalState {
  const hasPrivateCollection = tile.openMode !== "general" && tile.media.length > 1;

  if (hasPrivateCollection) {
    return {
      activeIndex: 0,
      items: tile.media,
      mode: "private",
      title: tile.caption || tile.alt || "Private Gallery",
    };
  }

  const coverKey = getMediaKey(tile.cover);
  const catalogIndex = Math.max(
    0,
    catalog.findIndex((media) => getMediaKey(media) === coverKey),
  );

  return {
    activeIndex: catalogIndex,
    items: catalog,
    mode: "general",
    title: "The Experience",
  };
}

export function resolveGeneralModal(catalog: GalleryMedia[]): ExperienceModalState {
  return {
    activeIndex: 0,
    items: catalog,
    mode: "general",
    title: "The Experience",
  };
}
