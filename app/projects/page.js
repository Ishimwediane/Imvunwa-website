"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const shell = "relative mx-auto w-full max-w-[1180px]";
const eyebrow = "mb-3.5 text-xs font-black uppercase tracking-normal text-signal";

const projects = [
  { category: "Welding", image: "/image/project4.jpg" },
  { category: "Welding", image: "/image/project2.jpg" },
  { category: "Welding", image: "/image/project5.jpg" },
  { category: "Product Design", image: "/image/product.jpg" }
];

const categories = ["All", "Welding", "Product Design"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="overflow-hidden">
      {/* Page Hero */}
      <section className="bg-ink px-4 py-20 text-white sm:px-6">
        <div className={`${shell} text-center`}>
          <p className={eyebrow}>Selected work</p>
          <h1 className="m-0 text-[44px] font-black leading-[1.04] sm:text-[60px] lg:text-[72px]">Our Projects</h1>
          <p className="mx-auto mt-5 max-w-[600px] text-lg leading-[1.7] text-white/75">
            Real work, real results. Browse our portfolio of fabrication, welding, and product design projects across Rwanda.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-panel px-4 py-[70px] sm:px-6 lg:py-24">
        <div className={shell}>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="m-0 max-w-[760px] text-[34px] font-black leading-[1.02] text-ink sm:text-[44px]">
              Projects that show the finish, strength, and practical detail.
            </h2>
            <div className="flex w-full gap-2 overflow-x-auto rounded-lg border border-line bg-white p-1.5 lg:w-auto" aria-label="Project filters">
              {categories.map((category) => (
                <button
                  className={`min-h-[38px] rounded-md px-3.5 font-extrabold transition-colors ${activeCategory === category ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProjects.map((project) => (
              <article className="group relative min-h-[330px] overflow-hidden rounded-lg bg-ink" key={`${project.category}-${project.image}`}>
                <img className="h-full min-h-[330px] w-full object-cover opacity-[.86] transition duration-300 group-hover:scale-105" src={project.image} alt={`${project.category} project`} />
                <span className="absolute bottom-4 left-4 rounded-[5px] bg-ink/80 px-2.5 py-2 text-xs font-black uppercase text-white">{project.category}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-[70px] sm:px-6 lg:py-24">
        <div className={`${shell} text-center`}>
          <h2 className="text-[34px] font-black text-ink sm:text-[48px]">Have a project in mind?</h2>
          <p className="mx-auto mt-4 max-w-[520px] text-lg text-muted">Share your idea with us and we'll bring it to life.</p>
          <Link href="/contact" className="mt-8 inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#F5A623] px-10 font-black text-white hover:opacity-90 transition-opacity">
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
