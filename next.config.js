const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  basePath: isProd ? '/WebRendNew' : '',
  assetPrefix: isProd ? '/WebRendNew/' : '',
};

module.exports = nextConfig;
