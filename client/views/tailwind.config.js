/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image":
          "url(https://tailwindcss.com/_next/static/media/hero-dark@90.dba36cdf.jpg)",
      },
    },
  },
  plugins: [],
};
