import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Icon } from "@componentes/shared/Icon";
import { MediaControls, MediaDots, MediaStage } from "@componentes/shared/media";
import type { ConnectionsLifestyleAtlasBlock } from "@herramientas/content/types";

type Props = ConnectionsLifestyleAtlasBlock["props"];

const MEDIA_INTERVAL_MS = 5600;

export function ConnectionsLifestyleAtlas(props: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [focusPaused, setFocusPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeChapter = props.chapters[activeIndex] ?? props.chapters[0];
  const activeMedia = activeChapter?.media[mediaIndex % Math.max(activeChapter.media.length, 1)];
  const tabPanelId = `${props.id}-panel`;
  const interactionPaused = focusPaused || hoverPaused;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(query.matches);

    updateMotionPreference();
    query.addEventListener("change", updateMotionPreference);
    return () => query.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    setMediaIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    if (interactionPaused || reducedMotion || !activeChapter || activeChapter.media.length < 2) return;

    const interval = window.setInterval(() => {
      if (document.hidden) return;
      setMediaIndex((current) => (current + 1) % activeChapter.media.length);
    }, MEDIA_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [activeChapter, interactionPaused, reducedMotion]);

  const chapterPreview = useMemo(() => {
    if (!activeChapter) return "";
    return `${activeChapter.label}: ${activeChapter.metric.value}`;
  }, [activeChapter]);

  if (!activeChapter || props.chapters.length === 0 || !activeMedia) return null;

  const selectChapter = (index: number) => {
    setActiveIndex(index);
  };

  const selectMedia = (index: number) => {
    if (activeChapter.media.length === 0) return;
    setMediaIndex((index + activeChapter.media.length) % activeChapter.media.length);
  };

  const moveMedia = (direction: -1 | 1) => {
    selectMedia(mediaIndex + direction);
  };

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (activeIndex + direction + props.chapters.length) % props.chapters.length;
    selectChapter(nextIndex);
  };

  return (
    <section
      className="connections-atlas section"
      id="lifestyle"
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setFocusPaused(false);
        }
      }}
      onFocus={() => setFocusPaused(true)}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      <div className="container">
        <span className="connections-atlas__anchor" id="lifestyle-atlas" aria-hidden="true" />
        <div className="connections-atlas__intro">
          <p>{props.sectionLabel}</p>
          <h2>{props.title}</h2>
          <span>{props.subtitle}</span>
        </div>

        <div className="connections-atlas__rail-shell">
          <div className="connections-atlas__rail" role="tablist" aria-label="Lifestyle chapters" onKeyDown={handleTabKeyDown}>
            {props.chapters.map((chapter, index) => (
              <button
                aria-controls={tabPanelId}
                aria-selected={index === activeIndex}
                className="connections-atlas__tab"
                id={`${props.id}-tab-${chapter.id}`}
                key={chapter.id}
                onClick={() => selectChapter(index)}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                role="tab"
                type="button"
              >
                <span className="connections-atlas__tab-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="connections-atlas__tab-icon" aria-hidden="true">
                  <Icon name={chapter.icon} size={19} />
                </span>
                <span className="connections-atlas__tab-label">{chapter.label}</span>
                <small>{chapter.metric.value}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="connections-atlas__shell">
          <div className="connections-atlas__media" aria-label={`${activeChapter.label} visual preview`}>
            <MediaStage
              activeIndex={mediaIndex}
              effectSeed={activeIndex}
              imageLoading="eager"
              items={activeChapter.media}
              label={activeChapter.label}
              reducedMotion={reducedMotion}
              videoActive={!interactionPaused && !reducedMotion}
            />
            <div className="connections-atlas__media-overlay">
              <span>{activeChapter.eyebrow}</span>
              <strong>{activeMedia.caption || activeChapter.label}</strong>
            </div>
            {activeChapter.media.length > 1 && (
              <>
                <MediaControls
                  className="connections-atlas__media-arrow"
                  previousClassName="connections-atlas__media-arrow--prev"
                  nextClassName="connections-atlas__media-arrow--next"
                  previousLabel={`Previous ${activeChapter.label} visual`}
                  nextLabel={`Next ${activeChapter.label} visual`}
                  iconSize={24}
                  strokeWidth={1.8}
                  onPrevious={() => moveMedia(-1)}
                  onNext={() => moveMedia(1)}
                />
                <MediaDots
                  activeIndex={mediaIndex}
                  className="connections-atlas__media-dots"
                  items={activeChapter.media}
                  label={`Show ${activeChapter.label} visual`}
                  onSelect={selectMedia}
                />
              </>
            )}
          </div>

          <div className="connections-atlas__content" id={tabPanelId} role="tabpanel" aria-label={chapterPreview}>
            <div className="connections-atlas__chapter-kicker">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>{activeChapter.eyebrow}</span>
            </div>

            <div className="connections-atlas__chapter-head">
              <div className="connections-atlas__chapter-icon" aria-hidden="true">
                <Icon name={activeChapter.icon} size={25} />
              </div>
              <h3>{activeChapter.title}</h3>
            </div>

            <p className="connections-atlas__description">{activeChapter.description}</p>

            <div className="connections-atlas__metric">
              <span>{activeChapter.metric.label}</span>
              <strong>{activeChapter.metric.value}</strong>
            </div>

            <div className="connections-atlas__highlights">
              {activeChapter.highlights.map((highlight) => (
                <article key={`${activeChapter.id}-${highlight.title}`}>
                  <span aria-hidden="true">
                    <Icon name={highlight.icon} size={19} />
                  </span>
                  <div>
                    <h4>{highlight.title}</h4>
                    <p>{highlight.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="connections-atlas__actions">
              <a className="btn btn-primary" href={props.primaryCtaHref}>
                {props.primaryCtaLabel}
                <ArrowRight size={17} />
              </a>
              <a className="btn btn-secondary connections-atlas__secondary" href={props.secondaryCtaHref}>
                {props.secondaryCtaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .connections-atlas {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(180deg, var(--background) 0%, rgba(245,247,248,0.78) 30%, var(--muted) 100%);
        }

        .connections-atlas::before {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
          background-image:
            linear-gradient(rgba(15, 94, 112, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 94, 112, 0.045) 1px, transparent 1px);
          background-size: 78px 78px;
          mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
        }

        .connections-atlas .container {
          position: relative;
          z-index: 1;
        }

        .connections-atlas__anchor {
          position: absolute;
          top: 0;
        }

        .connections-atlas__intro {
          max-width: 900px;
          margin: 0 auto 30px;
          text-align: center;
        }

        .connections-atlas__intro p {
          margin: 0 0 12px;
          color: var(--primary);
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .connections-atlas__intro h2 {
          margin: 0 0 18px;
          color: var(--brand-deep);
          font-family: var(--font-display);
          font-size: 4.15rem;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 0.98;
        }

        .connections-atlas__intro span {
          display: block;
          color: var(--muted-foreground);
          font-size: 1.05rem;
          line-height: 1.72;
        }

        .connections-atlas__rail-shell {
          position: relative;
          margin-bottom: 22px;
        }

        .connections-atlas__rail-shell::before,
        .connections-atlas__rail-shell::after {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 2;
          width: 22px;
          content: "";
          pointer-events: none;
        }

        .connections-atlas__rail-shell::before {
          left: 0;
          background: linear-gradient(90deg, var(--background), transparent);
        }

        .connections-atlas__rail-shell::after {
          right: 0;
          background: linear-gradient(270deg, var(--background), transparent);
        }

        .connections-atlas__rail {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 8px;
          padding: 8px;
          overflow-x: auto;
          border: 1px solid rgba(15,94,112,0.12);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.8);
          box-shadow: var(--shadow-sm);
          backdrop-filter: blur(18px);
          scrollbar-width: thin;
          scrollbar-color: rgba(15,94,112,0.28) transparent;
        }

        .connections-atlas__tab {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 5px 10px;
          align-items: center;
          min-height: 82px;
          min-width: 0;
          padding: 14px;
          overflow: hidden;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--foreground);
          text-align: left;
          transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .connections-atlas__tab::after {
          position: absolute;
          right: 14px;
          bottom: 9px;
          left: 14px;
          height: 2px;
          content: "";
          background: rgba(15,94,112,0.14);
          transform: scaleX(0.32);
          transform-origin: left;
          transition: transform 220ms ease, background 220ms ease;
        }

        .connections-atlas__tab-number {
          grid-row: span 2;
          align-self: start;
          color: rgba(15,94,112,0.58);
          font-family: var(--font-display);
          font-size: 1.2rem;
          line-height: 1;
        }

        .connections-atlas__tab-icon {
          position: absolute;
          right: 12px;
          top: 12px;
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border-radius: 999px;
          background: rgba(167, 211, 221, 0.22);
          color: var(--brand-deep);
        }

        .connections-atlas__tab-label,
        .connections-atlas__tab small {
          min-width: 0;
          max-width: calc(100% - 38px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .connections-atlas__tab-label {
          align-self: end;
          font-size: 0.92rem;
          font-weight: 800;
        }

        .connections-atlas__tab small {
          align-self: start;
          color: var(--muted-foreground);
          font-size: 0.72rem;
          font-weight: 700;
        }

        .connections-atlas__tab[aria-selected="true"] {
          border-color: rgba(15,94,112,0.16);
          background: var(--brand-deep);
          color: var(--primary-foreground);
          box-shadow: 0 18px 36px rgba(8, 51, 64, 0.2);
          transform: translateY(-2px);
        }

        .connections-atlas__tab[aria-selected="true"]::after {
          background: var(--brand-sun);
          transform: scaleX(1);
        }

        .connections-atlas__tab[aria-selected="true"] .connections-atlas__tab-number,
        .connections-atlas__tab[aria-selected="true"] small {
          color: rgba(255,255,255,0.72);
        }

        .connections-atlas__tab[aria-selected="true"] .connections-atlas__tab-icon {
          background: rgba(255,255,255,0.14);
          color: var(--primary-foreground);
        }

        .connections-atlas__shell {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(360px, 0.68fr);
          gap: 18px;
          align-items: stretch;
        }

        .connections-atlas__media {
          position: relative;
          min-height: 660px;
          overflow: hidden;
          border: 1px solid rgba(15,94,112,0.1);
          border-radius: var(--radius-md);
          background: var(--brand-deep);
          box-shadow: 0 30px 78px rgba(8, 51, 64, 0.18);
        }

        .connections-atlas__media .media-stage,
        .connections-atlas__media .media-stage__media {
          width: 100%;
          height: 100%;
          min-height: 660px;
        }

        .connections-atlas__media::after {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(8,31,38,0.04), rgba(8,31,38,0.42)),
            linear-gradient(90deg, rgba(8,31,38,0.46), transparent 52%);
        }

        .connections-atlas__media-overlay {
          position: absolute;
          left: 42px;
          bottom: 38px;
          z-index: 1;
          display: grid;
          gap: 9px;
          max-width: 440px;
          color: var(--primary-foreground);
        }

        .connections-atlas__media-overlay span {
          width: fit-content;
          padding: 7px 10px;
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
          backdrop-filter: blur(12px);
        }

        .connections-atlas__media-overlay strong {
          font-family: var(--font-display);
          font-size: 3.7rem;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 0.98;
          text-shadow: 0 14px 36px rgba(0,0,0,0.32);
        }

        .connections-atlas__media-arrow {
          position: absolute;
          top: 50%;
          z-index: 2;
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 999px;
          background: rgba(8, 31, 38, 0.38);
          color: var(--primary-foreground);
          box-shadow: 0 16px 34px rgba(0,0,0,0.18);
          transform: translateY(-50%);
          backdrop-filter: blur(14px);
          transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
        }

        .connections-atlas__media-arrow:hover {
          border-color: rgba(255,255,255,0.5);
          background: rgba(15, 94, 112, 0.82);
        }

        .connections-atlas__media-arrow--prev {
          left: 22px;
        }

        .connections-atlas__media-arrow--next {
          right: 22px;
        }

        .connections-atlas__media-dots {
          position: absolute;
          right: 24px;
          bottom: 30px;
          z-index: 2;
          display: flex;
          gap: 8px;
        }

        .connections-atlas__media-dots button {
          width: 8px;
          height: 8px;
          padding: 0;
          border: 0;
          border-radius: 999px;
          background: rgba(255,255,255,0.42);
          cursor: pointer;
          transition: width 180ms ease, background 180ms ease;
        }

        .connections-atlas__media-dots button[aria-pressed="true"] {
          width: 26px;
          background: var(--primary-foreground);
        }

        .connections-atlas__content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 18px 4px 18px 30px;
          border-left: 1px solid rgba(15,94,112,0.16);
        }

        .connections-atlas__chapter-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
          color: var(--primary);
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .connections-atlas__chapter-kicker span:first-child {
          color: var(--brand-deep);
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 500;
          line-height: 1;
        }

        .connections-atlas__chapter-head {
          display: grid;
          grid-template-columns: 56px minmax(0, 1fr);
          gap: 16px;
          align-items: start;
          margin-bottom: 22px;
        }

        .connections-atlas__chapter-icon {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--primary), var(--brand-deep));
          color: var(--primary-foreground);
        }

        .connections-atlas__chapter-head h3 {
          margin: 0;
          color: var(--brand-deep);
          font-family: var(--font-display);
          font-size: 3.05rem;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 1;
        }

        .connections-atlas__description {
          margin: 0 0 26px;
          color: var(--muted-foreground);
          font-size: 1rem;
          line-height: 1.75;
        }

        .connections-atlas__metric {
          display: grid;
          gap: 6px;
          margin-bottom: 26px;
          padding: 0 0 22px;
          border-bottom: 1px solid rgba(15,94,112,0.14);
        }

        .connections-atlas__metric span {
          color: var(--muted-foreground);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .connections-atlas__metric strong {
          color: var(--brand-deep);
          font-family: var(--font-display);
          font-size: 2.35rem;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 1;
        }

        .connections-atlas__highlights {
          display: grid;
          gap: 14px;
          margin-bottom: 30px;
        }

        .connections-atlas__highlights article {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr);
          gap: 13px;
          align-items: start;
        }

        .connections-atlas__highlights article > span {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: rgba(167, 211, 221, 0.26);
          color: var(--brand-deep);
        }

        .connections-atlas__highlights h4 {
          margin: 0 0 4px;
          color: var(--brand-deep);
          font-size: 0.96rem;
        }

        .connections-atlas__highlights p {
          margin: 0;
          color: var(--muted-foreground);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .connections-atlas__actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .connections-atlas__secondary {
          color: var(--brand-deep);
        }

        .connections-atlas__tab:focus-visible,
        .connections-atlas__media-arrow:focus-visible,
        .connections-atlas__media-dots button:focus-visible,
        .connections-atlas__actions a:focus-visible {
          outline: 3px solid rgba(45, 213, 255, 0.5);
          outline-offset: 3px;
        }

        @media (max-width: 1180px) {
          .connections-atlas__intro h2 {
            font-size: 3.35rem;
          }

          .connections-atlas__shell {
            grid-template-columns: 1fr;
          }

          .connections-atlas__content {
            padding: 30px 0 0;
            border-top: 1px solid rgba(15,94,112,0.16);
            border-left: 0;
          }

          .connections-atlas__media,
          .connections-atlas__media .media-stage,
          .connections-atlas__media .media-stage__media {
            min-height: 540px;
          }
        }

        @media (max-width: 860px) {
          .connections-atlas__intro {
            text-align: left;
          }

          .connections-atlas__intro h2 {
            font-size: 2.75rem;
          }

          .connections-atlas__rail {
            display: flex;
            scroll-snap-type: x mandatory;
            padding: 8px 18px 8px 8px;
          }

          .connections-atlas__tab {
            flex: 0 0 214px;
            min-height: 88px;
            scroll-snap-align: start;
          }

          .connections-atlas__tab-label,
          .connections-atlas__tab small {
            max-width: calc(100% - 32px);
            overflow: visible;
            text-overflow: clip;
            white-space: normal;
          }

          .connections-atlas__tab-label {
            line-height: 1.12;
          }

          .connections-atlas__tab small {
            line-height: 1.2;
          }

          .connections-atlas__media,
          .connections-atlas__media .media-stage,
          .connections-atlas__media .media-stage__media {
            min-height: 430px;
          }

          .connections-atlas__media-overlay {
            right: 24px;
            left: 24px;
            bottom: 24px;
          }

          .connections-atlas__media-overlay strong {
            font-size: 2.55rem;
          }

          .connections-atlas__chapter-head h3 {
            font-size: 2.45rem;
          }

          .connections-atlas__actions .btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 520px) {
          .connections-atlas__intro h2 {
            font-size: 2.35rem;
          }

          .connections-atlas__intro span {
            font-size: 0.98rem;
          }

          .connections-atlas__tab {
            flex-basis: 198px;
            padding: 12px;
          }

          .connections-atlas__tab-icon {
            width: 28px;
            height: 28px;
          }

          .connections-atlas__media,
          .connections-atlas__media .media-stage,
          .connections-atlas__media .media-stage__media {
            min-height: 340px;
          }

          .connections-atlas__media-dots {
            right: 18px;
            top: 18px;
            bottom: auto;
          }

          .connections-atlas__media-arrow {
            width: 42px;
            height: 42px;
          }

          .connections-atlas__media-arrow--prev {
            left: 14px;
          }

          .connections-atlas__media-arrow--next {
            right: 14px;
          }

          .connections-atlas__media-overlay strong {
            font-size: 2.05rem;
          }

          .connections-atlas__content {
            padding-top: 24px;
          }

          .connections-atlas__chapter-head {
            grid-template-columns: 1fr;
          }

          .connections-atlas__chapter-head h3 {
            font-size: 2.1rem;
          }

          .connections-atlas__metric strong {
            font-size: 2rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .connections-atlas *,
          .connections-atlas *::before,
          .connections-atlas *::after {
            animation: none !important;
            scroll-behavior: auto !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
