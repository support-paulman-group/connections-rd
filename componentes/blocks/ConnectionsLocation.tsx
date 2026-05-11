import { Icon } from "@componentes/shared/Icon";
import { SectionHeader } from "@componentes/shared/SectionHeader";
import type { ConnectionsLocationBlock } from "@herramientas/content/types";

type Props = ConnectionsLocationBlock["props"];

export function ConnectionsLocation(props: Props) {
  return (
    <section className="connections-location section" id="location">
      <div className="container">
        <SectionHeader tag={props.sectionLabel} title={props.title} subtitle={props.subtitle} />
        <div className="connections-location__grid fade-in">
          <iframe title="Connections RD area map" src={props.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="connections-location__highlights">
            {props.highlights.map((highlight) => (
              <article key={highlight.label}>
                <span>
                  <Icon name={highlight.icon} size={24} />
                </span>
                <div>
                  <h3>{highlight.label}</h3>
                  <p>{highlight.distance}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .connections-location {
          background: var(--white);
        }

        .connections-location__grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 26px;
          align-items: stretch;
        }

        .connections-location iframe {
          width: 100%;
          min-height: 460px;
          border: 0;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }

        .connections-location__highlights {
          display: grid;
          gap: 16px;
        }

        .connections-location__highlights article {
          display: flex;
          align-items: center;
          gap: 16px;
          min-height: 102px;
          padding: 20px;
          border: 1px solid rgba(15,94,112,0.1);
          border-radius: var(--radius-md);
          background: var(--soft-bg);
        }

        .connections-location__highlights span {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--primary-blue);
          color: var(--white);
        }

        .connections-location__highlights h3 {
          margin: 0 0 4px;
          color: var(--deep-blue);
          font-size: 1rem;
        }

        .connections-location__highlights p {
          margin: 0;
          color: var(--text-secondary);
          font-weight: 700;
        }

        @media (max-width: 980px) {
          .connections-location__grid {
            grid-template-columns: 1fr;
          }

          .connections-location__highlights {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
