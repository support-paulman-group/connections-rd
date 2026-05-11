import { useCallback, useEffect, useState } from "react";
import type { ConnectionsGalleryBlock } from "@herramientas/content/types";
import { ExperienceBentoGrid } from "./ExperienceBentoGrid";
import { ExperienceGalleryModal } from "./ExperienceGalleryModal";
import "./ExperienceGallery.css";

type ExperienceGalleryProps = ConnectionsGalleryBlock["props"];

export function ExperienceGallery(props: ExperienceGalleryProps) {
  const items = props.items.filter((item) => item.imageUrl || item.videoUrl);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const openModal = useCallback((index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % items.length);
  }, [items.length]);

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + items.length) % items.length);
  }, [items.length]);

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

  if (items.length === 0) return null;

  return (
    <section className="experience-gallery" id="gallery">
      <div className="experience-gallery__header">
        <span>An Exclusive Preview</span>
        <h2>The Experience</h2>
        <div aria-hidden="true" />
      </div>
      <ExperienceBentoGrid items={items} onOpen={openModal} />
      <ExperienceGalleryModal
        activeIndex={activeIndex}
        isOpen={modalOpen}
        items={items}
        onClose={closeModal}
        onNext={showNext}
        onPrevious={showPrevious}
      />
    </section>
  );
}
