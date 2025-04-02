'use client';

import React from 'react';
import Image from 'next/image';
import { ClockIcon, TicketIcon, CalendarIcon } from '@heroicons/react/24/outline';
import type { Attraction } from '../lib/data';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/attraction-slider.css';

interface AttractionCardProps {
  attraction: Attraction;
  index?: number;
}

export default function AttractionCard({ attraction, index = 0 }: AttractionCardProps) {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      style={{
        opacity: 0,
        animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`,
      }}
    >
      <div className="relative h-48">
        <Slider {...sliderSettings} className="attraction-slider">
          {attraction.images.map((image, imageIndex) => (
            <div key={imageIndex} className="relative h-48">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
        <p className="text-gray-600 mb-4">{attraction.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <TicketIcon className="h-5 w-5 mr-2" />
            <span>{attraction.ticketPrice}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <ClockIcon className="h-5 w-5 mr-2" />
            <span>{attraction.openingHours}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>最佳游览：{attraction.bestTimeToVisit}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {attraction.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 