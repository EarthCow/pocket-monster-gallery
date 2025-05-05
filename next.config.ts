import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [new URL('https://raw.githubusercontent.com/**')]
    },
    skipTrailingSlashRedirect: true,
    trailingSlash: true,
    output: "export",
    basePath: "/projects/pocket-monster-gallery",
};

export default nextConfig;
