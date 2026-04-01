import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** Monorepo: ignore all app build output (root `.next/**` misses `frontend/.next`, `backend/.next`). */
const eslintConfig = defineConfig([
  globalIgnores([
    "**/.next/**",
    "**/node_modules/**",
    "out/**",
    "build/**",
  ]),
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Monorepo uses App Router under `frontend/` and `backend/`, not root `pages/`.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    files: ["frontend/**/*.{js,jsx,ts,tsx,mjs}"],
    settings: {
      next: {
        rootDir: "frontend",
      },
    },
  },
  {
    files: ["backend/**/*.{js,jsx,ts,tsx,mjs}"],
    settings: {
      next: {
        rootDir: "backend",
      },
    },
  },
  {
    files: ["prisma/**/*.js", "backend/scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;
