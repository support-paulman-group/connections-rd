import { Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";
import type { ConnectionsFooterBlock } from "@herramientas/content/types";

type Props = ConnectionsFooterBlock["props"];

export function ConnectionsFooter(props: Props) {
  const socialLinks = [
    { href: props.facebookHref, label: "Facebook", Icon: Facebook },
    { href: props.instagramHref, label: "Instagram", Icon: Instagram },
    { href: props.youtubeHref, label: "YouTube", Icon: Youtube },
    { href: props.whatsappHref, label: "WhatsApp", Icon: MessageCircle },
  ].filter((link) => link.href && link.href !== "#");

  return (
    <footer className="connections-footer">
      <div className="container connections-footer__grid">
        <div>
          {props.logoUrl ? <img className="connections-footer__logo" src={props.logoUrl} alt="Connections RD" loading="lazy" /> : <strong>{props.tagline}</strong>}
          <p className="connections-footer__tagline">{props.tagline}</p>
          <p>{props.description}</p>
          <div className="connections-footer__social">
            {socialLinks.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                <Icon aria-hidden="true" size={18} strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2>{props.quickLinksTitle}</h2>
          <nav>
            {props.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h2>{props.resourcesTitle}</h2>
          <nav>
            {props.resourcesLinks.map((link) => (
              <a key={`${link.href}-${link.label}`} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h2>Legal</h2>
          <a href={`tel:${props.phone.replace(/[^\d+]/g, "")}`}>{props.phone}</a>
          <a href={`mailto:${props.email}`}>{props.email}</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
      <div className="container connections-footer__bottom">
        <span>{props.legal}</span>
        <span>© {new Date().getFullYear()} Connections RD. All rights reserved.</span>
      </div>
      <style>{`
        .connections-footer {
          padding: 64px 0 32px;
          background: var(--text-primary);
          color: var(--white);
        }

        .connections-footer__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }

        .connections-footer__logo {
          width: 180px;
          max-height: 80px;
          object-fit: contain;
          object-position: left center;
          margin-bottom: 18px;
        }

        .connections-footer p,
        .connections-footer a {
          color: rgba(255,255,255,0.72);
          line-height: 1.8;
        }

        .connections-footer__tagline {
          margin: 0 0 10px;
          color: var(--white) !important;
          font-weight: 800;
        }

        .connections-footer h2 {
          margin: 0 0 18px;
          color: var(--light-accent);
          font-size: 0.86rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .connections-footer nav,
        .connections-footer__grid > div:last-child {
          display: grid;
          gap: 8px;
        }

        .connections-footer a:hover {
          color: var(--white);
        }

        .connections-footer__social {
          display: flex;
          gap: 10px;
          margin-top: 18px;
        }

        .connections-footer__social a {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          color: var(--white);
          transition: background 180ms ease, color 180ms ease, transform 180ms ease;
        }

        .connections-footer__social a:hover,
        .connections-footer__social a:focus-visible {
          background: var(--primary-blue);
          color: var(--white);
          transform: translateY(-2px);
        }

        .connections-footer__social a svg {
          display: block;
        }

        .connections-footer__bottom {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 46px;
          padding-top: 26px;
          border-top: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.54);
          font-size: 0.84rem;
        }

        @media (max-width: 1024px) {
          .connections-footer__grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .connections-footer__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
