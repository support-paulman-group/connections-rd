import { ConnectionsBrandMark } from "@componentes/shared/ConnectionsBrandMark";
import type { ConnectionsFooterBlock } from "@herramientas/content/types";

type Props = ConnectionsFooterBlock["props"];
type SocialLabel = "Facebook" | "Instagram" | "YouTube" | "WhatsApp";

export function ConnectionsFooter(props: Props) {
  const socialLinks: Array<{ href: string; label: SocialLabel }> = [
    { href: props.facebookHref, label: "Facebook" },
    { href: props.instagramHref, label: "Instagram" },
    { href: props.youtubeHref, label: "YouTube" },
    { href: props.whatsappHref, label: "WhatsApp" },
  ].filter((link) => link.href && link.href !== "#");

  return (
    <footer className="connections-footer">
      <div className="container connections-footer__grid">
        <div>
          {props.logoUrl ? <ConnectionsBrandMark src={props.logoUrl} variant="light" context="footer" className="connections-footer__brand" /> : <strong>{props.tagline}</strong>}
          <p className="connections-footer__tagline">{props.tagline}</p>
          <p>{props.description}</p>
          <div className="connections-footer__social">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                <SocialIcon label={link.label} />
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
          background: var(--foreground);
          color: var(--primary-foreground);
        }

        .connections-footer__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }

        .connections-footer__brand {
          margin-bottom: 18px;
        }

        .connections-footer p,
        .connections-footer a {
          color: rgba(255,255,255,0.72);
          line-height: 1.8;
        }

        .connections-footer__tagline {
          margin: 0 0 10px;
          color: var(--primary-foreground) !important;
          font-weight: 800;
        }

        .connections-footer h2 {
          margin: 0 0 18px;
          color: var(--accent);
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
          color: var(--primary-foreground);
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
          color: var(--primary-foreground);
          font-weight: 800;
          transition: var(--transition);
        }

        .connections-footer__social a:hover {
          background: var(--primary);
          color: var(--primary-foreground);
          transform: translateY(-2px);
        }

        .connections-footer__social svg {
          width: 19px;
          height: 19px;
          display: block;
          fill: currentColor;
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

function SocialIcon({ label }: { label: SocialLabel }) {
  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14.2 8.1V6.7c0-.7.5-.9.9-.9h2.2V2.1L14.2 2c-3.5 0-4.3 2.6-4.3 4.3v1.8H7.1V12h2.8v10h4.2V12h3.1l.5-3.9h-3.5Z" />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7.7 2h8.6C19.5 2 22 4.5 22 7.7v8.6c0 3.2-2.5 5.7-5.7 5.7H7.7C4.5 22 2 19.5 2 16.3V7.7C2 4.5 4.5 2 7.7 2Zm0 2C5.6 4 4 5.6 4 7.7v8.6C4 18.4 5.6 20 7.7 20h8.6c2.1 0 3.7-1.6 3.7-3.7V7.7C20 5.6 18.4 4 16.3 4H7.7Zm8.9 2.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      </svg>
    );
  }

  if (label === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10 15.4V8.6l5.9 3.4L10 15.4Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a9.8 9.8 0 0 0-8.5 14.7L2.3 22l5.4-1.2A9.9 9.9 0 0 0 12 22a10 10 0 0 0 0-20Zm0 18.1c-1.4 0-2.8-.4-4-1.1l-.3-.2-3 .7.7-2.9-.2-.3A8 8 0 1 1 12 20.1Zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.1 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.5-.4Z" />
    </svg>
  );
}
