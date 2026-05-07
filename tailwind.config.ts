import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        navy: {
          950: "hsl(var(--navy-950))",
          900: "hsl(var(--navy-900))",
          800: "hsl(var(--navy-800))",
        },
        brand: {
          700: "hsl(var(--blue-700))",
          500: "hsl(var(--blue-500))",
          400: "hsl(var(--blue-400))",
          300: "hsl(var(--blue-300))",
          100: "hsl(var(--blue-100))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
      },
      boxShadow: {
        vera: "0 24px 80px rgba(7,24,42,.16)",
        glow: "0 0 70px rgba(74,123,175,.28)",
      },
    },
  },
  plugins: [],
};

export default config;
