import { SectionHeader } from "@componentes/shared/SectionHeader";
import type { ConnectionsGalleryBlock, GenericGalleryBlock } from "@herramientas/content/types";
import { ExperienceGallery } from "./experience-gallery/ExperienceGallery";

export function GenericGallery(props: GenericGalleryBlock["props"]) {
  const items = props.items.filter((item) => item.imageUrl || item.videoUrl);
  if (items.length === 0) return null;

  return (
    <section className="connections-generic-gallery section">
      <div className="container">
        {props.titulo && <SectionHeader title={props.titulo} />}
        <div className="connections-generic-gallery__grid" style={{ ["--gallery-columns" as string]: props.columnas }}>
          {items.map((item, index) => (
            <figure key={`${item.imageUrl || item.videoUrl}-${index}`}>
              {item.type === "video" && item.videoUrl ? (
                <video src={item.videoUrl} controls playsInline />
              ) : (
                <img src={item.imageUrl} alt={item.alt} loading="lazy" />
              )}
              {item.caption && <figcaption>{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
      <style>{galleryStyles}</style>
    </section>
  );
}

export function ConnectionsGallery(props: ConnectionsGalleryBlock["props"]) {
  const items = props.items.filter((item) => item.imageUrl || item.videoUrl);
  if (items.length === 0) return null;

  return <ExperienceGallery {...props} items={items} />;
}

const galleryStyles = `
  .connections-gallery,
  .connections-generic-gallery {
    overflow: hidden;
    background: var(--white);
  }

  .connections-gallery__rail {
    display: grid;
    grid-auto-columns: minmax(280px, 430px);
    grid-auto-flow: column;
    gap: 24px;
    overflow-x: auto;
    padding: 8px 0 20px;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .connections-gallery__rail::-webkit-scrollbar {
    display: none;
  }

  .connections-gallery__item,
  .connections-generic-gallery figure {
    position: relative;
    height: 500px;
    margin: 0;
    overflow: hidden;
    border-radius: var(--radius-md);
    scroll-snap-align: start;
    box-shadow: var(--shadow-sm);
  }

  .connections-gallery__item img,
  .connections-generic-gallery img,
  .connections-generic-gallery video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .connections-gallery__item:hover img {
    transform: scale(1.05);
  }

  .connections-gallery__item figcaption,
  .connections-generic-gallery figcaption {
    position: absolute;
    inset: auto 0 0;
    padding: 68px 26px 26px;
    background: linear-gradient(to top, rgba(15,94,112,0.86), transparent);
    color: var(--white);
    font-size: 1.2rem;
    font-weight: 700;
  }

  .connections-generic-gallery__grid {
    display: grid;
    grid-template-columns: repeat(var(--gallery-columns, 3), minmax(0, 1fr));
    gap: 22px;
  }

  @media (max-width: 768px) {
    .connections-gallery__rail {
      grid-auto-columns: minmax(260px, 82vw);
    }

    .connections-gallery__item,
    .connections-generic-gallery figure {
      height: 390px;
    }

    .connections-generic-gallery__grid {
      grid-template-columns: 1fr;
    }
  }
`;
