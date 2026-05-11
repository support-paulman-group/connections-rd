import { X } from "lucide-react";
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
          {links.map((link, index) => (
            <div className={link.children?.length ? "connections-drawer__group" : undefined} key={`${link.href}-${index}`}>
              <a className="connections-drawer__parent" href={link.href} onClick={onClose}>
                {link.label}
              </a>
              {Boolean(link.children?.length) && (
                <div className="connections-drawer__children" aria-label={`${link.label} links`}>
                  {link.children?.map((child) => (
                    <a key={`${child.href}-${child.label}`} href={child.href} onClick={onClose}>
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <a className="connections-drawer__cta" href={ownerAccessHref} onClick={onClose}>
          {ownerAccessLabel}
        </a>
      </aside>
    </div>
  );
}
