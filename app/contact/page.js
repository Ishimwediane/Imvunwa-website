"use client";

const shell = "relative mx-auto w-full max-w-[1180px]";
const eyebrow = "mb-3.5 text-xs font-black uppercase tracking-normal text-signal";

export default function ContactPage() {
  return (
    <div className="overflow-hidden">
      {/* Page Hero */}
      <section className="bg-ink px-4 py-20 text-white sm:px-6">
        <div className={`${shell} text-center`}>
          <p className={eyebrow}>Get in touch</p>
          <h1 className="m-0 text-[44px] font-black leading-[1.04] sm:text-[60px] lg:text-[72px]">Contact Us</h1>
          <p className="mx-auto mt-5 max-w-[600px] text-lg leading-[1.7] text-white/75">
            Share your machine, fabrication, repair, utility, or finishing need and the team will help shape the next step.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-ink px-4 py-[70px] text-white sm:px-6 lg:py-24">
        <div className={`${shell} grid gap-16 lg:grid-cols-[0.9fr_1.1fr]`}>
          <div>
            <p className={eyebrow}>Contact</p>
            <h2 className="m-0 text-[34px] font-black leading-none tracking-normal sm:text-[48px] lg:text-[56px]">Let's talk about your next project.</h2>
            <p className="mt-4 text-lg leading-[1.65] text-white/70">
              Reach out through any of the channels below and our team will get back to you as soon as possible.
            </p>
            <div className="mt-8 grid gap-4 text-white/85">
              <a href="tel:+250787782226" className="flex items-center gap-3 hover:text-[#F5A623] transition-colors">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">📞</span>
                +250 787 782 226
              </a>
              <a href="tel:+250790755673" className="flex items-center gap-3 hover:text-[#F5A623] transition-colors">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">📞</span>
                +250 790 755 673
              </a>
              <a href="mailto:ishimwediane400@gmail.com" className="flex items-center gap-3 hover:text-[#F5A623] transition-colors">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">✉️</span>
                ishimwediane400@gmail.com
              </a>
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">📍</span>
                Rwanda, Kigali, Kimironko
              </span>
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">🕐</span>
                Mon–Sat, 11:00–23:00
              </span>
              <a
                href="https://wa.me/250790755673"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-12 w-max items-center gap-3 rounded-full bg-[#25D366] px-6 font-bold text-white hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937s-3.113 6.937-6.938 6.937z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <form className="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-5" onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-xl font-black text-white mb-2">Send us a message</h3>
            <input className="w-full rounded-md border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-white/50 focus:border-[#F5A623] transition-colors" aria-label="Your name" placeholder="Your name" type="text" />
            <input className="w-full rounded-md border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-white/50 focus:border-[#F5A623] transition-colors" aria-label="Your email" placeholder="Your email" type="email" />
            <input className="w-full rounded-md border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-white/50 focus:border-[#F5A623] transition-colors" aria-label="Subject" placeholder="Subject" type="text" />
            <textarea className="w-full resize-y rounded-md border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-white/50 focus:border-[#F5A623] transition-colors" aria-label="Message" placeholder="Tell us about the project" rows="5" />
            <button className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-signal font-extrabold text-white hover:opacity-90 transition-opacity" type="submit">
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
