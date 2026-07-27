import "./globals.css";
import SiteFrame from "../components/SiteFrame";
import { getSiteContent } from "../backend/data";

export const metadata = {
  title: "Imvunwa Business Group Ltd",
  description:
    "Industrial manufacturing, machine repair, welding, product design, electrical, plumbing, and finishing services in Kigali, Rwanda."
};

export default async function RootLayout({ children }) {
  // Site-wide text (footer contact/description) — DB with defaults fallback.
  const content = await getSiteContent();

  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-panel">
        <SiteFrame content={content}>{children}</SiteFrame>
      </body>
    </html>
  );
}
