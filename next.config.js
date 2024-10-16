const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  transpilePackages: ['three'],
  images: {
    unoptimized: true
  },
  output: 'export',
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  basePath: isProd ? '/WebRendNext' : '',
  assetPrefix: isProd ? '/WebRendNext/' : '',
};

module.exports = nextConfig;
