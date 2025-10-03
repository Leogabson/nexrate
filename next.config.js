/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // in case we add GitHub login later
      },
    ],
  },
  experimental: {
    optimizeCss: false, // 🚫 disables lightningcss to fix Vercel build error
  },
};

module.exports = nextConfig;
