/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compress: true,
  experimental: { optimizeCss: true },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "store.storeimages.cdn-apple.com",
  //       port: "",
  //       pathname: "",
  //     },
  //   ],
  // },

  //https://store.storeimages.cdn-apple.com/4982/as-im…?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1664472289661
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // https://react-svgr.com/docs/options/
            icon: true,
            dimensions: false,
            svgo: true,
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
