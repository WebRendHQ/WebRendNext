/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  swcMinify: true,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  basePath: '/WebRendNew',
  assetPrefix: '/WebRendNew/',
}
  
  module.exports = nextConfig