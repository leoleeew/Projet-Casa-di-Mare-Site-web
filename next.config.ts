import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local images in /public are served without configuration.
    // Add remotePatterns here if you later host images on an external CDN.
    remotePatterns: [],
  },
};

export default nextConfig;
