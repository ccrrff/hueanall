import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["lightningcss"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ferfozqxuvhjubwudmpo.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
