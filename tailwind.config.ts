import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Near-black premium canvas
        canvas: "#09090b",      // zinc-950
        surface: "#111113",     // elevated panels / sidebar
        "surface-2": "#18181b", // cards
        border: "#27272a",      // hairline borders
        muted: "#a1a1aa",       // secondary text
        // Single bold brand accent — electric indigo/violet
        brand: {
          DEFAULT: "#6d5efc",
          hover: "#5a4bf0",
          soft: "#1c1a3a",      // tinted backgrounds
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(109,94,252,0.4), 0 0 24px -4px rgba(109,94,252,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
