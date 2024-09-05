/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: ["prettier-plugin-tailwindcss"],
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
        border: "var(  --color-grayborder)",
      },
      fontFamily: {
        Urbanist: ["Urbanist", "sans-serif"],
      },
      fontWeight: {
        semibold: 600,
        bold: 700,
        normal: 400,
      },
      fontSize: {
        xs: "0.75rem",
        small: "0.9rem",
        base: "1.1rem",
        lg: "1.3rem",
        xl: "2rem",
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

      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom,#44bbfe , #1e78fe)",

        "another-gradient": "linear-gradient(to bottom,#FFCF53 , #FF9900)",
        "expense-gradient": "linear-gradient(to bottom,#FFFF , #FF9900)",
        "income-gradient": "linear-gradient(to bottom,#FFFF , #1e78fe)",
      },
    },
  },
};
