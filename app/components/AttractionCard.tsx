'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ClockIcon, TicketIcon, CalendarIcon, XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFullImage, setShowFullImage] = useState(false);
  const [fullImageIndex, setFullImageIndex] = useState(0);
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    className: "attraction-slider",
  };

  const openFullImage = (index: number) => {
    setFullImageIndex(index);
    setShowFullImage(true);
    // Pause body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeFullImage = () => {
    setShowFullImage(false);
    // Resume body scrolling
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setFullImageIndex((prev) => (prev === attraction.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setFullImageIndex((prev) => (prev === 0 ? attraction.images.length - 1 : prev - 1));
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showFullImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeFullImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFullImage]);

  return (
    <>
      <div
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        style={{
          opacity: 0,
          animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`,
        }}
      >
        <div className="relative h-48 w-full">
          <Slider {...sliderSettings}>
            {attraction.images.map((image, imageIndex) => (
              <div 
                key={imageIndex} 
                className="relative h-48 w-full cursor-pointer"
                onClick={() => openFullImage(imageIndex)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={imageIndex === 0}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white bg-black bg-opacity-50">
                  {currentSlide === imageIndex && image.alt}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                  <span className="text-white text-sm font-medium px-2 py-1 rounded-full bg-black bg-opacity-50">
                    点击查看大图
                  </span>
                </div>
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

      {/* Full Image Modal */}
      {showFullImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" onClick={closeFullImage}>
          <div className="relative w-full h-full max-w-4xl max-h-screen p-4 flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
              onClick={closeFullImage}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <button 
                className="absolute left-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={attraction.images[fullImageIndex].url}
                  alt={attraction.images[fullImageIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                  <p className="text-sm bg-black bg-opacity-50 mx-auto inline-block px-4 py-2 rounded-full">
                    {attraction.images[fullImageIndex].alt}
                  </p>
                </div>
              </div>
              
              <button 
                className="absolute right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ArrowRightIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
              {attraction.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`w-16 h-12 relative border-2 transition-all ${idx === fullImageIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  onClick={() => setFullImageIndex(idx)}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 