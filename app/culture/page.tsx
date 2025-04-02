"use client";

import React from "react";
import Navigation from "../components/Navigation";
import Image from "next/image";
import { cultures, cultureHighlights, seasonalActivities } from "../lib/data";

export default function CulturePage() {
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
              animation: "fadeIn 0.5s ease-out forwards",
            }}
          >
            <h1 className="heading-1 mb-6">丹东文化之旅</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              探索这座独特的边境城市，感受中朝文化的交融，
              体验红色文化的震撼，品味地道的美食风情。
            </p>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cultureHighlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className="bg-white p-6 rounded-lg shadow-sm"
                  style={{
                    opacity: 0,
                    animation: `fadeInScale 0.5s ease-out forwards ${
                      index * 0.1
                    }s`,
                  }}
                >
                  <h3 className="text-xl font-bold text-secondary-600 mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600">{highlight.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Activities */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">四季丹东</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {seasonalActivities.map((season, index) => (
                <div
                  key={season.season}
                  className="bg-gray-50 rounded-lg p-6"
                  style={{
                    opacity: 0,
                    animation: `fadeInScale 0.5s ease-out forwards ${
                      index * 0.1
                    }s`,
                  }}
                >
                  <h3 className="text-xl font-bold text-secondary-600 mb-4">
                    {season.season}精选
                  </h3>
                  <ul className="space-y-3">
                    {season.activities.map((activity, actIndex) => (
                      <li
                        key={actIndex}
                        className="flex items-center text-gray-700"
                      >
                        <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {cultures.map((culture, index) => (
                <div
                  key={culture.id}
                  className="flex flex-col lg:flex-row gap-12 items-center"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out forwards ${index * 0.2}s`,
                  }}
                >
                  <div
                    className={`w-4/5 lg:w-1/2 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                      <Image
                        src={culture.image}
                        alt={culture.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className={`lg:w-1/2 space-y-6 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <h2 className="text-3xl font-bold text-gray-900">
                      {culture.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {culture.description}
                    </p>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        特色体验：
                      </h3>
                      <ul className="space-y-3">
                        {culture.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-gray-700"
                          >
                            <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
