/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  turbopack: {},

  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'devcdn.2ndcareers.com',
      //   pathname: '/**',
      // },
    ],
  },

  devIndicators: false,

  //SVG support
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;