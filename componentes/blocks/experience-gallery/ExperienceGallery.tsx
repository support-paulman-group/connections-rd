import { useCallback, useEffect, useMemo, useState } from "react";
import type { ConnectionsGalleryBlock } from "@herramientas/content/types";
import { ExperienceBentoGrid } from "./ExperienceBentoGrid";
import { ExperienceGalleryModal } from "./ExperienceGalleryModal";
import {
  buildGeneralCatalog,
  normalizeGalleryItems,
  resolveGeneralModal,
  resolveTileModal,
  type ExperienceModalState,
} from "./galleryModel";
import "./ExperienceGallery.css";

type ExperienceGalleryProps = ConnectionsGalleryBlock["props"];

export function ExperienceGallery(props: ExperienceGalleryProps) {
  const tiles = useMemo(() => normalizeGalleryItems(props.items), [props.items]);
  const catalog = useMemo(() => buildGeneralCatalog(tiles), [tiles]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<ExperienceModalState>(() => resolveGeneralModal(catalog));

  const closeModal = useCallback(() => setModalOpen(false), []);

  const openTileModal = useCallback(
    (index: number) => {
      const tile = tiles[index];
      if (!tile) return;
      setModalState(resolveTileModal(tile, catalog));
      setModalOpen(true);
    },
    [catalog, tiles],
  );

  const openCatalogModal = useCallback(() => {
    setModalState(resolveGeneralModal(catalog));
    setModalOpen(true);
  }, [catalog]);

  const showNext = useCallback(() => {
    setModalState((state) => {
      if (state.items.length === 0) return state;
      return { ...state, activeIndex: (state.activeIndex + 1) % state.items.length };
    });
  }, []);

  const showPrevious = useCallback(() => {
    setModalState((state) => {
      if (state.items.length === 0) return state;
      return { ...state, activeIndex: (state.activeIndex - 1 + state.items.length) % state.items.length };
    });
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    document.body.classList.add("experience-gallery-modal-open");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("experience-gallery-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, modalOpen, showNext, showPrevious]);

  if (tiles.length === 0 || catalog.length === 0) return null;

  return (
    <section className="experience-gallery" id="gallery">
      <div className="experience-gallery__header">
        <span>An Exclusive Preview</span>
        <h2>The Experience</h2>
        <div aria-hidden="true" />
      </div>
      <ExperienceBentoGrid catalogCount={catalog.length} items={tiles} onOpenCatalog={openCatalogModal} onOpenTile={openTileModal} />
      {modalOpen && (
        <ExperienceGalleryModal
          activeIndex={modalState.activeIndex}
          items={modalState.items}
          mode={modalState.mode}
          onClose={closeModal}
          onNext={showNext}
          onPrevious={showPrevious}
          title={modalState.title}
        />
      )}
    </section>
  );
}
