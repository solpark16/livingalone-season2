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
