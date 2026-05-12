import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import type { NavLink } from "@herramientas/content/types";

type MobileDrawerProps = {
  links: NavLink[];
  logoLightUrl: string;
  logoMobileWidth: number;
  ownerAccessHref: string;
  ownerAccessLabel: string;
  onClose: () => void;
};

export function MobileDrawer({ links, logoLightUrl, logoMobileWidth, ownerAccessHref, ownerAccessLabel, onClose }: MobileDrawerProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (key: string) => {
    setOpenGroups((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="connections-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <aside className="connections-drawer__panel">
        <div className="connections-drawer__head">
          <img src={logoLightUrl} alt="Connections RD" style={{ width: logoMobileWidth }} />
          <button type="button" onClick={onClose} aria-label="Close navigation menu">
            <X size={22} />
          </button>
        </div>
        <p>Explore Connections RD: lifestyle, units, amenities, investment, and community resources.</p>
        <nav className="connections-drawer__links">
          {links.map((link, index) => {
            const children = link.children?.filter((child) => child.href && child.label) ?? [];
            const key = `${link.href}-${index}`;
            const groupId = `mobile-drawer-group-${index}`;
            const isOpen = Boolean(openGroups[key]);

            if (children.length === 0) {
              return (
                <a className="connections-drawer__link" href={link.href} key={key} onClick={onClose}>
                  {link.label}
                </a>
              );
            }

            return (
              <div className="connections-drawer__group" key={key} data-open={isOpen ? "true" : "false"}>
                <button
                  className="connections-drawer__accordion"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={groupId}
                  onClick={() => toggleGroup(key)}
                >
                  <span>{link.label}</span>
                  <ChevronDown className="connections-drawer__chevron" size={18} strokeWidth={1.8} />
                </button>
                <div className="connections-drawer__children" id={groupId} aria-label={`${link.label} links`}>
                  <div className="connections-drawer__children-inner">
                    {children.map((child) => (
                      <a key={`${child.href}-${child.label}`} href={child.href} onClick={onClose}>
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <a className="connections-drawer__cta" href={ownerAccessHref} onClick={onClose}>
          {ownerAccessLabel}
        </a>
      </aside>
    </div>
  );
}
