import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { EnvelopeSimpleIcon, PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lightbox from "./components/Lightbox";
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

const isSmallViewport = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;

const storyItems = [
  {
    label: "Security built in",
    eyebrow: "01 / controlled access",
    title: "The entrance is designed to feel secure, welcoming, and well cared for.",
    body:
      "Controlled access, CCTV monitoring, smart lighting, and visitor management systems help create a secure and welcoming environment from the moment residents and guests enter the community.",
    image: "/assets/security-built-in-camera.jpg",
  },
  {
    label: "Beauty built in",
    eyebrow: "02 / value protection",
    title: "Standards keep the neighborhood looking consistent.",
    body:
      "Landscaping, architectural standards, curb appeal guidelines, safety features, crossings, and parking areas support appearance, function, and long-term value.",
    image: "/assets/beautyaw.png",
  },
  {
    label: "Amenities built in",
    eyebrow: "03 / shared comfort",
    title: "The lifestyle expands beyond the home.",
    body:
      "A clubhouse, fitness center, resort-style pool, green spaces, services, and a private concierge line bring comfort beyond the home.",
    image: "/assets/awclubpool.png",
  },
  {
    label: "Technology built in",
    eyebrow: "04 / resident systems",
    title: "Smart systems make daily living easier to coordinate.",
    body:
      "Smart access, lighting, irrigation, connectivity, resident communication tools, and the Apple Woods Portal create a more connected daily experience.",
    image: "/assets/technology-built-in-sign.jpg",
  },
];

const lotTypes = [
  {
    name: "Classic Homesites",
    price: "Expected from $85,000",
    body: "An attractive introductory opportunity to join the Apple Woods community, with Phase 1 homesites offered at early-release pricing designed to provide exceptional value within a thoughtfully planned neighborhood.",
  },
  {
    name: "Premier Homesites",
    price: "Expected from $95,000",
    body: "A limited collection near the planned clubhouse, river walk, natural water elements, landscaping, and resort-style pool area.",
  },
  {
    name: "Corner Homesites",
    price: "Priced individually",
    body: "Larger or irregular homesites priced by size and location.",
  },
];

const faqs = [
  {
    question: "I hear I can find cheaper lots elsewhere. Why Apple Woods?",
    answer:
      "Some lots may cost less, but Apple Woods offers more than land: standards, landscaping, technology, amenities, security, services, and long-term planning that help protect the neighborhood experience.",
  },
  {
    question: "Which homesites are still available?",
    answer:
      "Availability changes quickly. Some homesites may be pending but not fully secured until deposit is received, so buyers should confirm current status with the sales team.",
  },
  {
    question: "Will prices stay the same?",
    answer:
      "Phase 1 is expected to offer the strongest introductory pricing. As inventory becomes more limited, later pricing is expected to increase.",
  },
  {
    question: "Can I design my own home?",
    answer:
      "Yes. Homeowners can design custom homes, subject to architectural review, so each home supports the community's standards and long-term curb appeal.",
  },
  {
    question: "Are the dues expensive?",
    answer:
      "No. Shared community costs help keep dues manageable while supporting landscaping, services, amenities, and neighborhood quality.",
  },
  {
    question: "Are dues mandatory?",
    answer:
      "Yes. Core dues are required for all homeowners and help maintain shared services, appearance, and community quality. Optional services are paid only by residents who choose them.",
  },
  {
    question: "Am I responsible for all dues when I purchase?",
    answer:
      "No. A reduced dues structure applies during lot ownership before construction, covering basic maintenance and essential services. Full dues begin after the home is built.",
  },
  {
    question: "Do I have to build a huge home?",
    answer:
      "No. Apple Woods focuses on design, curb appeal, and standards rather than oversized homes. The minimum covered area is 2,000 sq. ft.",
  },
  {
    question: "If I build an expensive home, will less expensive homes affect my value?",
    answer:
      "No. Homes can vary in size and budget, but architectural and landscaping standards protect curb appeal, consistency, and long-term community value.",
  },
  {
    question: "What are the restrictions?",
    answer:
      "Community standards cover home size, architecture, landscaping, maintenance, lighting, noise, colors, and outdoor storage to protect the community's appearance and quality of life.",
  },
  {
    question: "How big are the homesites?",
    answer:
      "Most homesites are about 6,000 sq. ft., typically 60 ft. wide by 100 ft. deep, with standard setbacks of 25 ft. front, 5 ft. sides, and 10 ft. rear.",
  },
  {
    question: "Are 6,000 sq. ft. homesites too small?",
    answer:
      "Not necessarily. Apple Woods pairs efficient homesites with shared amenities, green areas, pool, fitness, and gathering spaces, so owners can invest in the home while the community provides more of the lifestyle.",
  },
  {
    question: "Can I build on two lots?",
    answer:
      "Combining lots may be permitted in select cases. If approved, added architectural and entrance-design guidelines may apply.",
  },
];

const initialLeadForm = {
  fullName: "",
  phone: "",
  email: "",
  lotInterest: "not-sure",
  budget: "not-sure",
  timeline: "not-sure",
  interestType: "availability",
  notes: "",
};

const directContactLinks = [
  {
    label: "Call sales",
    detail: "956-455-9555",
    href: "tel:+19564559555",
    icon: "phone",
  },
  {
    label: "Email",
    detail: "info@applewoods.us",
    href: "mailto:alfonso@park-street.us",
    icon: "mail",
  },
  {
    label: "WhatsApp",
    detail: "956-455-9555",
    href: "https://wa.me/19564559555",
    icon: "message",
  },
];

function ContactIcon({ type }) {
  const iconProps = {
    "aria-hidden": true,
    focusable: "false",
    size: 22,
    weight: "regular",
  };

  if (type === "phone") {
    return <PhoneIcon {...iconProps} />;
  }

  if (type === "message") {
    return <WhatsappLogoIcon {...iconProps} />;
  }

  return <EnvelopeSimpleIcon {...iconProps} />;
}

const v2FeatureItems = [
  {
    title: "Security built in",
    body: "Controlled access, CCTV monitoring, smart lighting, connected systems, and flood-conscious planning.",
    image: "/assets/security-built-in-camera.jpg",
  },
  {
    title: "Beauty built in",
    body: "Landscaping, architectural standards, curb appeal guidelines, and preserved green areas.",
    image: "/assets/beauty-built-in-house-closeup.jpg",
  },
  {
    title: "Technology built in",
    body: "Smart lighting, irrigation, access systems, connectivity, and resident communication tools.",
    image: "/assets/technology-built-in-sign.jpg",
  },
  {
    title: "Luxury built in",
    body: "Shared amenities and services that add comfort without making every homeowner carry the full cost alone.",
    image: "/assets/luxury-built-in-clubhouse-aerial.jpg",
  },
  {
    title: "Wellness built in",
    body: "Blue Zone programs, fitness amenities, and wellness activities support an active mind and body.",
    image: "/assets/awclubpool.png",
  },
  {
    title: "Attainability built in",
    body: "Community scale helps share service and amenity costs while keeping dues manageable.",
    image: "/assets/awfont.png",
  },
];

const valueStackItems = [
  {
    title: "Daily Environment",
    body: "Landscaping, lighting, curb appeal, and preserved green areas are planned as shared community systems.",
  },
  {
    title: "Security Layer",
    body: "Controlled access, CCTV monitoring, and visitor systems support a more managed setting.",
  },
  {
    title: "Shared Lifestyle",
    body: "Clubhouse, fitness, pool, green spaces, and wellness programming give residents more than a homesite.",
  },
  {
    title: "Cost Clarity",
    body: "Shared costs, manageable dues, and reduced dues before construction help make the value easier to understand.",
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

function V2Hero() {
  return (
    <section className="v2-hero" id="top">
      <header className="v2-nav" aria-label="Primary navigation">
        <a className="v2-logo" href="#top" aria-label="Apple Woods home">
          <img src="/assets/applewoods-logo.png" alt="Apple Woods Smart Living" />
        </a>
        <nav>
          <a href="#location">Location</a>
          <a href="#life-inside">Live Here</a>
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
          <h1>
            <span>More Than a Subdivision:</span>
            {" "}
            <span>A Place to Truly Call Home</span>
          </h1>
          <p>
            Apple Woods is a smart residential community designed around security,
            comfort, beauty, technology, and attainable everyday luxury.
          </p>
          <div className="v2-actions">
            <a href="#structured">Explore</a>
            <a href="#phase-one">View Lots</a>
          </div>
        </div>
      </div>

      <figure className="v2-hero-image">
        <picture>
          <source media="(max-width: 760px)" srcSet="/assets/apple-corregido.png" />
          <img src="/assets/apple-corregido.png" alt="Apple Woods entrance at night" />
        </picture>
      </figure>
    </section>
  );
}

function V2Difference() {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || prefersReducedMotion() || !isSmallViewport()) return undefined;

    let hasRun = false;
    let hasInteracted = false;

    const markInteracted = () => {
      hasInteracted = true;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun || hasInteracted) return;
        hasRun = true;

        const peekDistance = Math.min(64, scroller.scrollWidth - scroller.clientWidth);
        if (peekDistance <= 0) return;

        scroller.scrollTo({ left: peekDistance, behavior: "smooth" });
        window.setTimeout(() => {
          if (!hasInteracted) scroller.scrollTo({ left: 0, behavior: "smooth" });
        }, 760);
      },
      { threshold: 0.45 }
    );

    observer.observe(scroller);
    scroller.addEventListener("pointerdown", markInteracted, { passive: true });
    scroller.addEventListener("touchstart", markInteracted, { passive: true });
    scroller.addEventListener("wheel", markInteracted, { passive: true });

    return () => {
      observer.disconnect();
      scroller.removeEventListener("pointerdown", markInteracted);
      scroller.removeEventListener("touchstart", markInteracted);
      scroller.removeEventListener("wheel", markInteracted);
    };
  }, []);

  return (
    <section className="v2-difference" id="different">
      <div className="v2-difference-heading">
        <p>How Apple Woods is different</p>
        <h2>Everything that makes a neighborhood feel premium is planned from the start.</h2>
      </div>
      <div className="v2-feature-scroller" aria-label="Apple Woods feature cards" ref={scrollerRef}>
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

function ValueStack() {
  return (
    <section className="value-stack" id="value-stack">
      <div className="value-stack-inner">
        <div className="value-stack-heading">
          <p>Shared value</p>
          <h2>What Community Scale Makes Possible</h2>
          <p>
            Apple Woods shares the cost of security, landscaping, amenities,
            technology, and upkeep so homeowners get a more complete lifestyle
            without carrying every cost individually.
          </p>
        </div>

        <figure className="value-stack-media">
          <img
            src="/assets/value-stack-actual-plan.png"
            alt="Apple Woods shared clubhouse, pool, green space, and surrounding homesites"
          />
        </figure>

        <div className="value-stack-grid">
          {valueStackItems.map((item, itemIndex) => (
            <article key={item.title}>
              <span>{String(itemIndex + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className="value-stack-actions">
          <a href="#contact">Ask Costs</a>
          <a href="tel:+19564559555">Call Sales</a>
        </div>
      </div>
    </section>
  );
}

function LifeInside() {
  return (
    <section className="life-inside" id="life-inside">
      <div className="life-image">
        <img src="/assets/awnice.png" alt="Apple Woods clubhouse exterior render" />
      </div>
      <div className="life-copy">
        <p className="eyebrow">Life Inside Apple Woods</p>
        <h2>The comfort of a private community, built into everyday life.</h2>
        <p>
          From the clubhouse and fitness center to the pool, landscaping, lighting,
          and shared services, Apple Woods is designed to make daily life feel easier,
          more comfortable, and more refined.
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
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <section className="phase-one" id="phase-one">
      <div className="phase-intro">
        <p className="eyebrow">Phase 1 Homesites</p>
        <h2>The first opportunity to own in Apple Woods.</h2>
        <p>
          Phase 1 is the first release inside Apple Woods and gives early buyers a
          strong opportunity to secure a homesite at introductory pricing.
        </p>
      </div>
      <div className="lot-layout">
        <div className="masterplan-card">
          <button
            type="button"
            className="masterplan-trigger"
            onClick={() => setMapOpen(true)}
            aria-label="Open the Phase 1 lot map"
          >
            <img src="/assets/phase-1-aw-sold-map.png" alt="Apple Woods Phase 1 sold lot map" />
            <span className="masterplan-hint">Tap to explore the lot map</span>
          </button>
        </div>
        <div className="phase-details">
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

          <aside className="price-sheet-card" aria-label="Apple Woods Phase 1 price sheet">
            <a
              className="price-sheet-preview"
              href="/assets/apple-woods-price-sheet.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Apple Woods price sheet"
            >
              <img
                src="/assets/apple-woods-price-sheet-preview.png"
                alt="Apple Woods Phase 1 developer introductory offer price sheet preview"
              />
            </a>
            <div className="price-sheet-copy">
              <p className="eyebrow">Current Price Sheet</p>
              <h3>Developer's introductory offer</h3>
              <p>
                Review the latest Phase 1 homesite list, suggested retail pricing,
                and introductory offer pricing.
              </p>
              <div className="price-sheet-actions">
                <a href="/assets/apple-woods-price-sheet.pdf" target="_blank" rel="noreferrer">
                  Open Sheet
                </a>
                <a href="/assets/apple-woods-price-sheet.pdf" download>
                  Download
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <p className="phase-note">
        Lot status can change quickly once buyers begin confirming selections. As
        availability decreases, future pricing may increase.
      </p>
      <Lightbox open={mapOpen} onClose={() => setMapOpen(false)} label="Apple Woods Phase 1 lot map">
        <img src="/assets/phase-1-aw-sold-map@2x.png" alt="Apple Woods Phase 1 lot map" />
      </Lightbox>
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
          Apple Woods combines everyday convenience with regional access to major
          highways, Rancho Viejo, the Port of Brownsville, South Padre Island, and key
          commercial areas.
        </p>
      </div>
      <div className="location-panel">
        <img src="/assets/locationsaw.png" alt="Apple Woods location context" />
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState(initialLeadForm);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const emailValue = formData.email.trim();
  const phoneValue = formData.phone.trim();
  const emailIsInvalid = emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const contactMissing = !phoneValue && !emailValue;

  const errors = {
    phone: contactMissing ? "Add a phone or email so we can reply." : "",
    email: emailIsInvalid ? "Use a valid email, or leave it blank and add a phone." : "",
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setStatus((current) => (current === "success" ? "idle" : current));
    setMessage("");
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const markTouched = (event) => {
    setTouched((current) => ({ ...current, [event.target.name]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ phone: true, email: true });

    if (contactMissing || emailIsInvalid) {
      setStatus("error");
      setMessage("Only a phone or email is needed. Everything else can stay blank.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const payload = {
      leadStage: "complete",
      ...formData,
      fullName: formData.fullName.trim(),
      phone: phoneValue,
      email: emailValue,
      notes: formData.notes.trim(),
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok && response.status !== 404) {
        throw new Error("Lead submission failed");
      }

      setStatus("success");
      setMessage("Sent. We have enough to start the conversation.");
    } catch (error) {
      setStatus("error");
      setMessage(
        "Something did not send. Please call, text, email, or WhatsApp and we can take it from there."
      );
    }
  };

  const submitLabel =
    status === "submitting" ? "Sending..." : status === "success" ? "Sent" : "Send inquiry";

  return (
    <section className="contact" id="contact">
      <div className="contact-heading">
        <p className="eyebrow">3.0 Inquiry</p>
        <h2>Tell us what you are thinking.</h2>
        <p>
          Share as much or as little as you want. A few details help us point you
          toward the right next step.
        </p>
      </div>

      <div className="inquiry-grid">
        <aside className="direct-contact">
          <p className="eyebrow">Direct contact</p>
          <h3>Rather talk it through?</h3>
          <p>
            Call or message if that is easier. The form is here to start the
            conversation, not make you do homework.
          </p>
          <div className="direct-actions">
            {directContactLinks.map((item) => (
              <a className="cta-dark" href={item.href} key={item.label}>
                <ContactIcon type={item.icon} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </span>
              </a>
            ))}
          </div>
          <div className="contact-note">
            <span>What happens next</span>
            <p>
              We confirm current Phase 1 availability, answer first questions, and
              help you understand which lots fit what you are considering.
            </p>
          </div>
        </aside>

        <form className="lead-form" onSubmit={handleSubmit} noValidate>
          <div className="lead-form-intro">
            <p className="eyebrow">Quick note</p>
            <h2>What would make this useful for you?</h2>
            <p>
              Only a phone or email is needed so we can reply. Everything else is
              optional context.
            </p>
          </div>

          <label className="field">
            <span>Name</span>
            <input
              className="input"
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="Your name"
              value={formData.fullName}
              onBlur={markTouched}
              onChange={updateField}
            />
          </label>

          <div className="field-grid two">
            <label className="field">
              <span>Phone</span>
              <input
                className="input"
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="Phone number"
                value={formData.phone}
                aria-describedby={errors.phone && touched.phone ? "phone-error" : undefined}
                aria-invalid={Boolean(errors.phone && touched.phone)}
                onBlur={markTouched}
                onChange={updateField}
              />
              {errors.phone && touched.phone ? (
                <em className="field-error" id="phone-error">
                  {errors.phone}
                </em>
              ) : null}
            </label>

            <label className="field">
              <span>Email</span>
              <input
                className="input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email address"
                value={formData.email}
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                aria-invalid={Boolean(errors.email && touched.email)}
                onBlur={markTouched}
                onChange={updateField}
              />
              {errors.email && touched.email ? (
                <em className="field-error" id="email-error">
                  {errors.email}
                </em>
              ) : null}
            </label>
          </div>

          <label className="field">
            <span>Questions or comments</span>
            <textarea
              className="input"
              name="notes"
              placeholder="Tell us what you are considering. Share as much or as little as you want."
              rows="6"
              value={formData.notes}
              onBlur={markTouched}
              onChange={updateField}
            />
          </label>

          <div className="field-grid three">
            <label className="field">
              <span>Lot type</span>
              <select
                className="input"
                name="lotInterest"
                value={formData.lotInterest}
                onBlur={markTouched}
                onChange={updateField}
              >
                <option value="not-sure">Not sure yet</option>
                <option value="standard">Standard lot</option>
                <option value="premier">Premier lot</option>
                <option value="corner">Corner lot</option>
              </select>
            </label>

            <label className="field">
              <span>Budget</span>
              <select
                className="input"
                name="budget"
                value={formData.budget}
                onBlur={markTouched}
                onChange={updateField}
              >
                <option value="not-sure">Not sure yet</option>
                <option value="85-95">$85k to $95k</option>
                <option value="95-plus">$95k+</option>
                <option value="depends">Depends on lot</option>
              </select>
            </label>

            <label className="field">
              <span>Timing</span>
              <select
                className="input"
                name="timeline"
                value={formData.timeline}
                onBlur={markTouched}
                onChange={updateField}
              >
                <option value="not-sure">Not sure yet</option>
                <option value="now">Ready now</option>
                <option value="soon">Next 30 days</option>
                <option value="later">Planning ahead</option>
              </select>
            </label>
          </div>

          <fieldset className="interest-field">
            <legend>What are you interested in?</legend>
            <div className="radio-grid">
              {[
                ["availability", "Check availability"],
                ["buy", "Buy a lot"],
                ["build", "Build a home"],
              ].map(([value, label]) => (
                <label className="radio-card" key={value}>
                  <input
                    type="radio"
                    name="interestType"
                    value={value}
                    checked={formData.interestType === value}
                    onChange={updateField}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button className="cta-submit" type="submit" disabled={status === "submitting" || status === "success"}>
            {submitLabel}
          </button>

          {message ? (
            <p className={`form-message ${status === "error" ? "is-error" : "is-success"}`}>
              {message}
            </p>
          ) : null}

          {status === "success" ? (
            <div className="mini-actions" aria-label="Follow-up options">
              {directContactLinks.map((item) => (
                <a href={item.href} key={item.label}>
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
        </form>
      </div>

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
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <a className="footer-logo" href="#top" aria-label="Apple Woods home">
          <img src="/assets/applewoods-logo.png" alt="Apple Woods Smart Living" />
        </a>

        <div className="footer-content">
          <div className="footer-message">
            <p>
              Apple Woods is designed for a calmer way to live in Brownsville:
              organized, secure, beautiful, and built around everyday comfort.
            </p>
            <div className="footer-socials" aria-label="Social links">
              <a href="https://www.facebook.com/" aria-label="Apple Woods on Facebook">
                <svg viewBox="3 4 16 20" aria-hidden="true" focusable="false">
                  <path d="M14.2 8.18h2.13V4.64c-.37-.05-1.62-.16-3.08-.16-3.05 0-5.14 1.86-5.14 5.28v2.98H4.67v3.96h3.44v6.74h4.22V16.7h3.32l.53-3.96h-3.85v-2.59c0-1.15.31-1.97 1.87-1.97Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-menu" aria-label="Footer information and shortcuts">
            <div className="footer-list">
              <p>Brownsville, Texas</p>
              <p>Phase 1 Homesites</p>
              <p>Private Smart Living Community</p>
            </div>
            <nav className="footer-list" aria-label="Footer navigation">
              <a href="#location">Location</a>
              <a href="#life-inside">Live Here</a>
              <a href="#different">Community</a>
              <a href="#structured">Amenities</a>
              <a href="#contact">Contact Us</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Copyright © Apple Woods 2026</span>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
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
        <ValueStack />
        <LifeInside />
        <PhaseOne />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return <VersionTwoPage />;
}

createRoot(document.getElementById("root")).render(<App />);
