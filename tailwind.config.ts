import type { Config } from "tailwindcss";

/**
 * Claude / Anthropic design language — warm-light. Cream surfaces, warm ink
 * text, Anthropic blue as the brand accent (fits "Blueprint"), clay + gold as
 * warm pops. Flat and calm: no glassmorphism, no neon, no glow. Poppins for
 * headings/UI, Lora for editorial prose.
 *
 * Token NAMES are preserved from the old system so every component keeps
 * working; only the VALUES change. Borders use the ink color so low-alpha
 * hairlines (`border-outline-variant/10`) still read on cream.
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Brand accent = Anthropic blue ──────────────────────
        "on-primary": "#ffffff",
        primary: "#3a6ea5", // deep blue: accent text/icons/active state
        "primary-fixed": "#e7eef6",
        "primary-fixed-dim": "#6a9bcc",
        "primary-container": "#3a6ea5", // filled CTA background
        "on-primary-container": "#ffffff",
        "on-primary-fixed": "#10324f",
        "on-primary-fixed-variant": "#335f8f",
        "inverse-primary": "#9cc0e4",
        secondary: "#5b87b3",
        "secondary-container": "#6a9bcc",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#10324f",
        "secondary-fixed": "#dce8f3",
        "secondary-fixed-dim": "#6a9bcc",
        "on-secondary-fixed": "#10324f",
        "on-secondary-fixed-variant": "#335f8f",
        // Clay — Anthropic's warm signature pop
        tertiary: "#c2603c",
        "tertiary-container": "#f6ddd0",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#5a2c18",
        "tertiary-fixed": "#f6ddd0",
        "tertiary-fixed-dim": "#d97757",
        "on-tertiary-fixed": "#5a2c18",
        "on-tertiary-fixed-variant": "#9a4a2c",
        error: "#b3261e",
        "on-error": "#ffffff",
        "error-container": "#f9dedc",
        "on-error-container": "#410e0b",
        // ── Surfaces — WARM CREAM base (Anthropic light) ───────
        canvas: "#faf9f5", // true page background (warm cream)
        background: "#faf9f5",
        surface: "#ffffff",
        "surface-dim": "#f1efe8",
        "surface-bright": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f4ee", // sidebars
        "surface-container": "#f1efe8",
        "surface-container-high": "#ebe8df",
        "surface-container-highest": "#e5e2d8",
        "surface-variant": "#efece4",
        "surface-tint": "#3a6ea5",
        // ── On-surface / outlines (warm) ───────────────────────
        "on-surface": "#141413", // warm ink
        "on-surface-variant": "#5f5e57", // muted warm gray
        "on-background": "#141413",
        outline: "#8a887e", // mid gray — muted labels
        "outline-variant": "#23211d", // near-ink — for low-alpha hairlines
        "inverse-surface": "#2b2a27",
        "inverse-on-surface": "#faf9f5",
        // Clay — Anthropic's warm signature, used for warmth/accent + the motif
        clay: "#c2603c",
        // ── "Earned" accent (warm gold) — only on things you EARN
        earned: "#b07d1e",
        "earned-dim": "#946818",
        "on-earned": "#ffffff",
        // ── Back-compat aliases ────────────────────────────────
        muted: "#5f5e57",
        border: "#e3e1d8",
        brand: "#3a6ea5",
        "brand-hover": "#335f8f",
        "brand-soft": "#e7eef6",
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
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
        "headline-lg": ["var(--font-poppins)", "system-ui", "sans-serif"],
        "headline-md": ["var(--font-poppins)", "system-ui", "sans-serif"],
        "headline-lg-mobile": ["var(--font-poppins)", "system-ui", "sans-serif"],
        "label-md": ["var(--font-poppins)", "system-ui", "sans-serif"],
        code: ["var(--font-geist-mono)", "monospace"],
        "body-lg": ["var(--font-lora)", "Georgia", "serif"],
        "body-md": ["var(--font-lora)", "Georgia", "serif"],
      },
      fontSize: {
        display: ["48px", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-md": ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "1.2", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.65", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0", fontWeight: "500" }],
        code: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      boxShadow: {
        // Soft, neutral elevation — no glow.
        glow: "0 1px 2px rgba(20,20,19,0.05), 0 6px 16px -6px rgba(20,20,19,0.10)",
        "glow-sm": "0 1px 2px rgba(20,20,19,0.06)",
        card: "0 1px 2px rgba(20,20,19,0.04), 0 2px 8px -4px rgba(20,20,19,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
