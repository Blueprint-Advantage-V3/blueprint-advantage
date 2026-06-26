import type { Config } from "tailwindcss";

/**
 * Palette from Realtime Colors: near-white canvas (#fbfbfe), near-black text
 * (#050315), vivid indigo primary (#1d4ed8) + accent (#2563eb), lavender
 * secondary (#dbeafe). Inter throughout. Light, modern, Manus-clean.
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
        primary: "#1d4ed8", // deep indigo: accent text/icons/active
        "primary-fixed": "#dbeafe",
        "primary-fixed-dim": "#2563eb",
        "primary-container": "#2563eb", // filled CTA (brighter accent)
        "on-primary-container": "#ffffff",
        "on-primary-fixed": "#0a2a6b",
        "on-primary-fixed-variant": "#1d4ed8",
        "inverse-primary": "#93c5fd",
        secondary: "#3b82f6",
        "secondary-container": "#dbeafe", // lavender soft chip
        "on-secondary": "#ffffff",
        "on-secondary-container": "#11337a",
        "secondary-fixed": "#dbeafe",
        "secondary-fixed-dim": "#3b82f6",
        "on-secondary-fixed": "#11337a",
        "on-secondary-fixed-variant": "#2563eb",
        tertiary: "#7a6f9e",
        "tertiary-container": "#eff6ff",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#332a55",
        "tertiary-fixed": "#eff6ff",
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
        "surface-container": "#eef4ff",
        "surface-container-high": "#eae9f7",
        "surface-container-highest": "#dbeafe",
        "surface-variant": "#e7f0ff",
        "surface-tint": "#2563eb",
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
        border: "#dbeafe",
        brand: "#1d4ed8",
        "brand-hover": "#2563eb",
        "brand-soft": "#dbeafe",
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
        glow: "0 1px 2px rgba(5,3,21,0.05), 0 12px 32px -14px rgba(37, 99, 235,0.18)",
        "glow-sm": "0 1px 2px rgba(5,3,21,0.06)",
        card: "0 1px 2px rgba(5,3,21,0.04), 0 8px 24px -14px rgba(5,3,21,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
