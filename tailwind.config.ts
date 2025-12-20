import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      inter: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        // Headings
        "h1": ["3rem", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.02em" }], // 48px
        "h2": ["2.25rem", { lineHeight: "1.25", fontWeight: "700", letterSpacing: "-0.01em" }], // 36px
        "h3": ["1.875rem", { lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.01em" }], // 30px
        "h4": ["1.5rem", { lineHeight: "1.35", fontWeight: "600", letterSpacing: "0" }], // 24px
        "h5": ["1.25rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0" }], // 20px
        "h6": ["1.125rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0" }], // 18px
        // Body Text
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }], // 18px
        "body": ["1rem", { lineHeight: "1.5", fontWeight: "400" }], // 16px
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }], // 14px
        // UI Text
        "label": ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }], // 14px
        "caption": ["0.75rem", { lineHeight: "1.4", fontWeight: "400" }], // 12px
        "small": ["0.6875rem", { lineHeight: "1.4", fontWeight: "400" }], // 11px
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
}

export default config
