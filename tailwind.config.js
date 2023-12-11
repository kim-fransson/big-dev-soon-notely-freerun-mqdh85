import headlessui from "@headlessui/tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          400: "#42A5F5",
          500: "#2196F3",
        },
        orange: {
          200: "#FFCC80",
          900: "#E65100",
        },
        green: {
          200: "#A5D6A7",
          900: "#1B5E20",
        },
        gray: {
          200: "#EEEEEE",
          600: "#757575",
          900: "#212121",
        },
        red: {
          400: "#EF5350",
          500: "#F44336",
        },
        "deep-purple": {
          200: "#b39ddb",
          900: "#4527A0",
        },
      },
      opacity: {
        12: ".12",
        24: ".24",
        32: ".32",
        36: ".36",
        87: ".87",
      },
    },
  },
  plugins: [
    headlessui,
    lineClamp,
    // https://github.com/tailwindlabs/tailwindcss-intellisense/issues/227#issuecomment-1139895799
    ({ addUtilities }) => {
      addUtilities({
        ".header-s": {
          "font-size": "24px",
          "font-weight": "600",
          "letter-spacing": "0.24px",
        },
        ".header-xs": {
          "font-size": "20px",
          "font-weight": "500",
          "letter-spacing": "0.24px",
        },
        ".button-text": {
          "font-size": "16px",
          "font-weight": "500",
          "letter-spacing": "1.25px",
        },
        ".body": {
          "font-size": "16px",
          "font-weight": "400",
          "letter-spacing": "0.5px",
        },
        ".body-2": {
          "font-size": "14px",
          "font-weight": "500",
          "letter-spacing": "0.25px",
        },
        ".caption": {
          "font-size": "12px",
          "font-weight": "400",
          "letter-spacing": "0.4px",
        },
        ".label": {
          "font-size": "16px",
          "font-weight": "600",
          "letter-spacing": "0.5px",
        },
        ".input": {
          "font-size": "16px",
          "font-weight": "500",
          "letter-spacing": "0.5px",
        },
      });
    },
  ],
};
