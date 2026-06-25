import type { Config } from "tailwindcss";

/**
 * "Sleek dark product" design language (Linear / Vercel energy). Near-black
 * surfaces, ONE electric-blue accent, sharp Inter type, hairline borders.
 * Gold is reserved strictly for "earned" (levels/achievement).
 *
 * Token NAMES are preserved so every component keeps working; only VALUES
 * change. outline-variant is near-white so low-alpha hairlines read on black.
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Brand accent = electric blue ───────────────────────
        "on-primary": "#ffffff",
        primary: "#7aa2ff", // accent text/icons/active on near-black
        "primary-fixed": "#1a2742",
        "primary-fixed-dim": "#7aa2ff",
        "primary-container": "#3f6bff", // filled CTA
        "on-primary-container": "#ffffff",
        "on-primary-fixed": "#cddcff",
        "on-primary-fixed-variant": "#7aa2ff",
        "inverse-primary": "#3f6bff",
        secondary: "#8fb0ff",
        "secondary-container": "#3f6bff",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#cddcff",
        "secondary-fixed": "#1a2742",
        "secondary-fixed-dim": "#8fb0ff",
        "on-secondary-fixed": "#cddcff",
        "on-secondary-fixed-variant": "#7aa2ff",
        // Tertiary kept neutral (one accent only) — muted slate
        tertiary: "#9aa0ad",
        "tertiary-container": "#24252b",
        "on-tertiary": "#e7e8ec",
        "on-tertiary-container": "#c8cad2",
        "tertiary-fixed": "#24252b",
        "tertiary-fixed-dim": "#9aa0ad",
        "on-tertiary-fixed": "#e7e8ec",
        "on-tertiary-fixed-variant": "#9aa0ad",
        error: "#ff6b6b",
        "on-error": "#1a0606",
        "error-container": "#3a1414",
        "on-error-container": "#ffd2d2",
        // ── Surfaces — NEAR-BLACK ──────────────────────────────
        canvas: "#0a0a0c", // true page background
        background: "#0a0a0c",
        surface: "#141417",
        "surface-dim": "#0d0d0f",
        "surface-bright": "#1f1f25",
        "surface-container-lowest": "#0c0c0e",
        "surface-container-low": "#121215", // sidebars
        "surface-container": "#161619",
        "surface-container-high": "#1c1c21",
        "surface-container-highest": "#26262d",
        "surface-variant": "#1c1c21",
        "surface-tint": "#7aa2ff",
        // ── On-surface / outlines ──────────────────────────────
        "on-surface": "#f4f4f6", // near-white
        "on-surface-variant": "#9b9ba6", // muted
        "on-background": "#f4f4f6",
        outline: "#6b6b76", // dim labels
        "outline-variant": "#ffffff", // near-white → low-alpha hairlines
        "inverse-surface": "#f4f4f6",
        "inverse-on-surface": "#16161a",
        // Clay kept as a neutral so any stray usage stays subtle, not orange
        clay: "#7c7c87",
        // ── "Earned" accent (gold) — only on things you EARN ───
        earned: "#e0b15e",
        "earned-dim": "#c79741",
        "on-earned": "#241a07",
        // ── Back-compat aliases ────────────────────────────────
        muted: "#9b9ba6",
        border: "#26262d",
        brand: "#7aa2ff",
        "brand-hover": "#3f6bff",
        "brand-soft": "#1a2742",
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
        glow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 10px 30px -12px rgba(0,0,0,0.7)",
        "glow-sm": "0 1px 0 rgba(255,255,255,0.04) inset",
        card: "0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px -14px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
