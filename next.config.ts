import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid bundling Prisma into Turbopack chunks (fewer odd source-map / runtime issues)
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
