import { ChevronDown } from "lucide-react";
import type { Dispatch, FocusEvent, KeyboardEvent, SetStateAction } from "react";
import type { NavLink } from "@herramientas/content/types";

type DesktopNavProps = {
  links: NavLink[];
  foreground: string;
  openMenu: string | null;
  setOpenMenu: Dispatch<SetStateAction<string | null>>;
};

export function DesktopNav({ links, foreground, openMenu, setOpenMenu }: DesktopNavProps) {
  const closeOpenMenu = () => setOpenMenu(null);

  const handleSubmenuBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      closeOpenMenu();
    }
  };

  const handleSubmenuKeyDown = (event: KeyboardEvent<HTMLButtonElement>, key: string) => {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      setOpenMenu(key);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeOpenMenu();
      event.currentTarget.focus();
    }
  };

  return (
    <nav className="connections-nav__links" aria-label="Primary navigation">
      {links.map((link, index) => {
        const key = `${link.href}-${index}`;
        const children = link.children?.filter((child) => child.href && child.label) ?? [];

        if (children.length === 0) {
          return (
            <a key={key} href={link.href} style={{ color: foreground }}>
              {link.label}
            </a>
          );
        }

        return (
          <div
            className="connections-nav__submenu"
            key={key}
            data-open={openMenu === key ? "true" : "false"}
            onMouseEnter={() => setOpenMenu(key)}
            onMouseLeave={closeOpenMenu}
            onBlur={handleSubmenuBlur}
          >
            <button
              type="button"
              style={{ color: foreground }}
              aria-expanded={openMenu === key}
              aria-haspopup="menu"
              aria-controls={`connections-submenu-${index}`}
              onClick={() => setOpenMenu(openMenu === key ? null : key)}
              onFocus={() => setOpenMenu(key)}
              onKeyDown={(event) => handleSubmenuKeyDown(event, key)}
            >
              {link.label}
              <ChevronDown className="connections-nav__chevron" size={14} />
            </button>
            <div className="connections-nav__dropdown" id={`connections-submenu-${index}`} role="menu" data-open={openMenu === key ? "true" : "false"}>
              {children.map((child) => (
                <a key={`${child.href}-${child.label}`} href={child.href} role="menuitem" onClick={closeOpenMenu}>
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
