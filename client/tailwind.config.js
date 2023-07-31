/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            baseDark: "#121212",
            textDark: colors.gray,
            textSecDark: "#a7a7a7",
            secDark: "#181818",
            ...colors,
        },
        extend: {},
    },
    plugins: [],
};
