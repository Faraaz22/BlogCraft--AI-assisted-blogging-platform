import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tse3.mm.bing.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "tse4.mm.bing.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
      }
    ],
  },
  devIndicators: false,
};

export default nextConfig;
