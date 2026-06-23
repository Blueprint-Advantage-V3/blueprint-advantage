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
        "on-primary": "#3f008e",
        primary: "#d2bbff",
        "primary-fixed": "#eaddff",
        "primary-fixed-dim": "#d2bbff",
        "primary-container": "#7c3aed",
        "on-primary-container": "#ede0ff",
        "on-primary-fixed": "#25005a",
        "on-primary-fixed-variant": "#5a00c6",
        "inverse-primary": "#732ee4",
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
        // Surfaces (deep → bright)
        canvas: "#0A0A0B", // true page background
        background: "#131314",
        surface: "#131314",
        "surface-dim": "#131314",
        "surface-bright": "#3a393a",
        "surface-container-lowest": "#0e0e0f",
        "surface-container-low": "#1c1b1c",
        "surface-container": "#201f20",
        "surface-container-high": "#2a2a2b",
        "surface-container-highest": "#353436",
        "surface-variant": "#353436",
        "surface-tint": "#d2bbff",
        // On-surface / outlines
        "on-surface": "#e5e2e3",
        "on-surface-variant": "#ccc3d8",
        "on-background": "#e5e2e3",
        outline: "#958da1",
        "outline-variant": "#4a4455",
        "inverse-surface": "#e5e2e3",
        "inverse-on-surface": "#313031",
        // ── Back-compat aliases (old token names) ──────────────
        muted: "#ccc3d8",
        border: "#4a4455",
        brand: "#7c3aed",
        "brand-hover": "#6d28d9",
        "brand-soft": "#241b3d",
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
        glow: "0 0 0 1px rgba(210,187,255,0.35), 0 0 24px -4px rgba(124,58,237,0.5)",
        "glow-sm": "0 0 15px rgba(210, 187, 255, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
