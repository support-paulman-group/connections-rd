import { Menu, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { ConnectionsNavbarBlock } from "@herramientas/content/types";
import { DesktopNav } from "./navbar/DesktopNav";
import { MobileDrawer } from "./navbar/MobileDrawer";
import "./navbar/ConnectionsNavbar.css";

type Props = ConnectionsNavbarBlock["props"];

export function ConnectionsNavbar(props: Props) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setHeroVisible(false);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting && entry.intersectionRatio > 0.16), {
      threshold: [0, 0.16, 0.4],
      rootMargin: "-8% 0px -42% 0px",
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const logoSrc = heroVisible ? props.logoLightUrl || props.logoDarkUrl : props.logoDarkUrl || props.logoLightUrl;
  const foreground = heroVisible ? "#ffffff" : "var(--foreground)";
  const logoStyle = {
    width: props.logoDesktopWidth,
    "--mobile-logo-width": `${props.logoMobileWidth}px`,
  } as CSSProperties;

  return (
    <>
      <header className={heroVisible ? "connections-nav connections-nav--hero" : "connections-nav"}>
        <div className="connections-nav__inner">
          <a href="#" className="connections-nav__logo" style={logoStyle} aria-label="Connections RD home">
            <img src={logoSrc} alt="Connections RD" />
          </a>

          <DesktopNav links={props.links} foreground={foreground} openMenu={openMenu} setOpenMenu={setOpenMenu} />

          <div className="connections-nav__actions">
            <a className="connections-nav__cta" href={props.ownerAccessHref}>
              <UserRound size={16} />
              {props.ownerAccessLabel}
            </a>
            <button
              className="connections-nav__menu"
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              style={{ color: foreground, borderColor: heroVisible ? "rgba(255,255,255,0.26)" : "rgba(15,94,112,0.16)" }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <MobileDrawer
          links={props.links}
          logoLightUrl={props.logoLightUrl}
          logoMobileWidth={props.logoMobileWidth}
          ownerAccessHref={props.ownerAccessHref}
          ownerAccessLabel={props.ownerAccessLabel}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
