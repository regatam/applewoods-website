// SM copy — the CURRENT site strings, moved verbatim from main.jsx.
// This is the "smcopy" content fork. client.js clones this and overrides copy.
// Translatable strings are { en, es } leaves resolved by localize() in content/index.jsx.
// Spanish source: docs/applewoods-spanish-copy-source.md (client Google Doc tab t.7fzpcif20wvo).
// Strategy: use the client's doc Spanish verbatim where it exists; direct-translate the gaps.
// Plain strings (brand, image paths, hrefs, icons, select values, phone/email, copyright) are not translated.

// FAQ entries introduced in the client's 2026-06 copy doc. These have no smcopy-optimized
// variant — both versions use the client's copy verbatim, so they are shared here and
// referenced by both content files. Paragraph breaks are encoded as \n\n (rendered as <p>s).
export const faqDocItems = {
  fillDirt: {
    question: {
      en: "Lots seem low and flood prone, do I have to add fill dirt?",
      es: "Los terrenos parecen bajos y propensos a inundaciones, ¿tengo que agregar relleno?",
    },
    answer: {
      en: "No. Apple Woods is not located in a flood-risk area, and the lots were carefully engineered as part of the community's drainage and safety design.\n\nAs an added precaution, the streets throughout Apple Woods were elevated substantially to provide an extra layer of flood protection during severe or unpredictable weather events. This thoughtful planning helps improve water management and gives homeowners greater peace of mind during heavy rains.\n\nAs part of the home construction process, homeowners will add the appropriate fill dirt and grading required for their individual home site.",
      es: "No. Apple Woods no se encuentra ubicado en una zona de riesgo de inundación, y los terrenos fueron cuidadosamente diseñados como parte del sistema general de drenaje y seguridad de la comunidad.\n\nComo medida adicional de protección, las calles dentro de Apple Woods fueron elevadas sustancialmente para proporcionar una capa extra de seguridad durante eventos climáticos severos o impredecibles. Esta planificación ayuda a mejorar el manejo pluvial y brinda mayor tranquilidad a los propietarios durante temporadas de lluvias intensas.\n\nComo parte del proceso de construcción de la vivienda, cada propietario agregará el relleno y nivelación necesarios de acuerdo con las características específicas de su terreno y diseño residencial.",
    },
  },
  traditional: {
    question: {
      // No doc Spanish for this question — natural-local translation.
      en: "What makes Apple Woods different from a traditional subdivision?",
      es: "¿Qué hace diferente a Apple Woods de un fraccionamiento tradicional?",
    },
    answer: {
      en: "Apple Woods is more than a collection of homes and lots — it is a lifestyle-driven community designed around smart living, wellness, connectivity, and a strong sense of belonging.\n\nDeveloped by PARK STREET, Apple Woods was created as an innovative residential concept that combines thoughtful planning, green spaces, technology, and shared amenities to simplify daily life and enhance both physical and mental well-being. The community is designed to encourage interaction, outdoor activity, and meaningful connections among neighbors and families.\n\nBy leveraging smart design, economies of scale, and structured community planning, Apple Woods offers residents access to attractive common areas, recreational spaces, and lifestyle-enhancing services in a way that is both efficient and sustainable.\n\nPlanned in phases, Apple Woods represents an ambitious vision for the future of residential living in Brownsville — a community designed not only for where people live, but for how they live.",
      es: "Apple Woods es mucho más que una colección de casas y terrenos; es una comunidad orientada al estilo de vida, diseñada alrededor de la vida inteligente, el bienestar, la conectividad y un fuerte sentido de pertenencia.\n\nDesarrollado por PARK STREET, Apple Woods fue creado como un concepto residencial innovador que combina planeación cuidadosa, áreas verdes, tecnología y amenidades compartidas para simplificar la vida diaria y mejorar tanto el bienestar físico como mental. La comunidad está diseñada para fomentar la convivencia, la actividad al aire libre y las conexiones significativas entre vecinos y familias.\n\nA través de un diseño inteligente, economías de escala y una planeación comunitaria estructurada, Apple Woods ofrece a sus residentes acceso a atractivas áreas comunes, espacios recreativos y servicios que enriquecen el estilo de vida de manera eficiente y sostenible.\n\nDesarrollado por etapas, Apple Woods representa una visión ambiciosa para el futuro de la vida residencial en Brownsville: una comunidad diseñada no solo para el lugar donde las personas viven, sino para la manera en que viven.",
    },
  },
  fountainsTech: {
    question: {
      en: "Why don't other communities offer the same level of fountains, technology, and integrated features as Apple Woods?",
      es: "¿Por qué otras comunidades no ofrecen el mismo nivel de fuentes, tecnología y características integradas que Apple Woods?",
    },
    answer: {
      en: "Apple Woods is unique because it was created by PARK STREET — a company with decades of experience in technology, hospitality, and real estate development. Since 1993, PARK STREET has developed technology solutions for the hospitality industry, including designing, engineering, manufacturing, and programming many of its own systems and equipment in-house.\n\nSince 2014, the company has also expanded into real estate, focusing on creating clean, well-maintained housing communities with long-term vision and efficiency in mind.\n\nApple Woods represents the merging of all that experience into one signature project. Because PARK STREET conceptualizes, designs, builds, programs, and maintains much of the technology internally — without relying heavily on third-party vendors or middlemen — the community can offer advanced features, beautiful water elements, and smart infrastructure at a level of quality and affordability that is difficult for traditional developments to match.\n\nThe result is a community designed not only to look impressive, but to function efficiently, remain maintainable long-term, and create a lasting sense of beauty, innovation, and pride for residents.",
      es: "Apple Woods es único porque fue creado por PARK STREET, una empresa con décadas de experiencia en tecnología, hospitalidad y desarrollo inmobiliario. Desde 1993, PARK STREET ha desarrollado soluciones tecnológicas para la industria hotelera, incluyendo el diseño, ingeniería, fabricación y programación interna de muchos de sus propios sistemas y equipos.\n\nDesde 2014, la empresa también se ha expandido al sector inmobiliario, enfocándose en crear comunidades residenciales limpias, bien mantenidas y desarrolladas con una visión de largo plazo y eficiencia.\n\nApple Woods representa la integración de toda esa experiencia en un proyecto distintivo. Debido a que PARK STREET conceptualiza, diseña, construye, programa y mantiene internamente gran parte de la tecnología — sin depender excesivamente de terceros o intermediarios — la comunidad puede ofrecer funciones avanzadas, hermosos elementos acuáticos e infraestructura inteligente con un nivel de calidad y accesibilidad difícil de igualar en desarrollos tradicionales.\n\nEl resultado es una comunidad diseñada no solo para verse impresionante, sino también para funcionar eficientemente, mantenerse de forma sostenible a largo plazo y crear un sentido duradero de belleza, innovación y orgullo para sus residentes.",
    },
  },
  cic: {
    question: {
      en: "After purchasing my lot, are there additional costs besides fill dirt?",
      es: "Después de comprar el terreno, ¿habrá costos adicionales más allá del relleno?",
    },
    answer: {
      en: "Yes. Apple Woods requires a Community Integration Cost (CIC) fee, designed to help each home blend harmoniously with the overall beauty, quality, and functionality of the community.\n\nRather than being an additional expense, the CIC represents an investment in features that, in many cases, homeowners would likely pay for individually anyway. The difference is that Apple Woods coordinates and standardizes these improvements to ensure consistency, quality, and a cohesive appearance throughout the entire community.\n\nThese improvements include items such as community connectivity, standardized fencing and mailboxes, quality grass installation, irrigation assurance, decorative sidewalk finishes, and other features intended to preserve the appearance, functionality, and long-term value of Apple Woods.",
      es: "Sí. Apple Woods requiere una cuota de Integración Comunitaria (CIC), diseñada para ayudar a que cada vivienda se integre armoniosamente con la belleza, calidad y funcionalidad general del fraccionamiento.\n\nMás que un gasto adicional, la cuota CIC representa una inversión en elementos que, en muchos casos, los propietarios tendrían que realizar individualmente de cualquier manera. La diferencia es que Apple Woods coordina y estandariza estas mejoras para asegurar uniformidad, calidad y una apariencia armónica en toda la comunidad.\n\nEstas mejoras incluyen elementos como conectividad comunitaria, bardas y buzones estandarizados, instalación de césped de calidad, aseguramiento de riego, acabados decorativos en banquetas y otras características destinadas a preservar la imagen, funcionalidad y valor a largo plazo de Apple Woods.",
    },
  },
  saveMoney: {
    question: {
      en: "Why can living in Apple Woods help save money compared to living elsewhere?",
      es: "¿Por qué vivir en Apple Woods podría ayudarme a ahorrar dinero comparado con otros lugares?",
    },
    answer: {
      en: "In Brownsville, property taxes are largely influenced by the size which determines the value of your home. At Apple Woods, homeowners can focus their budget on the spaces and features their family truly needs, without carrying the added construction, maintenance, and tax burden of oversized private amenities such as game rooms, home theaters, pools, or large gyms.\n\nInstead, Apple Woods is designed around thoughtfully planned community gathering areas and shared amenities that provide residents with access to more activities and experiences — while helping reduce individual ownership and upkeep costs. The result is a smarter, more efficient lifestyle that can help homeowners save on construction, maintenance, utilities, and long-term property taxes.",
      es: "En Brownsville, los impuestos sobre la propiedad están influenciados en gran medida por el tamaño con lo que determinan el valor de la propiedad. En Apple Woods, los propietarios pueden enfocar su presupuesto en los espacios y características que realmente necesita su familia, sin asumir la carga adicional de construcción, mantenimiento e impuestos que suelen implicar amenidades privadas de gran tamaño, como salas de juegos, cines en casa, albercas o gimnasios amplios.\n\nEn lugar de ello, Apple Woods ha sido diseñado alrededor de áreas comunitarias de convivencia y amenidades compartidas cuidadosamente planificadas, que brindan a los residentes acceso a más actividades y experiencias, al mismo tiempo que ayudan a reducir los costos individuales de propiedad y mantenimiento.\n\nEl resultado es un estilo de vida más inteligente y eficiente, que puede ayudar a los propietarios a ahorrar en construcción, mantenimiento, servicios y costos fiscales a largo plazo.",
    },
  },
  propertyValue: {
    question: {
      // No doc Spanish for this question — natural-local translation.
      en: "How does Apple Woods help protect my property value and long-term investment?",
      es: "¿Cómo ayuda Apple Woods a proteger el valor de mi propiedad y mi inversión a largo plazo?",
    },
    answer: {
      en: "Apple Woods is designed around the principles of safety, organization, and long-term community planning. Through maintained common areas, thoughtful community standards, controlled access, lighting, technology, and neighborhood oversight, the community creates an environment that promotes stability, pride of ownership, and lasting appeal.\n\nA clean, secure, and well-structured neighborhood not only provides peace of mind for residents, but also helps protect the beauty, desirability, and long-term value of every home within Apple Woods.",
      es: "Apple Woods está diseñado bajo los principios de seguridad, organización y planeación comunitaria a largo plazo. A través de áreas comunes cuidadosamente mantenidas, lineamientos comunitarios bien definidos, accesos controlados, iluminación, tecnología y supervisión del fraccionamiento, la comunidad crea un entorno que promueve estabilidad, orgullo de pertenencia y atractivo duradero.\n\nUn fraccionamiento limpio, seguro y bien estructurado no solo brinda tranquilidad a sus residentes, sino que también ayuda a proteger la belleza, el atractivo y el valor a largo plazo de cada vivienda dentro de Apple Woods.",
    },
  },
  petBags: {
    question: {
      en: "Will there be petbags available for homeowners?",
      es: "¿Habrá bolsas para deshechos de mascotas disponibles para los propietarios?",
    },
    answer: {
      en: "Yes. Trash bins and pet waste bag stations will be placed throughout the subdivision, including at key corners and common areas. The cost for these amenities will be shared only among pet owners and will not affect homeowners without pets.\n\nTo help maintain the beauty, cleanliness, and landscaping of Apple Woods, pet owners will be required to clean up after their pets at all times.",
      es: "Sí. Habrá estaciones con botes de basura y bolsas para desechos de mascotas distribuidas estratégicamente a lo largo del fraccionamiento, incluyendo esquinas principales y áreas comunes. El costo de estas amenidades será compartido únicamente entre los propietarios con mascotas y no afectará a los residentes que no tengan mascotas.\n\nPara ayudar a mantener la belleza, la limpieza y la jardinería de Apple Woods, los propietarios de mascotas deberán recoger y desechar adecuadamente los residuos de sus mascotas en todo momento.",
    },
  },
  guests: {
    question: {
      en: "Will I be able to bring friends and family members to the clubhouse or other activities?",
      es: "¿Tendré la oportunidad de invitar a amigos y familiares a la casa club u otras actividades?",
    },
    answer: {
      en: "Yes. Apple Woods will offer reasonable flexibility for homeowners to invite friends and family members to enjoy certain clubhouse amenities through guest access and visitor passes, depending on the specific facilities and usage policies.\n\nUse of common areas and amenities will always be subject to availability, scheduling, and community guidelines. To ensure residents enjoy full access to their neighborhood amenities, Apple Woods homeowners will always receive priority use of the facilities.",
      es: "Sí. Apple Woods ofrecerá una flexibilidad razonable para que los propietarios puedan invitar a amigos y familiares a disfrutar de ciertas amenidades de la casa club mediante accesos para invitados y pases de visitante, dependiendo de las instalaciones específicas y las políticas de uso aplicables.\n\nEl uso de las áreas comunes y amenidades estará siempre sujeto a disponibilidad, programación y lineamientos comunitarios. Para garantizar que los residentes disfruten plenamente de las amenidades del fraccionamiento, los propietarios de Apple Woods siempre tendrán prioridad en el uso de las instalaciones.",
    },
  },
  fruitTrees: {
    question: {
      en: "Can anyone enter my yard and pick fruit from my tree?",
      es: "¿Cualquiera puede meterse a mi jardín y tomar frutos de mi árbol?",
    },
    answer: {
      en: "No. Each fruit tree belongs to the homeowner and remains part of their private property. The orchard-style design at Apple Woods is intended to create a greener, healthier, and more sustainable community while helping reduce our environmental footprint.\n\nAll trees will be professionally maintained and regularly harvested to keep the community clean, beautiful, and enjoyable year-round. Fresh fruit may also be incorporated into complimentary morning fruit salads and select community desserts for homeowners — turning the orchard experience into a shared lifestyle benefit for the entire neighborhood.",
      es: "No. Cada árbol frutal pertenece al propietario y forma parte de su propiedad privada. El diseño estilo huerto de Apple Woods tiene como propósito crear una comunidad más verde, saludable y sostenible, al mismo tiempo que ayuda a reducir el impacto ambiental.\n\nTodos los árboles recibirán mantenimiento profesional y serán cosechados regularmente para mantener el fraccionamiento limpio, hermoso y agradable durante todo el año. La fruta fresca también podrá incorporarse en ensaladas matutinas de cortesía y en ciertos postres comunitarios para los propietarios, convirtiendo la experiencia del huerto en un beneficio compartido para toda la comunidad.",
    },
  },
  exclusive: {
    question: {
      en: "Why is Apple Woods considered an exclusive community?",
      es: "¿Por qué se considera a Apple Woods como una comunidad exclusiva?",
    },
    answer: {
      en: "Apple Woods is designed for homeowners who value a clean, healthy, and beautifully maintained environment. Exclusivity at Apple Woods is not about limiting people — it is about creating a community of like-minded residents who share pride in where they live and appreciate high standards of appearance, care, and quality of life.\n\nCommunity guidelines help preserve the neighborhood's beauty by encouraging well-maintained homes, landscaped lawns, organized outdoor spaces, and a welcoming atmosphere for everyone. The result is a peaceful, attractive, and harmonious community where residents can enjoy long-term value, comfort, and pride of ownership.",
      es: "Apple Woods está diseñado para propietarios que valoran un entorno limpio, saludable y bellamente mantenido. La exclusividad en Apple Woods no se trata de limitar a las personas, sino de crear una comunidad de residentes con valores similares, que comparten orgullo por el lugar donde viven y aprecian altos estándares de imagen, cuidado y calidad de vida.\n\nLos lineamientos comunitarios ayudan a preservar la belleza del fraccionamiento al fomentar viviendas bien mantenidas, jardines cuidados, espacios exteriores organizados y un ambiente agradable para todos. El resultado es una comunidad tranquila, atractiva y armónica, donde los residentes pueden disfrutar de valor a largo plazo, comodidad y orgullo de pertenencia.",
    },
  },
  smartLiving: {
    question: {
      en: "What do you mean by “Smart Living” or “Structured Living” at Apple Woods?",
      es: "¿Qué significa “Vivir inteligente” o de forma “estructurada”?",
    },
    answer: {
      en: "At Apple Woods, “Smart Living” and “Structured Living” represent a thoughtful approach to community design — one where beauty, comfort, convenience, and peace of mind are achieved through planning, organization, and shared vision.\n\nWe believe luxury does not have to mean excess or unnecessary expense. By working together as a community with common goals, residents can enjoy access to attractive amenities, beautiful surroundings, recreational spaces, environmental features, and a higher quality lifestyle in a more efficient and affordable way.\n\nStructured living means maintaining standards that protect the appearance, value, and harmony of the neighborhood. Smart living means creating a community where thoughtful design, shared resources, sustainability, and long-term planning allow homeowners to enjoy more while carrying less individual burden.\n\nThe result is a cleaner, safer, more connected, and more enjoyable place to live — designed for people who value both quality of life and smart investment.",
      es: "En Apple Woods, “Vida Inteligente” y “Vida Estructurada” representan una visión cuidadosamente pensada sobre cómo debe diseñarse una comunidad: un lugar donde la belleza, la comodidad, la conveniencia y la tranquilidad se logran a través de la planeación, la organización y una visión compartida.\n\nCreemos que el lujo no tiene que significar excesos ni gastos innecesarios. Al trabajar juntos como comunidad con objetivos en común, los residentes pueden disfrutar de amenidades atractivas, hermosos espacios exteriores, áreas recreativas, elementos naturales y una mejor calidad de vida de una manera más eficiente y accesible.\n\nLa vida estructurada significa mantener estándares que protejan la imagen, el valor y la armonía del fraccionamiento. La vida inteligente significa crear una comunidad donde el diseño cuidadoso, los recursos compartidos, la sostenibilidad y la planeación a largo plazo permitan a los propietarios disfrutar de más beneficios, mientras reducen cargas individuales innecesarias.\n\nEl resultado es un lugar más limpio, seguro, conectado y agradable para vivir, diseñado para personas que valoran tanto la calidad de vida como una inversión inteligente.",
    },
  },
  orchard: {
    question: {
      en: "How is Apple Woods designed as a community orchard?",
      es: "¿Cómo es que Apple Woods se relaciona con un huerto?",
    },
    answer: {
      en: "Apple Woods was created with the vision of blending residential living with nature and sustainability. Every home will include at least one fruit tree connected to the name of its street, creating a true orchard-inspired community experience.\n\nThe neighborhood streets are named after fruits such as Apple, Mango, Orange, Tangerine, Plum, Pear, Peach, and Passion Fruit, and homeowners will enjoy trees that reflect those themes throughout the community.\n\nIn addition, Apple Woods will feature a variety of other climate-adaptable fruit trees, including avocados, bananas, guayabas, limes, peaches, and more. Together, these trees help create a greener environment, provide natural beauty and shade, support sustainability efforts, and give the neighborhood its unique character and identity.",
      es: "Apple Woods fue creado con la visión de combinar la vida residencial con la naturaleza y la sostenibilidad. Cada vivienda incluirá al menos un árbol frutal relacionado con el nombre de su calle, creando una verdadera experiencia comunitaria inspirada en un huerto.\n\nLas calles del fraccionamiento llevan nombres de frutas como Manzana, Mango, Naranja, Mandarina, Ciruela, Pera, Durazno y otras, y los propietarios podrán disfrutar de árboles que reflejan estas temáticas a lo largo de toda la comunidad.\n\nAdemás, Apple Woods contará con una variedad adicional de árboles frutales adaptables al clima de la región, incluyendo aguacates, plátanos, guayabas, limones, duraznos y otros más. En conjunto, estos árboles ayudan a crear un entorno más verde, proporcionan belleza natural y sombra, apoyan los esfuerzos de sostenibilidad y otorgan al fraccionamiento un carácter e identidad únicos.",
    },
  },
  securityGuard: {
    question: {
      en: "Will Apple Woods have a security guard at the entrance?",
      es: "¿Tendrá Apple Woods caseta de seguridad en la entrada?",
    },
    answer: {
      en: "Apple Woods is designed with a modern, community-centered approach to safety. While there may not be traditional security guards stationed at the gate, the neighborhood will feature 24/7 CCTV monitoring throughout the community, including entrances, streets, playgrounds, and common areas.\n\nThe subdivision will be fully enclosed with perimeter fencing and walls, well-lit throughout the evening, and equipped with controlled access gates designed for residents and authorized guests only. Entry systems will help track vehicles, license plates, and visitor access to enhance awareness and security within the community.\n\nBeyond technology and infrastructure, Apple Woods is built around the idea that a connected community creates a safer environment. Residents who take pride in their neighborhood naturally help look after one another, creating a welcoming and secure atmosphere where families can feel comfortable, active, and at peace.",
      es: "Apple Woods está diseñado con un enfoque moderno y comunitario hacia la seguridad. Aunque puede no haber guardias de seguridad tradicionales estacionados en la entrada, la comunidad contará con monitoreo CCTV las 24 horas del día en todo el fraccionamiento, incluyendo accesos, calles, áreas de juegos y espacios comunes.\n\nEl fraccionamiento estará completamente cerrado con bardas y cercado perimetral, contará con iluminación nocturna en toda la comunidad y tendrá accesos controlados diseñados exclusivamente para residentes e invitados autorizados. Los sistemas de acceso ayudarán a monitorear vehículos, placas y entradas de visitantes para fortalecer la seguridad y el control dentro de la comunidad.\n\nMás allá de la tecnología y la infraestructura, Apple Woods está basado en la idea de que una comunidad conectada crea un entorno más seguro. Los residentes que sienten orgullo por su comunidad naturalmente se apoyan y cuidan unos a otros, creando un ambiente agradable y seguro donde las familias pueden sentirse cómodas, activas y tranquilas.",
    },
  },
  noise: {
    question: {
      en: "Will Apple Woods be noisy because of community activities?",
      es: "¿Será ruidoso Apple Woods debido a las actividades comunitarias?",
    },
    answer: {
      en: "Apple Woods is designed as an active, wellness-oriented community that encourages residents to enjoy events, recreation, and social interaction in a balanced and organized environment.\n\nThe neighborhood was thoughtfully planned with designated activity zones, allowing livelier areas such as the clubhouse, dog park, and community facilities to remain separated from quieter residential sections. Townhome areas and certain home sites are intentionally located within lower-noise zones to provide a more peaceful setting.\n\nCommunity activities and events will follow scheduling and sound guidelines to help maintain comfort and harmony throughout the neighborhood. Whether you prefer a quieter atmosphere or a more socially active lifestyle, Apple Woods offers a variety of home locations designed to fit different lifestyles and preferences.",
      es: "Apple Woods está diseñado como una comunidad activa y orientada al bienestar, que fomenta que los residentes disfruten eventos, recreación y convivencia social dentro de un entorno equilibrado y organizado.\n\nEl fraccionamiento fue cuidadosamente planeado con zonas de actividad definidas, permitiendo que las áreas más dinámicas — como la casa club, el parque para mascotas y las instalaciones comunitarias — permanezcan separadas de las secciones residenciales más tranquilas. Las áreas de townhomes y ciertos terrenos residenciales están ubicados intencionalmente dentro de zonas de menor ruido para ofrecer un ambiente más pacífico.\n\nLas actividades y eventos comunitarios seguirán horarios y lineamientos de sonido diseñados para mantener la comodidad y armonía dentro del fraccionamiento. Ya sea que prefiera un ambiente más tranquilo o un estilo de vida más social y activo, Apple Woods ofrece distintas ubicaciones residenciales diseñadas para adaptarse a diferentes estilos de vida y preferencias.",
    },
  },
  reading: {
    question: {
      en: "I enjoy reading and relaxing quietly. Will Apple Woods offer calm reading areas?",
      es: "Disfruto leer y relajarme en tranquilidad. ¿Apple Woods ofrecerá áreas tranquilas para lectura y descanso?",
    },
    answer: {
      en: "Yes. Apple Woods is designed to provide spaces for both activity and relaxation. Residents will enjoy outdoor shaded seating areas surrounded by beautiful landscaping and soothing water features, creating peaceful places to read, unwind, or simply enjoy nature.\n\nFor those who prefer an indoor setting, Apple Woods will also offer a climate-controlled, quiet library environment where residents can relax, enjoy refreshments, read comfortably, or even borrow a book to take home.",
      es: "Sí. Apple Woods está diseñado para ofrecer espacios tanto para la actividad como para la relajación. Los residentes podrán disfrutar de áreas exteriores con sombra, rodeadas de hermosa jardinería y relajantes elementos acuáticos, creando lugares tranquilos ideales para leer, descansar o simplemente disfrutar de la naturaleza.\n\nPara quienes prefieren un ambiente interior, Apple Woods también ofrecerá una biblioteca tranquila con clima controlado, donde los residentes podrán relajarse, disfrutar de bebidas y refrigerios, leer cómodamente o incluso tomar prestado un libro para llevar a casa.",
    },
  },
  outdoorSpaces: {
    question: {
      en: "I enjoy caring for my yard and have pets. How does Apple Woods handle personal outdoor spaces?",
      es: "Disfruto cuidar mi jardín y tengo mascotas. ¿Cómo maneja Apple Woods los espacios exteriores personales?",
    },
    answer: {
      en: "Apple Woods encourages homeowners to personalize and enjoy their outdoor living spaces while maintaining a beautiful and cohesive community appearance.\n\nCommunity standards primarily focus on the front yard and visible exterior areas to help preserve the neighborhood's overall beauty and property values. Backyard spaces offer homeowners much greater flexibility and privacy. As long as activities, pets, or outdoor features do not create a nuisance or negatively impact neighboring homes, residents are free to enjoy and maintain their private outdoor areas according to their own lifestyle and preferences.",
      es: "Apple Woods anima a los propietarios a personalizar y disfrutar sus espacios exteriores, mientras se mantiene una apariencia hermosa y armónica en toda la comunidad.\n\nLos lineamientos comunitarios se enfocan principalmente en los jardines frontales y las áreas exteriores visibles, con el objetivo de preservar la belleza general del fraccionamiento y el valor de las propiedades. Las áreas posteriores de las viviendas ofrecen mucha mayor flexibilidad y privacidad.\n\nSiempre que las actividades, mascotas o elementos exteriores no generen molestias ni afecten negativamente a las viviendas vecinas, los residentes tienen la libertad de disfrutar y mantener sus espacios privados de acuerdo con su propio estilo de vida y preferencias.",
    },
  },
  trashService: {
    question: {
      en: "If I have pets and want to use the optional trash can pull-out service, how do you help keep my pets safe?",
      es: "Si tengo mascotas y deseo utilizar el servicio opcional para sacar y regresar los botes de basura, ¿cómo ayuda Apple Woods a mantener seguras a mis mascotas?",
    },
    answer: {
      en: "For homeowners with pets who choose the optional trash can pull-out service, Apple Woods will require a secure barrier system to help prevent pets from accidentally leaving the yard during trash collection.\n\nHomeowners may install their own approved barrier, or Apple Woods can provide a personalized solution designed to match the appearance and style of the community fencing. These systems are intended to create a safe, separated access area for trash collection while helping protect your pets and maintain the neighborhood's clean, cohesive look.",
      es: "Para los propietarios con mascotas que decidan utilizar el servicio opcional de sacar y regresar los botes de basura, Apple Woods requerirá un sistema de barrera segura diseñado para ayudar a evitar que las mascotas salgan accidentalmente del patio durante la recolección de basura.\n\nLos propietarios podrán instalar su propia barrera aprobada, o Apple Woods podrá ofrecer una solución personalizada diseñada para integrarse con la apariencia y el estilo del cercado comunitario. Estos sistemas están pensados para crear un área de acceso separada y segura para el manejo de basura, mientras ayudan a proteger a las mascotas y mantener la imagen limpia y armónica del fraccionamiento.",
    },
  },
};

// Ecology card (client doc) — no smcopy variant; same copy in both versions.
// `wide: true` renders it as the full-row card below the 6-card grid.
const ecologyCard = {
  title: { en: "Ecology built in", es: "Ecología integrada" },
  body: {
    en: "At Apple Woods, sustainability is more than a feature — it is part of the community's foundation. Designed with a vision for a greener future, the neighborhood aims to maintain a positive environmental footprint through thoughtful planning and eco-conscious amenities.\n\nEvery home will be part of a living orchard, with fruit trees integrated throughout the community to create beauty, shade, and a connection to nature. Solar-powered street lighting will help reduce energy consumption, while dedicated electric vehicle charging stations will support modern, sustainable transportation.\n\nApple Woods is also committed to creating natural habitats that encourage biodiversity and ecological balance. Landscaped areas and water features will help support beneficial species such as birds, bees, butterflies, ladybugs, fish, geckos, and other pollinators and wildlife that contribute to a healthy environment.\n\nBy blending nature, technology, and community living, Apple Woods is designed to be a beautiful place to live while helping preserve the environment for future generations.",
    es: "En Apple Woods, la sustentabilidad es más que una característica: es parte fundamental de la comunidad. Diseñado con una visión hacia un futuro más verde, el fraccionamiento busca mantener una huella ambiental positiva mediante una planeación inteligente y amenidades conscientes con el medio ambiente.\n\nCada hogar formará parte de un huerto vivo, con árboles frutales integrados en toda la comunidad para crear belleza, sombra y una conexión natural con el entorno. El alumbrado público alimentado por energía solar ayudará a reducir el consumo energético, mientras que las estaciones de carga para vehículos eléctricos respaldarán una movilidad moderna y sustentable.\n\nApple Woods también está comprometido con la creación de hábitats naturales que fomenten la biodiversidad y el equilibrio ecológico. Las áreas ajardinadas y los cuerpos de agua ayudarán a favorecer especies benéficas como aves, abejas, mariposas, catarinas, peces, geckos y otros polinizadores y especies silvestres que contribuyen a un entorno saludable.\n\nAl integrar naturaleza, tecnología y vida comunitaria, Apple Woods está diseñado para ser un lugar hermoso para vivir, mientras ayuda a preservar el medio ambiente para las futuras generaciones.",
  },
  image: "/assets/ecology.jpg",
  wide: true,
};

export const smcopyContent = {
  nav: {
    logoAlt: "Apple Woods Smart Living",
    // Order mirrors the page scroll order; "Now" is the Phase 1 availability section.
    links: [
      { href: "#different", label: { en: "Community", es: "Comunidad" } },
      { href: "#structured", label: { en: "Amenities", es: "Servicios" } },
      { href: "#life-inside", label: { en: "Live Here", es: "Vive aquí" } },
      { href: "#phase-one", label: { en: "Now", es: "Ahora" } },
      { href: "#location", label: { en: "Location", es: "Ubicación" } },
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
      es: "Todo lo que hace que un fraccionamiento se sienta exclusivo está planificado desde el principio.",
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
      ecologyCard,
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
      // FAQ is grouped by the doc's categories. Group count/order must match client.js
      // (parity guard compares array lengths). New doc entries come from faqDocItems.
      groups: [
        {
          label: { en: "General", es: "General" },
          items: [
            {
              question: { en: "Which homesites are still available?", es: "¿Qué lotes siguen disponibles?" },
              answer: {
                en: "Availability changes quickly. Some homesites may be pending but not fully secured until deposit is received, so buyers should confirm current status with the sales team.",
                es: "La disponibilidad puede cambiar rápidamente a medida que los compradores reservan o pasan a estar bajo contrato. Confirma el estado actual con el equipo de ventas.",
              },
            },
            {
              question: { en: "Can I design my own home?", es: "¿Puedo diseñar mi propia casa?" },
              answer: {
                en: "Yes. Homeowners can design custom homes, subject to architectural review, so each home supports the community's standards and long-term curb appeal.",
                es: "Sí. Las casas pasan por una revisión arquitectónica para proteger el atractivo exterior y los estándares de la comunidad.",
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
                en: "I hear I can find cheaper lots elsewhere. Why Apple Woods?",
                es: "Escuché que puedo encontrar lotes más baratos en otro lugar. ¿Por qué Apple Woods?",
              },
              answer: {
                en: "Some lots may cost less, but Apple Woods offers more than land: standards, landscaping, technology, amenities, security, services, and long-term planning that help protect the neighborhood experience.",
                es: "Algunos lotes pueden costar menos, pero Apple Woods ofrece más que un terreno: estándares, paisajismo, tecnología, amenidades, seguridad, servicios y planificación a largo plazo que ayudan a proteger la experiencia del vecindario.",
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
        {
          label: { en: "Restrictions", es: "Restricciones" },
          items: [
            {
              question: { en: "What are the restrictions?", es: "¿Cuáles son las restricciones?" },
              answer: {
                en: "Community standards cover home size, architecture, landscaping, maintenance, lighting, noise, colors, and outdoor storage to protect the community's appearance and quality of life.",
                es: "Los estándares de la comunidad cubren el tamaño de la casa, la arquitectura, el paisajismo, el mantenimiento, la iluminación, el ruido, los colores y el almacenamiento exterior para proteger la apariencia y la calidad de vida de la comunidad.",
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
      { href: "#different", label: { en: "Community", es: "Comunidad" } },
      { href: "#structured", label: { en: "Amenities", es: "Servicios" } },
      { href: "#life-inside", label: { en: "Live Here", es: "Vive aquí" } },
      { href: "#phase-one", label: { en: "Now", es: "Ahora" } },
      { href: "#location", label: { en: "Location", es: "Ubicación" } },
      { href: "#contact", label: { en: "Contact Us", es: "Contáctanos" } },
    ],
    copyright: "Copyright © Apple Woods 2026",
    backToTop: { en: "Back to top", es: "Volver arriba" },
  },
};
