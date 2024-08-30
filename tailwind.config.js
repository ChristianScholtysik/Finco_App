/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        tBase: "var(--color-text-base)",
        gray: "var(--color-gray)",
        income: "var(--color-income)",
        expenses: "var(--color-expenses)",
        active: "var(--color-tab-active)",
        inactive: "var(--color-tab-inactive)",
      },
      fontFamily: {
        Urbanist: ["Urbanist", "sans-serif"],
      },
      fontWeight: {
        semibold: 600,
        bold: 700,
      },
      fontSize: {
        small: "0.9rem",
        base: "1rem",
        lg: "1.8rem",
        xl: "2 rem",
        xlarge: "1.7rem",
        xxl: "2.2rem",
        medium: "1.2rem",
      },
      borderRadius: {
        large: "1rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
};
