import type { NextConfig } from "next";
import * as path from 'path';

const nextConfig: NextConfig = {
  // Avoid bundling Prisma into Turbopack chunks (fewer odd source-map / runtime issues)
  serverExternalPackages: ["@prisma/client", "prisma"],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  devIndicators: false,
};

export default nextConfig;
