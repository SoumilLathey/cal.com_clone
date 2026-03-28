import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3 only used locally (when TURSO_URL is not set)
  // On Vercel, the Turso HTTP adapter is used instead (pure fetch)
  serverExternalPackages: ['better-sqlite3'],
};

// Restart triggered automatically
// Reloading variables...
// Nodemailer reload triggered
export default nextConfig;
