/**
 * Content for every /services/<slug> detail page.
 *
 * Single source of truth — the shared <ServiceDetail /> template renders
 * this, and app/services/[slug]/page.js turns each key into a static route.
 * `slug` MUST match the portfolio id in data/portfolioData.js so the
 * <ServiceProjects /> gallery resolves the right project set.
 */
export const SERVICE_DETAILS = {
  manufacturing: {
    slug: "manufacturing",
    eyebrow: "Fabrication",
    title: "Manufacturing of Machines",
    subtitle:
      "Design and production of high-quality machines tailored to meet specific industrial needs — from concept to commissioning.",
    bgImage: "/image/manufacturing.jpg",
    heading: "Built to Work. Built to Last.",
    paragraphs: [
      "At Imvunwa, we design and manufacture custom industrial machines that meet the unique demands of your production environment. Whether you need a single prototype or full production line equipment, our engineering team delivers machines with the precision and durability your business depends on.",
      "Every machine is built using high-quality, locally and internationally sourced materials, assembled by skilled technicians, and tested rigorously before delivery.",
    ],
    ctaLabel: "Request a Custom Machine",
    features: [
      "Custom machine design tailored to your production needs",
      "Industrial-grade materials for long-lasting durability",
      "Precision engineering with quality control at every stage",
      "Factory delivery, installation, and commissioning support",
      "Machines built to local and international standards",
      "Dedicated after-sale maintenance and technical support",
    ],
    productCategories: [
      { name: "Housing Components", items: ["Roof trusses", "Gutters", "Metal fences", "Windows"] },
      { name: "Home Furniture", items: ["TV stands", "Storage units", "Wardrobes", "Bedroom furniture"] },
      { name: "School & Market Products", items: ["Cabinets", "Shelves", "Desks", "Tables"] },
      { name: "Kitchen Appliances", items: ["Processing machines", "Grinders", "Stoves", "Feeders"] },
    ],
  },

  repair: {
    slug: "repair",
    eyebrow: "Maintenance",
    title: "Machine Repairment",
    subtitle:
      "Comprehensive repair services for a wide range of machinery, with prompt diagnosis and effective solutions.",
    bgImage: "/image/repairement.jpg",
    heading: "Minimise Downtime. Maximise Output.",
    paragraphs: [
      "Equipment failure costs time and money. Imvunwa's repair and maintenance team responds quickly, diagnoses accurately, and restores your machines to full working condition — without cutting corners.",
      "We handle repairs for a wide range of industrial machines across manufacturing, agriculture, construction, and commercial sectors. Our technicians work both on-site and in our fully equipped workshop.",
    ],
    ctaLabel: "Book a Repair Assessment",
    features: [
      "Complete diagnostics — electrical, mechanical, hydraulic",
      "Component-level repair and precision calibration",
      "Preventive maintenance plans to avoid costly downtime",
      "Genuine and compatible spare parts sourcing",
      "On-site and workshop repair for all machine types",
      "Fast turnaround to minimise production disruption",
    ],
  },

  welding: {
    slug: "welding",
    eyebrow: "Metalwork",
    title: "Welding Services",
    subtitle:
      "Structural, decorative, and custom welding for industrial, commercial, and residential projects across Rwanda.",
    bgImage: "/image/welding1.png",
    heading: "Precision Welds. Lasting Structures.",
    paragraphs: [
      "Imvunwa delivers expert welding services for structural frameworks, custom metalwork, gates, roofing frames, and industrial fabrication. Our certified welders bring accuracy, cleanliness, and strength to every join.",
      "From a single gate to an entire building frame, we provide both workshop fabrication and on-site field welding — meeting your project timelines with reliable quality control throughout.",
    ],
    ctaLabel: "Request a Welding Quote",
    features: [
      "Structural steel welding for buildings and industrial frameworks",
      "MIG, TIG, and ARC welding across all metal types",
      "Custom gates, doors, fences, and security barriers",
      "Roof trusses and roofing frame fabrication",
      "Field and on-site welding for urgent repairs",
      "Quality welds inspected for strength and safety",
    ],
  },

  painting: {
    slug: "painting",
    eyebrow: "Finishing",
    title: "Painting Services",
    subtitle:
      "Professional painting and protective coating services for industrial, commercial, and residential properties.",
    bgImage: "/image/painting.jpg",
    heading: "A Fresh Finish. Long-Lasting Protection.",
    paragraphs: [
      "Imvunwa's painting team delivers clean, durable finishes for surfaces of all types — from industrial steel structures requiring anti-corrosion coatings to residential interiors needing a premium decorative touch.",
      "We use high-quality, climate-appropriate paints and follow a thorough process of surface preparation, priming, and finishing to ensure results that look great and protect your property for years to come.",
    ],
    ctaLabel: "Request a Painting Quote",
    features: [
      "Industrial anti-corrosion and protective coatings",
      "Interior and exterior painting for homes and businesses",
      "Surface preparation, priming, and finishing",
      "High-durability paints suited for Rwanda's climate",
      "Commercial and large-scale facility painting",
      "Clean, professional finish with minimal disruption",
    ],
  },

  electrical: {
    slug: "electrical",
    eyebrow: "Installation",
    title: "Electricity Installation and Repair",
    subtitle:
      "Professional electrical services including installation, repair, and maintenance by certified electricians.",
    bgImage: "/image/electricity.jpg",
    heading: "Safe Power. Reliable Systems.",
    paragraphs: [
      "Imvunwa's electricians install, maintain, and repair electrical systems for factories, commercial buildings, and homes. We work to the highest safety standards, ensuring every connection is correct, every circuit is protected, and every system performs reliably.",
      "From a full factory wiring fit-out to a single fault repair, our team responds professionally and completes the work with minimal disruption to your operations.",
    ],
    ctaLabel: "Book Electrical Service",
    features: [
      "New electrical system installation for industrial & commercial spaces",
      "Fault diagnosis and electrical repair services",
      "Distribution boards, wiring, and circuit breaker installation",
      "Industrial machinery electrical connections and controls",
      "Lighting installation — indoor, outdoor, and industrial",
      "Safety inspection and compliance certification support",
    ],
  },

  plumbing: {
    slug: "plumbing",
    eyebrow: "Utilities",
    title: "Plumbing Services",
    subtitle:
      "Industrial and commercial plumbing — from full system installation to leak repairs and routine maintenance.",
    bgImage: "/image/plumb.jpg",
    heading: "Reliable Flow. Zero Leaks.",
    paragraphs: [
      "Imvunwa delivers heavy-duty plumbing solutions for factories, commercial buildings, and construction sites. We install, maintain, and repair water systems that need to perform reliably under industrial demand.",
      "Our plumbers are experienced with complex pipe routing, high-pressure systems, and large infrastructure layouts — delivering clean, leak-free installations on time.",
    ],
    ctaLabel: "Book a Plumber",
    features: [
      "Heavy-duty industrial pipe installation for factories",
      "Water system installation for commercial buildings",
      "Leak detection, diagnosis, and emergency repairs",
      "Sewage and drainage system installation",
      "Hot and cold water system setup and maintenance",
      "Custom plumbing layouts for large construction projects",
    ],
  },

  design: {
    slug: "design",
    eyebrow: "Design",
    title: "Product Design",
    subtitle:
      "From concept sketch to production-ready prototype — practical engineering design for industrial and commercial products.",
    bgImage: "/image/design.jpg",
    heading: "Ideas Engineered Into Reality.",
    paragraphs: [
      "Imvunwa works with businesses and individuals to transform product ideas into functional, manufacturable designs. Our engineering team combines creative thinking with practical knowledge of materials, manufacturing processes, and cost constraints.",
      "Whether you have a rough concept or detailed requirements, we will guide you through the design, prototype, and production preparation stages — making sure the final product works exactly as intended.",
    ],
    ctaLabel: "Start a Design Project",
    features: [
      "Product concept development and engineering sketches",
      "3D prototype design and build-ready technical drawings",
      "Material selection and cost-optimised design",
      "Prototype fabrication and iterative testing",
      "Design-to-production handover with full documentation",
      "Custom product design for industrial and commercial use",
    ],
  },
};

/** Ordered list of slugs — drives static generation and any menus. */
export const SERVICE_SLUGS = Object.keys(SERVICE_DETAILS);
