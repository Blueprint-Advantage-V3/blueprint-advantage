import type { Config } from "tailwindcss";

/**
 * Palette from Realtime Colors: near-white canvas (#fbfbfe), near-black text
 * (#050315), vivid indigo primary (#2f27ce) + accent (#433bff), lavender
 * secondary (#dedcff). Inter throughout. Light, modern, Manus-clean.
 *
 * Token NAMES preserved so every component re-themes automatically.
 * outline-variant is near-black so low-alpha hairlines read on the light canvas.
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Brand accent = indigo / violet ─────────────────────
        "on-primary": "#ffffff",
        primary: "#2f27ce", // deep indigo: accent text/icons/active
        "primary-fixed": "#dedcff",
        "primary-fixed-dim": "#433bff",
        "primary-container": "#433bff", // filled CTA (brighter accent)
        "on-primary-container": "#ffffff",
        "on-primary-fixed": "#0a0840",
        "on-primary-fixed-variant": "#2f27ce",
        "inverse-primary": "#b9b5ff",
        secondary: "#6b63e8",
        "secondary-container": "#dedcff", // lavender soft chip
        "on-secondary": "#ffffff",
        "on-secondary-container": "#231c8f",
        "secondary-fixed": "#dedcff",
        "secondary-fixed-dim": "#6b63e8",
        "on-secondary-fixed": "#231c8f",
        "on-secondary-fixed-variant": "#433bff",
        tertiary: "#7a6f9e",
        "tertiary-container": "#ecebfb",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#332a55",
        "tertiary-fixed": "#ecebfb",
        "tertiary-fixed-dim": "#7a6f9e",
        "on-tertiary-fixed": "#332a55",
        "on-tertiary-fixed-variant": "#7a6f9e",
        error: "#d92d20",
        "on-error": "#ffffff",
        "error-container": "#fde4e1",
        "on-error-container": "#5a1610",
        // ── Surfaces — near-white, cool lavender tint ──────────
        canvas: "#fbfbfe",
        background: "#fbfbfe",
        surface: "#ffffff",
        "surface-dim": "#f3f3fb",
        "surface-bright": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f7f7fd", // sidebars
        "surface-container": "#f1f1fb",
        "surface-container-high": "#eae9f7",
        "surface-container-highest": "#e0def8",
        "surface-variant": "#ecebf8",
        "surface-tint": "#433bff",
        // ── On-surface / outlines ──────────────────────────────
        "on-surface": "#050315", // near-black navy
        "on-surface-variant": "#4b4a63",
        "on-background": "#050315",
        outline: "#84839c",
        "outline-variant": "#050315", // near-black → low-alpha hairlines
        "inverse-surface": "#1c1b2e",
        "inverse-on-surface": "#fbfbfe",
        clay: "#7a6f9e",
        // ── "Earned" accent (gold) — only on things you EARN ───
        earned: "#9a6b12",
        "earned-dim": "#7e560d",
        "on-earned": "#ffffff",
        // ── Back-compat aliases ────────────────────────────────
        muted: "#4b4a63",
        border: "#e0def8",
        brand: "#2f27ce",
        "brand-hover": "#433bff",
        "brand-soft": "#dedcff",
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
        serif: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        "headline-lg": ["var(--font-inter)", "system-ui", "sans-serif"],
        "headline-md": ["var(--font-inter)", "system-ui", "sans-serif"],
        "headline-lg-mobile": ["var(--font-inter)", "system-ui", "sans-serif"],
        "label-md": ["var(--font-inter)", "system-ui", "sans-serif"],
        code: ["var(--font-geist-mono)", "monospace"],
        "body-lg": ["var(--font-inter)", "system-ui", "sans-serif"],
        "body-md": ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["52px", { lineHeight: "1.04", letterSpacing: "-0.035em", fontWeight: "650" }],
        "headline-lg": ["32px", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "600" }],
        "headline-md": ["20px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg-mobile": ["26px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0", fontWeight: "500" }],
        code: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      boxShadow: {
        glow: "0 1px 2px rgba(5,3,21,0.05), 0 12px 32px -14px rgba(67,59,255,0.18)",
        "glow-sm": "0 1px 2px rgba(5,3,21,0.06)",
        card: "0 1px 2px rgba(5,3,21,0.04), 0 8px 24px -14px rgba(5,3,21,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
