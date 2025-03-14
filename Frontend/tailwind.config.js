import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        textColor: "#191615",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-headings": theme("colors.gray.900"), // Light mode color
            "--tw-prose-paragraph": theme("colors.gray.800"), // Light mode color
            p: {
              marginTop: 0,
              marginBottom: 0,
            },
            ".tiptap p.is-empty::before": {
              content: "attr(data-placeholder)",
              float: "left",
              height: "0",
              pointerEvents: "none",
            },
            ".tiptap h1.is-empty::before": {
              content: "attr(data-placeholder)",
              float: "left",
              height: "0",
              pointerEvents: "none",
            },
            ".tiptap h2.is-empty::before": {
              content: "attr(data-placeholder)",
              float: "left",
              height: "0",
              pointerEvents: "none",
            },
            ".tiptap h3.is-empty::before": {
              content: "attr(data-placeholder)",
              float: "left",
              height: "0",
              pointerEvents: "none",
            },
          },
        },
        dark: {
          css: {
            "--tw-prose-headings": theme("colors.gray.100"), // Dark mode color
            "--tw-prose-paragraph": theme("colors.gray.300"), // Dark mode color
            ".tiptap p.is-empty::before": {
              color: theme("colors.gray.500"), // Placeholder color in dark mode
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), typography],
};


