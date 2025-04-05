'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import AttractionCard from '../components/AttractionCard';
import { attractions } from '../lib/data';

export default function AttractionsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navigation />
      <main className="pt-16 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div 
            className="container mx-auto px-4"
            style={{
              opacity: 0,
              animation: 'fadeIn 0.5s ease-out forwards'
            }}
          >
            <h1 className="heading-1 mb-6">丹东景点</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              探索丹东最具特色的旅游景点，感受这座边境城市的独特魅力。
              从历史遗迹到自然风光，每个景点都有其动人的故事。
            </p>
          </div>
        </section>

        {/* Attractions Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <>
                <p className="text-center text-gray-600 mb-10">
                  丹东共有 <span className="font-bold text-primary-600">{attractions.length}</span> 个推荐景点，点击图片可查看大图
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {attractions.map((attraction, index) => (
                    <AttractionCard
                      key={attraction.id}
                      attraction={attraction}
                      index={index}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Travel Tips Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="heading-2 text-center mb-8">景点游览小贴士</h2>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm max-w-3xl mx-auto">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                  <p>大部分景点在4-10月期间最佳，春季和秋季气候宜人，是游览的理想季节。</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                  <p>景点门票可在网上预订，部分景点有特殊优惠（学生、老人等）。</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                  <p>丹东公共交通便利，但前往部分远郊景点建议包车或参加一日游团。</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 text-primary-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                  <p>参观鸭绿江断桥等边境景点时，请注意遵守相关规定，不要随意拍摄敏感区域。</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 