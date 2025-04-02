'use client';

import React from 'react';
import Navigation from '../components/Navigation';
import AttractionCard from '../components/AttractionCard';
import { attractions } from '../lib/data';

export default function AttractionsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attractions.map((attraction, index) => (
                <AttractionCard
                  key={attraction.id}
                  attraction={attraction}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 