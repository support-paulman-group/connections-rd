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
        <p className="connections-hero__badge">{props.badge}</p>
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
          background: linear-gradient(135deg, var(--deep-blue), #083340);
        }

        .connections-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(15,94,112,0.32), rgba(15,94,112,0.56), rgba(15,94,112,0.82));
          z-index: -1;
        }

        .connections-hero__content {
          width: min(900px, 100% - 40px);
          padding-top: 90px;
          color: var(--white);
          text-align: center;
        }

        .connections-hero__logo {
          height: 82px;
          object-fit: contain;
          margin-bottom: 28px;
        }

        .connections-hero__badge {
          display: inline-flex;
          margin: 0 0 24px;
          padding: 8px 20px;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
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
          color: var(--light-accent);
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
          color: var(--white);
        }

        .connections-hero__secondary:hover {
          background: var(--white);
          color: var(--deep-blue);
        }

        .connections-hero__scroll {
          position: absolute;
          bottom: 34px;
          left: 50%;
          width: 52px;
          height: 68px;
          display: inline-grid;
          place-items: center;
          border-radius: 999px;
          transform: translateX(-50%);
          color: var(--white);
          text-decoration: none;
        }

        .connections-hero__scroll::before {
          content: "";
          width: 28px;
          height: 44px;
          border: 2px solid rgba(255,255,255,0.78);
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          box-shadow: 0 10px 26px rgba(0,0,0,0.16);
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }

        .connections-hero__scroll span {
          position: absolute;
          top: 18px;
          left: 50%;
          width: 4px;
          height: 8px;
          border-radius: 50%;
          background: var(--white);
          transform: translateX(-50%);
          animation: hero-scroll 1.6s ease-in-out infinite;
        }

        .connections-hero__scroll:hover::before,
        .connections-hero__scroll:focus-visible::before {
          border-color: var(--white);
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }

        .connections-hero__scroll:focus-visible {
          outline: 3px solid rgba(167,211,221,0.9);
          outline-offset: 5px;
        }

        @keyframes hero-scroll {
          0%, 100% { transform: translate(-50%, 0); opacity: 0.4; }
          50% { transform: translate(-50%, 13px); opacity: 1; }
        }

        @media (max-width: 640px) {
          .connections-hero__actions .btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .connections-hero__scroll span {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
