import { notFound } from "next/navigation";
import ServiceDetail from "../../../components/ui/ServiceDetail";
import { SERVICE_DETAILS, SERVICE_SLUGS } from "../../../lib/serviceDetails";

/** Pre-render every service page at build time; 404 for unknown slugs. */
export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }) {
  const service = SERVICE_DETAILS[params.slug];
  if (!service) return {};
  return {
    title: `${service.title} · Imvunwa Business Group Ltd`,
    description: service.subtitle,
  };
}

export default function ServicePage({ params }) {
  const service = SERVICE_DETAILS[params.slug];
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
