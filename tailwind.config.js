/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: { lg:{max: "1500px"},  md: { max: "1250px" }, sm: { max: "782px" } },
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
      },
      colors: {
        // themePink: "#F54363",
        themeNavyBlue: "#14212b",
        themePink: "#2DB400",
        themeBlue: "#01CBC4",
        themeYellow: "#FFC542",
        themeBlack: {
          200: '#6A6A6A',
          300: "#000000",
          400: "#565656",
          500: "#737373",
          900: "#000000",
        },
         themeGrey: {
            50: "#A0A0A0",
            70: "#E5E5E5",
           100: "#D9DFE6",
           150: "#cacaca",
           200: "##9CA3AF",
           300: "#808B9A",
           400: "#F3F3F3",
           500: "#E3E3E8",
           600: "#EFEFF2"
         }
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.checkbox': {
          appearance: 'none',
          width: '1rem',
          height: '1rem',
          backgroundColor: 'white',
          borderWidth: '2px',
          borderColor: '#E3E3E8',
          borderRadius: '0.25rem',
          display: 'inline-block',
          position: 'relative',
          cursor: 'pointer',
          '&:checked': {
            backgroundColor: '#2DB400',
            borderColor: '#2DB400',
            '&::after': {
              content: '"✓"',
              display: 'block',
              color: 'white',
              fontSize: '0.8rem',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          },
        },
      });
    },
    function ({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },
      });
    },
  ],
}

