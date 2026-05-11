import { Icon } from "@componentes/shared/Icon";
import { SectionHeader } from "@componentes/shared/SectionHeader";
import type { ConnectionsAmenitiesBlock } from "@herramientas/content/types";

type Props = ConnectionsAmenitiesBlock["props"];

export function ConnectionsAmenities(props: Props) {
  return (
    <section className="connections-amenities section" id="amenities">
      <div className="container">
        <SectionHeader tag={props.sectionLabel} title={props.title} subtitle={props.subtitle} />
        <div className="connections-amenities__grid">
          {props.items.map((item) => (
            <div className="connections-amenities__item fade-in" key={item.label}>
              <span>
                <Icon name={item.icon} size={24} />
              </span>
              <strong>{item.label}</strong>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .connections-amenities {
          background: var(--soft-bg);
        }

        .connections-amenities__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 20px;
        }

        .connections-amenities__item {
          display: flex;
          align-items: center;
          gap: 16px;
          min-height: 88px;
          padding: 18px;
          border: 1px solid rgba(15,94,112,0.08);
          border-radius: var(--radius-sm);
          background: var(--white);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .connections-amenities__item:hover {
          transform: translateX(4px);
        }

        .connections-amenities__item span {
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: var(--radius-sm);
          background: var(--light-accent);
          color: var(--deep-blue);
        }
      `}</style>
    </section>
  );
}
