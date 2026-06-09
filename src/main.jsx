import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
 * MOTION STORYBOARD
 *
 * Read top-to-bottom. Each `at` value is ms after V2 mounts.
 *
 *    0ms   respect reduced-motion and prepare scoped GSAP context
 *   60ms   nav settles in from the top
 *  160ms   Location Rail tagline and hero text rise into place
 *  420ms   hero buttons appear as a compact pair
 *  560ms   full-bleed hero image reveals, scale 1.04 -> 1.00
 *  scroll  hero image drifts subtly while leaving the first fold
 *  scroll  section headings, feature row, and lower content reveal once
 *  change  sticky amenity image and detail refresh when the active item changes
 * --------------------------------------------------------- */
const MOTION_TIMING = {
  nav: 60,
  heroText: 160,
  heroButtons: 420,
  heroImage: 560,
};

const MOTION = {
  ease: "power3.out",
  navOffsetY: -14,
  copyOffsetY: 18,
  sectionOffsetY: 28,
  heroImageScale: 1.04,
  duration: {
    nav: 0.52,
    copy: 0.72,
    buttons: 0.5,
    image: 1.05,
    reveal: 0.74,
    amenityRefresh: 0.42,
  },
  stagger: {
    heroCopy: 0.08,
    buttons: 0.08,
    featureCards: 0.12,
  },
};

const toSeconds = (milliseconds) => milliseconds / 1000;
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const storyItems = [
  {
    label: "Security built in",
    eyebrow: "01 / controlled access",
    title: "The first impression is protected, lit, and intentional.",
    body:
      "Controlled access, CCTV planning, smart lighting, and visitor systems help the community feel protected from the first gate.",
    image: "/assets/entrance-fountain-night.jpg",
  },
  {
    label: "Beauty built in",
    eyebrow: "02 / value protection",
    title: "Standards keep the neighborhood looking consistent.",
    body:
      "Landscaping, architectural standards, curb appeal guidelines, and maintained streets are planned as part of the community system.",
    image: "/assets/phase-one-street.jpg",
  },
  {
    label: "Amenities built in",
    eyebrow: "03 / shared comfort",
    title: "The lifestyle expands beyond the home.",
    body:
      "A clubhouse, gym, pool, green areas, and resident services bring comfort into the community without every homeowner managing it alone.",
    image: "/assets/clubhouse-aerial-pool.jpg",
  },
  {
    label: "Technology built in",
    eyebrow: "04 / resident systems",
    title: "Smart systems make daily living easier to coordinate.",
    body:
      "Access systems, lighting, connectivity, communication tools, and the Applewoods portal support a more organized way to live.",
    image: "/assets/masterplan.jpg",
  },
];

const lotTypes = [
  {
    name: "Standard Lots",
    price: "Expected from $85,000",
    body: "A strong entry point into the Applewoods community.",
  },
  {
    name: "Premier Lots",
    price: "Expected from $95,000",
    body: "Select homesites near the planned clubhouse area.",
  },
  {
    name: "Corner Lots",
    price: "Priced individually",
    body: "Larger or irregular lots priced by size and location.",
  },
];

const faqs = [
  {
    question: "Which lots are still available?",
    answer:
      "Availability can change quickly as buyers reserve or move under contract. Confirm current status with the sales team.",
  },
  {
    question: "Will prices stay the same?",
    answer:
      "Phase 1 is expected to be the lowest-priced entry point. As availability decreases, future pricing may move higher.",
  },
  {
    question: "Can I design my own home?",
    answer:
      "Yes. Homes go through architectural review to protect community curb appeal and standards.",
  },
];

const v2FeatureItems = [
  {
    title: "Security built in",
    body: "Controlled access, CCTV planning, smart lighting, and connected systems.",
    image: "/assets/security-built-in-camera.jpg",
  },
  {
    title: "Beauty built in",
    body: "Maintained landscaping, architectural standards, and curb appeal guidelines.",
    image: "/assets/beauty-built-in-house-closeup.jpg",
  },
  {
    title: "Technology built in",
    body: "Smart lighting, access systems, and resident communication tools.",
    image: "/assets/technology-built-in-sign.jpg",
  },
  {
    title: "Luxury built in",
    body: "Shared amenities and services that add comfort without extra household burden.",
    image: "/assets/luxury-built-in-clubhouse-aerial.jpg",
  },
];

function useStickyIndex(count) {
  const ref = useRef(null);
  const [state, setState] = useState({ index: 0, progress: 0 });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const index = Math.min(count - 1, Math.floor(progress * count));

      setState((current) =>
        current.index === index && Math.abs(current.progress - progress) < 0.004
          ? current
          : { index, progress }
      );
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [count]);

  return [ref, state];
}

function useVersionTwoMotion() {
  const rootRef = useRef(null);

  useBrowserLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: MOTION.ease } });

      heroTimeline
        .fromTo(
          ".v2-nav",
          { opacity: 0.94, y: MOTION.navOffsetY },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.nav,
            clearProps: "transform",
          },
          toSeconds(MOTION_TIMING.nav)
        )
        .fromTo(
          [".v2-hero-copy > p", ".v2-hero-copy h1", ".v2-hero-copy div > p"],
          { opacity: 0.88, y: MOTION.copyOffsetY },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.duration.copy,
            stagger: MOTION.stagger.heroCopy,
            clearProps: "transform",
          },
          toSeconds(MOTION_TIMING.heroText)
        )
        .fromTo(
          ".v2-actions a",
          { opacity: 0.9 },
          {
            opacity: 1,
            duration: MOTION.duration.buttons,
            stagger: MOTION.stagger.buttons,
          },
          toSeconds(MOTION_TIMING.heroButtons)
        )
        .fromTo(
          ".v2-hero-image",
          {
            opacity: 0.96,
            clipPath: "inset(7% 0% 0% 0%)",
          },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: MOTION.duration.image,
            clearProps: "clipPath",
          },
          toSeconds(MOTION_TIMING.heroImage)
        )
        .from(
          ".v2-hero-image img",
          {
            scale: MOTION.heroImageScale,
            duration: MOTION.duration.image + 0.22,
          },
          "<"
        );

      gsap.to(".v2-hero-image img", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".v2-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".v2-feature-row article",
        { opacity: 0.86, y: MOTION.sectionOffsetY },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.reveal,
          ease: MOTION.ease,
          stagger: MOTION.stagger.featureCards,
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".v2-feature-row",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.utils
        .toArray(
          [
            ".v2-difference-heading > *",
            ".v2-amenities-title",
            ".life-inside > *",
            ".phase-intro > *",
            ".lot-layout > *",
            ".phase-note",
            ".location > *",
            ".contact > *",
            ".footer > *",
          ].join(", ")
        )
        .forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0.88, y: MOTION.sectionOffsetY },
            {
              opacity: 1,
              y: 0,
              duration: MOTION.duration.reveal,
              ease: MOTION.ease,
              clearProps: "transform",
              scrollTrigger: {
                trigger: element,
                start: "top 84%",
                once: true,
              },
            }
          );
        });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return rootRef;
}

function ReviewControl({ activeVersion, onVersionChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const versions = [
    { id: "original", label: "Original" },
    { id: "v2", label: "Version 2" },
  ];
  const activeLabel = versions.find((version) => version.id === activeVersion)?.label;

  const selectVersion = (versionId) => {
    onVersionChange(versionId);
    setIsOpen(false);
  };

  return (
    <aside
      className={`review-control${isOpen ? " is-open" : ""}`}
      aria-label="Applewoods review version selector"
    >
      <div className="review-menu" role="menu" aria-label="Select Applewoods version">
        {versions.map((version) => (
          <button
            key={version.id}
            className={activeVersion === version.id ? "is-active" : ""}
            type="button"
            role="menuitemradio"
            aria-checked={activeVersion === version.id}
            onClick={() => selectVersion(version.id)}
          >
            <span>{version.label}</span>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
      <button
        className="review-fab"
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <strong>{activeLabel}</strong>
      </button>
    </aside>
  );
}

function Nav() {
  return (
    <header className="site-nav" aria-label="Primary navigation">
      <a className="brand" href="#top" aria-label="Applewoods home">
        <span className="brand-mark" aria-hidden="true">
          AW
        </span>
        <span>Applewoods</span>
      </a>
      <nav className="nav-links">
        <a href="#different">Different</a>
        <a href="#structured">Structured Living</a>
        <a href="#phase-one">Phase 1</a>
        <a href="#location">Location</a>
      </nav>
      <a className="nav-cta" href="#contact">
        Ask About Lots
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-grid" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Affordable luxury</p>
        <h1>A Safer Smarter Place to Call Home</h1>
        <p className="hero-subhead">
          Applewoods is a smart community where security, luxury, and technology are
          built into everyday life.
        </p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-dark" href="#contact">
            Ask About Phase 1 Lots
          </a>
          <a className="button button-quiet" href="#structured">
            Explore The Community
          </a>
        </div>
      </div>

      <div className="hero-visual" aria-label="Applewoods entrance render">
        <div className="hero-card-label">
          <span>Structured Living</span>
          <strong>Brownsville, TX</strong>
        </div>
        <img src="/assets/fountain-close-night.jpg" alt="Applewoods entrance fountain render" />
        <div className="hero-fact-strip">
          <div>
            <strong>Phase 1</strong>
            <span>First release</span>
          </div>
          <div>
            <strong>$85k+</strong>
            <span>Expected standard lots</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Security planning</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Difference() {
  return (
    <section className="difference" id="different">
      <div className="section-heading">
        <p className="eyebrow">Why Applewoods is different</p>
        <h2>Everything that makes a neighborhood feel premium is planned from the start.</h2>
      </div>
      <div className="difference-grid">
        <article>
          <span>01</span>
          <h3>Security built in</h3>
          <p>Controlled access, CCTV planning, smart lighting, and connected systems.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Beauty built in</h3>
          <p>Maintained landscaping, architectural standards, and curb appeal guidelines.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Technology built in</h3>
          <p>Smart lighting, access systems, connectivity, and resident communication tools.</p>
        </article>
        <article>
          <span>04</span>
          <h3>Luxury built in</h3>
          <p>Shared amenities and services that add comfort without extra household burden.</p>
        </article>
      </div>
    </section>
  );
}

function V2Hero() {
  return (
    <section className="v2-hero" id="top">
      <header className="v2-nav" aria-label="Version 2 navigation">
        <a className="v2-logo" href="#top" aria-label="Applewoods home">
          <img src="/assets/applewoods-logo.png" alt="Applewoods Smart Living" />
        </a>
        <nav>
          <a href="#location">Location</a>
          <a href="#phase-one">Live Here</a>
          <a href="#different">Community</a>
          <a href="#structured">Amenities</a>
        </nav>
        <a className="v2-owner-link" href="#contact">
          Contact us
        </a>
      </header>

      <div className="v2-hero-copy">
        <p>Life, beautifully organized.</p>
        <div>
          <h1>A Safer, Smarter Place to Call Home</h1>
          <p>
            Applewoods is a smart community where security, luxury, and technology are
            built into everyday life.
          </p>
          <div className="v2-actions">
            <a href="#structured">Explore</a>
            <a href="#phase-one">View Lots</a>
          </div>
        </div>
      </div>

      <figure className="v2-hero-image">
        <img src="/assets/applewoods-hero-entrance.jpg" alt="Applewoods entrance at night" />
      </figure>
    </section>
  );
}

function V2Difference() {
  return (
    <section className="v2-difference" id="different">
      <div className="v2-difference-heading">
        <p>How Applewoods is different</p>
        <h2>Everything that makes a neighborhood feel premium is planned from the start.</h2>
      </div>
      <div className="v2-feature-scroller" aria-label="Applewoods feature cards">
        <div className="v2-feature-row">
          {v2FeatureItems.map((item) => (
            <article key={item.title}>
              <div className="v2-feature-image">
                <img src={item.image} alt="" aria-hidden="true" />
              </div>
              <div className="v2-feature-copy">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function V2StickyAmenities() {
  const [ref, { index, progress }] = useStickyIndex(storyItems.length);
  const imageRef = useRef(null);
  const detailRef = useRef(null);
  const active = storyItems[index];

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const targets = [imageRef.current, detailRef.current].filter(Boolean);
    gsap.fromTo(
      targets,
      { opacity: 0.86, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: MOTION.duration.amenityRefresh,
        ease: "power2.out",
        overwrite: true,
      }
    );

    return undefined;
  }, [index]);

  return (
    <section
      className="v2-amenities"
      id="structured"
      style={{ "--story-count": storyItems.length }}
    >
      <div className="v2-amenities-scroll" ref={ref}>
        <div className="v2-amenities-pin">
          <div className="v2-amenities-backdrop" aria-hidden="true">
            {storyItems.map((item, itemIndex) => (
              <img
                key={item.label}
                src={item.image}
                alt=""
                className={itemIndex === index ? "is-active" : ""}
              />
            ))}
          </div>
          <div className="v2-amenities-content">
            <div className="v2-amenities-title">
              <p>Our</p>
              <p>Amenities</p>
            </div>

            <figure className="v2-amenity-image" ref={imageRef}>
              <img src={active.image} alt={active.label} />
              <figcaption>{active.title}</figcaption>
            </figure>

            <div className="v2-amenity-detail" ref={detailRef} aria-live="polite">
              <div className="v2-amenity-list">
                {storyItems.map((item, itemIndex) => (
                  <button
                    key={item.label}
                    className={itemIndex === index ? "is-active" : ""}
                    type="button"
                    onClick={() => {
                      const node = ref.current;
                      if (!node) return;
                      const target =
                        window.scrollY +
                        node.getBoundingClientRect().top +
                        ((node.offsetHeight - window.innerHeight) * itemIndex) /
                          storyItems.length;
                      window.scrollTo({ top: target, behavior: "smooth" });
                    }}
                  >
                    {item.eyebrow.replace(/^\d+\s\/\s/, "")}
                  </button>
                ))}
              </div>

              <div className="v2-progress">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i style={{ transform: `scaleX(${progress})` }} />
                <span>{String(storyItems.length).padStart(2, "0")}</span>
              </div>
              <h2>{active.label.replace(" built in", "")}</h2>
              <p>{active.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyStory() {
  const [ref, { index, progress }] = useStickyIndex(storyItems.length);
  const active = storyItems[index];

  return (
    <section
      className="sticky-story"
      id="structured"
      style={{ "--story-count": storyItems.length }}
    >
      <div className="story-intro">
        <div className="story-intro-inner">
          <p className="eyebrow">Structured Living</p>
          <h2>A neighborhood designed to make everyday life easier.</h2>
          <p>
            Applewoods brings together the things residents usually have to figure out
            on their own: access, lighting, landscaping, maintenance, security,
            amenities, and communication. The result is a community that feels more
            organized, more modern, and easier to enjoy.
          </p>
        </div>
      </div>

      <div className="story-scroll" ref={ref}>
        <div className="story-pin">
        <div className="story-backdrop">
          {storyItems.map((item, itemIndex) => (
            <img
              key={item.label}
              src={item.image}
              alt=""
              className={itemIndex === index ? "is-active" : ""}
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="story-overlay" />
        <div className="story-content">
          <div className="story-copy">
            <div className="story-detail" aria-live="polite">
              <div className="story-meter">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <i style={{ transform: `scaleX(${progress})` }} />
                </div>
                <span>{String(storyItems.length).padStart(2, "0")}</span>
              </div>
              <p className="story-eyebrow">{active.eyebrow}</p>
              <h3>{active.title}</h3>
              <p>{active.body}</p>
              <div className="story-steps" aria-label="Structured Living sections">
                {storyItems.map((item, itemIndex) => (
                  <button
                    key={item.label}
                    className={itemIndex === index ? "is-active" : ""}
                    type="button"
                    aria-label={item.label}
                    onClick={() => {
                      const node = ref.current;
                      if (!node) return;
                      const target =
                        window.scrollY +
                        node.getBoundingClientRect().top +
                        ((node.offsetHeight - window.innerHeight) * itemIndex) /
                          storyItems.length;
                      window.scrollTo({ top: target, behavior: "smooth" });
                    }}
                  >
                    <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="story-media">
            <img src={active.image} alt="" />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function LifeInside() {
  return (
    <section className="life-inside">
      <div className="life-image">
        <img src="/assets/clubhouse-exterior.jpg" alt="Applewoods clubhouse exterior render" />
      </div>
      <div className="life-copy">
        <p className="eyebrow">Life Inside Applewoods</p>
        <h2>The comfort of a private community, built into everyday life.</h2>
        <p>
          From the clubhouse and gym to the pool, landscaping, lighting, and shared
          services, Applewoods is designed to make daily life feel easier, cleaner,
          and more elevated.
        </p>
        <dl className="amenity-list">
          <div>
            <dt>Clubhouse</dt>
            <dd>A central place for residents to gather and use shared spaces.</dd>
          </div>
          <div>
            <dt>Gym</dt>
            <dd>Fitness access inside the community, without leaving the neighborhood.</dd>
          </div>
          <div>
            <dt>Pool</dt>
            <dd>A shared outdoor amenity for family time, relaxation, and weekend use.</dd>
          </div>
          <div>
            <dt>Maintained surroundings</dt>
            <dd>Landscaping, lighting, and standards that help the community stay beautiful.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function PhaseOne() {
  return (
    <section className="phase-one" id="phase-one">
      <div className="phase-intro">
        <p className="eyebrow">Phase 1 Lots</p>
        <h2>The first opportunity to own in Applewoods.</h2>
        <p>
          Phase 1 is the first release inside the Applewoods community and is expected
          to be the lowest-priced entry point. Review availability, compare lot types,
          and confirm current pricing before preferred lots move to reserved, under
          contract, or sold.
        </p>
      </div>
      <div className="lot-layout">
        <div className="masterplan-card">
          <img src="/assets/masterplan.jpg" alt="Applewoods phase-one master plan" />
          <div className="map-caption">
            <strong>Phase 1 inventory focus</strong>
            <span>Availability and status should be confirmed before publication.</span>
          </div>
        </div>
        <div className="lot-cards">
          {lotTypes.map((lot, lotIndex) => (
            <article key={lot.name}>
              <span>{String(lotIndex + 1).padStart(2, "0")}</span>
              <h3>{lot.name}</h3>
              <strong>{lot.price}</strong>
              <p>{lot.body}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="phase-note">
        Lot status can change quickly once buyers begin confirming selections. As
        availability decreases, future pricing may move higher.
      </p>
    </section>
  );
}

function Location() {
  return (
    <section className="location" id="location">
      <div>
        <p className="eyebrow">Location</p>
        <h2>A private community with fast access to where Brownsville is growing.</h2>
        <p>
          Applewoods gives residents access to daily essentials, key roads, Rancho
          Viejo, and the port growth corridor from a community designed to feel
          protected, modern, and set apart.
        </p>
      </div>
      <div className="location-panel" aria-label="Location points">
        {["Paredes", "Rancho Viejo", "Daily essentials", "Major shopping", "Port growth corridor", "Future road connection"].map(
          (item) => (
            <span key={item}>{item}</span>
          )
        )}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="faq">
        <p className="eyebrow">Before Phase 1 availability changes</p>
        <h2>Confirm the details that matter.</h2>
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
      <form className="lead-form">
        <p className="eyebrow">Ask About Phase 1 Lots</p>
        <h2>Phase 1 is the lowest entry point into Applewoods.</h2>
        <label>
          Name
          <input type="text" name="name" autoComplete="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" autoComplete="email" />
        </label>
        <label>
          Lot interest
          <select name="lotInterest" defaultValue="standard">
            <option value="standard">Standard lot</option>
            <option value="premier">Premier lot</option>
            <option value="corner">Corner lot</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </label>
        <button type="submit">Ask About Phase 1 Lots</button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <img src="/assets/applewoods-logo.png" alt="Applewoods Smart Living" />
        <p>Structured Living in Brownsville, Texas.</p>
      </div>
      <a href="#top">Back to top</a>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Difference />
        <StickyStory />
        <LifeInside />
        <PhaseOne />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function VersionTwoPage() {
  const motionRef = useVersionTwoMotion();

  return (
    <div className="v2-shell" ref={motionRef}>
      <main className="v2-page">
        <V2Hero />
        <V2Difference />
        <V2StickyAmenities />
        <LifeInside />
        <PhaseOne />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function ReviewPage() {
  const [activeVersion, setActiveVersion] = useState("v2");

  return (
    <div className="review-page">
      <ReviewControl activeVersion={activeVersion} onVersionChange={setActiveVersion} />
      {activeVersion === "original" ? <HomePage /> : <VersionTwoPage />}
    </div>
  );
}

function App() {
  return <ReviewPage />;
}

createRoot(document.getElementById("root")).render(<App />);
