'use client';

import React, { useEffect, useState, useRef } from 'react';
import Navigation from '../components/Navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { routes, locations, Location, Route } from '../lib/data';

// 声明 AMap 类型
declare global {
  interface Window {
    initMap: () => void;
    AMap: any;
    AMapUI: any;
    handleNavigate: (platform: string, lng: number, lat: number, name: string) => void;
  }
}

// 类型映射 比如 food 是美食，attraction 是景点，shopping 是购物，other 是其他
const locationTypeMap = {
  food: '美食',
  attraction: '景点',
  shopping: '购物',
  other: '其他'
};

// 添加设备检测和导航 URL 生成函数
function getNavigationUrls(location: Location) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  const gaodeUrls = {
    mobile: `androidamap://navi?sourceApplication=dandong-guide&lat=${location.position[1]}&lon=${location.position[0]}&dev=0&style=2&name=${encodeURIComponent(location.name)}`,
    ios: `iosamap://navi?sourceApplication=dandong-guide&lat=${location.position[1]}&lon=${location.position[0]}&dev=0&style=2&name=${encodeURIComponent(location.name)}`,
    web: `https://uri.amap.com/navigation?to=${location.position[0]},${location.position[1]},${encodeURIComponent(location.name)}&mode=car&coordinate=gaode`
  };

  const baiduUrls = {
    mobile: `bdapp://map/direction?destination=${location.position[1]},${location.position[0]}&destination_name=${encodeURIComponent(location.name)}&mode=driving&coord_type=gcj02&src=webapp.dandong.openAPIdemo`,
    web: `https://api.map.baidu.com/direction?destination=latlng:${location.position[1]},${location.position[0]}|name:${encodeURIComponent(location.name)}&mode=driving&coord_type=gcj02&output=html&src=webapp.dandong.openAPIdemo`
  };

  return { gaodeUrls, baiduUrls };
}

// 添加导航处理函数
function handleNavigation(urls: any, platform: 'gaode' | 'baidu') {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  if (isMobile) {
    if (platform === 'gaode') {
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
    window.location.href = platform === 'gaode' ? urls.gaodeUrls.web : urls.baiduUrls.web;
  }
}

// 修改类型检查
function getMarkerStyle(type: 'attraction' | 'food' | 'shopping' | 'other') {
  switch (type) {
    case 'attraction':
      return {
        url: '/images/marker-attraction.png',
        size: [25, 35],
        offset: [-12, -35]
      };
    case 'food':
      return {
        url: '/images/marker-food.png',
        size: [25, 35],
        offset: [-12, -35]
      };
    default:
      return {
        url: '/images/marker-default.png',
        size: [25, 35],
        offset: [-12, -35]
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

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="group bg-gray-50 rounded-lg p-3 hover:bg-white hover:shadow-md transition-all duration-200">
    <p className="text-gray-700">
      <span className="font-medium text-gray-900">{label}</span>
      <span className="mx-2 text-gray-300">|</span>
      <span className="group-hover:text-blue-600 transition-colors duration-200">{value}</span>
    </p>
  </div>
);

const RouteHighlight: React.FC<{ highlight: string }> = ({ highlight }) => (
  <li className="group flex items-center space-x-3 p-2 rounded-lg
                hover:bg-gray-50 transition-all duration-200">
    <span className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-500 
                   group-hover:bg-blue-600 group-hover:shadow-lg
                   transform group-hover:scale-110 transition-all duration-200" />
    <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">{highlight}</span>
  </li>
);

export default function RoutesPage() {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  // const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef(null);
  const [selectedCircle, setSelectedCircle] = useState<any>(null);

  useEffect(() => {
    // 加载高德地图脚本
    const loadMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${process.env.NEXT_PUBLIC_AMAP_KEY}&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    };

    window.initMap = () => {
      if (mapContainer.current) {
        const newMap = new window.AMap.Map(mapContainer.current, {
          zoom: 12,
          center: [124.383314, 40.125729],
          viewMode: '3D',
          pitch: 0,
          mapStyle: 'amap://styles/normal'
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
          ${location.openingHours ? `
            <div class="text-gray-600 text-xs md:text-sm mb-1">
              <span class="font-medium">营业时间：</span>${location.openingHours}
            </div>
          ` : ''}
          ${location.ticketPrice ? `
            <div class="text-gray-600 text-xs md:text-sm mb-1">
              <span class="font-medium">价位：</span>${location.ticketPrice}
            </div>
          ` : ''}
          ${location.phone ? `
            <div class="text-gray-600 text-xs md:text-sm mb-1">
              <a href="tel:${location.phone}" class="text-blue-500 hover:text-blue-700">
                <span class="font-medium">电话：</span>${location.phone}
              </a>
            </div>
          ` : ''}
          <div class="flex space-x-2 mt-3 justify-around">
            <button onclick="window.handleNavigate('gaode', ${location.position[0]}, ${location.position[1]}, '${location.name}')" 
              class="px-2 py-1 bg-[#007AFF] text-white rounded text-xs md:text-sm hover:bg-[#0066CC]">
              高德导航
            </button>
            <button onclick="window.handleNavigate('baidu', ${location.position[0]}, ${location.position[1]}, '${location.name}')" 
              class="px-2 py-1 bg-[#3385FF] text-white rounded text-xs md:text-sm hover:bg-[#2D78F4]">
              百度导航
            </button>
          </div>
        </div>
      `;

      return new window.AMap.InfoWindow({
        content: content,
        offset: new window.AMap.Pixel(0, -30),
        closeWhenClickMap: true
      });
    };

    // 添加新标记
    const newMarkers = locations.map((location, index) => {
      const style = getMarkerStyle(location.type);
      const marker = new window.AMap.Marker({
        position: location.position,
        icon: new window.AMap.Icon({
          ...style,
          imageSize: new window.AMap.Size(style.size[0], style.size[1])
        }),
        offset: new window.AMap.Pixel(style.offset[0], style.offset[1]),
        extData: { index }
      });

      // 创建信息窗体
      const infoWindow = createInfoWindow(location);

      // 点击标记时显示信息窗体
      marker.on('click', () => {
        infoWindow.open(map, marker.getPosition());
        handleLocationClick(index);
      });

      map.add(marker);
      return { marker, infoWindow };
    });

    setMarkers(newMarkers);

    // 如果有选中的位置，添加高亮效果
    if (selectedLocation !== null) {
      const location = locations[selectedLocation];
      const circle = new window.AMap.Circle({
        center: location.position,
        radius: 100,
        strokeColor: "#3498db",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#3498db",
        fillOpacity: 0.2
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
    window.handleNavigate = (platform: string, lng: number, lat: number, name: string) => {
      const location = {
        position: [lng, lat],
        name: name
      };
      const urls = getNavigationUrls(location as Location);
      handleNavigation(urls, platform as 'gaode' | 'baidu');
    };

    return () => {
      // 清理全局函数
      window.handleNavigate = () => {};
    };
  }, [map, mapLoaded, selectedLocation]);

  const handleLocationClick = (index: number) => {
    if (!map || !mapLoaded) return;
    
    setSelectedLocation(index);
    const location = locations[index];

    // 禁用地图交互
    map.setStatus({
      animateEnable: true,
      dragEnable: false,
      zoomEnable: false
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
          zoomEnable: true
        });
        return;
      }

      const easeProgress = easeInOutQuad(progress);
      const currentLng = startPoint.lng + (endPoint[0] - startPoint.lng) * easeProgress;
      const currentLat = startPoint.lat + (endPoint[1] - startPoint.lat) * easeProgress;
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
      
      {/* 路线标题和概览 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section 
          aria-labelledby="route-overview" 
          className="bg-white rounded-xl shadow-sm p-8 mb-8 
                   hover:shadow-lg transform hover:-translate-y-1 
                   transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 id="route-overview" className="text-3xl font-bold text-gray-900">
              {routes.title}
            </h1>
            <div className="px-4 py-2 bg-blue-50 rounded-lg">
              <InfoItem label="出行日期" value={routes.date} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                  </svg>
                  天气信息
                </h3>
                <div className="space-y-3">
                  <InfoItem label="温度" value={routes.weatherInfo.temperature} />
                  <p className="text-gray-600 italic bg-white rounded-lg p-3 shadow-sm">
                    {routes.weatherInfo.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4" role="list" aria-label="天气提示">
                  {routes.weatherInfo.tips.map((tip, index) => (
                    <WeatherTag key={`weather-tip-${index}`} tip={{ id: `tip-${index}`, text: tip }} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <InfoItem label="行程时长" value={routes.routeOverview.duration} />
                    <InfoItem label="行程距离" value={routes.routeOverview.distance} />
                  </div>
                  <div className="space-y-3">
                    <InfoItem label="难度" value={routes.routeOverview.difficulty} />
                    <InfoItem label="最佳季节" value={routes.routeOverview.bestTime} />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  行程亮点
                </h3>
                <ul className="space-y-2 divide-y divide-gray-100" role="list" aria-label="行程亮点列表">
                  {routes.routeOverview.highlights.map((highlight, index) => (
                    <RouteHighlight key={`highlight-${index}`} highlight={highlight} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            {/* 地图容器 */}
            <div 
              ref={mapContainer}
              className="w-full h-[400px] rounded-lg overflow-hidden shadow-sm mb-8"
            ></div>

            {/* 地点列表 - 简单九宫格 */}
            <div className="grid grid-cols-3 gap-2">
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  onClick={() => handleLocationClick(index)}
                  className={`relative p-4 bg-white rounded-lg cursor-pointer border overflow-hidden ${
                    selectedLocation === index ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  {/* 右上角三角形类型标签 */}
                  <div className={`absolute top-0 right-0 w-12 h-12 ${
                    location.type === 'attraction' ? 'bg-blue-100' :
                    location.type === 'food' ? 'bg-rose-100' :
                    'bg-gray-100'
                  }`} style={{
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
                  }}>
                    <span className={`absolute top-1 right-1 text-xs transform rotate-45 ${
                      location.type === 'attraction' ? 'text-blue-600' :
                      location.type === 'food' ? 'text-rose-600' :
                      'text-gray-600'
                    }`}>
                      {locationTypeMap[location.type]}
                    </span>
                  </div>

                  <h3 className="text-xs md:text-base font-medium mb-0 md:mb-2 pr-8">{location.name}</h3>
                  {location.openingHours && (
                    <p className="text-xs text-gray-500 hidden md:block">营业时间：{location.openingHours}</p>
                  )}
                  {location.ticketPrice && (
                    <p className="text-xs text-gray-500 hidden md:block">价格：{location.ticketPrice}</p>
                  )}
                </div>
              ))}
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
                    animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`
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
                      <div className="text-secondary-600 font-medium">{item.time}</div>
                      {item.tickets && (
                        <div className="text-gray-600">门票：{item.tickets.price}</div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.activity}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">位置信息</h4>
                        <p className="text-gray-600">{item.location}</p>
                        <p className="text-gray-600 mt-1">交通：{item.transportation}</p>
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
                              <div key={spotIndex} className="flex items-center">
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
            <h2 className="text-3xl font-bold mb-6">准备好开始您的丹东之旅了吗？</h2>
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
    </div>
  );
} 