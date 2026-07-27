import ContactClient from "./ContactClient";
import { getSiteContent } from "../../backend/data";

/* Fully static: read the backend only on admin save (via /api/revalidate),
   never on a timer. Falls back to built-in defaults on outage. */
export const revalidate = false;

export default async function ContactPage() {
  const content = await getSiteContent();
  const info = {
    phone: content.phone,
    email: content.email,
    address: content.address,
    hours: content.hours,
  };
  return <ContactClient info={info} />;
}
