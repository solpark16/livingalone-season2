import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      backgroundSize: {
        "50%": "50%",
        "70%": "70%",
        "75%": "75%",
        "40%": "40%",
        "30%": "30%",
        "25%": "25%",
        "20%": "20%",
        "10%": "10%",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontWeight: {
        bold: "600",
        medium: "400",
        regular: "200",
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        main: {
          7: "#00A894",
          6: "#00D3BA",
          5: "#51E6D5",
          4: "#95F2E7",
          3: "#B8FAF2",
          2: "#E5FAF8",
          1: "#FAFFFE",
        },
        red: {
          6: "#FF3232",
          5: "#FF5C5C",
          4: "#FF8181",
          3: "#FFAAAA",
          2: "#FFC5C5",
          1: "#FFE5E5",
        },
        yellow: {
          6: "#E4C000",
          5: "#FFD600",
          4: "#FFDF39",
          3: "#FFE458",
          2: "#FFE978",
          1: "#FFF7CA",
        },
        blue: {
          6: "#268AFF",
          5: "#499DFF",
          4: "#62AAFF",
          3: "#86BEFF",
          2: "#B0D4FF",
          1: "#D8EAFF",
        },
        gray: {
          6: "#3B3B3B",
          5: "#838383",
          4: "#B2B2B2",
          3: "#D9D9D9",
          2: "#E6E6E6",
          1: "#F4F4F4",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
