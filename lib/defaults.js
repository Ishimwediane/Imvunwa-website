/**
 * Built-in default content. Used as a fallback whenever Supabase isn't
 * configured or a query fails — so the public website always renders,
 * even before the backend is set up or during a database outage.
 *
 * These values mirror the seed data in supabase/schema.sql.
 */
import { PORTFOLIO_DATA } from "../data/portfolioData";

export const SITE_CONTENT_DEFAULT = {
  hero_eyebrow: "Imvunwa Business Group · Rwanda",
  hero_title: "Your One Stop Shop For Transforming Your Space",
  hero_subtitle:
    "A leading metal fabrication, painting, repair, and restoration company — delivering exceptional services across Rwanda.",
  tagline: "Your one stop shop for transforming your space",
  description:
    "Imvunwa is a leading metal fabrication, painting, repair, and restoration company, dedicated to delivering exceptional services to our clients.",
  phone: "+250 787 782 226",
  email: "imvunwabusinessgroup@gmail.com",
  address: "Rwanda, Kigali, Kimironko",
  hours: "Mon–Sat, 11:00–23:00",
  about_story:
    "Imvunwa Business Group Ltd is a leading metal fabrication, painting, repair, and restoration company, dedicated to delivering exceptional services to our clients. We specialise in transforming spaces through industrial services and product manufacturing, with a constant emphasis on precision engineering and quality finishes.",
  mission:
    "To transform spaces and empower businesses across Rwanda through high-quality metal fabrication, manufacturing, repair, and finishing — delivered with precision engineering and dependable craftsmanship.",
  vision:
    "To be Rwanda's most trusted one stop shop for industrial services and product manufacturing — the first name businesses and homeowners think of when they want to transform their space.",
};

export const SERVICES_DEFAULT = [
  { id: "s1", name: "Manufacturing of Machines", description: "Design and production of high-quality machines tailored to meet specific industrial needs.", image_url: "/image/manufacturing.jpg" },
  { id: "s2", name: "Machine Repairment", description: "Comprehensive repair services for a wide range of machinery, with prompt diagnosis and effective solutions.", image_url: "/image/repairement.jpg" },
  { id: "s3", name: "Welding Services", description: "Top-tier welding services for both structural and custom projects, delivered with precision and safety.", image_url: "/image/welding1.png" },
  { id: "s4", name: "Painting Services", description: "Top-quality painting finishes for homes and businesses, with protective surface coating that lasts.", image_url: "/image/paint.jpg" },
  { id: "s5", name: "Electricity Installation and Repair", description: "Professional electrical services including installation, repair, and maintenance by certified electricians.", image_url: "/image/electricity.jpg" },
  { id: "s6", name: "Plumbing Services", description: "Installations, repairs, and maintenance of water systems for residential and commercial spaces.", image_url: "/image/plumb.jpg" },
  { id: "s7", name: "Product Design", description: "Innovative product design services developed collaboratively using cutting-edge technology.", image_url: "/image/product1.jpg" },
];

export const TEAM_DEFAULT = [
  { id: "t1", name: "NIYONZIMA Pascal", role: "Co-Founder & CEO", image_url: "" },
  { id: "t2", name: "IRADUKUNDA Jean Michel", role: "Co-Founder & Advertisement and Stock Manager", image_url: "/image/IRADUKUNDA.jpg" },
  { id: "t3", name: "Muhire Gaspard", role: "Co-Founder & Production Manager", image_url: "" },
  { id: "t4", name: "Claudine IMANIZABAYO", role: "Co-Founder & Accountant", image_url: "" },
];

/** Normalized project tree derived from the existing portfolio data. */
export const PROJECTS_DEFAULT = PORTFOLIO_DATA.map((cat) => ({
  id: cat.id,
  name: cat.label,
  slug: cat.id,
  subs: cat.subs.map((sub, si) => ({
    id: `${cat.id}-${si}`,
    name: sub.name,
    images: sub.images.map((img, ii) => ({
      id: `${cat.id}-${si}-${ii}`,
      src: img.src,
      caption: img.caption || "",
    })),
  })),
}));
