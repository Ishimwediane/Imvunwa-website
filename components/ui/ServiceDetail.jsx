import PageHero from "./PageHero";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import Button from "./Button";
import ServiceProjects from "./ServiceProjects";

/**
 * ServiceDetail — shared layout for every /services/<slug> page.
 * Server component (no client JS of its own); content comes from
 * lib/serviceDetails.js. The optional `productCategories` block only
 * renders for services that supply it (e.g. manufacturing).
 */
export default function ServiceDetail({ service }) {
  const {
    slug, eyebrow, title, subtitle, bgImage,
    heading, paragraphs, ctaLabel, features, productCategories,
  } = service;

  return (
    <div className="overflow-hidden">
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} bgImage={bgImage} />

      {/* About */}
      <section className="bg-white px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow onLight>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[40px]">
              {heading}
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} className={`${i === 0 ? "mt-5" : "mt-4"} text-[14px] leading-[1.8] text-muted`}>
                {p}
              </p>
            ))}
            <Button href="/contact" className="mt-8">{ctaLabel}</Button>
          </div>

          <div className="grid gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-lg border border-line bg-panel px-4 py-3.5 shadow-sm">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-signal" />
                <span className="text-[13px] leading-[1.6] text-ink/80">{f}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What we make — only for services that define product categories */}
      {productCategories?.length > 0 && (
        <section className="bg-panel px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
          <Container>
            <div className="mb-12 max-w-[560px]">
              <Eyebrow onLight>What we manufacture</Eyebrow>
              <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[40px]">
                Products We Make
              </h2>
              <p className="mt-4 text-[14px] leading-[1.7] text-muted">
                Beyond industrial machines, our fabrication covers a wide range of metal and household products for homes, schools, markets, and businesses.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {productCategories.map((cat) => (
                <div key={cat.name} className="rounded-lg border border-line bg-white p-6 shadow-sm">
                  <h3 className="text-[15px] font-extrabold text-ink">{cat.name}</h3>
                  <div className="mt-3 h-[3px] w-8 rounded-full bg-signal" />
                  <ul className="mt-4 grid gap-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-ink/75">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Projects & Categories */}
      <ServiceProjects serviceId={slug} />
    </div>
  );
}
