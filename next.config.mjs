/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "wtgehzvyirdsifnqqfzn.supabase.co",
      },
    ],
    loader: "custom",
    loaderFile: "./src/utils/supabase-image-loader.js",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    minimumCacheTTL: 60,
    path: "/_next/image",
  },

  // async headers() {
  //   return [
  //     {
  //       source: "/_next/static/:path*",
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=31536000, immutable",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default async () => {
  const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
    enabled: process.env.ANALYZE === "true",
    openAnalyzer: false,
  });

  return withBundleAnalyzer(nextConfig);
};
