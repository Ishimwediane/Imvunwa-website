/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // ── Backgrounds ──────────────────────────────────────────
        ink:           "#333333",    // dark section/card text (#333333)
        base:          "#ffffff",    // white page/section bg
        deeper:        "#1f2937",    // deep dark bg for header/footer
        warm:          "#f8f6f1",    // cream/warm off-white sections
        "warm-card":   "#fdfbf8",    // light cream card bg
        panel:         "#f3f5f7",    // light grey panel bg
        surface:       "#f8fafc",    // clean light surface bg

        // ── Brand ────────────────────────────────────────────────
        signal:        "#F5A623",    // primary brand orange
        "signal-dark": "#bd5d11",    // dark orange (tag text)
        "signal-hover":"#e09212",    // hover state for signal

        // ── Text / UI ────────────────────────────────────────────
        steel:         "#263039",    // dark steel text
        muted:         "#69737d",    // secondary body text
        line:          "#d9dee3",    // borders / dividers
        workshop:      "#647b66",    // green-grey accent

        // ── Third-party ──────────────────────────────────────────
        whatsapp:      "#25D366",    // WhatsApp brand green
      },
      maxWidth: {
        shell: "1180px",             // consistent page max-width
        nav:   "1440px",             // header max-width
      },
      boxShadow: {
        industrial: "0 22px 70px rgba(17, 19, 22, 0.14)",
        card:       "0 12px 34px rgba(17, 19, 22, 0.06)",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "float-up": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" }
        }
      },
      animation: {
        marquee:   "marquee 24s linear infinite",
        "float-1": "float-up 5s ease-in-out infinite",
        "float-2": "float-up 6.5s ease-in-out 1s infinite",
        "float-3": "float-up 5.8s ease-in-out 0.5s infinite",
      }
    }
  },
  plugins: []
};
