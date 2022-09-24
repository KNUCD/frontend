/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", 'storage.googleapis.com', "*"]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
  
    return config;
  },
  reactStrictMode: true,
  pageExtensions: ['tsx'],
  trailingSlash: false,
  experimental: {
    styledComponents: true,
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;
