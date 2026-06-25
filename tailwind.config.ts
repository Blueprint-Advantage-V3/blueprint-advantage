import type { Config } from "tailwindcss";

/**
 * "Ascendant Core" design system (from the Stitch / Apex Academy export).
 * Material-3-style token palette: deep obsidian surfaces, electric violet
 * primary, sky-blue secondary, amber tertiary. Geist for headings/labels,
 * Inter for body.
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Ascendant Core tokens ──────────────────────────────
        // Accent = navy/blue (Material-3 blue tonal palette)
        "on-primary": "#002e69",
        primary: "#adc6ff",
        "primary-fixed": "#d8e2ff",
        "primary-fixed-dim": "#adc6ff",
        "primary-container": "#2c4fb8",
        "on-primary-container": "#dbe4ff",
        "on-primary-fixed": "#001a41",
        "on-primary-fixed-variant": "#284777",
        "inverse-primary": "#415f91",
        secondary: "#89ceff",
        "secondary-container": "#00a2e6",
        "on-secondary": "#00344d",
        "on-secondary-container": "#00344e",
        "secondary-fixed": "#c9e6ff",
        "secondary-fixed-dim": "#89ceff",
        "on-secondary-fixed": "#001e2f",
        "on-secondary-fixed-variant": "#004c6e",
        tertiary: "#ffb784",
        "tertiary-container": "#a15100",
        "on-tertiary": "#4f2500",
        "on-tertiary-container": "#ffe0cd",
        "tertiary-fixed": "#ffdcc6",
        "tertiary-fixed-dim": "#ffb784",
        "on-tertiary-fixed": "#301400",
        "on-tertiary-fixed-variant": "#713700",
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        // Surfaces — NAVY base (deep midnight → bright). Whole UI is navy-toned.
        canvas: "#0a0f20", // true page background (deep navy)
        background: "#0e1430",
        surface: "#0e1430",
        "surface-dim": "#0b1026",
        "surface-bright": "#2e3a72",
        "surface-container-lowest": "#070b18",
        "surface-container-low": "#131a3a", // sidebars
        "surface-container": "#18204a",
        "surface-container-high": "#1f2a5c",
        "surface-container-highest": "#27336e",
        "surface-variant": "#27336e",
        "surface-tint": "#adc6ff",
        // On-surface / outlines (blue-tinted)
        "on-surface": "#e7e9f6",
        "on-surface-variant": "#c2c8e4",
        "on-background": "#e7e9f6",
        outline: "#8b93c4",
        "outline-variant": "#2f3c70",
        "inverse-surface": "#e7e9f6",
        "inverse-on-surface": "#1a2142",
        // ── "Earned" accent (gold) — only on things you EARN ───
        // Levels, milestones, top leaderboard spots. Reads as achievement,
        // never decoration. Keeps progress feeling earned, not hyped.
        earned: "#e6b15e",
        "earned-dim": "#caa052",
        "on-earned": "#3a2606",
        // ── Back-compat aliases (old token names) ──────────────
        muted: "#c2c8e4",
        border: "#2f3c70",
        brand: "#2c4fb8",
        "brand-hover": "#3a5fcc",
        "brand-soft": "#1a2952",
      },
      spacing: {
        sidebar_width: "280px",
        content_max_width: "800px",
        gutter: "24px",
        margin_mobile: "16px",
        stack_sm: "8px",
        stack_md: "16px",
        stack_lg: "32px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        "headline-lg": ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        "headline-md": ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        "headline-lg-mobile": ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        "label-md": ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        code: ["var(--font-geist-mono)", "var(--font-geist-sans)", "monospace"],
        "body-lg": ["var(--font-inter)", "system-ui", "sans-serif"],
        "body-md": ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["48px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "1.2", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1", letterSpacing: "0.02em", fontWeight: "500" }],
        code: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(173,198,255,0.35), 0 0 24px -4px rgba(44,79,184,0.6)",
        "glow-sm": "0 0 15px rgba(173, 198, 255, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
