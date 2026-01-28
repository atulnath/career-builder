import type { NextConfig } from "next";

const repoName = 'career-builder'; // Change to your repo name if different
const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: `/${repoName}/`,
  basePath: `/${repoName}`,
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
