/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111316",
        steel: "#263039",
        muted: "#69737d",
        line: "#d9dee3",
        panel: "#f3f5f7",
        signal: "#f28c28",
        "signal-dark": "#bd5d11",
        workshop: "#647b66"
      },
      boxShadow: {
        industrial: "0 22px 70px rgba(17, 19, 22, 0.14)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        marquee: "marquee 24s linear infinite"
      }
    }
  },
  plugins: []
};
