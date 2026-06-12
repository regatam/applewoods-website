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
import { smcopyContent, faqDocItems } from "./smcopy.js";

const clientContent = structuredClone(smcopyContent);

// --- Hero ---
// ES headline = doc Spanish (em dash swapped for the colon used in the EN display split).
clientContent.hero.headlineLines = [
  { en: "More Than a Subdivision:", es: "Más que un simple Fraccionamiento:" },
  // **word** = bold emphasis (client request 2026-06-10), rendered by the hero h1.
  { en: "A Place to **Truly** Call **Home**", es: "Un Lugar que **Verdaderamente** se le Puede Llamar **Hogar**" },
];
// EN = client's long official subhead. ES = doc Spanish (2026-06 full pass).
clientContent.hero.subhead = {
  en: "Apple Woods isn't just another subdivision—it's a new way of living. Designed as a smart community, Apple Woods seamlessly combines advanced technology, enhanced security, and modern comfort to create a neighborhood unlike any other. Here, luxury isn't measured by excess, but by convenience, beauty, connectivity, and attainability.",
  es: "Apple Woods no es solo otro fraccionamiento: es una nueva forma de vivir. Diseñado como una comunidad inteligente, Apple Woods combina de manera perfecta tecnología avanzada, seguridad mejorada y comodidad moderna para crear un entorno residencial diferente a cualquier otro. Aquí, el lujo no se mide por el exceso, sino por la conveniencia, la belleza, la conectividad y la accesibilidad.",
};
clientContent.hero.actions.lots = { en: "View Pricing", es: "Ver Precios" };

// --- Difference items (Security, Beauty, Technology, Luxury, Wellness, Attainability) ---
// EN = client's long bodies. ES = doc Spanish (2026-06 full pass; trailing periods added
// where the doc omitted them). The Ecology card (items[6]) is inherited from smcopy as-is.
// ES section heading reworded per client feedback 2026-06-10.
clientContent.difference.heading.es =
  "Todo lo que distingue a una comunidad de primer nivel está pensado desde el inicio.";
clientContent.difference.items[0].body = {
  en: "Controlled access, strategically planned security cameras, smart lighting, connected community systems, and proactive flood mitigation measures help create a safer, smarter, and more resilient neighborhood.",
  es: "El acceso controlado, las cámaras de seguridad estratégicamente ubicadas, la iluminación inteligente, los sistemas comunitarios conectados y las medidas preventivas contra inundaciones ayudan a crear un fraccionamiento más seguro, inteligente y resiliente.",
};
clientContent.difference.items[1].body = {
  en: "Beautiful landscaping, cohesive architectural standards, and carefully designed curb appeal guidelines create an attractive and enduring community while respecting and preserving the natural environment.",
  es: "Las áreas verdes cuidadosamente diseñadas, los estándares arquitectónicos armonizados y los lineamientos de imagen urbana meticulosamente planeados crean una comunidad atractiva y duradera, mientras se respeta y preserva el entorno natural.",
};
clientContent.difference.items[2].body = {
  en: "Smart lighting and irrigation, modern access systems, community internet connectivity, and resident communication tools work together to create a more connected, efficient, and convenient living experience.",
  es: "La iluminación y el riego automatizados, los modernos sistemas de acceso, la conectividad de internet comunitaria y las herramientas de comunicación para residentes trabajan en conjunto para ofrecer una experiencia de vida más conectada, eficiente y conveniente.",
};
clientContent.difference.items[3].body = {
  en: "Enjoy the benefits of shared amenities and services that provide added comfort, convenience, and value—without placing an unnecessary financial burden on individual homeowners.",
  es: "Disfruta de los beneficios de amenidades y servicios compartidos que brindan mayor comodidad, conveniencia y valor, sin representar una carga financiera innecesaria para cada propietario.",
};
clientContent.difference.items[4].body = {
  en: "Blue Zone programs, combined with engaging fitness and wellness activities, make Apple Woods an ideal community for maintaining an active mind and body.",
  es: "Los programas inspirados en las Zonas Azules, combinados con actividades dinámicas de bienestar y acondicionamiento físico, convierten a Apple Woods en una comunidad ideal para mantener una mente y un cuerpo activos.",
};
clientContent.difference.items[5].title.es = "Accesibilidad económica integrada";
clientContent.difference.items[5].body = {
  en: "Apple Woods leverages economies of scale to share the cost of community services and amenities among homeowners, helping deliver an elevated lifestyle while keeping dues affordable.",
  es: "Apple Woods aprovecha las economías de escala para compartir entre los propietarios el costo de servicios y amenidades comunitarias, ayudando a ofrecer un estilo de vida elevado mientras se mantienen cuotas accesibles.",
};

// --- Amenities — original "Our Amenities" 4-panel structure ---
// EN bodies/captions and ES both come from the client's 2026-06 doc.
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
        es: "La primera impresión está protegida, iluminada y diseñada con intención.",
      },
      body: {
        en: "Controlled access, CCTV monitoring, smart lighting, and visitor management systems help create a secure and welcoming environment from the moment residents and guests enter the community.",
        es: "El acceso controlado, el monitoreo por CCTV, la iluminación inteligente y los sistemas de gestión de visitantes ayudan a crear un entorno seguro y acogedor desde el momento en que residentes e invitados ingresan a la comunidad.",
      },
      image: "/assets/security-built-in-camera.jpg",
    },
    {
      label: { en: "Beauty built in", es: "Belleza integrada" },
      eyebrow: { en: "02 / value protection", es: "02 / protección de valor" },
      title: {
        en: "Standards keep the neighborhood looking consistent.",
        es: "Los estándares ayudan a mantener una apariencia consistente y armoniosa en la comunidad.",
      },
      body: {
        en: "Thoughtfully planned landscaping, architectural standards, home curb appeal guidelines, safety features, stamped concrete crossings, and designated parking areas are integrated throughout the community to enhance its appearance, functionality, and long-term value.",
        es: "Las áreas verdes cuidadosamente planificadas, los estándares arquitectónicos, los lineamientos de imagen residencial, las medidas de seguridad, los cruces de concreto estampado y las áreas de estacionamiento designadas se integran en toda la comunidad para mejorar su apariencia, funcionalidad y valor a largo plazo.",
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
        es: "Diseñado para una vida sin complicaciones, Apple Woods ofrece amenidades cuidadosamente seleccionadas, incluyendo una casa club, gimnasio, alberca estilo resort, jardines escénicos y servicios comunitarios que enriquecen la vida diaria. Al compartir estas amenidades dentro de la comunidad, los propietarios disfrutan de comodidades y beneficios excepcionales sin el gasto ni la responsabilidad de mantenerlos de forma individual.\n\nLos residentes también cuentan con acceso exclusivo a una línea privada de concierge, brindando un nivel adicional de conveniencia, atención personalizada y tranquilidad.",
      },
      image: "/assets/awclubpool.png",
    },
    {
      label: { en: "Technology built in", es: "Tecnología integrada" },
      eyebrow: { en: "04 / resident systems", es: "04 / sistemas para residentes" },
      title: {
        en: "Smart systems make daily living easier to manage.",
        es: "Los sistemas inteligentes facilitan y simplifican la vida diaria.",
      },
      body: {
        en: "Apple Woods seamlessly integrates smart access controls, intelligent lighting, irrigation management, internet connectivity, and resident communication tools through the Apple Woods Portal, creating a convenient, connected, and efficient living experience.",
        es: "Apple Woods integra perfectamente controles inteligentes de acceso, iluminación inteligente, administración de riego, conectividad a internet y herramientas de comunicación para residentes a través del Portal Apple Woods, creando una experiencia de vida conveniente, conectada y eficiente.",
      },
      image: "/assets/technology-built-in-sign.jpg",
    },
  ],
};

// --- Life Inside (EN gains the resort-pool second paragraph; ES from doc) ---
clientContent.lifeInside.body = {
  en: "From the clubhouse and fitness center to the resort-style pool, landscaped surroundings, lighting, and shared community services, Apple Woods is thoughtfully designed to elevate everyday living—making it easier, more comfortable, and more refined.\n\nThe resort-style pool will also feature theater-style seating levels, allowing residents and guests to relax while enjoying a large video wall positioned above the outdoor grills and gathering area, creating a unique entertainment experience for families and community events.",
  es: "Desde la casa club y el gimnasio hasta la alberca estilo resort, los jardines escénicos, la iluminación y los servicios compartidos de la comunidad, Apple Woods ha sido diseñado cuidadosamente para elevar la vida diaria, haciéndola más fácil, cómoda y refinada.\n\nLa alberca estilo resort también contará con niveles de descanso tipo teatro, permitiendo que residentes e invitados se relajen mientras disfrutan de una gran pantalla de video ubicada sobre las áreas de parrillas al aire libre y convivencia, creando una experiencia única de entretenimiento para familias y eventos comunitarios.",
};
// Amenity list — the doc's longer EN descriptions + client ES.
clientContent.lifeInside.items[0].detail = {
  en: "A central hub for the community where residents can gather, socialize, and enjoy thoughtfully designed shared spaces, activities, and amenities.",
  es: "Un punto central para la comunidad donde los residentes pueden reunirse, convivir y disfrutar de espacios compartidos, actividades y amenidades cuidadosamente diseñadas.",
};
clientContent.lifeInside.items[1].detail = {
  en: "Convenient on-site fitness access designed to support an active lifestyle without ever having to leave the neighborhood.",
  es: "Acceso fácil y práctico a instalaciones de acondicionamiento físico dentro de la comunidad, diseñadas para fomentar un estilo de vida activo sin tener que salir del fraccionamiento.",
};
clientContent.lifeInside.items[2].detail = {
  en: "A welcoming outdoor space where families can gather, play, relax, and create lasting memories together.",
  es: "Un espacio al aire libre que invita a las familias a reunirse, convivir, relajarse y crear recuerdos inolvidables juntos.",
};
// Doc titles the item "Pool Area / Area de Alberca" (2026-06-11 copy doc).
clientContent.lifeInside.items[2].term = { en: "Pool Area", es: "Área de alberca" };
// items[3]/[4] (Outdoor Spaces, Event Center) ship the doc copy from smcopy as-is.
clientContent.lifeInside.items[5].detail = {
  en: "Beautiful landscaping, carefully planned lighting, and consistent community standards ensure the neighborhood remains attractive, welcoming, and well maintained.",
  es: "Hermosos jardines escénicos, iluminación cuidadosamente planificada y estándares consistentes en la comunidad ayudan a mantener el fraccionamiento atractivo, armonioso y bien cuidado.",
};

// Section image is the water walk render (swapped 2026-06-12).
clientContent.lifeInside.imageAlt = {
  en: "Apple Woods water walk render with fountains, koi ponds, and palm-lined homes",
  es: "Representación del andador de agua de Apple Woods con fuentes, estanques de peces koi y residencias entre palmeras",
};

// --- Phase One (EN + ES from the 2026-06 doc) ---
clientContent.phaseOne.body = {
  en: "Apple Woods Phase 1 is expected to provide the best opportunity for early buyers to secure a homesite at introductory pricing. Explore available homesites, compare locations and features, and verify current pricing, as the most sought-after properties may soon become reserved, under contract, or sold.",
  es: "Apple Woods Fase 1 representa una excelente oportunidad para que los primeros compradores aseguren su lote residencial a precios de lanzamiento. Explore los terrenos disponibles, compare ubicaciones y características, y verifique los precios actuales, ya que las propiedades más atractivas podrían reservarse, entrar en contrato o venderse próximamente.",
};
// ES card titles say "Terrenos", not "Lotes" (client feedback 2026-06-11).
clientContent.phaseOne.lots[0].name.es = "Terrenos estándar";
clientContent.phaseOne.lots[1].name.es = "Terrenos prémium";
clientContent.phaseOne.lots[2].name.es = "Terrenos en esquina";
clientContent.phaseOne.lots[0].body = {
  en: "An attractive introductory opportunity to join the Apple Woods community, with Phase 1 homesites offered at early-release pricing designed to provide exceptional value within a thoughtfully planned and growing neighborhood.",
  es: "Una excelente oportunidad de introducción para formar parte de la comunidad Apple Woods en su primera fase. Con precios especiales de lanzamiento, esta etapa inicial ofrece un valor excepcional dentro de un fraccionamiento cuidadosamente planificado y diseñado para crecer en armonía, comodidad y estilo de vida.",
};
clientContent.phaseOne.lots[1].body = {
  en: "A limited collection of homesites located near the planned clubhouse, offering immediate access to a thoughtfully designed river walk featuring natural water elements, fish, and lush exotic landscaping. These premium locations also provide convenient, unrestricted access to the resort-style pool area, enhancing the overall lifestyle experience at Apple Woods.",
  es: "Una exclusiva colección de terrenos residenciales ubicados cerca de la futura casa club, ofreciendo acceso inmediato a un hermoso andador al costado de un arroyo cuidadosamente diseñado, rodeado de elementos naturales de agua, peces y exuberante vegetación exótica. Estas ubicaciones premium también brindan acceso cómodo y sin restricciones al área de alberca estilo resort, elevando aún más la experiencia de vida y el estilo exclusivo que distingue a Apple Woods.",
};
clientContent.phaseOne.lots[2].body = {
  en: "Larger or irregular homesites priced by size and location.",
  es: "Terrenos residenciales de mayor tamaño o de configuración irregular, con precios determinados según su superficie y ubicación dentro del desarrollo.",
};
clientContent.phaseOne.phaseNote = {
  en: "Lot status can change quickly once buyers begin confirming selections. As availability decreases, future pricing will increase.",
  es: "El estado de disponibilidad de los terrenos puede cambiar rápidamente una vez que los compradores comiencen a confirmar sus selecciones. A medida que la disponibilidad disminuya, los precios futuros aumentarán.",
};

// --- Location (EN gains the hike-and-bike-trails paragraph; ES from doc) ---
clientContent.location.body = {
  en: "Apple Woods combines everyday convenience with exceptional regional connectivity. Residents enjoy easy access to daily essentials, along with direct routes to major highways connecting North Texas, the rapidly expanding Port of Brownsville–South Padre Island growth corridor, and the city's key commercial areas.\n\nThe community also offers immediate access to Brownsville's extensive network of more than 25 miles of interconnected hike and bike trails, linking parks, historic sites, neighborhoods, and scenic resaca views. All of this comes together within a community designed to feel secure, modern, and set apart.",
  es: "Apple Woods combina la comodidad del día a día con una conectividad regional excepcional. Los residentes disfrutan de un fácil acceso a servicios esenciales, así como de rutas directas hacia las principales autopistas que conectan el norte de Texas, el corredor de crecimiento y rápido desarrollo entre el Puerto de Brownsville y South Padre Island, y las principales zonas comerciales de la ciudad.\n\nLa comunidad también ofrece acceso inmediato a la extensa red de Brownsville, con más de 25 millas de senderos interconectados para caminar y andar en bicicleta, que enlazan parques, sitios históricos, otras colonias y vistas escénicas de las resacas.\n\nTodo esto se integra dentro de una comunidad diseñada para sentirse segura, moderna y claramente diferenciada.",
};

// --- Contact form submit (ES from doc) ---
clientContent.contact.form.submit = {
  en: "Ask About Phase 1 homesites",
  es: "Preguntar sobre los lotes de la Fase 1",
};

// --- FAQ — grouped by the doc's categories (General / Cost / Size / Restrictions / Life).
// EN = client's long official answers (multi-paragraph via \n\n). ES = the client's doc
// Spanish for both questions and answers (2026-06 full pass). The 17 entries new in the
// doc are shared with smcopy via faqDocItems (no smcopy variant exists for them).
// Group count/order must mirror smcopy.js — the parity guard compares array lengths.
clientContent.contact.faq.groups = [
  {
    label: { en: "General", es: "General" },
    items: [
      {
        question: { en: "Which homesites are still available?", es: "¿Qué terrenos aún están disponibles?" },
        answer: {
          en: "Availability changes quickly as homesites are reserved or placed under contract. “Pending” lots are under contract but awaiting deposit completion. Because homesites are not fully secured until a deposit is received, pending lots may still be reserved by new buyers. Please confirm current availability with the sales team.",
          es: "La disponibilidad cambia rápidamente a medida que los terrenos son reservados o se colocan bajo contrato. Los terrenos en estado “pendiente” se encuentran bajo contrato, pero a la espera de la confirmación del depósito. Debido a que los terrenos no se consideran totalmente asegurados hasta que se recibe el depósito, los terrenos pendientes aún pueden ser reservados por nuevos compradores. Por favor, confirme la disponibilidad actual con el equipo de ventas.",
        },
      },
      {
        question: { en: "Can I design my own home?", es: "¿Tendré la oportunidad de diseñar mi propia casa?" },
        answer: {
          en: "Yes. Apple Woods allows homeowners to design custom homes, subject to architectural review. This process ensures that all designs meet community standards while preserving the beauty, consistency, and long-term curb appeal of the neighborhood.",
          es: "Sí. Apple Woods permite a los propietarios diseñar viviendas personalizadas, sujetas a una revisión arquitectónica. Este proceso garantiza que todos los diseños cumplan con los estándares de la comunidad, al mismo tiempo que preserva la belleza, la coherencia y el atractivo visual a largo plazo del fraccionamiento.",
        },
      },
      faqDocItems.fillDirt,
      faqDocItems.traditional,
      faqDocItems.fountainsTech,
    ],
  },
  {
    label: { en: "Cost", es: "Costos" },
    items: [
      {
        question: {
          en: "I hear I can find cheaper lots elsewhere?",
          es: "¿Por qué me dicen que hay terrenos más baratos en otros lugares?",
        },
        answer: {
          en: "Not all lots are created equal. While some communities may offer lower-priced lots, Apple Woods was designed to provide more than just land. Your investment includes access to a thoughtfully planned community with architectural standards, maintained landscaping, smart technology, shared amenities, enhanced security features, community services, and long-term planning designed to protect the neighborhood's appearance and quality of life.\n\nFor some buyers, a lower-priced lot may be the right choice. Apple Woods is designed for those seeking a connected, well-maintained community that offers lasting value beyond the homesite itself.",
          es: "No todos los terrenos son desarrollados de igual manera. Aunque algunas comunidades pueden ofrecer terrenos a precios más bajos, Apple Woods fue diseñado para ofrecer mucho más que solo tierra. Su inversión incluye el acceso a una comunidad cuidadosamente planificada, con estándares arquitectónicos, jardinería escénica mantenida, tecnología inteligente, amenidades compartidas, características de seguridad mejoradas, servicios comunitarios y una planificación a largo plazo orientada a proteger la imagen de la colonia y la calidad de vida.\n\nPara algunos compradores, un lote de menor precio puede ser la opción adecuada. Apple Woods está diseñado para quienes buscan una comunidad conectada y bien mantenida, que ofrezca un valor duradero más allá del propio terreno.",
        },
      },
      {
        question: { en: "Will prices stay the same?", es: "¿Los precios se van a mantener?" },
        answer: {
          en: "Phase 1 is expected to provide the strongest introductory pricing within Apple Woods. As inventory becomes more limited, pricing for subsequent phases is anticipated to increase.",
          es: "Se espera que la Fase 1 ofrezca los precios de introducción más atractivos dentro de Apple Woods. A medida que la disponibilidad de terrenos se vuelva más limitada, se anticipa un incremento en los precios de las fases posteriores.",
        },
      },
      {
        question: { en: "Are the dues expensive?", es: "¿Las cuotas son caras?" },
        answer: {
          en: "No. Apple Woods benefits from economies of scale, allowing community expenses to be shared among homeowners and helping keep dues affordable. For example, front landscaping maintenance is estimated at about $25 per service per homeowner, and hotspot internet service at about $10 per month.",
          es: "No. Apple Woods se beneficia de economías de escala, lo que permite que los gastos de la comunidad se distribuyan entre los propietarios y contribuye a mantener las cuotas accesibles. Por ejemplo, el mantenimiento de la jardinería frontal se estima en aproximadamente $25 por servicio por propietario, y el servicio de internet tipo hotspot en alrededor de $10 mensuales.",
        },
      },
      {
        question: { en: "Are dues mandatory?", es: "¿Las cuotas son obligatorias?" },
        answer: {
          en: "Yes. Community dues are required for all homeowners and help maintain the beauty, quality, and overall experience of living in Apple Woods. By sharing the cost of essential services and amenities across the community, residents benefit from a well-maintained neighborhood while keeping individual expenses more affordable.\n\nMandatory dues include a core set of services and community features that support the upkeep, appearance, and functionality of Apple Woods. Additional optional services may be available for residents who choose to participate, including certain pet-related services that are only paid for by pet owners.",
          es: "Sí. Las cuotas de la comunidad son obligatorias para todos los propietarios y contribuyen a mantener la belleza, la calidad y la experiencia general de vivir en Apple Woods. Al compartir el costo de los servicios esenciales y las amenidades entre la comunidad, los residentes se benefician de un fraccionamiento bien mantenido, mientras mantienen más accesibles los gastos individuales.\n\nLas cuotas obligatorias incluyen un conjunto básico de servicios y características comunitarias que apoyan el mantenimiento, la imagen y el funcionamiento de Apple Woods. Servicios adicionales opcionales pueden estar disponibles para los residentes que decidan participar, incluyendo ciertos servicios relacionados con mascotas, los cuales son cubiertos únicamente por los propietarios que tienen mascotas.",
        },
      },
      {
        question: {
          en: "Am I responsible for all dues when I purchase?",
          es: "¿Tengo que pagar todas las cuotas desde el momento que compro?",
        },
        answer: {
          en: "No. Apple Woods recognizes that lot owners may not begin construction right away. For that reason, a reduced dues structure applies during lot ownership, covering only basic maintenance and essential community services. Full community dues begin once a home has been built.",
          es: "No. Apple Woods reconoce que los propietarios de terrenos pueden no iniciar la construcción de inmediato. Por esta razón, durante la etapa de propiedad del terreno se aplica una estructura reducida de cuotas, que cubre únicamente el mantenimiento básico y los servicios comunitarios esenciales. Las cuotas completas de la comunidad comienzan una vez que la vivienda ha sido construida.",
        },
      },
      faqDocItems.cic,
      faqDocItems.saveMoney,
      faqDocItems.propertyValue,
    ],
  },
  {
    label: { en: "Size", es: "Tamaño" },
    items: [
      {
        question: { en: "Do I have to build a huge home?", es: "¿Tengo que construir una casa enorme?" },
        answer: {
          en: "No. At Apple Woods, we believe a beautiful community is created through thoughtful design, curb appeal, and well-maintained landscaping—not by requiring oversized homes. The minimum covered area is just 2,000 square feet, providing flexibility for homeowners while maintaining the high standards that make the neighborhood attractive. It's about quality and character, not quantity.",
          es: "No. En Apple Woods creemos que una comunidad hermosa se crea a través de un diseño cuidadoso, una buena imagen exterior y una jardinería bien mantenida, no mediante la exigencia de viviendas de gran tamaño. La superficie mínima construida es de solo 2,000 pies cuadrados, lo que brinda flexibilidad a los propietarios mientras se mantienen los altos estándares que hacen atractivo el fraccionamiento. Se trata de calidad y carácter, no de cantidad.",
        },
      },
      {
        question: {
          en: "If I decide to build an expensive home, will other less expensive homes make my home value less?",
          es: "Si me decido a construir una casa lujosa, ¿las otras casas impactarán bajando el precio de la mía?",
        },
        answer: {
          en: "No. Apple Woods is designed to maintain a beautiful and cohesive community while allowing homeowners the flexibility to build homes that fit their individual needs and lifestyles. Home sizes and budgets may vary, but all homes are required to meet architectural and landscaping standards that promote strong curb appeal and an attractive neighborhood environment. As a result, a home's value is influenced primarily by its size, features, craftsmanship, location, and amenities rather than simply by the price of neighboring homes.",
          es: "No. Apple Woods está diseñado para mantener una comunidad hermosa y armónica, al mismo tiempo que permite a los propietarios la flexibilidad de construir viviendas que se adapten a sus necesidades y estilos de vida individuales. El tamaño y el presupuesto de las viviendas pueden variar, pero todas deben cumplir con estándares arquitectónicos y de jardinería que promuevan una excelente imagen exterior y un entorno residencial atractivo dentro del fraccionamiento.\n\nComo resultado, el valor de una vivienda se determina principalmente por su tamaño, características, calidad de construcción, ubicación y amenidades, más que únicamente por el precio de las propiedades vecinas.",
        },
      },
      {
        question: { en: "How big are the lots?", es: "¿Qué tan grandes son los terrenos?" },
        answer: {
          en: "Most homesites at Apple Woods are approximately 6,000 square feet, measuring 60 feet wide by 100 feet deep. Standard building setbacks are typically 25 feet from the front property line, 5 feet from each side property line, and 10 feet from the rear property line. These standards help maintain attractive streetscapes, privacy between homes, and a consistent neighborhood appearance.",
          es: "La mayoría de los terrenos en Apple Woods tienen aproximadamente 6,000 pies cuadrados, con medidas de 60 pies de frente por 100 pies de fondo. Los retiros de construcción estándar son generalmente de 25 pies desde la línea frontal del terreno, 5 pies desde cada línea lateral y 10 pies desde la línea posterior. Estos lineamientos ayudan a mantener calles visualmente atractivas, privacidad entre viviendas y una apariencia uniforme dentro del fraccionamiento.",
        },
      },
      {
        question: { en: "Are 6,000 sq. ft. too small?", es: "¿No son 6000 pies cuadrados muy pocos?" },
        answer: {
          en: "Not necessarily. At Apple Woods, homesites were carefully planned around modern living trends and the evolving needs of today's homeowners. Many families are prioritizing efficient, well-designed living spaces while enjoying access to outdoor amenities such as pools, gathering areas, fitness facilities, and landscaped green spaces.\n\nRather than requiring every homeowner to dedicate large portions of their property to these features, Apple Woods provides shared amenities that can be enjoyed by all residents. This allows homeowners to focus their investment on the spaces they value most while benefiting from amenities that would otherwise be costly to build and maintain individually.\n\nHome sizes can range from approximately 1,600 square feet of living area to a maximum of 3,250 square feet per floor, with up to three stories permitted. This provides a potential living area of up to 9,750 square feet on a single homesite, offering exceptional flexibility for a wide variety of lifestyles and needs.\n\nAt Apple Woods, the goal is simple: enjoy the space you need, invest in what matters most to you, and let the community provide additional amenities and experiences without the added cost and maintenance burden.",
          es: "No necesariamente. En Apple Woods, los terrenos han sido cuidadosamente planificados considerando las tendencias de la vida moderna y las necesidades cambiantes de los propietarios actuales. Muchas familias priorizan espacios habitacionales eficientes y bien diseñados, mientras disfrutan del acceso a amenidades exteriores como albercas, áreas de convivencia, gimnasios y áreas verdes cuidadosamente diseñadas.\n\nEn lugar de requerir que cada propietario destine grandes porciones de su propiedad a este tipo de instalaciones, Apple Woods ofrece amenidades compartidas que pueden ser disfrutadas por todos los residentes. Esto permite a los propietarios enfocar su inversión en los espacios que más valoran, mientras se benefician de instalaciones que de otro modo serían costosas de construir y mantener de manera individual.\n\nLas viviendas pueden variar desde aproximadamente 1,600 pies cuadrados de área habitacional hasta un máximo de 3,250 pies cuadrados de construcción por nivel, con la posibilidad de hasta tres niveles. Esto permite una superficie construible potencial de hasta 9,750 pies cuadrados en un solo terreno, ofreciendo una flexibilidad excepcional para una amplia variedad de estilos de vida y necesidades.\n\nEn Apple Woods, el objetivo es simple: disfrutar del espacio que necesitas, invertir en lo que más valoras y permitir que la comunidad proporcione amenidades y experiencias adicionales sin la carga de costos y mantenimiento adicionales.",
        },
      },
      {
        question: { en: "Can I build on two lots?", es: "¿Pudiese construir en dos terrenos?" },
        answer: {
          en: "Apple Woods was designed around the principle of quality over quantity, with thoughtfully planned individual homesites throughout the community. While combining two lots is not prohibited and may be permitted in select cases, smaller homesites were intentionally designed to accommodate homes that do not require larger construction areas and to offer a more budget-friendly option. When approved, additional architectural guidelines will apply, and modifications to the front entrance design may be required to maintain the community's overall cohesion and design standards.",
          es: "Apple Woods fue diseñado bajo el principio de calidad sobre cantidad, con terrenos residenciales cuidadosamente planificados a lo largo de la comunidad. Si bien la combinación de dos terrenos no está prohibida y puede permitirse en casos específicos, los terrenos más pequeños fueron diseñados intencionalmente para adaptarse a viviendas que no requieren grandes áreas de construcción, además de ofrecer una opción más accesible.\n\nCuando se aprueban este tipo de modificaciones, se aplicarán lineamientos arquitectónicos adicionales y, en algunos casos, podrán requerirse ajustes en el diseño de la fachada frontal para mantener la cohesión general y los estándares de diseño del fraccionamiento.",
        },
      },
    ],
  },
  {
    label: { en: "Restrictions", es: "Restricciones" },
    items: [
      {
        question: { en: "What are the restrictions?", es: "¿Cuáles son las restricciones?" },
        answer: {
          en: "Apple Woods is built on the principle that every homeowner benefits from living in a community that values beauty, respect, and pride of ownership. Our community standards are intended to protect the character of the neighborhood, enhance property values, and ensure a cohesive and attractive environment.\n\nThese standards include guidelines for home size, architectural design, landscaping, exterior maintenance, lighting, noise levels, color selections, and the storage of outdoor items. By following these shared standards, homeowners help create a neighborhood that is both visually appealing and enjoyable for everyone who lives here.\n\nPlease feel free to request our complete list of standards or ask any specific questions.",
          es: "Apple Woods se basa en el principio de que todos los propietarios se benefician de vivir en una comunidad que valora la belleza, el respeto y el orgullo de pertenencia. Nuestros estándares comunitarios están diseñados para proteger el carácter del fraccionamiento, fortalecer el valor de las propiedades y asegurar un entorno armónico y visualmente atractivo.\n\nEstos estándares incluyen lineamientos para el tamaño de las viviendas, el diseño arquitectónico, la jardinería, el mantenimiento exterior, la iluminación, los niveles de ruido, la selección de colores y el almacenamiento de objetos en exteriores. Al cumplir con estas normas compartidas, los propietarios contribuyen a crear un fraccionamiento estéticamente agradable y cómodo para todos sus residentes.\n\nNo dude en solicitar la lista completa de estándares o en plantear cualquier duda específica.",
        },
      },
    ],
  },
  {
    label: { en: "Life", es: "Vida" },
    items: [
      faqDocItems.petBags,
      faqDocItems.guests,
      faqDocItems.fruitTrees,
      faqDocItems.exclusive,
      faqDocItems.smartLiving,
      faqDocItems.orchard,
      faqDocItems.securityGuard,
      faqDocItems.noise,
      faqDocItems.reading,
      faqDocItems.outdoorSpaces,
      faqDocItems.trashService,
    ],
  },
];

// --- Footer (ES from doc) ---
clientContent.footer.message = {
  en: "Structured Living in Brownsville, Texas.",
  es: "Vida estructurada en Brownsville, Texas.",
};

export { clientContent };
