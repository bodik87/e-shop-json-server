/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "json-server-vercel-shop.vercel.app",
      },
    ],
  },
};

export default nextConfig;
