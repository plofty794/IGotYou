/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "hero-image":
          "url(https://tailwindcss.com/_next/static/media/hero-dark@90.dba36cdf.jpg)",
        "miras-image":
          "url(https://scontent.fmnl13-2.fna.fbcdn.net/v/t1.15752-9/372729449_844664657213124_8801423836061534240_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeF6oj-sywBBhdGrOxRNSqvgmTLDHbJU2ceZMsMdslTZx5r-srkAlthrvAIQO28k42mTBhlpHaG3F1k9wjYnxcRF&_nc_ohc=ToJjPeBRh7MAX9Ssbae&_nc_ht=scontent.fmnl13-2.fna&oh=03_AdSZJvMMVGk6sldL0SS155ohDEjSvueYgUT4qgvNgVYEPw&oe=652B81AC)",
      },
      fontFamily: {
        pacifico: "'Pacifico', cursive",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
