import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Solusi aman buat Turbopack biar gak ngetrack log warning yang bikin risih bray
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;