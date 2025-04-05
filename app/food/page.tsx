"use client";

import React from "react";
import Navigation from "../components/Navigation";
import Image from "next/image";
import Link from "next/link";
import { foodCategories, restaurants } from "../lib/data";

// 添加食物推荐卡片组件
interface FoodRecommendCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

const FoodRecommendCard = ({
  title,
  description,
  imageUrl,
  tags,
}: FoodRecommendCardProps) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="relative h-56">
      <Image src={imageUrl} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <div className="p-4 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>
    </div>
    <div className="p-4">
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-800"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// 添加传统老字号餐厅卡片组件
const TraditionalRestaurantCard = ({ name, price, address, dishes, index }: { name: string, price: string, address: string, dishes: string, index: number }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-orange-100"
    style={{
      opacity: 0,
      animation: `fadeIn 0.5s ease-out forwards ${index * 0.1}s`,
    }}
  >
    <div className="relative">
      <div className="h-36 bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
        <Image 
          src={`/images/food/${index + 1}.jpg`} 
          alt={name}
          width={300}
          height={200}
          className="object-cover h-full w-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/food-placeholder.jpg';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        {price}
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold mb-1 text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500 mb-2">{address}</p>
      <div className="flex items-center">
        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">招牌菜</span>
        <span className="ml-2 text-sm text-gray-700">{dishes}</span>
      </div>
    </div>
  </div>
);

// 美食体验指南部分
const FoodGuideSection = () => {
  const guides = [
    {
      icon: "🍽️",
      title: "寻找当地人推荐",
      description:
        "选择当地人经常光顾的餐厅，能品尝到最正宗的美食。东港菜市场附近的小餐馆往往是隐藏的美食宝藏。",
    },
    {
      icon: "🦐",
      title: "了解海鲜季节",
      description:
        "不同季节有不同的海鲜上市。春季尝海蛎子，夏秋品尝梭子蟹，冬季享用温泉煮海鲜，才能体验到最佳口感。",
    },
    {
      icon: "🥢",
      title: "尝试朝鲜族美食",
      description:
        "丹东的朝鲜族美食独具特色，冷面、打糕、辣白菜都是不容错过的美食体验。",
    },
    {
      icon: "💰",
      title: "价格参考",
      description:
        "海鲜市场购买后加工费用约15-30元/斤；朝鲜族冷面约25-35元/碗；特色餐厅人均消费100-200元。",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">美食体验指南</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">{guide.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {guide.title}
              </h3>
              <p className="text-gray-600">{guide.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
              animation: "fadeIn 0.5s ease-out forwards",
            }}
          >
            <h1 className="heading-1 mb-6">丹东美食之旅</h1>
            <p className="text-xl opacity-90 max-w-2xl">
              探索丹东独特的美食文化，从海鲜到朝鲜族美食，
              让您的味蕾享受一场难忘的盛宴。
            </p>
          </div>
        </section>

        {/* 特色小吃部分 */}
        {/* <SnackSection /> */}

        {/* 朝鲜族美食展示 */}
        {/* <KoreanFoodShowcase /> */}

        {/* Food Categories */}
        {foodCategories.map((category, categoryIndex) => (
          <section
            key={category.id}
            className={`py-16 ${
              categoryIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.dishes.map((dish, dishIndex) => (
                  <div
                    key={dishIndex}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    style={{
                      opacity: 0,
                      animation: `fadeIn 0.5s ease-out forwards ${
                        dishIndex * 0.1 + 0.2
                      }s`,
                    }}
                  >
                    <div className="relative h-48">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 flex items-end">
                        <h4 className="text-white font-bold text-lg p-4">
                          {dish.name}
                        </h4>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-3">
                        {dish.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-600 font-medium">
                          {dish.price}
                        </span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">
                          {dish.season}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* 美食体验指南部分 */}
        <FoodGuideSection />

        {/* Recommended Restaurants */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">推荐餐厅</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restaurants.map((restaurant, index) => (
                <div
                  key={restaurant.name}
                  className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{
                    opacity: 0,
                    animation: `fadeInScale 0.5s ease-out forwards ${
                      index * 0.1
                    }s`,
                  }}
                >
                  <div className="relative h-48">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white w-full">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold">{restaurant.name}</h3>
                          <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-xs font-medium">
                            {index < 3 ? "推荐指数: ★★★★★" : index < 6 ? "推荐指数: ★★★★☆" : "推荐指数: ★★★☆☆"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      {restaurant.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p className="flex items-center"><span className="mr-2">📍</span> {restaurant.address}</p>
                      <p className="flex items-center"><span className="mr-2">🕒</span> {restaurant.openTime}</p>
                      
                      {/* 添加特色美食推荐 */}
                      <div className="mt-3">
                        <p className="text-secondary-600 font-medium mb-1">特色美食:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {restaurant.name.includes("海鲜") && (
                            <>
                              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">梭子蟹</span>
                              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">对虾</span>
                              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">黄蚬子</span>
                            </>
                          )}
                          {restaurant.name.includes("朝鲜") && (
                            <>
                              <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">冷面</span>
                              <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">打糕</span>
                              <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">石锅拌饭</span>
                            </>
                          )}
                          {restaurant.name.includes("小粑鱼") && (
                            <>
                              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">小粑鱼</span>
                              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">锅包肉</span>
                              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">东北菜</span>
                            </>
                          )}
                          {restaurant.name.includes("百乐") && (
                            <>
                              <span className="inline-block px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">百乐熏鸡</span>
                              <span className="inline-block px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">特产</span>
                            </>
                          )}
                          {restaurant.name.includes("饺子") && (
                            <>
                              <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">水饺</span>
                              <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">东北菜</span>
                            </>
                          )}
                          {restaurant.name.includes("安东老街") && (
                            <>
                              <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">特色小吃</span>
                              <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">本地美食</span>
                              <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">丹东烧烤</span>
                            </>
                          )}
                          {restaurant.name.includes("咖啡") && (
                            <>
                              <span className="inline-block px-2 py-1 text-xs bg-lime-100 text-lime-800 rounded-full">特色咖啡</span>
                              <span className="inline-block px-2 py-1 text-xs bg-lime-100 text-lime-800 rounded-full">精品甜点</span>
                              <span className="inline-block px-2 py-1 text-xs bg-lime-100 text-lime-800 rounded-full">下午茶</span>
                            </>
                          )}
                          {restaurant.name.includes("金达莱") && (
                            <>
                              <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">冷面</span>
                              <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">辣白菜</span>
                              <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">烤肉</span>
                            </>
                          )}
                          {restaurant.name.includes("农家乐") && (
                            <>
                              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">山野菜</span>
                              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">农家菜</span>
                              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">地方特色</span>
                            </>
                          )}
                          {restaurant.name.includes("鸭绿江畔") && (
                            <>
                              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">海鲜</span>
                              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">特色菜</span>
                              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">江景餐厅</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* 添加消费水平指示 */}
                      <div className="mt-3">
                        <p className="text-gray-500">
                          <span className="font-medium">消费水平: </span>
                          {restaurant.name.includes("海鲜") || restaurant.name.includes("鸭绿江畔") ? "¥¥¥" : 
                           restaurant.name.includes("朝鲜") || restaurant.name.includes("金达莱") ? "¥¥" : "¥"}
                        </p>
                      </div>
                      
                      {restaurant.location && (
                        <Link
                          href={`https://uri.amap.com/navigation?to=${
                            restaurant.location.lng
                          },${restaurant.location.lat},${encodeURIComponent(
                            restaurant.name
                          )}&mode=car&coordinate=gaode`}
                          target="_blank"
                          className="inline-block mt-4 text-secondary-600 hover:text-secondary-800 font-medium flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          查看地图导航
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traditional Restaurants Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-2">丹东美食老字号</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                这里精选了丹东10家值得打卡的老字号餐厅，涵盖了从海鲜、烤肉到特色小吃的各种美食，让您的味蕾来一场满足之旅。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TraditionalRestaurantCard 
                name="皇朝海鲜酒店" 
                price="人均: ¥194" 
                address="边境经济合作区口岸贸易区l区B座101室" 
                dishes="皇朝酱蟹，黄蚬子" 
                index={0} 
              />
              <TraditionalRestaurantCard 
                name="老字号杨家吊炉饼" 
                price="人均: ¥12" 
                address="十一经街9号" 
                dishes="吊炉饼，豆腐汤" 
                index={1} 
              />
              <TraditionalRestaurantCard 
                name="邢记侨光拉面一部(兴七路店)" 
                price="人均: ¥17" 
                address="青年大街64号" 
                dishes="牛肉拉面，焖子" 
                index={2} 
              />
              <TraditionalRestaurantCard 
                name="八街老太太" 
                price="人均: ¥58" 
                address="八经街冬梅烟酒超市旁" 
                dishes="小牛肋条，牛肉串" 
                index={3} 
              />
              <TraditionalRestaurantCard 
                name="永盛海鲜家常菜(黄海大道店)" 
                price="人均: ¥115" 
                address="黄海大道与中央大道交叉口" 
                dishes="黄蚬子，大鱿鱼" 
                index={4} 
              />
              <TraditionalRestaurantCard 
                name="果园核桃烤肉" 
                price="人均: ¥96" 
                address="201国道鸭绿江村一组" 
                dishes="牛肉，鱿鱼" 
                index={5} 
              />
              <TraditionalRestaurantCard 
                name="锦龙汤饭(香江佳园店)" 
                price="人均: ¥49" 
                address="青年大街香江家园附近" 
                dishes="牛尾汤，烤五花肉" 
                index={6} 
              />
              <TraditionalRestaurantCard 
                name="赵姨鸡蛋果子(二中小区店)" 
                price="人均: ¥10" 
                address="振七北街兴三路交叉口" 
                dishes="煎饼果子，烤冷面" 
                index={7} 
              />
              <TraditionalRestaurantCard 
                name="佳和饺子馆(江城大街店)" 
                price="人均: ¥45" 
                address="江城大街244-8号" 
                dishes="白菜海螺水饺，海胆馅饺子" 
                index={8} 
              />
              <TraditionalRestaurantCard 
                name="金珠打糕(火车站店)" 
                price="人均: ¥21" 
                address="五经街站前大市场对面" 
                dishes="原味打糕，豆面打糕" 
                index={9} 
              />
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="bg-amber-50 p-4 rounded-lg max-w-2xl border border-amber-200">
                <p className="text-sm text-amber-800 flex items-start">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>
                    小贴士：丹东的海鲜以鲜活出名，黄蚬子是当地特色，口感甜脆；烤冷面和鸡蛋果子是丹东特色小吃，价格实惠；餐厅价格可能因季节变化，建议提前电话咨询；高峰期热门店铺可能需要排队，请合理安排用餐时间。
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hotel Recommendations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">住宿推荐</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 relative md:w-1/3 h-64 md:h-auto">
                    <Image
                      src="https://files.dandong.gov.cn//files/CMS/2022-08-10/1660116892150062.jpg"
                      alt="中联大酒店"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">中联大酒店</h3>
                      <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg text-sm font-medium">
                        推荐指数: ★★★★★
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      位于断桥对面的高档酒店，预订江景房可直接观赏鸭绿江和断桥美景，视角绝佳。晚上可欣赏到中朝两国的夜景对比，中方灯火辉煌，朝方漆黑一片，独特的边境体验。
                    </p>
                    <div className="space-y-2 text-sm text-gray-500 mb-6">
                      <p className="flex items-center"><span className="mr-2">📍</span> 丹东市振兴区鸭绿江畔</p>
                      <p className="flex items-center"><span className="mr-2">📞</span> 0415-3164888</p>
                      <p className="flex items-center"><span className="mr-2">💰</span> 价格区间: ¥400-800/晚 (江景房稍贵但值得)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">住客贴士:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>提前预订江景房，视野最佳</li>
                        <li>高楼层(15层以上)景观更佳</li>
                        <li>酒店距离断桥和主要景点步行即可到达</li>
                        <li>房间备有望远镜，可以更清晰地观察朝鲜一侧</li>
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a 
                        href="https://uri.amap.com/navigation?to=124.395,40.117,中联大酒店&mode=car&coordinate=gaode" 
                        target="_blank"
                        className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                      >
                        查看地图导航
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4">为什么选择中联大酒店?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-secondary-100 text-secondary-800 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">绝佳位置</h4>
                      <p className="text-sm text-gray-600">位于断桥对面，步行可达主要景点和餐厅</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-secondary-100 text-secondary-800 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">无敌江景</h4>
                      <p className="text-sm text-gray-600">江景房可直观鸭绿江全景和断桥美景</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-secondary-100 text-secondary-800 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">边境体验</h4>
                      <p className="text-sm text-gray-600">观察中朝两国风光差异，感受独特边境氛围</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-secondary-100 text-secondary-800 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">舒适体验</h4>
                      <p className="text-sm text-gray-600">设施完善，服务贴心，提供便捷的旅游信息服务</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 交通与住宿建议 */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">交通与住宿建议</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-secondary-100 text-secondary-800 rounded-full p-2 mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.5a2.5 2.5 0 014.9 0H20a1 1 0 001-1V8a4 4 0 00-4-4H4a1 1 0 00-1 1zm1 1h3.5a1 1 0 011 1v6H4V5z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">交通指南</h3>
                </div>
                <div className="pl-11 space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">抵达丹东</h4>
                    <p className="text-gray-600 mb-2">高铁到达站：丹东站</p>
                    <p className="text-gray-600">丹东站位于市区，交通便利。出站后建议选择打车前往酒店，市区起步价仅需6元。</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">市内交通</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>市区各景点间建议打车，既经济又省时间</li>
                      <li>主要景点间距离较近，打车费用通常在10-20元之间</li>
                      <li>丹东城市不大，部分景点步行即可到达</li>
                      <li>如需前往虎山长城等远郊景点，可选择包车或景区直通车</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-secondary-100 text-secondary-800 rounded-full p-2 mr-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">住宿建议</h3>
                </div>
                <div className="pl-11 space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">选择区域</h4>
                    <p className="text-gray-600">丹东不大，住在老城区出行都很方便且价格友好。靠近鸭绿江和断桥的区域视野较好，且靠近主要景点和餐厅。</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">酒店选择</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li><strong>首选推荐：</strong>中联大酒店，江景房可观赏鸭绿江和断桥美景</li>
                      <li>注意鉴别低价酒店和装修时间，有些设施可能较老旧</li>
                      <li>选择标准稍高的连锁酒店会更有保障</li>
                      <li>如选择靠近江边的酒店，尽量要求高层房间，视野更佳</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">价格参考</h4>
                    <p className="text-gray-600">经济型酒店：¥200-300/晚</p>
                    <p className="text-gray-600">中档酒店：¥300-500/晚</p>
                    <p className="text-gray-600">高档酒店(如中联大酒店)：¥500-800/晚</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
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

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
