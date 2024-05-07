const {nextui} = require('@nextui-org/theme');
// import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#8a0000",
                secondary: "#ffff0f",
                suMaroon: "#8a0000",
                suGold: "#FFC420",
                suGray: "#888a8d",
                suBlue: "#0084ae",
                suGreen: "#00827e",
                suPurple: "#614b78",
            },
        },
    },
    darkMode: "class",
  plugins: [nextui({
            themes: {
                dark: {
                    colors: {
                        primary: {
                            DEFAULT: "#ef4444",
                            foreground: "#22d3ee",
                        },
                        background: "#1e2124",
                        focus: "#22c55e",
                        suMaroon: "#8a0000",
                        suGold: "#FFC420",
                        suGray: "#888a8d",
                        suBlue: "#0084ae",
                        suGreen: "#00827e",
                        suPurple: "#614b78",
                    },
                },
            },
        }),
    ],
};
