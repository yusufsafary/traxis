/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
      colors: {
        background: "hsl(220 15% 7%)",
        foreground: "hsl(210 20% 92%)",
        border: "hsl(220 12% 16%)",
        primary: "hsl(0 84% 55%)",
        muted: "hsl(220 12% 13%)",
        "muted-foreground": "hsl(210 15% 52%)",
        sidebar: "hsl(220 16% 8%)",
      },
    },
  },
  plugins: [],
};
