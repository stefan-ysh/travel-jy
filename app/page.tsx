'use client';

import React from 'react';
import Navigation from './components/Navigation';
import Image from 'next/image';
import Link from 'next/link';

const itinerary = {
  date: '2025年4月5日',
  weather: '春季，平均气温10-20℃，建议携带外套',
  schedule: [
    {
      time: '08:30-10:00',
      activity: '鸭绿江断桥 + 抗美援朝纪念馆',
      description: '参观鸭绿江断桥，了解历史，参观抗美援朝纪念馆',
      tips: '早晨人较少，适合拍照，建议先游览断桥再参观纪念馆',
      image: 'https://bkimg.cdn.bcebos.com/pic/ae51f3deb48f8c5494eec6bd7e703af5e0fe9925d152?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_853'
    },
    {
      time: '10:30-12:00',
      activity: '虎山长城',
      description: '登长城远眺鸭绿江和朝鲜风光，春季景色宜人',
      tips: '建议乘坐缆车上山，步行下山，节省体力',
      image: 'https://bbs.djicdn.com/data/attachment/forum/202310/22/093904uijjjizfdvplfe2y.jpg'
    },
    {
      time: '12:00-13:30',
      activity: '午餐 - 东港海鲜',
      description: '品尝当季海鲜，春季海蛎子最为鲜美',
      tips: '建议提前预订餐厅，避免等位',
      image: 'https://picx.zhimg.com/v2-63abdb063e36c92bb7944fb5ca0e0d59_1440w.jpg'
    },
    {
      time: '14:00-15:30',
      activity: '凤凰山',
      description: '登山观景，俯瞰丹东全景，春季可赏花',
      tips: '适合徒步和摄影，建议带些水和零食',
      image: 'http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U5433I.jpg'
    },
    {
      time: '16:00-17:30',
      activity: '鸭绿江游船',
      description: '乘船游览鸭绿江，近距离观察朝鲜风光',
      tips: '傍晚时分光线最佳，适合拍照',
      image: 'https://dimg04.c-ctrip.com/images/100c1f000001gsxg063A8_R_1600_10000.jpg'
    },
    {
      time: '18:00-19:30',
      activity: '晚餐 - 朝鲜族特色美食',
      description: '品尝正宗朝鲜族美食，感受异域风情',
      tips: '推荐冷面、石锅拌饭等特色菜品',
      image: 'https://p6.itc.cn/images01/20210619/4dea743f545c43a1be4549e6b452f16f.jpeg'
    },
    {
      time: '20:00-21:30',
      activity: '江边夜市',
      description: '体验丹东夜生活，品尝地道小吃',
      tips: '可以买些海产品作为伴手礼',
      image: '/images/night-market.jpg'
    }
  ],
  preparations: [
    {
      title: '交通',
      items: [
        '可选择高铁或飞机抵达丹东',
        '市内可打车或乘坐公交车',
        '景点间建议打车，更省时'
      ]
    },
    {
      title: '住宿',
      items: [
        '建议住在振兴区，靠近鸭绿江',
        '提前预订酒店，避开假期涨价',
        '江景房可以欣赏鸭绿江夜景'
      ]
    },
    {
      title: '天气',
      items: [
        '4月天气适宜，但早晚温差大',
        '建议携带外套和防晒用品',
        '注意查看当天天气预报'
      ]
    },
    {
      title: '装备',
      items: [
        '舒适的步行鞋',
        '相机或手机（拍照）',
        '充电宝和充电器',
        '少量现金（部分小店可能不支持电子支付）'
      ]
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-white">
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
          
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              丹东一日游完美攻略
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              2025年4月5日 · 春季特别行程
            </p>
            <div className="space-x-4">
              <Link 
                href="#schedule" 
                className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:transform hover:scale-105"
              >
                查看行程
              </Link>
              <Link 
                href="#preparations" 
                className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:transform hover:scale-105"
              >
                出行准备
              </Link>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">完美行程安排</h2>
            <div className="max-w-4xl mx-auto">
              {itinerary.schedule.map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col md:flex-row gap-6 mb-12 p-6 bg-gray-50 rounded-xl"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`
                  }}
                >
                  <div className="md:w-1/3">
                    <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.activity}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-3">
                    <div className="text-secondary-600 font-medium">{item.time}</div>
                    <h3 className="text-xl font-bold">{item.activity}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-gray-500">💡 小贴士：{item.tips}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preparations Section */}
        <section id="preparations" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">出行准备</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {itinerary.preparations.map((prep, index) => (
                <div 
                  key={prep.title}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  style={{
                    opacity: 0,
                    animation: `fadeInScale 0.5s ease-out forwards ${index * 0.1}s`
                  }}
                >
                  <h3 className="text-xl font-bold mb-4">{prep.title}</h3>
                  <ul className="space-y-2">
                    {prep.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-secondary-600 mr-2">•</span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">准备好开启您的丹东之旅了吗？</h2>
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
      </main>
    </>
  );
} 