"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navigation from "../components/Navigation";
import { checkInSpots } from "../lib/data";

// Check-in Spot Rating component
const SpotRating: React.FC<{ level: number; label: string }> = ({
  level,
  label,
}) => (
  <div className="flex items-center">
    <span className="text-gray-600 text-sm mr-2 w-14">{label}:</span>
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < level ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  </div>
);

// Image Carousel component
const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [showFullImage, setShowFullImage] = useState(false);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent triggering the full image view
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent triggering the full image view
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const openFullImage = () => {
    if (!imageErrors[currentIndex]) {
      setShowFullImage(true);
      // When opening full image view, prevent scrolling
      document.body.style.overflow = "hidden";
    }
  };

  const closeFullImage = () => {
    setShowFullImage(false);
    // Restore scrolling when closing
    document.body.style.overflow = "";
  };

  // Handle escape key to close the full image
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeFullImage();
      }
    };

    if (showFullImage) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      // Ensure scrolling is restored when component unmounts
      document.body.style.overflow = "";
    };
  }, [showFullImage]);

  return (
    <>
      <div
        className="relative h-64 w-full overflow-hidden rounded-xl cursor-pointer"
        onClick={openFullImage}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full w-full">
              {imageErrors[index] ? (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-2 text-gray-500 text-sm">图片准备中</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity duration-300"
                  onError={() => handleImageError(index)}
                />
              )}
            </div>
          </div>
        ))}

        {!imageErrors[currentIndex] && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
            <div className="bg-white/80 rounded-full p-2">
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Full-screen image modal */}
      {showFullImage && !imageErrors[currentIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeFullImage}
        >
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
              onClick={closeFullImage}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Main image container */}
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-4">
              <div className="relative w-full h-full">
                <Image
                  src={images[currentIndex]}
                  alt={`Full size image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
                />
              </div>
            </div>

            {/* Navigation buttons for fullscreen view */}
            {images.length > 1 && (
              <div className="w-full absolute bottom-4 px-4 flex justify-between items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(index);
                      }}
                      className={`h-3 w-3 rounded-full ${
                        index === currentIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Extract all unique categories
const allCategories = Array.from(
  new Set(checkInSpots.flatMap((spot) => spot.categories))
);

export default function CheckInPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Add a console note about placeholder images
  useEffect(() => {
    console.log(
      "注意：打卡点的图片目前是占位符图片，请将实际图片放入 public/images/checkin/ 目录，并使用相应的文件名，如 dandong-wall-1.jpg、jojo-coffee-1.jpg 等。"
    );
  }, []);

  // Filter check-in spots based on active category
  const filteredCheckInSpots = checkInSpots.filter((spot) => {
    if (activeCategory === null) return true;
    return spot.categories.includes(activeCategory);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-800 text-white py-20 pt-36">
        <div
          className="container mx-auto px-4"
          style={{
            opacity: 0,
            animation: "fadeIn 0.5s ease-out forwards",
          }}
        >
          <h1 className="heading-1 mb-6">丹东打卡点</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            发现丹东市区周边的热门打卡地点，大半天就能逛完
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            {/* Add transportation guide link */}
            <div className="mt-4">
              <a
                href="/#transportation-guide"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                查看高铁站到景点交通指南
              </a>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`filter-button px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${
                  activeCategory === null
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              style={{ animationDelay: "0ms" }}
            >
              全部
            </button>

            {allCategories.map((category, idx) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`filter-button px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    activeCategory === category
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Check-in Spots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredCheckInSpots.map((spot, index) => (
              <div
                key={spot.id}
                className="check-in-spot bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ImageCarousel images={spot.images} />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {spot.id}️⃣ {spot.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        spot.isFree
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {spot.isFree ? "免费" : spot.price}
                    </span>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-1">
                    {spot.categories.map((category) => (
                      <span
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">
                    {spot.description}
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 gap-2">
                      <SpotRating level={spot.ratings.photo} label="出片" />
                      <SpotRating
                        level={spot.ratings.difficulty}
                        label="难度"
                      />
                      <SpotRating
                        level={spot.ratings.transportation}
                        label="交通"
                      />
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 text-sm text-gray-600">
                      {spot.location}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start">
                    <svg
                      className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 text-sm text-gray-600">
                      {spot.tips}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-10 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">想发现更多丹东的精彩？</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            除了这些打卡点，丹东还有许多值得探索的景点、美食和文化体验等待着你的发现。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="px-6 py-2 bg-white text-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              返回主页
            </a>
            <a
              href="/attractions"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:shadow-md hover:bg-blue-600 transition-all"
            >
              探索更多景点
            </a>
            <a
              href="/food"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg shadow-sm hover:shadow-md hover:bg-orange-600 transition-all"
            >
              探索美食老字号
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
