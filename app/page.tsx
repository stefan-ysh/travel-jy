"use client";

import React, { useEffect, useState, useRef } from "react";
import Navigation from "./components/Navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { routes, locations, Location, Route } from "./lib/data";

// 声明 AMap 类型
declare global {
  interface Window {
    initMap: () => void;
    AMap: any;
    AMapUI: any;
    handleNavigate: (
      platform: string,
      lng: number,
      lat: number,
      name: string
    ) => void;
  }
}

// 类型映射 比如 food 是美食，attraction 是景点，shopping 是购物，other 是其他
const locationTypeMap = {
  food: "美食",
  attraction: "景点",
  shopping: "购物",
  other: "其他",
};

// 添加设备检测和导航 URL 生成函数
function getNavigationUrls(location: Location) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // 高德地图中坐标顺序是 [lng, lat]，确保 location.position 也是这个顺序
  const lng = location.position[0];
  const lat = location.position[1];

  // 高德地图 API 使用的参数顺序是 lat,lng 而不是 lng,lat
  const gaodeUrls = {
    mobile: `androidamap://navi?sourceApplication=dandong-guide&lat=${lat}&lon=${lng}&dev=0&style=2&name=${encodeURIComponent(
      location.name
    )}`,
    ios: `iosamap://navi?sourceApplication=dandong-guide&lat=${lat}&lon=${lng}&dev=0&style=2&name=${encodeURIComponent(
      location.name
    )}`,
    web: `https://uri.amap.com/navigation?to=${lng},${lat},${encodeURIComponent(
      location.name
    )}&mode=car&coordinate=gaode`,
  };

  // 百度地图中，目的地参数是 lat,lng 的顺序
  const baiduUrls = {
    mobile: `bdapp://map/direction?destination=${lat},${lng}&destination_name=${encodeURIComponent(
      location.name
    )}&mode=driving&coord_type=gcj02&src=webapp.dandong.openAPIdemo`,
    web: `https://api.map.baidu.com/direction?destination=latlng:${lat},${lng}|name:${encodeURIComponent(
      location.name
    )}&mode=driving&coord_type=gcj02&output=html&src=webapp.dandong.openAPIdemo`,
  };

  return { gaodeUrls, baiduUrls };
}

// 添加导航处理函数
function handleNavigation(urls: any, platform: "gaode" | "baidu") {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    if (platform === "gaode") {
      const mobileUrl = isIOS ? urls.gaodeUrls.ios : urls.gaodeUrls.mobile;
      // 尝试打开 APP，如果失败则跳转到 Web 版
      window.location.href = mobileUrl;
      setTimeout(() => {
        window.location.href = urls.gaodeUrls.web;
      }, 2000);
    } else {
      window.location.href = urls.baiduUrls.mobile;
      setTimeout(() => {
        window.location.href = urls.baiduUrls.web;
      }, 2000);
    }
  } else {
    // PC 端直接打开网页版
    window.location.href =
      platform === "gaode" ? urls.gaodeUrls.web : urls.baiduUrls.web;
  }
}

// 修改类型检查
function getMarkerStyle(type: "attraction" | "food" | "shopping" | "other") {
  switch (type) {
    case "attraction":
      return {
        url: "/images/marker-attraction.png",
        size: [25, 35],
        offset: [-12, -35],
      };
    case "food":
      return {
        url: "/images/marker-food.png",
        size: [25, 35],
        offset: [-12, -35],
      };
    default:
      return {
        url: "/images/marker-default.png",
        size: [25, 35],
        offset: [-12, -35],
      };
  }
}

// 添加多边形类型
interface Polygon {
  path: number[][];
  strokeColor: string;
  strokeWeight: number;
  strokeOpacity: number;
  fillColor: string;
  fillOpacity: number;
}

// 缓动函数
const easeInOutQuad = (t: number) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

// Add these type definitions at the top of the file
interface WeatherTip {
  id: string;
  text: string;
}

interface WeatherInfo {
  temperature: string;
  description: string;
  tips: WeatherTip[];
}

interface RouteOverview {
  duration: string;
  distance: string;
  difficulty: string;
  bestTime: string;
  highlights: string[];
}

// Add these components before the main component
const WeatherTag: React.FC<{ tip: WeatherTip }> = ({ tip }) => (
  <span
    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
              bg-blue-50 text-blue-700 hover:bg-blue-100 
              transform hover:scale-105 transition-all duration-200 ease-in-out
              shadow-sm hover:shadow cursor-pointer"
    role="status"
  >
    <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
    </svg>
    {tip.text}
  </span>
);

const InfoItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="group bg-gray-50 rounded-lg p-3 hover:bg-white hover:shadow-md transition-all duration-200">
    <p className="text-gray-700">
      <span className="font-medium text-gray-900">{label}</span>
      {/* <span className="mx-2 text-gray-300">|</span> */}
      <br></br>
      <br></br>
      <span className="group-hover:text-blue-600 transition-colors duration-200 text-sm">
        {value}
      </span>
    </p>
  </div>
);

const RouteHighlight: React.FC<{ highlight: string }> = ({ highlight }) => (
  <li
    className="group flex items-center space-x-3 p-2 rounded-lg
                hover:bg-gray-50 transition-all duration-200"
  >
    <span
      className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500 
                   group-hover:bg-blue-600 group-hover:shadow-lg
                   transform group-hover:scale-110 transition-all duration-200"
    />
    <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
      {highlight}
    </span>
  </li>
);

// Add these new components for the map section
const MapControlButton: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}> = ({ onClick, icon, label, active = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200 ease-in-out
                ${
                  active
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
    title={label}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const LocationCard: React.FC<{
  location: Location;
  isSelected: boolean;
  onClick: () => void;
}> = ({ location, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
                ${
                  isSelected
                    ? "bg-blue-50 border-blue-200 shadow-md transform -translate-y-1"
                    : "bg-white hover:bg-gray-50 border-gray-100"
                }
                border`}
  >
    <div
      className={`absolute top-0 right-0 w-16 h-16 
                    ${
                      location.type === "attraction"
                        ? "bg-blue-100"
                        : location.type === "food"
                        ? "bg-rose-100"
                        : "bg-gray-100"
                    }`}
      style={{
        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
      }}
    >
      <span
        className={`absolute top-2 right-2 text-xs transform rotate-45 font-medium
                       ${
                         location.type === "attraction"
                           ? "text-blue-600"
                           : location.type === "food"
                           ? "text-rose-600"
                           : "text-gray-600"
                       }`}
      >
        {locationTypeMap[location.type]}
      </span>
    </div>

    <div className="space-y-3 pr-8">
      <h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-1">
        {location.name}
      </h3>

      <div className="space-y-2">
        {location.openingHours && (
          <p className="text-xs text-gray-500 flex items-center">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {location.openingHours}
          </p>
        )}
        {location.ticketPrice && (
          <p className="text-xs text-gray-500 flex items-center">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {location.ticketPrice}
          </p>
        )}
      </div>
    </div>
  </div>
);

// Add taxi price reference data
const taxiPriceData = [
  { destination: "机场", distance: 15.2, dayPrice: 32, nightPrice: 33 },
  { destination: "抗美援朝纪念馆", distance: 3, dayPrice: 8, nightPrice: 9 },
  { destination: "断桥", distance: 1.7, dayPrice: 6, nightPrice: 7, note: "路途近，建议步行" },
  { destination: "安东老街", distance: 3.5, dayPrice: 9, nightPrice: 10 },
  { destination: "志愿军公园", distance: 5.7, dayPrice: 13, nightPrice: 14 },
  { destination: "虎山长城", distance: 18.2, dayPrice: 38, nightPrice: 39 },
  { destination: "锦江山公园", distance: 1.3, dayPrice: 6, nightPrice: 7 },
  { destination: "月亮岛", distance: 4.8, dayPrice: 11, nightPrice: 12 },
  { destination: "新柳", distance: 1.9, dayPrice: 6, nightPrice: 7 },
  { destination: "丹东舰", distance: 13, dayPrice: 28, nightPrice: 29 },
  { destination: "国门湾公园", distance: 14.6, dayPrice: 31, nightPrice: 32 },
  { destination: "太阳岛旅游度假区", distance: 15.2, dayPrice: 32, nightPrice: 33 },
  { destination: "元宝山公园", distance: 3.3, dayPrice: 8, nightPrice: 9 },
];

export default function RoutesPage() {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  // const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef(null);
  const [selectedCircle, setSelectedCircle] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const locationsPerPage = 9;

  // Add a console note about placeholder images
  useEffect(() => {
    console.log(
      "注意：打卡点的图片目前是占位符图片，请将实际图片放入 public/images/checkin/ 目录，并使用相应的文件名，如 dandong-wall-1.jpg、jojo-coffee-1.jpg 等。"
    );
  }, []);

  // Extract all location names from the route schedule - both main locations and mustSee spots
  const scheduleLocationNames: string[] = [];

  // Add main locations
  routes.schedule.forEach((item) => {
    scheduleLocationNames.push(item.location);

    // Add mustSee locations if they exist
    if (item.mustSee && Array.isArray(item.mustSee)) {
      scheduleLocationNames.push(...item.mustSee);
    }
  });

  // Define important attractions that should always be shown
  const importantAttractions = [
    "鸭绿江断桥",
    "虎山长城",
    "抗美援朝纪念馆",
    "安东老街",
    "中联大酒店",
    "丹东站",
    "伟豪市场",
    "高社长长白山中韩料理店",
    "鸭绿江畔",
    "老纪烤肉店",
    "白马江炭烤",
    "鸭绿江风景区",
    "江畔文艺咖啡馆",
    "东港海鲜市场-中国贝都",
    "中朝边境一步跨",
    "上河口国门",
    "锦江山公园",
  ];

  // Filter locations to only include those in the schedule
  // Use a more flexible matching approach to handle cases where names might not exactly match
  const filteredLocations = locations.filter((location) => {
    // Always include important attractions
    if (importantAttractions.includes(location.name)) {
      return true;
    }

    // Check for exact matches first
    if (scheduleLocationNames.includes(location.name)) {
      return true;
    }

    // Check if the location name is contained within any schedule location
    return scheduleLocationNames.some(
      (scheduleName) =>
        scheduleName.includes(location.name) ||
        location.name.includes(scheduleName)
    );
  });

  // Calculate which locations to display based on pagination
  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);
  const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);

  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    // 加载高德地图脚本
    const loadMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${process.env.NEXT_PUBLIC_AMAP_KEY}&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    };

    window.initMap = () => {
      if (mapContainer.current) {
        const newMap = new window.AMap.Map(mapContainer.current, {
          zoom: 13,
          center: [124.40189, 40.123693], // 鸭绿江断桥位置
          viewMode: "3D",
          pitch: 0,
          mapStyle: "amap://styles/normal",
        });

        setMap(newMap);
        setMapLoaded(true);
      }
    };

    loadMapScript();

    return () => {
      window.initMap = () => {};
    };
  }, []);

  useEffect(() => {
    if (!map || !mapLoaded) return;

    // 清除现有标记
    markers.forEach((marker: any) => {
      map.remove(marker);
    });

    // 创建信息窗体样式
    const createInfoWindow = (location: Location) => {
      const content = `
        <div class="p-0 min-w-[200px]">
          <div class="font-bold text-lg mb-2">${location.name}</div>
          ${
            location.openingHours
              ? `
            <div class="text-gray-600 text-xs md:text-sm mb-1">
              <span class="font-medium">营业时间：</span>${location.openingHours}
            </div>
          `
              : ""
          }
          ${
            location.ticketPrice
              ? `
            <div class="text-gray-600 text-xs md:text-sm mb-1">
              <span class="font-medium">价位：</span>${location.ticketPrice}
            </div>
          `
              : ""
          }
          ${
            location.phone
              ? `
            <div class="text-gray-600 text-xs md:text-sm mb-1">
              <a href="tel:${location.phone}" class="text-blue-500 hover:text-blue-700">
                <span class="font-medium">电话：</span>${location.phone}
              </a>
            </div>
          `
              : ""
          }
          <div class="flex space-x-2 mt-3 justify-around">
            <button onclick="window.handleNavigate('gaode', ${
              location.position[0]
            }, ${location.position[1]}, '${location.name}')" 
              class="px-2 py-1 bg-[#007AFF] text-white rounded text-xs md:text-sm hover:bg-[#0066CC]">
              高德导航
            </button>
            <button onclick="window.handleNavigate('baidu', ${
              location.position[0]
            }, ${location.position[1]}, '${location.name}')" 
              class="px-2 py-1 bg-[#3385FF] text-white rounded text-xs md:text-sm hover:bg-[#2D78F4]">
              百度导航
            </button>
          </div>
        </div>
      `;

      return new window.AMap.InfoWindow({
        content: content,
        offset: new window.AMap.Pixel(0, -30),
        closeWhenClickMap: true,
      });
    };

    // 添加新标记
    const newMarkers = filteredLocations.map((location, index) => {
      const style = getMarkerStyle(location.type);

      const marker = new window.AMap.Marker({
        position: location.position,
        icon: new window.AMap.Icon({
          ...style,
          imageSize: new window.AMap.Size(style.size[0], style.size[1]),
        }),
        offset: new window.AMap.Pixel(style.offset[0], style.offset[1]),
        extData: { index },
      });

      // 创建信息窗体
      const infoWindow = createInfoWindow(location);

      // 点击标记时显示信息窗体
      marker.on("click", () => {
        infoWindow.open(map, marker.getPosition());
        handleLocationClick(index);
      });

      map.add(marker);
      return { marker, infoWindow };
    });

    setMarkers(newMarkers);

    // 如果有选中的位置，添加高亮效果
    if (selectedLocation !== null) {
      const location = filteredLocations[selectedLocation];
      const circle = new window.AMap.Circle({
        center: location.position,
        radius: 100,
        strokeColor: "#3498db",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#3498db",
        fillOpacity: 0.2,
      });

      // 设置选中状态的圆
      setSelectedCircle(circle);

      // 移除所有高亮圆
      selectedCircle && map.remove(selectedCircle);

      // 添加新的高亮圆
      map.add(circle);

      // 打开选中位置的信息窗体
      const selectedMarker = newMarkers[selectedLocation];
      selectedMarker.infoWindow.open(map, selectedMarker.marker.getPosition());
    }

    // 添加全局导航处理函数
    window.handleNavigate = (
      platform: string,
      lng: number,
      lat: number,
      name: string
    ) => {
      const location = {
        position: [lng, lat],
        name: name,
      };
      const urls = getNavigationUrls(location as Location);
      handleNavigation(urls, platform as "gaode" | "baidu");
    };

    return () => {
      // 清理全局函数
      window.handleNavigate = () => {};
    };
  }, [map, mapLoaded, selectedLocation]);

  const handleLocationClick = (index: number) => {
    if (!map || !mapLoaded) return;

    setSelectedLocation(index);
    const location = filteredLocations[index];

    // 禁用地图交互
    map.setStatus({
      animateEnable: true,
      dragEnable: false,
      zoomEnable: false,
    });

    // 获取当前视图中心点
    const startPoint = map.getCenter();
    const endPoint = location.position;

    let progress = 0;
    const duration = 1000;
    const startTime = Date.now();

    // 动画函数
    const animate = () => {
      const currentTime = Date.now();
      progress = (currentTime - startTime) / duration;

      if (progress >= 1) {
        map.setStatus({
          dragEnable: true,
          zoomEnable: true,
        });
        return;
      }

      const easeProgress = easeInOutQuad(progress);
      const currentLng =
        startPoint.lng + (endPoint[0] - startPoint.lng) * easeProgress;
      const currentLat =
        startPoint.lat + (endPoint[1] - startPoint.lat) * easeProgress;
      const startZoom = map.getZoom();
      const targetZoom = 14;
      const currentZoom = startZoom + (targetZoom - startZoom) * easeProgress;

      map.setZoomAndCenter(currentZoom, [currentLng, currentLat], false);

      requestAnimationFrame(animate);
    };

    animate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <section
        className="relative h-[60vh] flex items-center justify-center text-white"
        style={{
          fontFamily: "font-family",
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/index-banner.png"
            alt="丹东风景"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">JY丹东闺蜜游</h1>
          <p className="text-xl">2025-04-04</p>
        </div>
      </section>

      {/* 路线标题和概览 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section
          aria-labelledby="route-overview"
          className="bg-white rounded-xl shadow-sm p-8 mb-8 
                   hover:shadow-lg transform hover:-translate-y-1 
                   transition-all duration-300 ease-in-out"
        >
          {/* <div className="flex items-center justify-between mb-6">
            <h1 id="route-overview" className="text-xl font-bold text-gray-900">
              {routes.title}
            </h1>
            <div className="px-4 py-2 bg-blue-50 rounded-lg">
              <InfoItem label="出行日期" value={routes.date} />
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                  </svg>
                  天气信息
                </h3>
                <div className="space-y-3">
                  <InfoItem
                    label="温度"
                    value={routes.weatherInfo.temperature}
                  />
                  <p className="text-gray-600 italic bg-white rounded-lg p-3 shadow-sm text-xs">
                    {routes.weatherInfo.description}
                  </p>
                </div>
                <div
                  className="flex flex-wrap gap-2 mt-4"
                  role="list"
                  aria-label="天气提示"
                >
                  {routes.weatherInfo.tips.map((tip, index) => (
                    <WeatherTag
                      key={`weather-tip-${index}`}
                      tip={{ id: `tip-${index}`, text: tip }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 p-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <InfoItem
                      label="行程时长"
                      value={routes.routeOverview.duration}
                    />
                    <InfoItem
                      label="行程距离"
                      value={routes.routeOverview.distance}
                    />
                  </div>
                  <div className="space-y-3">
                    <InfoItem
                      label="难度"
                      value={routes.routeOverview.difficulty}
                    />
                    <InfoItem
                      label="最佳季节"
                      value={routes.routeOverview.bestTime}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-2 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  行程亮点
                </h3>
                <ul
                  className="space-y-2 divide-y divide-gray-100"
                  role="list"
                  aria-label="行程亮点列表"
                >
                  {routes.routeOverview.highlights.map((highlight, index) => (
                    <RouteHighlight
                      key={`highlight-${index}`}
                      highlight={highlight}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8">
              {/* Map Container */}
              <div className="w-full">
                <div className="relative">
                  <div
                    ref={mapContainer}
                    className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg"
                  ></div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                      <MapControlButton
                        onClick={() => map?.setCenter([124.383314, 40.125729])}
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                        }
                        label=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Locations List */}
              <div className="w-full space-y-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    景点列表
                  </h2>
                  <div className="grid grid-cols-3 gap-2">
                    {currentLocations.map((location, index) => (
                      <div
                        key={location.id}
                        onClick={() => handleLocationClick(indexOfFirstLocation + index)}
                        className={`relative p-2 rounded-lg border border-gray-200 cursor-pointer transition-all duration-200 
                                   ${
                                     selectedLocation === (indexOfFirstLocation + index)
                                       ? "bg-blue-50 shadow-md"
                                       : "bg-white hover:bg-gray-50"
                                   }`}
                      >
                        <div
                          className={`absolute top-0 right-0 w-6 h-6 
                                    ${
                                      location.type === "attraction"
                                        ? "bg-blue-100"
                                        : location.type === "food"
                                        ? "bg-rose-100"
                                        : "bg-gray-100"
                                    }`}
                          style={{
                            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                          }}
                        >
                          <span
                            className={`absolute top-0.5 right-0.5 text-[8px] transform rotate-45 font-medium
                                      ${
                                        location.type === "attraction"
                                          ? "text-blue-600"
                                          : location.type === "food"
                                          ? "text-rose-600"
                                          : "text-gray-600"
                                      }`}
                          >
                            {locationTypeMap[location.type]}
                          </span>
                        </div>
                        
                        <div className="pt-1">
                          <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 h-8">
                            {location.name}
                          </h3>
                          
                          {location.openingHours && (
                            <p className="text-[10px] text-gray-500 truncate mt-1">
                              {location.openingHours}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-4 space-x-2">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 rounded ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        ←
                      </button>
                      
                      <span className="text-sm text-gray-500">
                        第 {currentPage} 页 / 共 {totalPages} 页
                      </span>
                      
                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 rounded ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Schedule */}
        <section className="py-5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">详细行程</h2>
            <div className="max-w-4xl mx-auto">
              {routes.schedule.map((item, index) => (
                <div
                  key={index}
                  className="mb-12 bg-white rounded-xl overflow-hidden shadow-sm"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`,
                  }}
                >
                  <div className="relative h-64">
                    <Image
                      src={item.image}
                      alt={item.activity}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-secondary-600 font-medium">
                        {item.time}
                      </div>
                      {item.tickets && (
                        <div className="text-gray-600">
                          门票：{item.tickets.price}
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.activity}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>

                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">位置信息</h4>
                        <p className="text-gray-600">{item.location}</p>
                        <p className="text-gray-600 mt-1">
                          交通：{item.transportation}
                        </p>
                      </div>

                      {item.recommendations && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">推荐美食</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {item.recommendations.map((rec, recIndex) => (
                              <div key={recIndex} className="flex items-center">
                                <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                                <span className="text-gray-600">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.mustSee && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">必看景点</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {item.mustSee.map((spot, spotIndex) => (
                              <div
                                key={spotIndex}
                                className="flex items-center"
                              >
                                <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                                <span className="text-gray-600">{spot}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">💡 小贴士</h4>
                        <p className="text-gray-600">{item.tips}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Travel Tips */}
        <section className="py-5 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">出行贴士</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">出发前准备</h3>
                <ul className="space-y-2">
                  {routes.tips.beforeTrip.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-secondary-600 mr-2">•</span>
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">旅行中注意</h3>
                <ul className="space-y-2">
                  {routes.tips.duringTrip.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-secondary-600 mr-2">•</span>
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">交通建议</h3>
                <ul className="space-y-2">
                  {routes.tips.transportation.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-secondary-600 mr-2">•</span>
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Add link to check-in spots page */}
            <div className="mt-10 text-center">
              <a 
                href="/checkin" 
                className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                查看丹东必去打卡点 →
              </a>
            </div>
          </div>
        </section>

        {/* Taxi Price Reference Table Section */}
        <section id="transportation-guide" className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 5h8m-4 5h4m-8-2a2 2 0 100-4 2 2 0 000 4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14c.34 2.25.18 4-3 4H8c-3.18 0-3.34-1.75-3-4l1-7c.34-2.25 1.18-3 3-3h6c1.82 0 2.66.75 3 3l1 7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">交通出行指南</h2>
                <p className="text-gray-600 max-w-xl mx-auto">从高铁站出发到各景点的出租车价格参考，助您合理规划行程和预算</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="bg-blue-600 py-4 px-6 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-xl font-bold text-white text-center">高铁站到市内景点出租车价格参考表</h2>
                </div>
                
                <div className="p-2 sm:p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            目的地
                          </th>
                          <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            里程 (km)
                          </th>
                          <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            白天价格 (元)
                          </th>
                          <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            夜间价格 (元)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {taxiPriceData.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-blue-50 transition-colors duration-150'}>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.destination}
                              {item.note && <span className="text-xs text-gray-500 block">({item.note})</span>}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                              {item.distance}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                              {item.dayPrice}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                              {item.nightPrice}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500 px-3">
                    <p className="flex items-center font-medium">
                      <svg className="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      注意事项：
                    </p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>以上价格仅供参考，实际费用可能因路况、交通状况等因素有所变化</li>
                      <li>夜间时段（23:00-5:00）价格略高</li>
                      <li>建议使用打车软件或与司机确认价格</li>
                      <li>部分景点周边设有公交站，可考虑乘坐公共交通工具</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Red and Black List Section */}
        <section id="red-black-list" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">红黑榜 | 踩坑提醒</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
              这里汇总了丹东旅行中的必推荐和需谨慎的项目，助你避开旅行中的"坑"，收获更好的旅行体验
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Black List (踩坑警告) */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-red-100">
                <div className="bg-red-600 p-4">
                  <h3 className="text-xl font-bold text-white flex items-center justify-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    踩坑警告
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start pb-4 border-b border-gray-100 bg-red-50 p-3 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-red-700 mb-1">江边"坐船不"骗局 - 重点提醒！</h4>
                        <p className="text-gray-700 text-sm">
                          <span className="bg-red-100 text-red-700 px-1 py-0.5 rounded font-medium">当地人强烈提醒</span>：江边有人喊"坐船不"，<strong>千万别搭理！</strong>这是非常常见的骗局。他们提供的船只通常破旧不安全，且收费高昂，行程与承诺完全不符。正规游船请到官方码头购票，确保安全和服务质量。
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start pb-4 border-b border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-600 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">鸭绿江断桥附近黑车</h4>
                        <p className="text-gray-600 text-sm">断桥周边有不少不打表的黑车，价格比正规出租车高出2-3倍。建议使用打车软件或者步行前往附近景点。</p>
                      </div>
                    </li>
                    <li className="flex items-start pb-4 border-b border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-600 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">假"朝鲜开放日"坑人旅游团</h4>
                        <p className="text-gray-600 text-sm">酒店或断桥附近有"牵驴的"会拦住游客，谎称"今天朝鲜开国门可以进去"，承诺新船、沙发座位、全程导游，收费98元/人。实际是带去"朝鲜民俗村"购物点，游船破旧冰冷，全程在推销纪念品，根本无法进入朝鲜。原定3小时行程拖到4.5小时。避坑提醒：不要轻信路边推销的"朝鲜一日游"。</p>
                      </div>
                    </li>
                    <li className="flex items-start pb-4 border-b border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-600 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">虎山长城假导游</h4>
                        <p className="text-gray-600 text-sm">景区入口处有人自称"官方导游"，收费高昂。正规导游都有正规证件和统一价格，请认准官方售票处提供的服务。</p>
                      </div>
                    </li>
                    <li className="flex items-start pb-4 border-b border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-600 font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">家门口小皮烤串⭐</h4>
                        <p className="text-gray-600 text-sm">所有的烤串都有一股淡淡的苦味，牛肉串很柴，烤皮酱汁味道寡淡，不太好吃。建议避开。</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-600 font-bold">5</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">二纬路鸡蛋果子⭐</h4>
                        <p className="text-gray-600 text-sm">丹东的焖子很有特色，但这家不是主营产品，一打开有酸味，味道一般。炸串也不推荐，建议避开。</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Red List (强烈推荐) */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-100">
                <div className="bg-green-600 p-4">
                  <h3 className="text-xl font-bold text-white flex items-center justify-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    强烈推荐
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    <li className="flex items-start pb-4 border-b border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">小玉烧烤🌟🌟🌟🌟🌟</h4>
                        <p className="text-gray-600 text-sm">烤鸡脖是特色，肋条强烈推荐，黄蚬子是脆甜，油大又鲜。人均90元，为了小玉烧烤还想再去一次。</p>
                      </div>
                    </li>
                    <li className="flex items-start pb-4 border-b border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">永盛海鲜🌟🌟🌟🌟🌟</h4>
                        <p className="text-gray-600 text-sm">鱿鱼必点，一条29块钱，太好吃了！炒叉子味道有点像炒面。人均50元，海鲜可以点半斤，都很新鲜。饭店人很多。</p>
                      </div>
                    </li>
                    <li className="flex items-start pb-4 border-b border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">锅巴土豆🌟🌟🌟🌟🌟</h4>
                        <p className="text-gray-600 text-sm">安东老街里的小吃，外酥里嫩，再加上糖醋拌料。人均12元，非常推荐！</p>
                      </div>
                    </li>
                    <li className="flex items-start pb-4 border-b border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">金盾烧烤🌟🌟🌟🌟</h4>
                        <p className="text-gray-600 text-sm">一个小店，价格实惠，人均50元，蘸麻酱的。蒜香牛肉很好吃，强烈推荐。</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">5</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">天福汤饭⭐️⭐️⭐️</h4>
                        <p className="text-gray-600 text-sm">强烈推荐土豆拌饭和牛肉汤饭！土豆拌饭入口绵密，味道非常好。牛肉汤味道鲜美，牛肉分量很大，搭配赠送的辣酱，非常下饭。人均50元。</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-center text-blue-800">美食攻略补充</h3>
              <div className="space-y-4">
                <div className="flex items-start pb-4 border-b border-gray-100">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">烤苞米🌟🌟🌟🌟🌟</h4>
                    <p className="text-gray-700">大润发对面有一个烤苞米的，很甜好吃，只要5元。只有晚上开到7点左右就没有了，卖得很快。连吃3天的超值小吃。</p>
                  </div>
                </div>
                <div className="flex items-start pb-4 border-b border-gray-100">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">老字号吊炉饼小笼包⭐️⭐️⭐️</h4>
                    <p className="text-gray-700">本地人常吃的早餐小店，人均10元，很有烟火气！吊炉饼外表酥脆，内心柔软，配着鲜亮的豆腐汤，暖呼呼的非常适合深秋季节。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">赵姨鸡蛋果子⭐️⭐️⭐️</h4>
                    <p className="text-gray-700">丹东的煎饼果子很有特色，人均8元，是刷麻酱的，整体吃起来有一种麻辣拌版煎饼果子的感觉！基础版油条配鸡蛋煎饼6块，完全够一顿饭的量。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 游客实用提醒 */}
            <div className="mt-8 max-w-3xl mx-auto bg-amber-50 rounded-xl shadow-sm p-6 border border-amber-100">
              <h3 className="text-xl font-bold mb-4 text-center text-amber-800">游客实用提醒</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700">拍照时请注意：边境地区有些位置不允许拍照，请遵守当地规定，避免不必要的麻烦。</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700"><strong>交通警示：</strong>打车尽量使用滴滴等叫车软件，避免直接叫路边出租车，尤其在节假日期间价格可能大幅上浮。江边听到有人喊"坐船不"，千万别搭理！</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700">消费陷阱：购买当地特产前请货比三家，尤其是海鲜、人参等高价值商品，建议在正规商场或超市购买。</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700">天气变化：丹东临江，早晚温差较大，即使夏季也建议携带一件薄外套，以防江边湿冷。</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700">旅游团：谨慎选择一日游团，有些团主要目的是带游客去特定购物点，而非参观宣传的景点。建议选择正规旅行社或自行规划行程。</p>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700"><strong>月亮岛夜市注意：</strong>尝试小吃后不建议马上安排其他行程或直接回家，最好留在靠近卫生间的地方稍作休息，以防不适。</p>
                </div>
              </div>
            </div>

            {/* 当地人推荐 */}
            <div className="mt-8 max-w-3xl mx-auto bg-green-50 rounded-xl shadow-sm p-6 border border-green-100">
              <h3 className="text-xl font-bold mb-4 text-center text-green-800">当地人私房推荐</h3>
              <div className="space-y-4">
                <div className="flex items-start pb-4 border-b border-green-100">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">特色烧烤推荐</h4>
                    <p className="text-gray-700">本地地摊烧烤盘肉小串强烈推荐，可以随意选择人多的摊位。推荐晓义、老太太、眼镜、铁锤等地摊烧烤，烤串肉夹在烤过的大火勺里特别香。韩式烧烤可以尝试昱牛家、马场洞、和东等。余阳烤（自称"人生第一烤肉"）不要被门脸和环境吓到，里面有露台和小马扎。</p>
                  </div>
                </div>
                <div className="flex items-start pb-4 border-b border-green-100">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">隐藏景点与体验</h4>
                    <p className="text-gray-700">五龙背温泉是本地人推荐的放松去处，记得带泳衣泳帽，泡完可以顺便买草莓（比市区便宜且个大）。凤凰山徒步全程约需8小时，可选择性购买玻璃索桥票。云海观景（需早起，注意保暖）也是本地人推荐的体验。</p>
                  </div>
                </div>
                <div className="flex items-start pb-4 border-b border-green-100">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">特色美食</h4>
                    <p className="text-gray-700">韩式餐厅推荐锦龙、天福、向日葵、长白山等。当地特色小吃包括焖子、叉子、烤冷面、鸡蛋果子。黄蚬子是丹东特色，白蚬子最鲜美。烤海蛎子也是当地特产，值得尝试。小孟烧烤的坛子肉是年轻人推荐地。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">本地人行程建议</h4>
                    <p className="text-gray-700">Day 1：早晨参观抗美援朝纪念馆，中午安东老街用餐，下午江边散步坐船，晚上去月亮岛夜市。<br/>Day 2：前往宽甸青山沟赏山水，晚上回丹东品尝烧烤或韩餐。<br/>Day 3：游览凤城凤凰山，晚上东汤天沐君澜温泉放松。<br/>结束旅程后，可在江边咖啡店休息放松，欣赏江景。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 亲子游建议 */}
            <div className="mt-8 max-w-3xl mx-auto bg-indigo-50 rounded-xl shadow-sm p-6 border border-indigo-100">
              <h3 className="text-xl font-bold mb-4 text-center text-indigo-800">亲子游特别提醒</h3>
              <div className="space-y-4">
                <div className="flex items-start pb-4 border-b border-indigo-100">
                  <svg className="w-5 h-5 text-indigo-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">推荐行程安排</h4>
                    <p className="text-gray-700">带孩子游丹东可先去丹东舰参观，对孩子有教育意义；然后可在正规码头选择短途游船（1-2号码头），控制在1小时左右，避免孩子疲劳。午休后可逛安东老街，各类小吃适合孩子尝试。</p>
                  </div>
                </div>
                <div className="flex items-start pb-4 border-b border-indigo-100">
                  <svg className="w-5 h-5 text-indigo-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">选择适合孩子的住宿</h4>
                    <p className="text-gray-700">桔子水晶和中联大酒店都是带孩子入住的不错选择，位置好，交通便利。建议提前预订大床房或套房，为孩子提供舒适休息空间。部分酒店提供儿童早餐和设施，预订前可咨询。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">带娃避坑指南</h4>
                    <p className="text-gray-700">带孩子尤其要警惕路边拉客的一日游，长时间行程会让孩子疲惫不堪。游船选择正规码头的船只，船只更新更安全。避免过长游船时间，江面寒冷且孩子容易无聊。许多景点没有专门的儿童设施，提前做好攻略和预期管理。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

