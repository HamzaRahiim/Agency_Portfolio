import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // REWRITES - Proxy API requests (hide actual API URL)
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/external/:path*",
  //       destination: "https://api.example.com/:path*", // Proxy to external API
  //     },
  //   ];
  // },
  /* config options here */
  // Completely disable source maps as recommended in the docs you shared
  // to avoid server-side source-map parsing issues in dev/build.
  productionBrowserSourceMaps: false,
  // Per docs, this top-level flag controls prerender source maps
  // when using cacheComponents / prerendering.
  enablePrerenderSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console.log in production
  },
  // TYPESCRIPT - Ignore errors during build (not recommended for production!)
  typescript: {
    ignoreBuildErrors: false, // Keep true for strict type checking
  },
  // Disable server source maps in dev to avoid Turbopack's
  // "Invalid source map" console noise on Windows.
  experimental: {
    serverSourceMaps: false,
  },
};

export default nextConfig;

// Think of it as the settings panel for your Next.js app. It's where you configure how Next.js should:

// Build your app
// Handle images
// Set up redirects/rewrites
// Configure domains
// Optimize performance
// And much more!

// --------------------------------
// When Do You Need to Modify This File?
// Common Real-World Scenarios:

// Adding external image domains (most common!)
// Setting up environment variables
// Configuring redirects or rewrites
// Enabling/disabling features
// Adding custom webpack config
// Setting up internationalization (i18n)
// Optimizing bundle size

// --------------------------------
// Summary - When to Use What
// FeatureWhen to Use
// images.remotePatterns - Using external images (Cloudinary, Unsplash, etc.)
// redirects - Changed URL structure, SEO
// rewrites - Hide backend API URL
// headers - Add security headers
// i18n - Multi-language site
// compiler.removeConsole - Remove logs in production
// webpack - Fix module errors, custom loaders
// experimental - Enable beta features

// --------------------------------
// Advanced Professional Configuration
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // IMAGES
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         pathname: '/myaccount/**',
//       },
//     ],
//     minimumCacheTTL: 60, // Cache images for 60 seconds
//     dangerouslyAllowSVG: true, // Allow SVG images
//     contentDispositionType: 'attachment', // Force download SVGs
//     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
//   },

//   // INTERNATIONALIZATION (i18n)
//   i18n: {
//     locales: ['en', 'ur', 'ar'],
//     defaultLocale: 'en',
//     localeDetection: true, // Auto-detect user language
//   },

//   // COMPILER OPTIONS
//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production', // Remove console.log in production
//     styledComponents: true, // Enable if using styled-components
//   },

//   // WEBPACK CUSTOMIZATION
//   webpack: (config, { isServer }) => {
//     // Add custom webpack plugins or loaders
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false, // Fix "Module not found: Can't resolve 'fs'"
//       };
//     }
//     return config;
//   },

//   // EXPERIMENTAL FEATURES
//   experimental: {
//     optimizePackageImports: ['lodash', 'date-fns'], // Tree-shake these packages
//     serverActions: {
//       bodySizeLimit: '2mb', // Max size for Server Actions
//     },
//   },

//   // OUTPUT - For hosting on different platforms
//   output: 'standalone', // For Docker containers

//   // PAGE EXTENSIONS - Support custom file extensions
//   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

//   // POWEREDBY HEADER - Remove "X-Powered-By: Next.js"
//   poweredByHeader: false,

//   // COMPRESSION
//   compress: true, // Enable gzip compression

//   // TRAILING SLASH
//   trailingSlash: false, // /about vs /about/

//   // STRICT MODE
//   reactStrictMode: true, // Enable React strict mode (recommended)

//   // SWC MINIFICATION
//   swcMinify: true, // Faster minification than Terser
// };

// export default nextConfig;
