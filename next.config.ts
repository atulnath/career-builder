import type { NextConfig } from "next";


const isProd = process.env.NODE_ENV === "production";
const repoName = 'career-builder'; // Change to your repo name if different

const nextConfig: NextConfig = {
  output: "export",
  ...(isProd && {
    assetPrefix: `/${repoName}/`,
    basePath: `/${repoName}`,
  }),
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
