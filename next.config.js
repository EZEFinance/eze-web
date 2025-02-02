/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.aceternity.com", "static.bymj.io", "statics.solscan.io"]
  }
};

export default nextConfig;
