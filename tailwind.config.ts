import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-plex-mono)", "IBM Plex Mono", "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        vera: {
          navy: "#1A3A5C",
          deep: "#0F2540",
          night: "#07182A",
          ice: "#E8F2FA",
          light: "#C8DCF0",
          mid: "#4A7BAF",
          white: "#FFFFFF",
          success: "#2ECC71",
          warning: "#F39C12",
          danger: "#E74C3C",
        },
      },
      boxShadow: {
        vera: "0 24px 80px rgba(7, 24, 42, 0.16)",
        glow: "0 0 70px rgba(74, 123, 175, 0.28)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".45", transform: "scale(.82)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        drawLine: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(28px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite",
        shimmer: "shimmer 2.6s ease-in-out infinite",
        drawLine: "drawLine 2s ease forwards",
        rise: "rise .9s cubic-bezier(.16,1,.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
