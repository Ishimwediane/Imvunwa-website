import "./globals.css";
import SiteFrame from "../components/SiteFrame";

export const metadata = {
  title: "Imvunwa Business Group Ltd",
  description:
    "Industrial manufacturing, machine repair, welding, product design, electrical, plumbing, and finishing services in Kigali, Rwanda."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-panel">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
