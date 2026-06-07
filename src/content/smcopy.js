// SM copy — the CURRENT site strings, moved verbatim from main.jsx.
// This is the "smcopy" content fork. client.js clones this and overrides copy.
// Translatable strings are { en, es } leaves resolved by localize() in content/index.jsx.
// Spanish source: docs/applewoods-spanish-copy-source.md (client Google Doc tab t.7fzpcif20wvo).
// Strategy: use the client's doc Spanish verbatim where it exists; direct-translate the gaps.
// Plain strings (brand, image paths, hrefs, icons, select values, phone/email, copyright) are not translated.
export const smcopyContent = {
  nav: {
    logoAlt: "Apple Woods Smart Living",
    links: [
      { href: "#location", label: { en: "Location", es: "Ubicación" } },
      { href: "#life-inside", label: { en: "Live Here", es: "Vive aquí" } },
      { href: "#different", label: { en: "Community", es: "Comunidad" } },
      { href: "#structured", label: { en: "Amenities", es: "Servicios" } },
    ],
    cta: { en: "Contact us", es: "Contáctanos" },
  },
  hero: {
    tagline: { en: "Life, beautifully organized.", es: "La vida, bellamente organizada." },
    // ES headline is the client's doc copy ("Un lugar más seguro y más inteligente al que
    // llamar hogar"), split across the two display lines. Diverges from EN by design.
    headlineLines: [
      { en: "More Than a Subdivision:", es: "Un lugar más seguro y más inteligente" },
      { en: "A Place to Truly Call Home", es: "al que llamar hogar" },
    ],
    subhead: {
      en: "Apple Woods is a smart residential community designed around security, comfort, beauty, technology, and attainable everyday luxury.",
      es: "Apple Woods es una comunidad inteligente donde la seguridad, el lujo y la tecnología están integrados en la vida cotidiana.",
    },
    actions: {
      explore: { en: "Explore", es: "Explorar" },
      lots: { en: "View Lots", es: "Ver lotes" },
    },
    imageAlt: { en: "Apple Woods entrance at night", es: "Entrada de Apple Woods por la noche" },
  },
  difference: {
    eyebrow: { en: "How Apple Woods is different", es: "En qué se diferencia Apple Woods" },
    heading: {
      en: "Everything that makes a neighborhood feel premium is planned from the start.",
      es: "Todo lo que hace que un vecindario se sienta exclusivo está planificado desde el principio.",
    },
    items: [
      {
        title: { en: "Security built in", es: "Seguridad integrada" },
        body: {
          en: "Controlled access, CCTV monitoring, smart lighting, connected systems, and flood-conscious planning.",
          es: "Acceso controlado, planificación de CCTV, iluminación inteligente y sistemas conectados.",
        },
        image: "/assets/security-built-in-camera.jpg",
      },
      {
        title: { en: "Beauty built in", es: "Belleza integrada" },
        body: {
          en: "Landscaping, architectural standards, curb appeal guidelines, and preserved green areas.",
          es: "Paisajismo mantenido, estándares arquitectónicos y pautas de atractivo exterior.",
        },
        image: "/assets/beauty-built-in-house-closeup.jpg",
      },
      {
        title: { en: "Technology built in", es: "Tecnología integrada" },
        body: {
          en: "Smart lighting, irrigation, access systems, connectivity, and resident communication tools.",
          es: "Iluminación inteligente, sistemas de acceso y herramientas de comunicación para residentes.",
        },
        image: "/assets/technology-built-in-sign.jpg",
      },
      {
        title: { en: "Luxury built in", es: "Lujo integrado" },
        body: {
          en: "Shared amenities and services that add comfort without making every homeowner carry the full cost alone.",
          es: "Servicios y comodidades compartidos que agregan confort sin una carga adicional para el hogar.",
        },
        image: "/assets/luxury-built-in-clubhouse-aerial.jpg",
      },
      {
        // No doc Spanish (doc had only 4 difference cards) — direct translation.
        title: { en: "Wellness built in", es: "Bienestar integrado" },
        body: {
          en: "Blue Zone programs, fitness amenities, and wellness activities support an active mind and body.",
          es: "Los programas Blue Zone, las amenidades de fitness y las actividades de bienestar fomentan una mente y un cuerpo activos.",
        },
        image: "/assets/awclubpool.png",
      },
      {
        // No doc Spanish — direct translation.
        title: { en: "Attainability built in", es: "Accesibilidad integrada" },
        body: {
          en: "Community scale helps share service and amenity costs while keeping dues manageable.",
          es: "La escala de la comunidad ayuda a compartir los costos de servicios y amenidades mientras mantiene las cuotas accesibles.",
        },
        image: "/assets/awfont.png",
      },
    ],
  },
  amenities: {
    // "Affordable Luxury" value section — NEW section, no doc Spanish. Full direct translation.
    titleLines: [
      { en: "Affordable", es: "Lujo" },
      { en: "Luxury", es: "Accesible" },
    ],
    stories: [
      {
        label: { en: "Shared scale", es: "Escala compartida" },
        eyebrow: { en: "01 / shared scale", es: "01 / escala compartida" },
        title: {
          en: "Premium living, shared across the whole community.",
          es: "Vida premium, compartida por toda la comunidad.",
        },
        body: {
          en: "Security, landscaping, amenities, and technology are built and maintained for everyone here, so you get the lifestyle of a high-end neighborhood without carrying the full cost of it on your own.",
          es: "La seguridad, el paisajismo, las amenidades y la tecnología se construyen y se mantienen para todos aquí, así que obtienes el estilo de vida de un vecindario exclusivo sin cargar con todo el costo tú solo.",
        },
        image: "/assets/awclubpool.png",
      },
      {
        label: { en: "Cost clarity", es: "Claridad de costos" },
        eyebrow: { en: "02 / cost clarity", es: "02 / claridad de costos" },
        title: {
          en: "Shared costs keep the dues manageable.",
          es: "Los costos compartidos mantienen las cuotas accesibles.",
        },
        body: {
          en: "Because expenses are shared across the community, dues stay affordable. You pay reduced dues while you own the lot and before you build, and full dues begin only once your home is up.",
          es: "Como los gastos se comparten en toda la comunidad, las cuotas se mantienen accesibles. Pagas cuotas reducidas mientras eres dueño del lote y antes de construir, y las cuotas completas comienzan solo cuando tu casa está terminada.",
        },
        image: "/assets/value-stack-actual-plan.png",
      },
      {
        label: { en: "Attainable luxury", es: "Lujo accesible" },
        eyebrow: { en: "03 / attainable luxury", es: "03 / lujo accesible" },
        title: {
          en: "The quality of a luxury community, from $85,000.",
          es: "La calidad de una comunidad de lujo, desde $85,000.",
        },
        body: {
          en: "Phase 1 homesites start at just $85,000. That price buys you into a fully planned smart community, with all of this built in, not just a piece of land.",
          es: "Los lotes de la Fase 1 comienzan desde solo $85,000. Ese precio te integra a una comunidad inteligente totalmente planificada, con todo esto incluido, no solo un terreno.",
        },
        image: "/assets/luxury-built-in-clubhouse-aerial.jpg",
      },
      {
        label: { en: "Nothing like it here", es: "No hay nada igual aquí" },
        eyebrow: { en: "04 / nothing like it", es: "04 / nada igual" },
        title: {
          en: "There is nothing like this in Brownsville.",
          es: "No hay nada como esto en Brownsville.",
        },
        body: {
          en: "A gated, smart, amenity-rich community planned to this level, at these prices, does not exist anywhere else in the area. Phase 1 is the first and best opportunity to get in.",
          es: "Una comunidad cerrada, inteligente y llena de amenidades, planificada a este nivel y a estos precios, no existe en ningún otro lugar de la zona. La Fase 1 es la primera y mejor oportunidad para entrar.",
        },
        image: "/assets/locationsaw.png",
      },
    ],
  },
  lifeInside: {
    eyebrow: { en: "Life Inside Apple Woods", es: "La vida dentro de Apple Woods" },
    heading: {
      en: "The comfort of a private community, built into everyday life.",
      es: "El confort de una comunidad privada, integrada en la vida cotidiana.",
    },
    body: {
      en: "From the clubhouse and fitness center to the pool, landscaping, lighting, and shared services, Apple Woods is designed to make daily life feel easier, more comfortable, and more refined.",
      es: "Desde la casa club y el gimnasio hasta la piscina, el paisajismo, la iluminación y los servicios compartidos, Apple Woods está diseñado para que la vida diaria se sienta más fácil, limpia y elevada.",
    },
    items: [
      {
        term: { en: "Clubhouse", es: "Casa club" },
        detail: {
          en: "A central place for residents to gather and use shared spaces.",
          es: "Un lugar central para que los residentes se reúnan y utilicen espacios compartidos.",
        },
      },
      {
        term: { en: "Gym", es: "Gimnasio" },
        detail: {
          en: "Fitness access inside the community, without leaving the neighborhood.",
          es: "Acceso a fitness dentro de la comunidad, sin salir del vecindario.",
        },
      },
      {
        term: { en: "Pool", es: "Piscina" },
        detail: {
          en: "A shared outdoor amenity for family time, relaxation, and weekend use.",
          es: "Un servicio compartido al aire libre para tiempo en familia, relajación y uso los fines de semana.",
        },
      },
      {
        term: { en: "Maintained surroundings", es: "Entorno mantenido" },
        detail: {
          en: "Landscaping, lighting, and standards that help the community stay beautiful.",
          es: "Paisajismo, iluminación y estándares que ayudan a que la comunidad se mantenga bella.",
        },
      },
    ],
    imageAlt: {
      en: "Apple Woods clubhouse exterior render",
      es: "Representación exterior de la casa club de Apple Woods",
    },
  },
  phaseOne: {
    eyebrow: { en: "Phase 1 Homesites", es: "Lotes de la Fase 1" },
    heading: {
      en: "The first opportunity to own in Apple Woods.",
      es: "La primera oportunidad de ser propietario en Apple Woods.",
    },
    body: {
      en: "Phase 1 is the first release inside Apple Woods and gives early buyers a strong opportunity to secure a homesite at introductory pricing.",
      es: "La Fase 1 es el primer lanzamiento dentro de la comunidad de Apple Woods y se espera que sea el punto de entrada con el precio más bajo. Revisa la disponibilidad, compara los tipos de lotes y confirma los precios actuales antes de que los lotes preferidos pasen a estar reservados, bajo contrato o vendidos.",
    },
    lots: [
      {
        // ES name from doc ("Lotes estándar") — diverges from EN "Classic Homesites".
        name: { en: "Classic Homesites", es: "Lotes estándar" },
        price: { en: "Expected from $85,000", es: "Se esperan desde $85,000" },
        body: {
          en: "An attractive introductory opportunity to join the Apple Woods community, with Phase 1 homesites offered at early-release pricing designed to provide exceptional value within a thoughtfully planned neighborhood.",
          es: "Un fuerte punto de entrada a la comunidad de Apple Woods.",
        },
      },
      {
        name: { en: "Premier Homesites", es: "Lotes prémium" },
        price: { en: "Expected from $95,000", es: "Se esperan desde $95,000" },
        body: {
          en: "A limited collection near the planned clubhouse, river walk, natural water elements, landscaping, and resort-style pool area.",
          es: "Terrenos seleccionados cerca del área planificada de la casa club.",
        },
      },
      {
        name: { en: "Corner Homesites", es: "Lotes en esquina" },
        price: { en: "Priced individually", es: "Precio individual" },
        body: {
          en: "Larger or irregular homesites priced by size and location.",
          es: "Lotes más grandes o irregulares con precio según el tamaño y la ubicación.",
        },
      },
    ],
    phaseNote: {
      en: "Lot status can change quickly once buyers begin confirming selections. As availability decreases, future pricing may increase.",
      es: "El estado de los lotes puede cambiar rápidamente una vez que los compradores comienzan a confirmar las selecciones. A medida que la disponibilidad disminuya, los precios futuros podrían aumentar.",
    },
    priceSheet: {
      // No doc Spanish — direct translation.
      eyebrow: { en: "Current Price Sheet", es: "Lista de precios actual" },
      heading: { en: "Developer's introductory offer", es: "Oferta introductoria del desarrollador" },
      body: {
        en: "Review the latest Phase 1 homesite list, suggested retail pricing, and introductory offer pricing.",
        es: "Revisa la lista más reciente de lotes de la Fase 1, los precios de venta sugeridos y los precios de la oferta introductoria.",
      },
    },
    mapAlt: {
      en: "Apple Woods Phase 1 sold lot map",
      es: "Mapa de lotes vendidos de la Fase 1 de Apple Woods",
    },
    masterplanHint: { en: "Tap to explore the lot map", es: "Toca para explorar el mapa de lotes" },
    priceSheetHint: { en: "Tap to view the price sheet", es: "Toca para ver la lista de precios" },
    pricePreviewAlt: {
      en: "Apple Woods Phase 1 developer introductory offer price sheet preview",
      es: "Vista previa de la lista de precios de la oferta introductoria del desarrollador de la Fase 1 de Apple Woods",
    },
  },
  location: {
    eyebrow: { en: "Location", es: "Ubicación" },
    heading: {
      en: "A private community with fast access to where Brownsville is growing.",
      es: "Una comunidad privada con acceso rápido a donde Brownsville está creciendo.",
    },
    body: {
      en: "Apple Woods combines everyday convenience with regional access to major highways, Rancho Viejo, the Port of Brownsville, South Padre Island, and key commercial areas.",
      es: "Apple Woods ofrece a los residentes acceso a elementos esenciales diarios, carreteras clave, Rancho Viejo y el corredor de crecimiento portuario desde una comunidad diseñada para sentirse protegida, moderna y diferenciada.",
    },
    imageAlt: { en: "Apple Woods location context", es: "Contexto de ubicación de Apple Woods" },
  },
  contact: {
    heading: {
      // No doc Spanish for the inquiry heading block — direct translation.
      eyebrow: { en: "3.0 Inquiry", es: "3.0 Consulta" },
      title: { en: "Tell us what you are thinking.", es: "Cuéntanos qué estás pensando." },
      body: {
        en: "Share as much or as little as you want. A few details help us point you toward the right next step.",
        es: "Comparte tanto o tan poco como quieras. Unos pocos detalles nos ayudan a orientarte hacia el siguiente paso adecuado.",
      },
    },
    direct: {
      eyebrow: { en: "Direct contact", es: "Contacto directo" },
      heading: { en: "Rather talk it through?", es: "¿Prefieres hablarlo?" },
      body: {
        en: "Call or message if that is easier. The form is here to start the conversation, not make you do homework.",
        es: "Llama o escribe si es más fácil. El formulario está aquí para iniciar la conversación, no para hacerte tarea.",
      },
      links: [
        {
          label: { en: "Call sales", es: "Llamar a ventas" },
          detail: "956-455-9555",
          href: "tel:+19564559555",
          icon: "phone",
        },
        {
          label: { en: "Email", es: "Correo electrónico" },
          detail: "info@applewoods.us",
          href: "mailto:alfonso@park-street.us",
          icon: "mail",
        },
        {
          label: { en: "WhatsApp", es: "WhatsApp" },
          detail: "956-455-9555",
          href: "https://wa.me/19564559555",
          icon: "message",
        },
      ],
      nextLabel: { en: "What happens next", es: "Qué sigue" },
      nextBody: {
        en: "We confirm current Phase 1 availability, answer first questions, and help you understand which lots fit what you are considering.",
        es: "Confirmamos la disponibilidad actual de la Fase 1, respondemos las primeras preguntas y te ayudamos a entender qué lotes se ajustan a lo que estás considerando.",
      },
    },
    form: {
      eyebrow: { en: "Quick note", es: "Nota rápida" },
      title: { en: "What would make this useful for you?", es: "¿Qué haría esto útil para ti?" },
      body: {
        en: "Only a phone or email is needed so we can reply. Everything else is optional context.",
        es: "Solo se necesita un teléfono o correo electrónico para poder responderte. Todo lo demás es contexto opcional.",
      },
      labels: {
        name: { en: "Name", es: "Nombre" },
        phone: { en: "Phone", es: "Teléfono" },
        email: { en: "Email", es: "Correo electrónico" },
        notes: { en: "Questions or comments", es: "Preguntas o comentarios" },
        lotType: { en: "Lot type", es: "Tipo de lote" },
        budget: { en: "Budget", es: "Presupuesto" },
        timing: { en: "Timing", es: "Plazo" },
        interest: { en: "What are you interested in?", es: "¿Qué te interesa?" },
      },
      placeholders: {
        name: { en: "Your name", es: "Tu nombre" },
        phone: { en: "Phone number", es: "Número de teléfono" },
        email: { en: "Email address", es: "Correo electrónico" },
        notes: {
          en: "Tell us what you are considering. Share as much or as little as you want.",
          es: "Cuéntanos qué estás considerando. Comparte tanto o tan poco como quieras.",
        },
      },
      selects: {
        lotInterest: [
          { value: "not-sure", label: { en: "Not sure yet", es: "Aún no estoy seguro" } },
          { value: "standard", label: { en: "Standard lot", es: "Lote estándar" } },
          { value: "premier", label: { en: "Premier lot", es: "Lote prémium" } },
          { value: "corner", label: { en: "Corner lot", es: "Lote en esquina" } },
        ],
        budget: [
          { value: "not-sure", label: { en: "Not sure yet", es: "Aún no estoy seguro" } },
          { value: "85-95", label: { en: "$85k to $95k", es: "$85k a $95k" } },
          { value: "95-plus", label: { en: "$95k+", es: "$95k+" } },
          { value: "depends", label: { en: "Depends on lot", es: "Depende del lote" } },
        ],
        timeline: [
          { value: "not-sure", label: { en: "Not sure yet", es: "Aún no estoy seguro" } },
          { value: "now", label: { en: "Ready now", es: "Listo ahora" } },
          { value: "soon", label: { en: "Next 30 days", es: "Próximos 30 días" } },
          { value: "later", label: { en: "Planning ahead", es: "Planeando a futuro" } },
        ],
      },
      interestOptions: [
        { value: "availability", label: { en: "Check availability", es: "Consultar disponibilidad" } },
        { value: "buy", label: { en: "Buy a lot", es: "Comprar un lote" } },
        { value: "build", label: { en: "Build a home", es: "Construir una casa" } },
      ],
      submit: { en: "Send inquiry", es: "Enviar consulta" },
      submitSending: { en: "Sending...", es: "Enviando..." },
      submitSent: { en: "Sent", es: "Enviado" },
      successMessage: {
        en: "Sent. We have enough to start the conversation.",
        es: "Enviado. Tenemos lo necesario para iniciar la conversación.",
      },
      errorMessage: {
        en: "Something did not send. Please call, text, email, or WhatsApp and we can take it from there.",
        es: "Algo no se envió. Llama, envía un mensaje, escribe un correo o usa WhatsApp y seguimos desde ahí.",
      },
      errors: {
        contact: {
          en: "Add a phone or email so we can reply.",
          es: "Agrega un teléfono o correo electrónico para poder responderte.",
        },
        email: {
          en: "Use a valid email, or leave it blank and add a phone.",
          es: "Usa un correo electrónico válido, o déjalo en blanco y agrega un teléfono.",
        },
      },
      requiredHint: {
        en: "Only a phone or email is needed. Everything else can stay blank.",
        es: "Solo se necesita un teléfono o correo electrónico. Todo lo demás puede quedar en blanco.",
      },
    },
    faq: {
      eyebrow: {
        en: "Before Phase 1 availability changes",
        es: "Antes de que cambie la disponibilidad de la Fase 1",
      },
      heading: { en: "Confirm the details that matter.", es: "Confirma los detalles que importan." },
      items: [
        {
          question: {
            en: "I hear I can find cheaper lots elsewhere. Why Apple Woods?",
            es: "Escuché que puedo encontrar lotes más baratos en otro lugar. ¿Por qué Apple Woods?",
          },
          answer: {
            en: "Some lots may cost less, but Apple Woods offers more than land: standards, landscaping, technology, amenities, security, services, and long-term planning that help protect the neighborhood experience.",
            es: "Algunos lotes pueden costar menos, pero Apple Woods ofrece más que un terreno: estándares, paisajismo, tecnología, amenidades, seguridad, servicios y planificación a largo plazo que ayudan a proteger la experiencia del vecindario.",
          },
        },
        {
          question: { en: "Which homesites are still available?", es: "¿Qué lotes siguen disponibles?" },
          answer: {
            en: "Availability changes quickly. Some homesites may be pending but not fully secured until deposit is received, so buyers should confirm current status with the sales team.",
            es: "La disponibilidad puede cambiar rápidamente a medida que los compradores reservan o pasan a estar bajo contrato. Confirma el estado actual con el equipo de ventas.",
          },
        },
        {
          question: { en: "Will prices stay the same?", es: "¿Se mantendrán los precios?" },
          answer: {
            en: "Phase 1 is expected to offer the strongest introductory pricing. As inventory becomes more limited, later pricing is expected to increase.",
            es: "Se espera que la Fase 1 sea el punto de entrada con el precio más bajo. A medida que la disponibilidad disminuya, los precios futuros podrían aumentar.",
          },
        },
        {
          question: { en: "Can I design my own home?", es: "¿Puedo diseñar mi propia casa?" },
          answer: {
            en: "Yes. Homeowners can design custom homes, subject to architectural review, so each home supports the community's standards and long-term curb appeal.",
            es: "Sí. Las casas pasan por una revisión arquitectónica para proteger el atractivo exterior y los estándares de la comunidad.",
          },
        },
        {
          question: { en: "Are the dues expensive?", es: "¿Las cuotas son caras?" },
          answer: {
            en: "No. Shared community costs help keep dues manageable while supporting landscaping, services, amenities, and neighborhood quality.",
            es: "No. Los costos compartidos de la comunidad ayudan a mantener las cuotas accesibles mientras respaldan el paisajismo, los servicios, las amenidades y la calidad del vecindario.",
          },
        },
        {
          question: { en: "Are dues mandatory?", es: "¿Las cuotas son obligatorias?" },
          answer: {
            en: "Yes. Core dues are required for all homeowners and help maintain shared services, appearance, and community quality. Optional services are paid only by residents who choose them.",
            es: "Sí. Las cuotas básicas son obligatorias para todos los propietarios y ayudan a mantener los servicios compartidos, la apariencia y la calidad de la comunidad. Los servicios opcionales los pagan solo los residentes que los eligen.",
          },
        },
        {
          question: {
            en: "Am I responsible for all dues when I purchase?",
            es: "¿Soy responsable de todas las cuotas al comprar?",
          },
          answer: {
            en: "No. A reduced dues structure applies during lot ownership before construction, covering basic maintenance and essential services. Full dues begin after the home is built.",
            es: "No. Durante la propiedad del lote, antes de construir, aplica una estructura de cuotas reducida que cubre el mantenimiento básico y los servicios esenciales. Las cuotas completas comienzan después de construir la casa.",
          },
        },
        {
          question: { en: "Do I have to build a huge home?", es: "¿Tengo que construir una casa enorme?" },
          answer: {
            en: "No. Apple Woods focuses on design, curb appeal, and standards rather than oversized homes. The minimum covered area is 2,000 sq. ft.",
            es: "No. Apple Woods se enfoca en el diseño, el atractivo exterior y los estándares, no en casas de gran tamaño. El área cubierta mínima es de 2,000 pies cuadrados.",
          },
        },
        {
          question: {
            en: "If I build an expensive home, will less expensive homes affect my value?",
            es: "Si construyo una casa costosa, ¿las casas menos costosas afectarán su valor?",
          },
          answer: {
            en: "No. Homes can vary in size and budget, but architectural and landscaping standards protect curb appeal, consistency, and long-term community value.",
            es: "No. Las casas pueden variar en tamaño y presupuesto, pero los estándares arquitectónicos y de paisajismo protegen el atractivo exterior, la consistencia y el valor de la comunidad a largo plazo.",
          },
        },
        {
          question: { en: "What are the restrictions?", es: "¿Cuáles son las restricciones?" },
          answer: {
            en: "Community standards cover home size, architecture, landscaping, maintenance, lighting, noise, colors, and outdoor storage to protect the community's appearance and quality of life.",
            es: "Los estándares de la comunidad cubren el tamaño de la casa, la arquitectura, el paisajismo, el mantenimiento, la iluminación, el ruido, los colores y el almacenamiento exterior para proteger la apariencia y la calidad de vida de la comunidad.",
          },
        },
        {
          question: { en: "How big are the homesites?", es: "¿De qué tamaño son los lotes?" },
          answer: {
            en: "Most homesites are about 6,000 sq. ft., typically 60 ft. wide by 100 ft. deep, with standard setbacks of 25 ft. front, 5 ft. sides, and 10 ft. rear.",
            es: "La mayoría de los lotes miden aproximadamente 6,000 pies cuadrados, normalmente 60 pies de ancho por 100 pies de profundidad, con retiros estándar de 25 pies al frente, 5 pies a los lados y 10 pies atrás.",
          },
        },
        {
          question: {
            en: "Are 6,000 sq. ft. homesites too small?",
            es: "¿Los lotes de 6,000 pies cuadrados son demasiado pequeños?",
          },
          answer: {
            en: "Not necessarily. Apple Woods pairs efficient homesites with shared amenities, green areas, pool, fitness, and gathering spaces, so owners can invest in the home while the community provides more of the lifestyle.",
            es: "No necesariamente. Apple Woods combina lotes eficientes con amenidades compartidas, áreas verdes, piscina, fitness y espacios de reunión, para que los propietarios inviertan en la casa mientras la comunidad aporta más estilo de vida.",
          },
        },
        {
          question: { en: "Can I build on two lots?", es: "¿Puedo construir en dos lotes?" },
          answer: {
            en: "Combining lots may be permitted in select cases. If approved, added architectural and entrance-design guidelines may apply.",
            es: "Combinar lotes puede permitirse en casos selectos. Si se aprueba, pueden aplicar lineamientos adicionales de arquitectura y diseño de entrada.",
          },
        },
      ],
    },
  },
  footer: {
    message: {
      en: "Apple Woods is designed for a calmer way to live in Brownsville: organized, secure, beautiful, and built around everyday comfort.",
      es: "Apple Woods está diseñado para una forma más tranquila de vivir en Brownsville: organizada, segura, hermosa y construida en torno al confort cotidiano.",
    },
    facebookLabel: { en: "Apple Woods on Facebook", es: "Apple Woods en Facebook" },
    info: [
      "Brownsville, Texas",
      { en: "Phase 1 Homesites", es: "Lotes de la Fase 1" },
      { en: "Private Smart Living Community", es: "Comunidad privada de vida inteligente" },
    ],
    nav: [
      { href: "#location", label: { en: "Location", es: "Ubicación" } },
      { href: "#life-inside", label: { en: "Live Here", es: "Vive aquí" } },
      { href: "#different", label: { en: "Community", es: "Comunidad" } },
      { href: "#structured", label: { en: "Amenities", es: "Servicios" } },
      { href: "#contact", label: { en: "Contact Us", es: "Contáctanos" } },
    ],
    copyright: "Copyright © Apple Woods 2026",
    backToTop: { en: "Back to top", es: "Volver arriba" },
  },
};
