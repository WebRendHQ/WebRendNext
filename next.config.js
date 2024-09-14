/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    // This base path should match your repository name
    basePath: '/WebRendNew',
  }
  
  module.exports = nextConfig