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

export default function RoutesPage() {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  // const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef(null);
  const [selectedCircle, setSelectedCircle] = useState<any>(null);

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
            src="https://files.dandong.gov.cn//files/CMS/2022-08-10/1660116892150062.jpg"
            alt="丹东风景"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">丹东闺蜜游</h1>
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
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Map Container */}
              <div className="lg:w-2/3">
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
              <div className="lg:w-1/3 space-y-4">
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
                  <div
                    className="space-y-3 max-h-[500px] overflow-y-auto pr-2 
                                 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  >
                    {filteredLocations.map((location, index) => (
                      <LocationCard
                        key={location.id}
                        location={location}
                        isSelected={selectedLocation === index}
                        onClick={() => handleLocationClick(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Schedule */}
        <section className="py-16">
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
        <section className="py-16 bg-gray-50">
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
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              准备好开始您的丹东之旅了吗？
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              查看更多详细信息，让您的旅程更加完美。
            </p>
            <div className="space-x-4">
              <Link
                href="/food"
                className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:transform hover:scale-105"
              >
                美食攻略
              </Link>
              <Link
                href="/attractions"
                className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:transform hover:scale-105"
              >
                景点详情
              </Link>
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
