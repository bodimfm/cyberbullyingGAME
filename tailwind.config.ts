import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cores da OAB-Goiás atualizadas
        oab: {
          blue: {
            DEFAULT: "#004A80",  // Azul OAB-GO (tom mais escuro e mais preciso)
            light: "#6496c1",    // Versão mais clara para itens secundários
            dark: "#003A65",     // Versão ainda mais escura para hover/focus
          },
          red: {
            DEFAULT: "#B10000",  // Vermelho OAB-GO (tom mais escuro e mais preciso)
            light: "#CC3333",    // Versão mais clara para itens secundários
            dark: "#8B0000",     // Versão ainda mais escura para hover/focus
          },
          yellow: {
            DEFAULT: "#FFCC00",  // Amarelo para destaques (cor complementar)
          }
        },
        blue: {
          50: "#f0f7ff",
          100: "#e0eefe",
          200: "#bae0fd",
          300: "#7dcbfc",
          400: "#3ab0f8",
          500: "#0e96ea",
          600: "#004A80", // Atualizado para o azul mais preciso da OAB-GO
          700: "#003A65", // Versão mais escura
          800: "#002C4E",
          900: "#001F38",
          950: "#001525",
        },
        red: {
          50: "#fff0f0",
          100: "#ffe0e0",
          200: "#ffc7c7",
          300: "#ffa3a3",
          400: "#ff6a6a",
          500: "#ff3a3a",
          600: "#B10000", // Atualizado para o vermelho mais preciso da OAB-GO
          700: "#8B0000", // Versão mais escura
          800: "#700000",
          900: "#5C0000",
          950: "#4a0000",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

