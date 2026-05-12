import { ArrowRight, Check, Home, Ruler, Sparkles, Tag } from "lucide-react";
import { useState } from "react";
import { MediaCarousel } from "@componentes/shared/MediaCarousel";
import { SectionHeader } from "@componentes/shared/SectionHeader";
import type { ConnectionsFloorPlansBlock } from "@herramientas/content/types";

type Props = ConnectionsFloorPlansBlock["props"];

export function ConnectionsFloorPlans(props: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = props.tabs[activeIndex] ?? props.tabs[0];
  const features = active.features.map((feature) => (typeof feature === "string" ? feature : feature.value));
  const hasSlides = Boolean(active.slides?.some((slide) => slide.imageUrl));
  const tabPanelId = `${props.id}-panel`;

  return (
    <section className="connections-floor section" id="units">
      <div className="container">
        <SectionHeader tag={props.sectionLabel} title={props.title} subtitle={props.subtitle} />
        <div className="connections-floor__tabs fade-in" role="tablist" aria-label="Floor plan options">
          {props.tabs.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={tabPanelId}
              onClick={() => setActiveIndex(index)}
            >
              <span>{tab.label}</span>
              <small>{tab.price}</small>
            </button>
          ))}
        </div>

        <div className="connections-floor__content fade-in" id={tabPanelId} role="tabpanel">
          <div className="connections-floor__media">
            {hasSlides ? (
              <MediaCarousel slides={active.slides ?? []} label={active.label} />
            ) : (
              <div className="connections-floor__blueprint" aria-label={`${active.label} preview`}>
                <div className="connections-floor__blueprint-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div>
                  <small>Private preview</small>
                  <strong>{active.label}</strong>
                  <p>Detailed plan available in the info packet.</p>
                </div>
              </div>
            )}
            <div className="connections-floor__media-note">
              <span>Cabarete coastal residences</span>
              <strong>{active.sqft}</strong>
            </div>
          </div>

          <div className="connections-floor__details">
            <div className="connections-floor__eyebrow">
              <Sparkles size={16} />
              <span>Featured residence</span>
            </div>
            <h3>{active.label}</h3>
            <p className="connections-floor__intro">
              Designed for lock-and-leave coastal living with flexible ownership, generous outdoor space, and polished rental appeal.
            </p>

            <div className="connections-floor__metrics" aria-label={`${active.label} highlights`}>
              <div>
                <Ruler size={18} />
                <span>Interior scale</span>
                <strong>{active.sqft}</strong>
              </div>
              <div>
                <Tag size={18} />
                <span>Starting price</span>
                <strong>{active.price}</strong>
              </div>
              <div>
                <Home size={18} />
                <span>Unit style</span>
                <strong>{active.label}</strong>
              </div>
            </div>

            <ul className="connections-floor__features">
              {features.map((feature) => (
                <li key={feature}>
                  <Check size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="connections-floor__cta-row">
              <a className="btn btn-primary" href={props.ctaHref}>
                {props.ctaLabel}
                <ArrowRight size={17} />
              </a>
              <p>Request current availability, payment details, and full floor plan packet.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .connections-floor {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(245, 247, 248, 0.72), var(--muted) 34%),
            radial-gradient(circle at 10% 12%, rgba(167, 211, 221, 0.28), transparent 34%);
        }

        .connections-floor::before {
          position: absolute;
          inset: 0;
          content: "";
          pointer-events: none;
          background-image:
            linear-gradient(rgba(15, 94, 112, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 94, 112, 0.045) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 78%, transparent);
        }

        .connections-floor__tabs {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          max-width: 860px;
          margin: 0 auto 40px;
          padding: 8px;
          border: 1px solid rgba(15,94,112,0.1);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.76);
          box-shadow: var(--shadow-sm);
          backdrop-filter: blur(18px);
        }

        .connections-floor__tabs button {
          display: grid;
          gap: 3px;
          min-height: 64px;
          padding: 12px 16px;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--foreground);
          text-align: left;
          transition: var(--transition);
        }

        .connections-floor__tabs button span {
          font-weight: 800;
        }

        .connections-floor__tabs button small {
          color: var(--muted-foreground);
          font-size: 0.74rem;
          font-weight: 700;
        }

        .connections-floor__tabs button[aria-selected="true"] {
          border-color: rgba(15,94,112,0.18);
          background: var(--brand-deep);
          color: var(--primary-foreground);
          box-shadow: 0 16px 34px rgba(15, 94, 112, 0.22);
          transform: translateY(-2px);
        }

        .connections-floor__tabs button[aria-selected="true"] small {
          color: rgba(255,255,255,0.72);
        }

        .connections-floor__tabs button:focus-visible,
        .connections-floor__cta-row a:focus-visible {
          outline: 3px solid rgba(167, 211, 221, 0.95);
          outline-offset: 4px;
        }

        .connections-floor__content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(360px, 0.88fr);
          gap: clamp(22px, 4vw, 44px);
          align-items: stretch;
        }

        .connections-floor__media {
          position: relative;
          min-width: 0;
        }

        .connections-floor__media .media-carousel {
          min-height: 590px;
          border-radius: var(--radius-md);
          box-shadow: 0 28px 70px rgba(8, 51, 64, 0.22);
        }

        .connections-floor__media .media-carousel__stage,
        .connections-floor__media .media-carousel__stage img,
        .connections-floor__media .media-carousel__stage video {
          min-height: 590px;
        }

        .connections-floor__media-note {
          position: absolute;
          left: 22px;
          bottom: 22px;
          display: grid;
          gap: 4px;
          width: min(280px, calc(100% - 44px));
          padding: 16px 18px;
          border: 1px solid rgba(255,255,255,0.36);
          border-radius: var(--radius-sm);
          background: rgba(8, 31, 38, 0.72);
          color: var(--primary-foreground);
          box-shadow: 0 18px 40px rgba(0,0,0,0.18);
          backdrop-filter: blur(18px);
        }

        .connections-floor__media-note span {
          color: rgba(255,255,255,0.72);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .connections-floor__media-note strong {
          font-family: var(--font-display);
          font-size: 1.7rem;
          line-height: 1;
        }

        .connections-floor__blueprint {
          position: relative;
          display: grid;
          min-height: 590px;
          place-items: center;
          overflow: hidden;
          padding: clamp(28px, 5vw, 56px);
          border: 1px solid rgba(15,94,112,0.12);
          border-radius: var(--radius-md);
          background:
            linear-gradient(135deg, rgba(15,94,112,0.96), rgba(8,51,64,0.96)),
            var(--brand-deep);
          color: var(--primary-foreground);
          box-shadow: 0 28px 70px rgba(8, 51, 64, 0.22);
        }

        .connections-floor__blueprint::before {
          position: absolute;
          inset: 26px;
          content: "";
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: var(--radius-sm);
        }

        .connections-floor__blueprint-grid {
          position: absolute;
          inset: 0;
          opacity: 0.32;
          background-image:
            linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px);
          background-size: 46px 46px;
        }

        .connections-floor__blueprint-grid span {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.38);
          border-radius: 2px;
        }

        .connections-floor__blueprint-grid span:nth-child(1) {
          inset: 18% 52% 48% 15%;
        }

        .connections-floor__blueprint-grid span:nth-child(2) {
          inset: 18% 18% 48% 51%;
        }

        .connections-floor__blueprint-grid span:nth-child(3) {
          inset: 53% 55% 18% 15%;
        }

        .connections-floor__blueprint-grid span:nth-child(4) {
          inset: 53% 18% 18% 48%;
        }

        .connections-floor__blueprint div:last-child {
          position: relative;
          max-width: 420px;
          text-align: center;
        }

        .connections-floor__blueprint small {
          display: block;
          margin-bottom: 16px;
          color: var(--accent);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .connections-floor__blueprint strong {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 4.6rem);
          font-weight: 500;
          line-height: 0.95;
        }

        .connections-floor__blueprint p {
          margin: 18px auto 0;
          max-width: 320px;
          color: rgba(255,255,255,0.78);
        }

        .connections-floor__details {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(28px, 4vw, 46px);
          border: 1px solid rgba(15,94,112,0.1);
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.86);
          box-shadow: 0 24px 56px rgba(8, 51, 64, 0.11);
          backdrop-filter: blur(18px);
        }

        .connections-floor__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          margin-bottom: 18px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(167, 211, 221, 0.32);
          color: var(--brand-deep);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .connections-floor__details h3 {
          margin: 0;
          color: var(--brand-deep);
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4.35rem);
          font-weight: 500;
          line-height: 0.98;
        }

        .connections-floor__intro {
          max-width: 520px;
          margin: 20px 0 26px;
          color: var(--muted-foreground);
          font-size: 1.02rem;
          line-height: 1.75;
        }

        .connections-floor__metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 26px;
        }

        .connections-floor__metrics div {
          display: grid;
          gap: 8px;
          min-width: 0;
          padding: 16px;
          border: 1px solid rgba(15,94,112,0.1);
          border-radius: var(--radius-sm);
          background: rgba(245,247,248,0.72);
        }

        .connections-floor__metrics svg {
          color: var(--primary);
        }

        .connections-floor__metrics span {
          color: var(--muted-foreground);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }

        .connections-floor__metrics strong {
          color: var(--brand-deep);
          font-size: clamp(0.92rem, 1.25vw, 1.08rem);
          line-height: 1.2;
        }

        .connections-floor__features {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin: 0 0 30px;
          padding: 0;
          list-style: none;
        }

        .connections-floor__features li {
          display: flex;
          align-items: center;
          gap: 10px;
          min-height: 48px;
          padding: 10px 12px;
          border: 1px solid rgba(15,94,112,0.09);
          border-radius: var(--radius-sm);
          background: var(--background);
          color: var(--foreground);
          font-weight: 700;
        }

        .connections-floor__features li svg {
          color: var(--primary);
          flex-shrink: 0;
        }

        .connections-floor__cta-row {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 18px;
          align-items: center;
          padding-top: 4px;
        }

        .connections-floor__cta-row p {
          max-width: 320px;
          margin: 0;
          color: var(--muted-foreground);
          font-size: 0.9rem;
          line-height: 1.55;
        }

        @media (max-width: 900px) {
          .connections-floor__tabs {
            grid-template-columns: 1fr;
          }

          .connections-floor__content {
            grid-template-columns: 1fr;
          }

          .connections-floor__media .media-carousel,
          .connections-floor__media .media-carousel__stage,
          .connections-floor__media .media-carousel__stage img,
          .connections-floor__media .media-carousel__stage video,
          .connections-floor__blueprint {
            min-height: 460px;
          }
        }

        @media (max-width: 640px) {
          .connections-floor__tabs {
            margin-bottom: 24px;
          }

          .connections-floor__details {
            padding: 24px;
          }

          .connections-floor__metrics,
          .connections-floor__features,
          .connections-floor__cta-row {
            grid-template-columns: 1fr;
          }

          .connections-floor__cta-row .btn {
            width: 100%;
          }

          .connections-floor__media-note {
            position: static;
            width: 100%;
            margin-top: 12px;
            background: var(--brand-deep);
          }
        }
      `}</style>
    </section>
  );
}
