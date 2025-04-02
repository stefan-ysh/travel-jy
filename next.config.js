/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static image imports from external URLs
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.dandong.gov.cn',
      },
      {
        protocol: 'https',
        hostname: 'bbs.djicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'p6.itc.cn',
      },
      {
        protocol: 'https',
        hostname: 'www.cnfhs.com',
      },
      {
        protocol: 'https',
        hostname: 'bkimg.cdn.bcebos.com',
      },
      {
        protocol: 'https',
        hostname: 'p1.ssl.qhimg.com',
      },
      {
        protocol: 'https',
        hostname: 'dimg04.c-ctrip.com',
      },
      {
        protocol: 'https',
        hostname: 'ts1.tc.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'p4.itc.cn',
      },
    ],
  },
};

module.exports = nextConfig;
