import type { ConnectionsHeroBlock } from "@herramientas/content/types";

type Props = ConnectionsHeroBlock["props"];

export function ConnectionsHero(props: Props) {
  return (
    <section className="connections-hero" id="hero">
      {props.videoUrl ? (
        <video className="connections-hero__media" autoPlay muted loop playsInline preload="metadata">
          <source src={props.videoUrl} type="video/mp4" />
        </video>
      ) : props.fallbackImageUrl ? (
        <img className="connections-hero__media" src={props.fallbackImageUrl} alt={props.title} />
      ) : (
        <div className="connections-hero__media connections-hero__fallback" />
      )}
      <div className="connections-hero__overlay" />
      <div className="connections-hero__content">
        {props.logoUrl && <img className="connections-hero__logo" src={props.logoUrl} alt="Connections RD" />}
        <h1>{props.title}</h1>
        <p className="connections-hero__subtitle">{props.subtitle}</p>
        <p className="connections-hero__price">
          {props.pricePrefix} <strong>{props.priceValue}</strong>
        </p>
        <div className="connections-hero__actions">
          <a className="btn btn-primary" href={props.primaryHref}>
            {props.primaryLabel}
          </a>
          <a className="btn btn-secondary connections-hero__secondary" href={props.secondaryHref}>
            {props.secondaryLabel}
          </a>
        </div>
      </div>
      {props.showScrollIndicator && (
        <a className="connections-hero__scroll" href="#lifestyle" aria-label="Scroll to content">
          <span className="connections-hero__scroll-label">Explore</span>
          <span aria-hidden="true" />
        </a>
      )}

      <style>{`
        .connections-hero {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(120px, 18vh, 170px) 0 clamp(86px, 12vh, 132px);
          overflow: hidden;
          isolation: isolate;
        }

        .connections-hero__media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -2;
        }

        .connections-hero__fallback {
          background: linear-gradient(135deg, var(--brand-deep), #083340);
        }

        .connections-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15,94,112,0.32), rgba(15,94,112,0.56), rgba(15,94,112,0.82));
          z-index: -1;
        }

        .connections-hero__content {
          width: min(900px, 100% - 40px);
          color: var(--primary-foreground);
          text-align: center;
        }

        .connections-hero__logo {
          height: 82px;
          object-fit: contain;
          margin-bottom: 28px;
        }

        .connections-hero h1 {
          margin: 0 0 24px;
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 6vw, 5.25rem);
          font-weight: 500;
          line-height: 1.05;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .connections-hero__subtitle {
          max-width: 660px;
          margin: 0 auto 34px;
          white-space: pre-line;
          font-size: clamp(1.02rem, 2vw, 1.28rem);
          line-height: 1.72;
          opacity: 0.96;
        }

        .connections-hero__price {
          margin: 0 0 32px;
          color: var(--accent);
          font-size: 1.35rem;
          font-weight: 700;
        }

        .connections-hero__price strong {
          font-size: clamp(2rem, 4vw, 2.7rem);
        }

        .connections-hero__actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .connections-hero__secondary {
          color: var(--primary-foreground);
        }

        .connections-hero__secondary:hover {
          background: var(--background);
          color: var(--brand-deep);
        }

        .connections-hero__scroll {
          position: absolute;
          right: clamp(24px, 4vw, 64px);
          bottom: clamp(24px, 5vh, 46px);
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-height: 46px;
          padding: 8px 10px 8px 16px;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 999px;
          background: rgba(8, 51, 64, 0.22);
          backdrop-filter: blur(14px);
          color: var(--primary-foreground);
          text-decoration: none;
          opacity: 0.82;
          transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }

        .connections-hero__scroll-label {
          position: static;
          width: auto;
          height: auto;
          border-radius: 0;
          background: transparent;
          animation: none;
          color: rgba(255,255,255,0.78);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .connections-hero__scroll::before {
          content: "";
          width: 22px;
          height: 34px;
          border: 2px solid rgba(255,255,255,0.7);
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          box-shadow: 0 10px 26px rgba(0,0,0,0.16);
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .connections-hero__scroll span[aria-hidden="true"] {
          position: absolute;
          top: 16px;
          left: 25px;
          width: 3px;
          height: 7px;
          border-radius: 50%;
          background: var(--background);
          animation: hero-scroll 1.6s ease-in-out infinite;
        }

        .connections-hero__scroll:hover,
        .connections-hero__scroll:focus-visible {
          border-color: rgba(255,255,255,0.36);
          background: rgba(8, 51, 64, 0.34);
          opacity: 1;
          transform: translateY(-2px);
        }

        .connections-hero__scroll:hover::before,
        .connections-hero__scroll:focus-visible::before {
          border-color: var(--primary-foreground);
          background: rgba(255,255,255,0.1);
        }

        .connections-hero__scroll:focus-visible {
          outline: 3px solid rgba(167,211,221,0.9);
          outline-offset: 5px;
        }

        @keyframes hero-scroll {
          0%, 100% { transform: translateY(0); opacity: 0.38; }
          50% { transform: translateY(10px); opacity: 1; }
        }

        @media (max-height: 820px) and (min-width: 900px) {
          .connections-hero {
            padding-bottom: 86px;
          }

          .connections-hero__scroll {
            bottom: 22px;
            min-height: 40px;
            padding: 7px 9px 7px 14px;
          }

          .connections-hero__scroll::before {
            width: 18px;
            height: 28px;
          }

          .connections-hero__scroll span[aria-hidden="true"] {
            top: 13px;
            left: 22px;
          }
        }

        @media (max-width: 640px) {
          .connections-hero {
            padding-bottom: 72px;
          }

          .connections-hero__actions .btn {
            width: 100%;
          }

          .connections-hero__scroll {
            left: 50%;
            right: auto;
            bottom: 18px;
            transform: translateX(-50%);
          }

          .connections-hero__scroll:hover,
          .connections-hero__scroll:focus-visible {
            transform: translate(-50%, -2px);
          }
        }

        @media (max-height: 700px) {
          .connections-hero__scroll {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .connections-hero__scroll span[aria-hidden="true"] {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
