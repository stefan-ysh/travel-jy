'use client';

import React from 'react';
import Navigation from '../components/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import { foodCategories, restaurants } from '../lib/data';

export default function FoodPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white py-20">
          <div 
            className="container mx-auto px-4"
            style={{
              opacity: 0,
              animation: 'fadeIn 0.5s ease-out forwards'
            }}
          >
            <h1 className="heading-1 mb-6">丹东美食之旅</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              探索丹东独特的美食文化，从海鲜到朝鲜族美食，
              让您的味蕾享受一场难忘的盛宴。
            </p>
          </div>
        </section>

        {/* Food Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {foodCategories.map((category, index) => (
                <div 
                  key={category.id}
                  className="flex flex-col lg:flex-row gap-12 items-center"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out forwards ${index * 0.2}s`
                  }}
                >
                  <div className={`w-4/5 lg:w-1/2 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className={`lg:w-1/2 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.dishes.map((dish, dishIndex) => (
                        <div 
                          key={dishIndex}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <h3 className="font-semibold text-gray-900">{dish.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{dish.description}</p>
                          <div className="flex justify-between mt-2 text-sm">
                            <span className="text-secondary-600">{dish.price}</span>
                            <span className="text-gray-500">{dish.season}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Restaurants */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">推荐餐厅</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurants.map((restaurant, index) => (
                <div 
                  key={restaurant.name}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                  style={{
                    opacity: 0,
                    animation: `fadeInScale 0.5s ease-out forwards ${index * 0.1}s`
                  }}
                >
                  <div className="relative h-48">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
                    <p className="text-gray-600 mb-4">{restaurant.description}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>地址：{restaurant.address}</p>
                      <p>营业时间：{restaurant.openTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-2 mb-6">开启您的美食之旅</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              让我们带您探索丹东的美食文化，
              品尝最地道的美味。
            </p>
            <Link 
              href="/attractions" 
              className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors transform hover:scale-105 duration-300"
            >
              查看景点美食
            </Link>
          </div>
        </section>
      </main>
    </>
  );
} 