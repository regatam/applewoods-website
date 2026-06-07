// CLIENT copy — the client's official copy version, resolved from the
// decision table in docs/applewoods-official-copy-source.md.
// Built by cloning smcopy and overriding only the changed paths, so the shape
// stays identical to smcopy (enforced by scripts/check-content.mjs).
import { smcopyContent } from "./smcopy.js";

const clientContent = structuredClone(smcopyContent);

// --- Hero ---
clientContent.hero.subhead =
  "Apple Woods isn't just another subdivision—it's a new way of living. Designed as a smart community, Apple Woods seamlessly combines advanced technology, enhanced security, and modern comfort to create a neighborhood unlike any other. Here, luxury isn't measured by excess, but by convenience, beauty, connectivity, and attainability.";
clientContent.hero.actions.lots = "View Pricing";

// --- Difference items (Security, Beauty, Technology, Luxury, Wellness, Attainability) ---
clientContent.difference.items[0].body =
  "Controlled access, strategically planned security cameras, smart lighting, connected community systems, and proactive flood mitigation measures help create a safer, smarter, and more resilient neighborhood.";
clientContent.difference.items[1].body =
  "Beautiful landscaping, cohesive architectural standards, and carefully designed curb appeal guidelines create an attractive and enduring community while respecting and preserving the natural environment.";
clientContent.difference.items[2].body =
  "Smart lighting and irrigation, modern access systems, community internet connectivity, and resident communication tools work together to create a more connected, efficient, and convenient living experience.";
clientContent.difference.items[3].body =
  "Enjoy the benefits of shared amenities and services that provide added comfort, convenience, and value—without placing an unnecessary financial burden on individual homeowners.";
clientContent.difference.items[4].body =
  "Blue Zone programs, combined with engaging fitness and wellness activities, make Apple Woods an ideal community for maintaining an active mind and body.";
clientContent.difference.items[5].body =
  "Apple Woods leverages economies of scale to share the cost of community services and amenities among homeowners, helping deliver an elevated lifestyle while keeping dues affordable.";

// --- Amenities — original "Our Amenities" 4-panel structure ---
clientContent.amenities = {
  titleLines: ["Our", "Amenities"],
  stories: [
    {
      label: "Security built in",
      eyebrow: "01 / controlled access",
      title: "The first impression is protected, lit, and intentional.",
      body: "Controlled access, CCTV monitoring, smart lighting, and visitor management systems help create a secure and welcoming environment from the moment residents and guests enter the community.",
      image: "/assets/security-built-in-camera.jpg",
    },
    {
      label: "Beauty built in",
      eyebrow: "02 / value protection",
      title: "Standards keep the neighborhood looking consistent.",
      body: "Thoughtfully planned landscaping, architectural standards, home curb appeal guidelines, safety features, stamped concrete crossings, and designated parking areas are integrated throughout the community to enhance its appearance, functionality, and long-term value.",
      image: "/assets/beautyaw.png",
    },
    {
      label: "Amenities built in",
      eyebrow: "03 / shared comfort",
      title: "The lifestyle expands beyond the home.",
      body: "Designed for effortless living, Apple Woods offers thoughtfully curated amenities including a clubhouse, fitness center, resort-style pool, beautifully landscaped green spaces, and community services that enhance everyday life. By sharing these amenities across the community, homeowners enjoy exceptional comforts and conveniences without the expense or responsibility of maintaining them individually. Residents also benefit from exclusive access to a private concierge line, providing an added level of convenience, support, and peace of mind.",
      image: "/assets/awclubpool.png",
    },
    {
      label: "Technology built in",
      eyebrow: "04 / resident systems",
      title: "Smart systems make daily living easier to coordinate.",
      body: "Apple Woods seamlessly integrates smart access controls, intelligent lighting, irrigation management, internet connectivity, and resident communication tools through the Apple Woods Portal, creating a convenient, connected, and efficient living experience.",
      image: "/assets/technology-built-in-sign.jpg",
    },
  ],
};

// --- Life Inside ---
clientContent.lifeInside.body =
  "From the clubhouse and fitness center to the resort-style pool, landscaped surroundings, lighting, and shared community services, Apple Woods is thoughtfully designed to elevate everyday living—making it easier, more comfortable, and more refined.";

// --- Phase One ---
clientContent.phaseOne.body =
  "As the first release in the Apple Woods community, Phase 1 is expected to provide the best opportunity for early buyers to secure a homesite at introductory pricing. Explore available homesites, compare locations and features, and verify current pricing, as the most sought-after properties may soon become reserved, under contract, or sold.";
clientContent.phaseOne.lots[1].body =
  "A limited collection of homesites located near the planned clubhouse, offering immediate access to a thoughtfully designed river walk featuring natural water elements, fish, and lush exotic landscaping. These premium locations also provide convenient, unrestricted access to the resort-style pool area, enhancing the overall lifestyle experience at Apple Woods.";
clientContent.phaseOne.phaseNote =
  "Lot status can change quickly once buyers begin confirming selections. As availability decreases, future pricing will increase.";

// --- Location ---
clientContent.location.body =
  "Apple Woods combines everyday convenience with exceptional regional connectivity. Residents enjoy easy access to daily essentials, along with direct routes to major highways connecting North Texas, the rapidly expanding Port of Brownsville–South Padre Island growth corridor, and the city's key commercial areas—all within a community designed to feel secure, modern, and set apart.";

// --- Contact form ---
clientContent.contact.form.submit = "Ask About Phase 1 homesites";

// --- FAQ — 13 entries (answer = col3 text after the question) ---
clientContent.contact.faq.items = [
  {
    question: "I hear I can find cheaper lots elsewhere?",
    answer:
      "Not all lots are created equal. While some communities may offer lower-priced lots, Apple Woods was designed to provide more than just land. Your investment includes access to a thoughtfully planned community with architectural standards, maintained landscaping, smart technology, shared amenities, enhanced security features, community services, and long-term planning designed to protect the neighborhood's appearance and quality of life. For some buyers, a lower-priced lot may be the right choice. Apple Woods is designed for those seeking a connected, well-maintained community that offers lasting value beyond the homesite itself.",
  },
  {
    question: "Which homesites are still available?",
    answer:
      "Availability changes quickly as homesites are reserved or placed under contract. “Pending” lots are under contract but awaiting deposit completion. Because homesites are not fully secured until a deposit is received, pending lots may still be reserved by new buyers. Please confirm current availability with the sales team.",
  },
  {
    question: "Will prices stay the same?",
    answer:
      "Phase 1 is expected to provide the strongest introductory pricing within Apple Woods. As inventory becomes more limited, pricing for subsequent phases is anticipated to increase.",
  },
  {
    question: "Can I design my own home?",
    answer:
      "Yes. Apple Woods allows homeowners to design custom homes, subject to architectural review. This process ensures that all designs meet community standards while preserving the beauty, consistency, and long-term curb appeal of the neighborhood.",
  },
  {
    question: "Are the dues expensive?",
    answer:
      "No. Apple Woods benefits from economies of scale, allowing community expenses to be shared among homeowners and helping keep dues affordable. For example, landscaping maintenance is estimated at about $25 per service per homeowner, and hotspot internet service at about $10 per month.",
  },
  {
    question: "Are dues mandatory?",
    answer:
      "Yes. Community dues are required for all homeowners and help maintain the beauty, quality, and overall experience of living in Apple Woods. By sharing the cost of essential services and amenities across the community, residents benefit from a well-maintained neighborhood while keeping individual expenses more affordable. Mandatory dues include a core set of services and community features that support the upkeep, appearance, and functionality of Apple Woods. Additional optional services may be available for residents who choose to participate, including certain pet-related services that are only paid for by pet owners.",
  },
  {
    question: "Am I responsible for all dues when I purchase?",
    answer:
      "No. Apple Woods recognizes that lot owners may not begin construction right away. For that reason, a reduced dues structure applies during lot ownership, covering only basic maintenance and essential community services. Full community dues begin once a home has been built.",
  },
  {
    question: "Do I have to build a huge home?",
    answer:
      "No. At Apple Woods, we believe a beautiful community is created through thoughtful design, curb appeal, and well-maintained landscaping—not by requiring oversized homes. The minimum covered area is just 2,000 square feet, providing flexibility for homeowners while maintaining the high standards that make the neighborhood attractive. It's about quality and character, not quantity.",
  },
  {
    question:
      "If I decide to build an expensive home, will other less expensive homes make my home value less?",
    answer:
      "No. Apple Woods is designed to maintain a beautiful and cohesive community while allowing homeowners the flexibility to build homes that fit their individual needs and lifestyles. Home sizes and budgets may vary, but all homes are required to meet architectural and landscaping standards that promote strong curb appeal and an attractive neighborhood environment. As a result, a home's value is influenced primarily by its size, features, craftsmanship, location, and amenities rather than simply by the price of neighboring homes.",
  },
  {
    question: "What are the restrictions?",
    answer:
      "Apple Woods is built on the principle that every homeowner benefits from living in a community that values beauty, respect, and pride of ownership. Our community standards are intended to protect the character of the neighborhood, enhance property values, and ensure a cohesive and attractive environment. These standards include guidelines for home size, architectural design, landscaping, exterior maintenance, lighting, noise levels, color selections, and the storage of outdoor items. By following these shared standards, homeowners help create a neighborhood that is both visually appealing and enjoyable for everyone who lives here. Please feel free to request our complete list of standards or ask any specific questions.",
  },
  {
    question: "How big are the lots?",
    answer:
      "Most homesites at Apple Woods are approximately 6,000 square feet, measuring 60 feet wide by 100 feet deep. Standard building setbacks are typically 25 feet from the front property line, 5 feet from each side property line, and 10 feet from the rear property line. These standards help maintain attractive streetscapes, privacy between homes, and a consistent neighborhood appearance.",
  },
  {
    question: "Are 6,000 sq. ft. too small?",
    answer:
      "Not necessarily. At Apple Woods, homesites were carefully planned around modern living trends and the evolving needs of today's homeowners. Many families are prioritizing efficient, well-designed living spaces while enjoying access to outdoor amenities such as pools, gathering areas, fitness facilities, and landscaped green spaces. Rather than requiring every homeowner to dedicate large portions of their property to these features, Apple Woods provides shared amenities that can be enjoyed by all residents. This allows homeowners to focus their investment on the spaces they value most while benefiting from amenities that would otherwise be costly to build and maintain individually. Home sizes can range from approximately 1,600 square feet of living area to a maximum of 3,250 square feet per floor, with up to three stories permitted. This provides a potential living area of up to 9,750 square feet on a single homesite, offering exceptional flexibility for a wide variety of lifestyles and needs. At Apple Woods, the goal is simple: enjoy the space you need, invest in what matters most to you, and let the community provide additional amenities and experiences without the added cost and maintenance burden.",
  },
  {
    question: "Can I build on two lots?",
    answer:
      "Apple Woods was designed around the principle of quality over quantity, with thoughtfully planned individual homesites throughout the community. While combining two lots is not prohibited and may be permitted in select cases, smaller homesites were intentionally designed to accommodate homes that do not require larger construction areas and to offer a more budget-friendly option. When approved, additional architectural guidelines will apply, and modifications to the front entrance design may be required to maintain the community’s overall cohesion and design standards.",
  },
];

// --- Footer ---
clientContent.footer.message = "Structured Living in Brownsville, Texas.";

export { clientContent };
