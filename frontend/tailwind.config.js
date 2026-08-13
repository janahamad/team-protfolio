/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        page: "rgb(var(--color-page) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        subtle: "rgb(var(--color-subtle) / <alpha-value>)",
        heading: "rgb(var(--color-heading) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        faint: "rgb(var(--color-faint) / <alpha-value>)",
        "accent-start": "rgb(var(--color-accent-start) / <alpha-value>)",
        "accent-end": "rgb(var(--color-accent-end) / <alpha-value>)",
        "accent-soft": "rgb(var(--color-accent-soft) / <alpha-value>)",
        hero: "rgb(var(--color-hero) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
