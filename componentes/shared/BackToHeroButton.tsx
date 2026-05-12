import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToHeroButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero || !("IntersectionObserver" in window)) {
      const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: "-20% 0px 0px 0px",
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  function scrollToHero() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = document.getElementById("hero");

    if (hero) {
      hero.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  return (
    <button
      className={visible ? "back-to-hero is-visible" : "back-to-hero"}
      type="button"
      aria-label="Back to hero section"
      onClick={scrollToHero}
    >
      <ChevronUp size={28} strokeWidth={3} />
      <style>{`
        .back-to-hero {
          position: fixed;
          right: clamp(18px, 3vw, 34px);
          bottom: clamp(18px, 3vw, 34px);
          z-index: var(--z-floating);
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: var(--radius-sm);
          background: var(--primary);
          color: var(--primary-foreground);
          box-shadow: 0 18px 38px rgba(8, 51, 64, 0.22);
          opacity: 0;
          pointer-events: none;
          transform: translateY(16px) scale(0.96);
          transition: opacity 0.22s ease, transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
        }

        .back-to-hero.is-visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0) scale(1);
        }

        .back-to-hero:hover {
          background: var(--brand-deep);
          box-shadow: 0 22px 44px rgba(8, 51, 64, 0.28);
          transform: translateY(-3px) scale(1);
        }

        .back-to-hero:focus-visible {
          outline: 3px solid rgba(167, 211, 221, 0.95);
          outline-offset: 4px;
        }

        @media (max-width: 640px) {
          .back-to-hero {
            width: 48px;
            height: 48px;
            right: 16px;
            bottom: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .back-to-hero {
            transition: opacity 0.01ms linear;
          }
        }
      `}</style>
    </button>
  );
}
