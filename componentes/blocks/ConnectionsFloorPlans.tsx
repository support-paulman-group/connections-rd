import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { MediaCarousel } from "@componentes/shared/MediaCarousel";
import { SectionHeader } from "@componentes/shared/SectionHeader";
import type { ConnectionsFloorPlansBlock } from "@herramientas/content/types";

type Props = ConnectionsFloorPlansBlock["props"];

export function ConnectionsFloorPlans(props: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = props.tabs[activeIndex] ?? props.tabs[0];
  const features = active.features.map((feature) => (typeof feature === "string" ? feature : feature.value));

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
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="connections-floor__content fade-in">
          <MediaCarousel slides={active.slides ?? []} label={active.label} />
          <div className="connections-floor__details">
            <span>{active.sqft}</span>
            <h3>{active.label}</h3>
            <p className="connections-floor__price">{active.price}</p>
            <ul>
              {features.map((feature) => (
                <li key={feature}>
                  <Check size={18} />
                  {feature}
                </li>
              ))}
            </ul>
            <a className="btn btn-primary" href={props.ctaHref}>
              {props.ctaLabel}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .connections-floor {
          background: var(--soft-bg);
        }

        .connections-floor__tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 42px;
        }

        .connections-floor__tabs button {
          min-height: 48px;
          padding: 12px 24px;
          border: 2px solid var(--light-accent);
          border-radius: var(--radius-sm);
          background: var(--white);
          color: var(--text-primary);
          font-weight: 700;
          transition: var(--transition);
        }

        .connections-floor__tabs button[aria-selected="true"] {
          border-color: var(--primary-blue);
          background: var(--primary-blue);
          color: var(--white);
        }

        .connections-floor__content {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
          gap: clamp(28px, 5vw, 60px);
          align-items: center;
        }

        .connections-floor__details {
          padding: clamp(10px, 3vw, 30px);
        }

        .connections-floor__details > span {
          display: inline-flex;
          margin-bottom: 16px;
          padding: 7px 14px;
          border-radius: 999px;
          background: var(--light-accent);
          color: var(--deep-blue);
          font-size: 0.86rem;
          font-weight: 800;
        }

        .connections-floor__details h3 {
          margin: 0 0 10px;
          color: var(--deep-blue);
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1;
        }

        .connections-floor__price {
          margin: 0 0 26px;
          color: var(--primary-blue);
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
        }

        .connections-floor__details ul {
          display: grid;
          margin: 0 0 30px;
          padding: 0;
          list-style: none;
        }

        .connections-floor__details li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(15,94,112,0.12);
          color: var(--text-secondary);
        }

        .connections-floor__details li svg {
          margin-top: 3px;
          color: var(--primary-blue);
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .connections-floor__content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
