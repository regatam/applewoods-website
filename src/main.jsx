import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { EnvelopeSimpleIcon, PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lightbox from "./components/Lightbox";
import LanguageSwitcher from "./components/LanguageSwitcher";
import MobileMenu from "./components/MobileMenu";
import { ContentProvider, useContent } from "./content";
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

function V2Nav() {
  const c = useContent();
  const { nav } = c;
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const amenities = document.querySelector(".v2-amenities");
    if (!amenities) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -90% 0px" }
    );
    observer.observe(amenities);
    return () => observer.disconnect();
  }, []);

  // Past the hero, Contact us becomes the page's one filled CTA (the hero's
  // gold View Pricing owns that role while it is on screen).
  useEffect(() => {
    const hero = document.querySelector(".v2-hero");
    if (!hero) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={
        "v2-nav" + (hidden ? " is-hidden" : "") + (pastHero ? " is-scrolled" : "")
      }
      aria-label="Primary navigation"
    >
      <a className="v2-logo" href="#top" aria-label="Apple Woods home">
        <img src="/assets/applewoods-logo.png" alt={nav.logoAlt} />
      </a>
      <nav>
        {nav.links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="v2-nav-actions">
        <LanguageSwitcher />
        <a
          className="v2-owner-link v2-portal-link"
          href={nav.portal.href}
          target="_blank"
          rel="noreferrer"
        >
          {nav.portal.label}
        </a>
        <a className="v2-owner-link v2-contact-link" href="#contact">
          {nav.cta}
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}

// Headline strings may mark words for bold with **double asterisks**.
function emphasize(text) {
  return String(text)
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

function V2Hero() {
  const c = useContent();
  const { hero } = c;
  return (
    <section className="v2-hero" id="top">
      <div className="v2-hero-copy">
        <p>{hero.tagline}</p>
        <div>
          <h1>
            <span>{emphasize(hero.headlineLines[0])}</span>
            {" "}
            <span>{emphasize(hero.headlineLines[1])}</span>
          </h1>
          <p>{hero.subhead}</p>
          <div className="v2-actions">
            <a href="#structured">{hero.actions.explore}</a>
            <a href="#phase-one">{hero.actions.lots}</a>
          </div>
        </div>
      </div>

      <figure className="v2-hero-image">
        <picture>
          <source media="(max-width: 760px)" srcSet="/assets/apple-corregido.png" />
          <img src="/assets/apple-corregido.png" alt={hero.imageAlt} />
        </picture>
      </figure>
    </section>
  );
}

// Render copy that may contain blank-line paragraph breaks as separate <p> tags.
function Paras({ text }) {
  return (
    <>
      {String(text)
        .split(/\n\n+/)
        .map((para, paraIndex) => (
          <p key={paraIndex}>{para}</p>
        ))}
    </>
  );
}

// Grid-style card whose body is collapsed behind a Read more toggle
// (Ecology — too much copy for a regular card). Used twice: centered on its
// own row on desktop/tablet, and as a rail card inside the mobile scroller.
function ExpandableFeatureCard({ item, moreLabel, lessLabel, className, collapseOffscreen }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  // Rail variant: once the reader slides away to other cards, fold the body
  // back up — they've read it; the rail returns to its compact height.
  useEffect(() => {
    if (!collapseOffscreen || !expanded) return undefined;
    const node = cardRef.current;
    const root = node?.closest(".v2-feature-scroller");
    if (!node || !root) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) return;
        setExpanded(false);
        // Collapsing pulls the next section up under the reader's thumb —
        // bring them back to the top of the rail instead.
        const rootTop = root.getBoundingClientRect().top;
        if (rootTop < 0) {
          window.scrollTo({
            top: window.scrollY + rootTop - 84,
            behavior: prefersReducedMotion() ? "auto" : "smooth",
          });
        }
      },
      { root, threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [collapseOffscreen, expanded]);

  return (
    <article className={className} ref={cardRef}>
      <div className="v2-feature-image">
        <img src={item.image} alt="" aria-hidden="true" />
      </div>
      <div className="v2-feature-copy">
        <h3>{item.title}</h3>
        <div className={expanded ? "v2-feature-more is-open" : "v2-feature-more"}>
          <Paras text={item.body} />
        </div>
        <button
          type="button"
          className="v2-feature-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? lessLabel : moreLabel}
        </button>
      </div>
    </article>
  );
}

function V2Difference() {
  const c = useContent();
  const { difference } = c;
  const scrollerRef = useRef(null);
  const cards = difference.items.filter((item) => !item.wide);
  const wideCards = difference.items.filter((item) => item.wide);

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
        <p>{difference.eyebrow}</p>
        <h2>{difference.heading}</h2>
      </div>
      <div className="v2-feature-scroller" aria-label="Apple Woods feature cards" ref={scrollerRef}>
        <div className="v2-feature-row">
          {cards.map((item) => (
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
          {wideCards.map((item) => (
            <ExpandableFeatureCard
              key={"rail-" + item.title}
              className="v2-feature-expand"
              item={item}
              moreLabel={difference.readMore}
              lessLabel={difference.readLess}
              collapseOffscreen
            />
          ))}
        </div>
      </div>
      {wideCards.map((item) => (
        <div className="v2-feature-solo" key={item.title}>
          <ExpandableFeatureCard
            item={item}
            moreLabel={difference.readMore}
            lessLabel={difference.readLess}
          />
        </div>
      ))}
    </section>
  );
}

function V2StickyAmenities() {
  const c = useContent();
  const { titleLines, stories } = c.amenities;
  const [ref, { index, progress }] = useStickyIndex(stories.length);
  const imageRef = useRef(null);
  const detailRef = useRef(null);
  const active = stories[index];

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
      style={{ "--story-count": stories.length }}
    >
      <div className="v2-amenities-scroll" ref={ref}>
        <div className="v2-amenities-pin">
          <div className="v2-amenities-backdrop" aria-hidden="true">
            {stories.map((item, itemIndex) => (
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
              {titleLines.map((word, wordIndex) => (
                <p key={wordIndex}>{word}</p>
              ))}
            </div>

            <figure className="v2-amenity-image" ref={imageRef}>
              <img src={active.image} alt={active.label} />
              <figcaption>{active.title}</figcaption>
            </figure>

            <div className="v2-amenity-detail" ref={detailRef} aria-live="polite">
              <div className="v2-amenity-list">
                {stories.map((item, itemIndex) => (
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
                          stories.length;
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
                <span>{String(stories.length).padStart(2, "0")}</span>
              </div>
              <h2>{active.label.replace(" built in", "")}</h2>
              <Paras text={active.body} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Amenity row — items with a long `body` (full client descriptions) keep the
// one-line teaser visible and expand the rest behind a Read more toggle.
// The expanded copy spans the full row width under the title, and Read less
// sits at its end so the reader can collapse from where they finished.
function AmenityRow({ item, moreLabel, lessLabel }) {
  const [open, setOpen] = useState(false);
  const rowRef = useRef(null);

  const collapse = () => {
    setOpen(false);
    // Collapsing from the bottom of a long body strands the reader far below
    // the row — bring them back to where the section was before expanding.
    requestAnimationFrame(() => {
      const node = rowRef.current;
      if (!node) return;
      window.scrollTo({
        top: window.scrollY + node.getBoundingClientRect().top - 90,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  };

  return (
    <div ref={rowRef}>
      <dt>{item.term}</dt>
      <dd>
        {item.detail}
        {item.body && !open ? (
          <button
            type="button"
            className="v2-feature-toggle amenity-toggle"
            aria-expanded={false}
            onClick={() => setOpen(true)}
          >
            {moreLabel}
          </button>
        ) : null}
      </dd>
      {item.body && open ? (
        <dd className="amenity-more">
          <Paras text={item.body} />
          <button
            type="button"
            className="v2-feature-toggle amenity-toggle"
            aria-expanded={true}
            onClick={collapse}
          >
            {lessLabel}
          </button>
        </dd>
      ) : null}
    </div>
  );
}

function LifeInside() {
  const c = useContent();
  const { lifeInside } = c;
  return (
    <section className="life-inside" id="life-inside">
      <div className="life-image">
        <img src="/assets/aw-water-walk.jpg" alt={lifeInside.imageAlt} loading="lazy" />
      </div>
      <div className="life-copy">
        <p className="eyebrow">{lifeInside.eyebrow}</p>
        <h2>{lifeInside.heading}</h2>
        <Paras text={lifeInside.body} />
        <dl className="amenity-list">
          {lifeInside.items.map((item) => (
            <AmenityRow
              key={item.term}
              item={item}
              moreLabel={lifeInside.readMore}
              lessLabel={lifeInside.readLess}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}

function PhaseOne() {
  const c = useContent();
  const { phaseOne } = c;
  const [mapOpen, setMapOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  return (
    <section className="phase-one" id="phase-one">
      <div className="phase-intro">
        <p className="eyebrow">{phaseOne.eyebrow}</p>
        <h2>{phaseOne.heading}</h2>
        <p>{phaseOne.body}</p>
      </div>
      <div className="lot-layout">
        <div className="lot-docs">
          <button
            type="button"
            className="lot-doc"
            onClick={() => setMapOpen(true)}
            aria-label="Open the Phase 1 lot map"
          >
            <img src="/assets/phase-1-aw-sold-map.png" alt={phaseOne.mapAlt} />
            <span className="lot-doc-hint">{phaseOne.masterplanHint}</span>
          </button>
          <button
            type="button"
            className="lot-doc"
            onClick={() => setPriceOpen(true)}
            aria-label="Open the Apple Woods price sheet"
          >
            <img src="/assets/apple-woods-price-sheet-v3-preview.png" alt={phaseOne.pricePreviewAlt} />
            <span className="lot-doc-hint">{phaseOne.priceSheetHint}</span>
          </button>
        </div>
        <div className="lot-cards">
          {phaseOne.lots.map((lot, lotIndex) => (
            <article key={lot.name}>
              <span>{String(lotIndex + 1).padStart(2, "0")}</span>
              <h3>{lot.name}</h3>
              <strong>{lot.price}</strong>
              <p>{lot.body}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="phase-note">{phaseOne.phaseNote}</p>
      <Lightbox open={mapOpen} onClose={() => setMapOpen(false)} label="Apple Woods Phase 1 lot map">
        <img src="/assets/phase-1-aw-sold-map@2x.png" alt="Apple Woods Phase 1 lot map" />
      </Lightbox>
      <Lightbox open={priceOpen} onClose={() => setPriceOpen(false)} label="Apple Woods price sheet">
        <img src="/assets/apple-woods-price-sheet-v3@2x.png" alt="Apple Woods Phase 1 price sheet" />
      </Lightbox>
    </section>
  );
}

function Location() {
  const c = useContent();
  const { location } = c;
  return (
    <section className="location" id="location">
      <div>
        <p className="eyebrow">{location.eyebrow}</p>
        <h2>{location.heading}</h2>
        <Paras text={location.body} />
      </div>
      <div className="location-panel">
        <img src="/assets/locationsaw.png" alt={location.imageAlt} />
      </div>
    </section>
  );
}

function Contact() {
  const c = useContent();
  const { contact } = c;
  const cf = contact.form;
  const [formData, setFormData] = useState(initialLeadForm);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const emailValue = formData.email.trim();
  const phoneValue = formData.phone.trim();
  const emailIsInvalid = emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const contactMissing = !phoneValue && !emailValue;

  const errors = {
    phone: contactMissing ? cf.errors.contact : "",
    email: emailIsInvalid ? cf.errors.email : "",
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
      setMessage(cf.requiredHint);
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
      setMessage(cf.successMessage);
    } catch (error) {
      setStatus("error");
      setMessage(cf.errorMessage);
    }
  };

  const submitLabel =
    status === "submitting" ? cf.submitSending : status === "success" ? cf.submitSent : cf.submit;

  return (
    <section className="contact" id="contact">
      <div className="contact-heading">
        <p className="eyebrow">{contact.heading.eyebrow}</p>
        <h2>{contact.heading.title}</h2>
        <p>{contact.heading.body}</p>
      </div>

      <div className="inquiry-grid">
        <aside className="direct-contact">
          <p className="eyebrow">{contact.direct.eyebrow}</p>
          <h3>{contact.direct.heading}</h3>
          <p>{contact.direct.body}</p>
          <div className="direct-actions">
            {contact.direct.links.map((item) => (
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
            <span>{contact.direct.nextLabel}</span>
            <p>{contact.direct.nextBody}</p>
          </div>
        </aside>

        <form className="lead-form" onSubmit={handleSubmit} noValidate>
          <div className="lead-form-intro">
            <p className="eyebrow">{cf.eyebrow}</p>
            <h2>{cf.title}</h2>
            <p>{cf.body}</p>
          </div>

          <label className="field">
            <span>{cf.labels.name}</span>
            <input
              className="input"
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder={cf.placeholders.name}
              value={formData.fullName}
              onBlur={markTouched}
              onChange={updateField}
            />
          </label>

          <div className="field-grid two">
            <label className="field">
              <span>{cf.labels.phone}</span>
              <input
                className="input"
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder={cf.placeholders.phone}
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
              <span>{cf.labels.email}</span>
              <input
                className="input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder={cf.placeholders.email}
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
            <span>{cf.labels.notes}</span>
            <textarea
              className="input"
              name="notes"
              placeholder={cf.placeholders.notes}
              rows="6"
              value={formData.notes}
              onBlur={markTouched}
              onChange={updateField}
            />
          </label>

          <div className="field-grid three">
            <label className="field">
              <span>{cf.labels.lotType}</span>
              <select
                className="input"
                name="lotInterest"
                value={formData.lotInterest}
                onBlur={markTouched}
                onChange={updateField}
              >
                {cf.selects.lotInterest.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>{cf.labels.budget}</span>
              <select
                className="input"
                name="budget"
                value={formData.budget}
                onBlur={markTouched}
                onChange={updateField}
              >
                {cf.selects.budget.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>{cf.labels.timing}</span>
              <select
                className="input"
                name="timeline"
                value={formData.timeline}
                onBlur={markTouched}
                onChange={updateField}
              >
                {cf.selects.timeline.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="interest-field">
            <legend>{cf.labels.interest}</legend>
            <div className="radio-grid">
              {cf.interestOptions.map((option) => (
                <label className="radio-card" key={option.value}>
                  <input
                    type="radio"
                    name="interestType"
                    value={option.value}
                    checked={formData.interestType === option.value}
                    onChange={updateField}
                  />
                  <span>{option.label}</span>
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
              {contact.direct.links.map((item) => (
                <a href={item.href} key={item.label}>
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
        </form>
      </div>

      <div className="faq">
        <p className="eyebrow">{contact.faq.eyebrow}</p>
        <h2>{contact.faq.heading}</h2>
        {contact.faq.groups.map((group) => (
          <div className="faq-group" key={group.label}>
            <h3 className="faq-group-label">{group.label}</h3>
            {group.items.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <Paras text={item.answer} />
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const c = useContent();
  const { footer, nav } = c;
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <a className="footer-logo" href="#top" aria-label="Apple Woods home">
          <img src="/assets/applewoods-logo.png" alt={nav.logoAlt} />
        </a>

        <div className="footer-content">
          <div className="footer-message">
            <p>{footer.message}</p>
            <div className="footer-socials" aria-label="Social links">
              <a
                href="https://www.facebook.com/profile.php?id=100063724533236"
                target="_blank"
                rel="noreferrer"
                aria-label={footer.facebookLabel}
              >
                <svg viewBox="3 4 16 20" aria-hidden="true" focusable="false">
                  <path d="M14.2 8.18h2.13V4.64c-.37-.05-1.62-.16-3.08-.16-3.05 0-5.14 1.86-5.14 5.28v2.98H4.67v3.96h3.44v6.74h4.22V16.7h3.32l.53-3.96h-3.85v-2.59c0-1.15.31-1.97 1.87-1.97Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-menu" aria-label="Footer information and shortcuts">
            <div className="footer-list">
              {footer.info.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <nav className="footer-list" aria-label="Footer navigation">
              {footer.nav.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{footer.copyright}</span>
          <a href="#top">{footer.backToTop}</a>
        </div>
      </div>
    </footer>
  );
}

function VersionTwoPage() {
  const motionRef = useVersionTwoMotion();

  return (
    <div className="v2-shell" ref={motionRef}>
      <V2Nav />
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

function App() {
  return <VersionTwoPage />;
}

createRoot(document.getElementById("root")).render(
  <ContentProvider>
    <App />
  </ContentProvider>
);
