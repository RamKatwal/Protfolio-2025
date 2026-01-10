import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"

const config: Config = {
  darkMode: "class",
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
        // Headings - Reduced by ~20-25%
        "h1": ["2.25rem", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.02em" }], // 36px (was 48px)
        "h2": ["1.75rem", { lineHeight: "1.25", fontWeight: "700", letterSpacing: "-0.01em" }], // 28px (was 36px)
        "h3": ["1.5rem", { lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.01em" }], // 24px (was 30px)
        "h4": ["1.25rem", { lineHeight: "1.35", fontWeight: "600", letterSpacing: "0" }], // 20px (was 24px)
        "h5": ["1.0625rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0" }], // 17px (was 20px)
        "h6": ["0.9375rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0" }], // 15px (was 18px)
        // Body Text - Reduced
        "body-lg": ["0.9375rem", { lineHeight: "1.6", fontWeight: "400" }], // 15px (was 18px)
        "body": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }], // 14px (was 16px)
        "body-sm": ["0.8125rem", { lineHeight: "1.5", fontWeight: "400" }], // 13px (was 14px)
        // UI Text - Reduced
        "label": ["0.8125rem", { lineHeight: "1.4", fontWeight: "500" }], // 13px (was 14px)
        "caption": ["0.6875rem", { lineHeight: "1.4", fontWeight: "400" }], // 11px (was 12px)
        "small": ["0.625rem", { lineHeight: "1.4", fontWeight: "400" }], // 10px (was 11px)
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
      keyframes: {
        borderTop: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(500%)' },
        },
        borderRight: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(500%)' },
        },
        borderBottom: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-500%)' },
        },
        borderLeft: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-500%)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        shimmerSlide: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        borderTop: 'borderTop 2.5s linear infinite',
        borderRight: 'borderRight 2.5s linear infinite 0.625s',
        borderBottom: 'borderBottom 2.5s linear infinite 1.25s',
        borderLeft: 'borderLeft 2.5s linear infinite 1.875s',
        shimmer: 'shimmer 2s ease-in-out infinite',
        shimmerSlide: 'shimmerSlide 3s linear infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
}

export default config
