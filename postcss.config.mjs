const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // Process Tailwind
    autoprefixer: {}, // Browser support
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {} // Optimize for production
    })
  },
};

export default config;