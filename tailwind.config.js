/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'arial': ['Arial', 'sans-serif'],
        'pingfangtc': ['pingfangtc', 'sans-serif'],
        'zen': ['Zen Kurenaido', 'sans-serif'],
        'arial-regular': ['arial-regular', 'sans-serif'],
        'arial-medium': ['arial-medium', 'sans-serif'],
        'arial-semibold': ['arial-bold', 'sans-serif'],
        'arial-thin': ['arial-thin', 'sans-serif'],
        'arial-black': ['arial-black', 'sans-serif'],
        'pingfang': ['pingfang', 'sans-serif'],
        'pingfang-medium': ['pingfang-medium', 'sans-serif'],
        'pingfang-semibold': ['pingfang-semibold', 'sans-serif'],
      },
      screens: {
        'xs': '325px',
        'sm': '480px',
        'csm': '540px',
        'csm2': '640px',
        'md': '768px',
        'cmd': '880px',
        'lg': '976px',
        'clg': '1080px',
        'xl': '1280px',
      },
      colors: {
        black: {
          1: '#000000',
          2: '#333333',
          3: '#555555',
        },
        cyan: {
          1: '#00c8c8',
          2: '#88ffff',
        },
        white: {
          1: '#FFF',
          2: '#ccc',
          3: '#eeeeee',
        },
        orange: {
          1: '#ff9527',
        },
      },
      lineHeight: {
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 0%, #00252a, #000e10 22%, #000 29%)',
        'btn-yellow-graident': 'linear-gradient(to bottom, #ffa950, #ff9527)',
        'btn-hover-yellow-gradient': 'linear-gradient(to bottom, #fc9, #ff9527)',
        'btn-cyan-hover-gradient': 'linear-gradient(to bottom, #5ff, #00b8b8)',
        'video-bg': 'linear-gradient(to bottom, #555, #333)',
        'steeper-bg': 'linear-gradient(to bottom, #00e6e6, #00b8b8)',
        'orange-btn': 'linear-gradient(to bottom, #ffa950, #ff9527)',
        'hover-orange': 'linear-gradient(to bottom, #fc9, #ff9527)',
        'press-orange': 'linear-gradient(to bottom, #ffa950, #ff9527)',
        'dark-orange-btn': 'linear-gradient(to bottom, #ff7350, #ff5c27)',
        'cyan-btn': 'linear-gradient(to bottom, #00e6e6, #00b8b8)',
        'hover-cyan': 'linear-gradient(to bottom, #5ff, #00b8b8)',
        'press-cyan': 'linear-gradient(to bottom, #00e6e6, #00b8b8)',
        'contract-bg': 'linear-gradient(to bottom, #333, #202020)',
        'black-grad': 'linear-gradient(to bottom, #333, #252525)',
        'modal-bg': 'linear-gradient(to bottom, #777, #333)',
        'red-bg': 'linear-gradient(to bottom, #ff7350, #ff5c27)',
        'hover-red-bg': 'linear-gradient(to bottom, #ff8d70, #ff7549)',
        'press-red-bg': 'linear-gradient(to bottom, #ff7350, #ff5c27)',
      },
      boxShadow: {
        'cardShadow': '0 0 50px 0 rgba(0, 0, 0, 0.5)',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
}