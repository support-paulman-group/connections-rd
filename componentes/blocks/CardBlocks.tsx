import { Icon } from "@componentes/shared/Icon";
import { SectionHeader } from "@componentes/shared/SectionHeader";
import type { CardBlock } from "@herramientas/content/types";

type Props = CardBlock["props"] & {
  variant?: "light" | "soft" | "dark";
};

export function ConnectionsCardBlock({ sectionLabel, title, subtitle, cards, variant = "light" }: Props) {
  const dark = variant === "dark";
  return (
    <section className={`connections-cards section connections-cards--${variant}`} id={sectionId(sectionLabel)}>
      <div className="container">
        <SectionHeader tag={sectionLabel} title={title} subtitle={subtitle} dark={dark} />
        <div className="connections-cards__grid">
          {cards.map((card) => (
            <article className="connections-cards__card fade-in" key={card.title}>
              <div className="connections-cards__icon">
                <Icon name={card.icon} size={34} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .connections-cards {
          background: var(--background);
        }

        .connections-cards--soft {
          background: var(--muted);
        }

        .connections-cards--dark {
          background: linear-gradient(135deg, var(--brand-deep), #083340);
          color: var(--primary-foreground);
        }

        .connections-cards__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 28px;
        }

        .connections-cards__card {
          min-height: 100%;
          padding: 34px;
          border: 1px solid rgba(15,94,112,0.1);
          border-radius: var(--radius-md);
          background: var(--background);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .connections-cards--dark .connections-cards__card {
          border-color: rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.08);
          box-shadow: none;
        }

        .connections-cards__card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
        }

        .connections-cards__icon {
          width: 70px;
          height: 70px;
          display: grid;
          place-items: center;
          margin-bottom: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--brand-deep));
          color: var(--primary-foreground);
        }

        .connections-cards h3 {
          margin: 0 0 12px;
          color: var(--brand-deep);
          font-size: 1.25rem;
        }

        .connections-cards--dark h3 {
          color: var(--primary-foreground);
        }

        .connections-cards p {
          margin: 0;
          color: var(--muted-foreground);
        }

        .connections-cards--dark p {
          color: rgba(255,255,255,0.78);
        }
      `}</style>
    </section>
  );
}

function sectionId(sectionLabel: string) {
  const normalized = sectionLabel.trim().toLowerCase();
  if (normalized === "investment") return "investment";
  if (normalized === "community") return "community";
  return "lifestyle";
}
