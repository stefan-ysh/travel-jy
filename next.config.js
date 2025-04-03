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
        protocol: 'http',
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
      {
        protocol: 'https',
        hostname: 'picx.zhimg.com',
      },
      {
        protocol: 'https',
        hostname: 'pics2.baidu.com',
      },
      {
        protocol: 'https',
        hostname: 'pic1.zhimg.com',
      },
      {
        protocol: 'https',
        hostname: 'pic3.zhimg.com',
      },
      {
        protocol: 'https',
        hostname: 'bkimg.cdn.bcebos.com',
      },
      {
        protocol: 'https',
        hostname: 'img95.699pic.com',
      },
      {
        protocol: 'https',
        hostname: 'pics2.baidu.com',
      },
      {
        protocol: 'https',
        hostname: 'img.zcool.cn',
      },
      {
        protocol: 'https',
        hostname: 'pic.nximg.cn',
      },
      {
        protocol: 'https',
        hostname: 'tse1-mm.cn.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'cp1.douguo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.shuomingshu.cn',
      },
      {
        protocol: 'https',
        hostname: 'ts1.tc.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'tse4-mm.cn.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'pica.zhimg.com',
      },
      {
        protocol: 'https',
        hostname: 'pic2.zhimg.com',
      },
      {
        protocol: 'https',
        hostname: 'pic4.zhimg.com',
      },
      {
        protocol: 'https',
        hostname: 'nimg.ws.126.net',
      },
      {
        protocol: 'http',
        hostname: 'inews.gtimg.com',
      },
      {
        protocol: 'http',
        hostname: 'p1.ssl.qhimg.com',
      },
      {
        protocol: 'https',
        hostname: 'pics.lvjs.com.cn',
      },
      {
        protocol: 'https',
        hostname: 'ts1.cn.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'p9.itc.cn',
      },
      {
        protocol: 'https',
        hostname: 'c-ssl.duitang.com',
      },
      {
        protocol: 'https',
        hostname: 'img3.jiemian.com',
      },
    ],
  },
};

module.exports = nextConfig;
