import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "丹东旅游攻略 - 探索鸭绿江畔的魅力之城",
  description: "发现丹东最佳旅游景点、特色美食、文化体验。为您的丹东两日游提供完整攻略和路线规划。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="丹东旅游攻略 - 探索鸭绿江畔的魅力之城" />
        <meta name="keywords" content="丹东, 旅游, 攻略, 景点, 美食, 文化, 路线" />
        <meta name="author" content="丹东旅游攻略" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <script defer src="https://umami.tiantian.group/script.js" data-website-id="a071602f-e623-40d9-a4c4-6a7fcd55e9a1"></script>
      </head>
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
} 