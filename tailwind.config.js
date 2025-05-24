/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // WoW UI inspired color palette
        primary: {
          DEFAULT: '#F8B700', // WoW gold
          hover: '#FFD54F',
          dark: '#C69500',
        },
        background: {
          DEFAULT: '#0A0A0F',
          light: '#1A1A24',
        },
        accent: {
          DEFAULT: '#00AEFF', // Blizzard blue
          hover: '#33BEFF',
          dark: '#0077CC',
        },
        // WoW class colors
        'class-warrior': '#C79C6E',
        'class-paladin': '#F58CBA',
        'class-hunter': '#ABD473',
        'class-rogue': '#FFF569',
        'class-priest': '#FFFFFF',
        'class-shaman': '#0070DE',
        'class-mage': '#69CCF0',
        'class-warlock': '#9482C9',
        'class-druid': '#FF7D0A',
        'class-death-knight': '#C41F3B',
        // Status colors
        'status-new': '#00AEFF',
        'status-contacted': '#ABD473',
        'status-trial': '#F58CBA',
        'status-rejected': '#C41F3B',
        'status-accepted': '#00FF96',
      },
      fontFamily: {
        // Import custom fonts via CSS
        display: ['LifeCraft', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'wow': '0 0 10px rgba(248, 183, 0, 0.3)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 'box-shadow': '0 0 5px rgba(248, 183, 0, 0.3)' },
          '100%': { 'box-shadow': '0 0 15px rgba(248, 183, 0, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};