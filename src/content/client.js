// CLIENT copy — the client's official copy version, resolved from the
// decision table in docs/applewoods-official-copy-source.md.
// Built by cloning smcopy and overriding only the changed paths, so the shape
// stays identical to smcopy (enforced by scripts/check-content.mjs).
//
// i18n: smcopy.js carries { en, es } leaves. Each override below restores that
// leaf shape ({ en, es }) or the parity guard fails. Spanish strategy (per Rene):
// prefer the client's Google-Doc Spanish (docs/applewoods-spanish-copy-source.md)
// wherever it exists; direct-translate the gaps. Fields the client does NOT override
// inherit smcopy's leaf (already bilingual) via the clone.
import { smcopyContent } from "./smcopy.js";

const clientContent = structuredClone(smcopyContent);

// --- Hero ---
// EN = client's long official subhead. ES = doc subtitle (the client's authored Spanish;
// shorter than the EN by design — see source doc).
clientContent.hero.subhead = {
  en: "Apple Woods isn't just another subdivision—it's a new way of living. Designed as a smart community, Apple Woods seamlessly combines advanced technology, enhanced security, and modern comfort to create a neighborhood unlike any other. Here, luxury isn't measured by excess, but by convenience, beauty, connectivity, and attainability.",
  es: "Apple Woods es una comunidad inteligente donde la seguridad, el lujo y la tecnología están integrados en la vida cotidiana.",
};
// "View Pricing" has no doc Spanish — direct translation.
clientContent.hero.actions.lots = { en: "View Pricing", es: "Ver precios" };

// --- Difference items (Security, Beauty, Technology, Luxury, Wellness, Attainability) ---
// EN = client's long bodies. ES: items 0-3 use the doc Spanish; items 4-5 had no doc
// Spanish (doc shipped only 4 cards) so they are direct translations of the client EN.
clientContent.difference.items[0].body = {
  en: "Controlled access, strategically planned security cameras, smart lighting, connected community systems, and proactive flood mitigation measures help create a safer, smarter, and more resilient neighborhood.",
  es: "Acceso controlado, planificación de CCTV, iluminación inteligente y sistemas conectados.",
};
clientContent.difference.items[1].body = {
  en: "Beautiful landscaping, cohesive architectural standards, and carefully designed curb appeal guidelines create an attractive and enduring community while respecting and preserving the natural environment.",
  es: "Paisajismo mantenido, estándares arquitectónicos y pautas de atractivo exterior.",
};
clientContent.difference.items[2].body = {
  en: "Smart lighting and irrigation, modern access systems, community internet connectivity, and resident communication tools work together to create a more connected, efficient, and convenient living experience.",
  es: "Iluminación inteligente, sistemas de acceso y herramientas de comunicación para residentes.",
};
clientContent.difference.items[3].body = {
  en: "Enjoy the benefits of shared amenities and services that provide added comfort, convenience, and value—without placing an unnecessary financial burden on individual homeowners.",
  es: "Servicios y comodidades compartidos que agregan confort sin una carga adicional para el hogar.",
};
clientContent.difference.items[4].body = {
  en: "Blue Zone programs, combined with engaging fitness and wellness activities, make Apple Woods an ideal community for maintaining an active mind and body.",
  es: "Los programas Blue Zone, combinados con actividades de fitness y bienestar atractivas, hacen de Apple Woods una comunidad ideal para mantener una mente y un cuerpo activos.",
};
clientContent.difference.items[5].body = {
  en: "Apple Woods leverages economies of scale to share the cost of community services and amenities among homeowners, helping deliver an elevated lifestyle while keeping dues affordable.",
  es: "Apple Woods aprovecha las economías de escala para compartir el costo de los servicios y amenidades de la comunidad entre los propietarios, ayudando a ofrecer un estilo de vida elevado mientras mantiene las cuotas accesibles.",
};

// --- Amenities — original "Our Amenities" 4-panel structure ---
// The doc's "Nuestros servicios" section is the client's authored Spanish for exactly
// this section, so ES comes from the doc (titles use the doc captions).
clientContent.amenities = {
  titleLines: [
    { en: "Our", es: "Nuestros" },
    { en: "Amenities", es: "Servicios" },
  ],
  stories: [
    {
      label: { en: "Security built in", es: "Seguridad integrada" },
      eyebrow: { en: "01 / controlled access", es: "01 / acceso controlado" },
      title: {
        en: "The first impression is protected, lit, and intentional.",
        es: "La primera impresión es protegida, iluminada e intencional.",
      },
      body: {
        en: "Controlled access, CCTV monitoring, smart lighting, and visitor management systems help create a secure and welcoming environment from the moment residents and guests enter the community.",
        es: "El acceso controlado, la planificación de CCTV, la iluminación inteligente y los sistemas de visitantes ayudan a que la comunidad se sienta protegida desde la primera puerta.",
      },
      image: "/assets/security-built-in-camera.jpg",
    },
    {
      label: { en: "Beauty built in", es: "Belleza integrada" },
      eyebrow: { en: "02 / value protection", es: "02 / protección de valor" },
      title: {
        en: "Standards keep the neighborhood looking consistent.",
        es: "Los estándares mantienen el vecindario con un aspecto consistente.",
      },
      body: {
        en: "Thoughtfully planned landscaping, architectural standards, home curb appeal guidelines, safety features, stamped concrete crossings, and designated parking areas are integrated throughout the community to enhance its appearance, functionality, and long-term value.",
        es: "El paisajismo, los estándares arquitectónicos, las pautas de atractivo exterior y las calles mantenidas se planifican como parte del sistema comunitario.",
      },
      image: "/assets/beautyaw.png",
    },
    {
      label: { en: "Amenities built in", es: "Servicios integrados" },
      eyebrow: { en: "03 / shared comfort", es: "03 / confort compartido" },
      title: {
        en: "The lifestyle expands beyond the home.",
        es: "El estilo de vida se extiende más allá del hogar.",
      },
      body: {
        en: "Designed for effortless living, Apple Woods offers thoughtfully curated amenities including a clubhouse, fitness center, resort-style pool, beautifully landscaped green spaces, and community services that enhance everyday life. By sharing these amenities across the community, homeowners enjoy exceptional comforts and conveniences without the expense or responsibility of maintaining them individually. Residents also benefit from exclusive access to a private concierge line, providing an added level of convenience, support, and peace of mind.",
        es: "Una casa club, gimnasio, piscina, áreas verdes y servicios para residentes brindan confort a la comunidad sin que cada propietario lo gestione solo.",
      },
      image: "/assets/awclubpool.png",
    },
    {
      label: { en: "Technology built in", es: "Tecnología integrada" },
      eyebrow: { en: "04 / resident systems", es: "04 / sistemas para residentes" },
      title: {
        en: "Smart systems make daily living easier to coordinate.",
        es: "Los sistemas inteligentes facilitan la coordinación de la vida diaria.",
      },
      body: {
        en: "Apple Woods seamlessly integrates smart access controls, intelligent lighting, irrigation management, internet connectivity, and resident communication tools through the Apple Woods Portal, creating a convenient, connected, and efficient living experience.",
        es: "Los sistemas de acceso, la iluminación, la conectividad, las herramientas de comunicación y el portal de Apple Woods facilitan una forma de vida más organizada.",
      },
      image: "/assets/technology-built-in-sign.jpg",
    },
  ],
};

// --- Life Inside (ES from doc) ---
clientContent.lifeInside.body = {
  en: "From the clubhouse and fitness center to the resort-style pool, landscaped surroundings, lighting, and shared community services, Apple Woods is thoughtfully designed to elevate everyday living—making it easier, more comfortable, and more refined.",
  es: "Desde la casa club y el gimnasio hasta la piscina, el paisajismo, la iluminación y los servicios compartidos, Apple Woods está diseñado para que la vida diaria se sienta más fácil, limpia y elevada.",
};

// --- Phase One (ES from doc) ---
clientContent.phaseOne.body = {
  en: "As the first release in the Apple Woods community, Phase 1 is expected to provide the best opportunity for early buyers to secure a homesite at introductory pricing. Explore available homesites, compare locations and features, and verify current pricing, as the most sought-after properties may soon become reserved, under contract, or sold.",
  es: "La Fase 1 es el primer lanzamiento dentro de la comunidad de Apple Woods y se espera que sea el punto de entrada con el precio más bajo. Revisa la disponibilidad, compara los tipos de lotes y confirma los precios actuales antes de que los lotes preferidos pasen a estar reservados, bajo contrato o vendidos.",
};
clientContent.phaseOne.lots[1].body = {
  en: "A limited collection of homesites located near the planned clubhouse, offering immediate access to a thoughtfully designed river walk featuring natural water elements, fish, and lush exotic landscaping. These premium locations also provide convenient, unrestricted access to the resort-style pool area, enhancing the overall lifestyle experience at Apple Woods.",
  es: "Terrenos seleccionados cerca del área planificada de la casa club.",
};
clientContent.phaseOne.phaseNote = {
  en: "Lot status can change quickly once buyers begin confirming selections. As availability decreases, future pricing will increase.",
  es: "El estado de los lotes puede cambiar rápidamente una vez que los compradores comienzan a confirmar las selecciones. A medida que la disponibilidad disminuya, los precios futuros podrían aumentar.",
};

// --- Location (ES from doc) ---
clientContent.location.body = {
  en: "Apple Woods combines everyday convenience with exceptional regional connectivity. Residents enjoy easy access to daily essentials, along with direct routes to major highways connecting North Texas, the rapidly expanding Port of Brownsville–South Padre Island growth corridor, and the city's key commercial areas—all within a community designed to feel secure, modern, and set apart.",
  es: "Apple Woods ofrece a los residentes acceso a elementos esenciales diarios, carreteras clave, Rancho Viejo y el corredor de crecimiento portuario desde una comunidad diseñada para sentirse protegida, moderna y diferenciada.",
};

// --- Contact form submit (ES from doc) ---
clientContent.contact.form.submit = {
  en: "Ask About Phase 1 homesites",
  es: "Preguntar sobre los lotes de la Fase 1",
};

// --- FAQ — 13 entries (EN = client's long official answers).
// ES: the 3 questions the client translated in the doc (available, prices, design) use
// the doc Spanish; the remaining 10 are direct translations of the client EN.
clientContent.contact.faq.items = [
  {
    question: {
      en: "I hear I can find cheaper lots elsewhere?",
      es: "Escuché que puedo encontrar lotes más baratos en otro lugar.",
    },
    answer: {
      en: "Not all lots are created equal. While some communities may offer lower-priced lots, Apple Woods was designed to provide more than just land. Your investment includes access to a thoughtfully planned community with architectural standards, maintained landscaping, smart technology, shared amenities, enhanced security features, community services, and long-term planning designed to protect the neighborhood's appearance and quality of life. For some buyers, a lower-priced lot may be the right choice. Apple Woods is designed for those seeking a connected, well-maintained community that offers lasting value beyond the homesite itself.",
      es: "No todos los lotes son iguales. Aunque algunas comunidades ofrezcan lotes a menor precio, Apple Woods se diseñó para ofrecer más que un simple terreno. Tu inversión incluye acceso a una comunidad cuidadosamente planificada con estándares arquitectónicos, paisajismo mantenido, tecnología inteligente, amenidades compartidas, mayores medidas de seguridad, servicios comunitarios y planificación a largo plazo diseñada para proteger la apariencia y la calidad de vida del vecindario. Para algunos compradores, un lote más económico puede ser la opción adecuada. Apple Woods está pensado para quienes buscan una comunidad conectada y bien mantenida que ofrece un valor duradero más allá del terreno mismo.",
    },
  },
  {
    question: { en: "Which homesites are still available?", es: "¿Qué lotes siguen disponibles?" },
    answer: {
      en: "Availability changes quickly as homesites are reserved or placed under contract. “Pending” lots are under contract but awaiting deposit completion. Because homesites are not fully secured until a deposit is received, pending lots may still be reserved by new buyers. Please confirm current availability with the sales team.",
      es: "La disponibilidad puede cambiar rápidamente a medida que los compradores reservan o pasan a estar bajo contrato. Confirma el estado actual con el equipo de ventas.",
    },
  },
  {
    question: { en: "Will prices stay the same?", es: "¿Se mantendrán los precios?" },
    answer: {
      en: "Phase 1 is expected to provide the strongest introductory pricing within Apple Woods. As inventory becomes more limited, pricing for subsequent phases is anticipated to increase.",
      es: "Se espera que la Fase 1 sea el punto de entrada con el precio más bajo. A medida que la disponibilidad disminuya, los precios futuros podrían aumentar.",
    },
  },
  {
    question: { en: "Can I design my own home?", es: "¿Puedo diseñar mi propia casa?" },
    answer: {
      en: "Yes. Apple Woods allows homeowners to design custom homes, subject to architectural review. This process ensures that all designs meet community standards while preserving the beauty, consistency, and long-term curb appeal of the neighborhood.",
      es: "Sí. Las casas pasan por una revisión arquitectónica para proteger el atractivo exterior y los estándares de la comunidad.",
    },
  },
  {
    question: { en: "Are the dues expensive?", es: "¿Las cuotas son caras?" },
    answer: {
      en: "No. Apple Woods benefits from economies of scale, allowing community expenses to be shared among homeowners and helping keep dues affordable. For example, landscaping maintenance is estimated at about $25 per service per homeowner, and hotspot internet service at about $10 per month.",
      es: "No. Apple Woods se beneficia de las economías de escala, lo que permite compartir los gastos de la comunidad entre los propietarios y ayuda a mantener las cuotas accesibles. Por ejemplo, el mantenimiento del paisajismo se estima en unos $25 por servicio por propietario, y el servicio de internet hotspot en unos $10 al mes.",
    },
  },
  {
    question: { en: "Are dues mandatory?", es: "¿Las cuotas son obligatorias?" },
    answer: {
      en: "Yes. Community dues are required for all homeowners and help maintain the beauty, quality, and overall experience of living in Apple Woods. By sharing the cost of essential services and amenities across the community, residents benefit from a well-maintained neighborhood while keeping individual expenses more affordable. Mandatory dues include a core set of services and community features that support the upkeep, appearance, and functionality of Apple Woods. Additional optional services may be available for residents who choose to participate, including certain pet-related services that are only paid for by pet owners.",
      es: "Sí. Las cuotas comunitarias son obligatorias para todos los propietarios y ayudan a mantener la belleza, la calidad y la experiencia general de vivir en Apple Woods. Al compartir el costo de los servicios y amenidades esenciales en toda la comunidad, los residentes disfrutan de un vecindario bien mantenido mientras mantienen los gastos individuales más accesibles. Las cuotas obligatorias incluyen un conjunto básico de servicios y características de la comunidad que respaldan el mantenimiento, la apariencia y la funcionalidad de Apple Woods. Pueden existir servicios opcionales adicionales para los residentes que decidan participar, incluidos ciertos servicios relacionados con mascotas que solo pagan los dueños de mascotas.",
    },
  },
  {
    question: {
      en: "Am I responsible for all dues when I purchase?",
      es: "¿Soy responsable de todas las cuotas al comprar?",
    },
    answer: {
      en: "No. Apple Woods recognizes that lot owners may not begin construction right away. For that reason, a reduced dues structure applies during lot ownership, covering only basic maintenance and essential community services. Full community dues begin once a home has been built.",
      es: "No. Apple Woods reconoce que los dueños de lotes pueden no comenzar a construir de inmediato. Por esa razón, durante la propiedad del lote aplica una estructura de cuotas reducida que cubre solo el mantenimiento básico y los servicios comunitarios esenciales. Las cuotas comunitarias completas comienzan una vez que se ha construido una casa.",
    },
  },
  {
    question: { en: "Do I have to build a huge home?", es: "¿Tengo que construir una casa enorme?" },
    answer: {
      en: "No. At Apple Woods, we believe a beautiful community is created through thoughtful design, curb appeal, and well-maintained landscaping—not by requiring oversized homes. The minimum covered area is just 2,000 square feet, providing flexibility for homeowners while maintaining the high standards that make the neighborhood attractive. It's about quality and character, not quantity.",
      es: "No. En Apple Woods creemos que una comunidad hermosa se crea con un diseño cuidadoso, atractivo exterior y paisajismo bien mantenido, no exigiendo casas de gran tamaño. El área cubierta mínima es de solo 2,000 pies cuadrados, lo que brinda flexibilidad a los propietarios mientras se mantienen los altos estándares que hacen atractivo al vecindario. Se trata de calidad y carácter, no de cantidad.",
    },
  },
  {
    question: {
      en: "If I decide to build an expensive home, will other less expensive homes make my home value less?",
      es: "Si decido construir una casa costosa, ¿harán las demás casas menos costosas que mi casa valga menos?",
    },
    answer: {
      en: "No. Apple Woods is designed to maintain a beautiful and cohesive community while allowing homeowners the flexibility to build homes that fit their individual needs and lifestyles. Home sizes and budgets may vary, but all homes are required to meet architectural and landscaping standards that promote strong curb appeal and an attractive neighborhood environment. As a result, a home's value is influenced primarily by its size, features, craftsmanship, location, and amenities rather than simply by the price of neighboring homes.",
      es: "No. Apple Woods está diseñado para mantener una comunidad hermosa y cohesiva, permitiendo al mismo tiempo que los propietarios construyan casas que se ajusten a sus necesidades y estilos de vida individuales. Los tamaños y presupuestos de las casas pueden variar, pero todas las casas deben cumplir con los estándares arquitectónicos y de paisajismo que promueven un fuerte atractivo exterior y un entorno atractivo del vecindario. Como resultado, el valor de una casa está influenciado principalmente por su tamaño, características, calidad de construcción, ubicación y amenidades, y no simplemente por el precio de las casas vecinas.",
    },
  },
  {
    question: { en: "What are the restrictions?", es: "¿Cuáles son las restricciones?" },
    answer: {
      en: "Apple Woods is built on the principle that every homeowner benefits from living in a community that values beauty, respect, and pride of ownership. Our community standards are intended to protect the character of the neighborhood, enhance property values, and ensure a cohesive and attractive environment. These standards include guidelines for home size, architectural design, landscaping, exterior maintenance, lighting, noise levels, color selections, and the storage of outdoor items. By following these shared standards, homeowners help create a neighborhood that is both visually appealing and enjoyable for everyone who lives here. Please feel free to request our complete list of standards or ask any specific questions.",
      es: "Apple Woods se basa en el principio de que cada propietario se beneficia de vivir en una comunidad que valora la belleza, el respeto y el orgullo de ser propietario. Nuestros estándares comunitarios buscan proteger el carácter del vecindario, aumentar el valor de las propiedades y asegurar un entorno cohesivo y atractivo. Estos estándares incluyen pautas sobre el tamaño de la casa, el diseño arquitectónico, el paisajismo, el mantenimiento exterior, la iluminación, los niveles de ruido, la selección de colores y el almacenamiento de artículos al aire libre. Al seguir estos estándares compartidos, los propietarios ayudan a crear un vecindario que es a la vez visualmente atractivo y agradable para todos los que viven aquí. No dudes en solicitar nuestra lista completa de estándares o hacer cualquier pregunta específica.",
    },
  },
  {
    question: { en: "How big are the lots?", es: "¿De qué tamaño son los lotes?" },
    answer: {
      en: "Most homesites at Apple Woods are approximately 6,000 square feet, measuring 60 feet wide by 100 feet deep. Standard building setbacks are typically 25 feet from the front property line, 5 feet from each side property line, and 10 feet from the rear property line. These standards help maintain attractive streetscapes, privacy between homes, and a consistent neighborhood appearance.",
      es: "La mayoría de los lotes en Apple Woods miden aproximadamente 6,000 pies cuadrados, con 60 pies de ancho por 100 pies de profundidad. Los retiros de construcción estándar suelen ser de 25 pies desde la línea de propiedad frontal, 5 pies desde cada línea de propiedad lateral y 10 pies desde la línea de propiedad trasera. Estos estándares ayudan a mantener calles atractivas, privacidad entre las casas y una apariencia consistente del vecindario.",
    },
  },
  {
    question: { en: "Are 6,000 sq. ft. too small?", es: "¿6,000 pies cuadrados son demasiado pequeños?" },
    answer: {
      en: "Not necessarily. At Apple Woods, homesites were carefully planned around modern living trends and the evolving needs of today's homeowners. Many families are prioritizing efficient, well-designed living spaces while enjoying access to outdoor amenities such as pools, gathering areas, fitness facilities, and landscaped green spaces. Rather than requiring every homeowner to dedicate large portions of their property to these features, Apple Woods provides shared amenities that can be enjoyed by all residents. This allows homeowners to focus their investment on the spaces they value most while benefiting from amenities that would otherwise be costly to build and maintain individually. Home sizes can range from approximately 1,600 square feet of living area to a maximum of 3,250 square feet per floor, with up to three stories permitted. This provides a potential living area of up to 9,750 square feet on a single homesite, offering exceptional flexibility for a wide variety of lifestyles and needs. At Apple Woods, the goal is simple: enjoy the space you need, invest in what matters most to you, and let the community provide additional amenities and experiences without the added cost and maintenance burden.",
      es: "No necesariamente. En Apple Woods, los lotes se planificaron cuidadosamente en torno a las tendencias de vida modernas y las necesidades cambiantes de los propietarios de hoy. Muchas familias priorizan espacios de vida eficientes y bien diseñados mientras disfrutan del acceso a amenidades al aire libre como piscinas, áreas de reunión, instalaciones de fitness y áreas verdes ajardinadas. En lugar de exigir que cada propietario dedique grandes porciones de su propiedad a estas características, Apple Woods ofrece amenidades compartidas que todos los residentes pueden disfrutar. Esto permite a los propietarios concentrar su inversión en los espacios que más valoran, mientras se benefician de amenidades que de otro modo serían costosas de construir y mantener individualmente. Los tamaños de las casas pueden variar desde aproximadamente 1,600 pies cuadrados de área habitable hasta un máximo de 3,250 pies cuadrados por piso, con hasta tres niveles permitidos. Esto ofrece un área habitable potencial de hasta 9,750 pies cuadrados en un solo lote, brindando una flexibilidad excepcional para una amplia variedad de estilos de vida y necesidades. En Apple Woods, el objetivo es simple: disfruta del espacio que necesitas, invierte en lo que más te importa y deja que la comunidad aporte amenidades y experiencias adicionales sin el costo y la carga de mantenimiento.",
    },
  },
  {
    question: { en: "Can I build on two lots?", es: "¿Puedo construir en dos lotes?" },
    answer: {
      en: "Apple Woods was designed around the principle of quality over quantity, with thoughtfully planned individual homesites throughout the community. While combining two lots is not prohibited and may be permitted in select cases, smaller homesites were intentionally designed to accommodate homes that do not require larger construction areas and to offer a more budget-friendly option. When approved, additional architectural guidelines will apply, and modifications to the front entrance design may be required to maintain the community’s overall cohesion and design standards.",
      es: "Apple Woods se diseñó en torno al principio de calidad sobre cantidad, con lotes individuales cuidadosamente planificados en toda la comunidad. Aunque combinar dos lotes no está prohibido y puede permitirse en casos selectos, los lotes más pequeños se diseñaron intencionalmente para casas que no requieren áreas de construcción más grandes y para ofrecer una opción más accesible. Cuando se aprueba, aplicarán lineamientos arquitectónicos adicionales, y pueden requerirse modificaciones al diseño de la entrada frontal para mantener la cohesión y los estándares de diseño de la comunidad.",
    },
  },
];

// --- Footer (ES from doc) ---
clientContent.footer.message = {
  en: "Structured Living in Brownsville, Texas.",
  es: "Vida estructurada en Brownsville, Texas.",
};

export { clientContent };
