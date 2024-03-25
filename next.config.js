const { createSecureHeaders } = require("next-secure-headers");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compress: process.env.NODE_ENV === "production",
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
  headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...createSecureHeaders(),
          // HSTS Preload: https://hstspreload.org/
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
