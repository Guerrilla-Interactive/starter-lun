const NextgenWhitelist = [
  // Display types
  "flex",
  "inline-flex",
  "grid",
  "inline-grid",
  "block",
  "inline-block",
  "table",
  "table-row",
  "table-cell",

  // Gap
  "gap-x-0",
  "gap-x-0.5",
  "gap-x-1",
  "gap-x-1.5",
  "gap-x-2",
  "gap-x-2.5",
  "gap-x-3",
  "gap-x-3.5",
  "gap-x-4",
  "gap-x-5",
  "gap-x-6",
  "gap-x-7",
  "gap-x-8",
  "gap-x-9",
  "gap-x-10",
  "gap-x-11",
  "gap-x-12",
  "gap-x-14",
  "gap-x-16",
  "gap-x-20",
  "gap-x-24",
  "gap-x-28",
  "gap-x-32",
  "gap-x-36",
  "gap-x-40",
  "gap-x-44",
  "gap-x-48",
  "gap-x-52",
  "gap-x-56",
  "gap-x-60",
  "gap-x-64",
  "gap-x-72",
  "gap-x-80",
  "gap-x-96",

  "gap-y-0",
  "gap-y-0.5",
  "gap-y-1",
  "gap-y-1.5",
  "gap-y-2",
  "gap-y-2.5",
  "gap-y-3",
  "gap-y-3.5",
  "gap-y-4",
  "gap-y-5",
  "gap-y-6",
  "gap-y-7",
  "gap-y-8",
  "gap-y-9",
  "gap-y-10",
  "gap-y-11",
  "gap-y-12",
  "gap-y-14",
  "gap-y-16",
  "gap-y-20",
  "gap-y-24",
  "gap-y-28",
  "gap-y-32",
  "gap-y-36",
  "gap-y-40",
  "gap-y-44",
  "gap-y-48",
  "gap-y-52",
  "gap-y-56",
  "gap-y-60",
  "gap-y-64",
  "gap-y-72",
  "gap-y-80",
  "gap-y-96",
]

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  whitelist: [NextgenWhitelist],
  theme: {
    container: {
      center: true,
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "50%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      "accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
      expandContract: {
        "0%, 100%": { height: "0.5rem" }, // h-2 in Tailwind
        "50%": { height: "1.5rem" }, // h-6 in Tailwind
      },
    },
    animation: {
      fadeIn: "fadeIn 0.1s ease-out",
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "expand-contract": "expandContract 2s ease-in-out infinite",
    },
    extend: {
      fontFamily: {

      },

      fontSize: {
        xxs: "0.65rem",
      },

      colors: {

      },
      screens: {
        xs: "375px",
        "menu-breakpoint": "1280px",
        default: "min(85vw, 1320px)",
        wide: "min(90vw, 1920px)",
        narrow: "min(90vw, 900px)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
