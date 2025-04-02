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

// 添加特色小吃部分
// const SnackSection = () => {
//   const snacks = [
//     {
//       title: "鸭绿江冷面",
//       description:
//         "丹东最具特色的美食，劲道的面条，鲜美的高汤，以及丰富的配料使其成为必尝美食。",
//       imageUrl:
//         "https://pic1.zhimg.com/v2-9bab6a545a564e126ac406f6987430c2_1440w.jpg",
//       tags: ["招牌美食", "朝鲜族特色", "夏季首选"],
//     },
//     {
//       title: "小粒黄蚬子",
//       description: "丹东特产，肉质肥美，鲜香可口，是当地最受欢迎的海鲜之一。",
//       imageUrl:
//         "https://pic3.zhimg.com/v2-b79d75a53df2f49db83504fed4b6b86a_1440w.jpg",
//       tags: ["海鲜", "特产", "营养丰富"],
//     },
//     {
//       title: "百乐熏鸡",
//       description:
//         '又称"百乐烧鸡"和"田家熏鸡"，已有100多年的历史。因做工精细，味道极佳，曾荣获辽宁省肉蛋禽制品质量第一名。',
//       imageUrl:
//         "https://picx.zhimg.com/70/v2-420913935514721704aa92c11ec9e019_1440w.avis?source=172ae18b&biz_tag=Post",
//       tags: ["特色烤制", "农家风味", "传统工艺"],
//     },
//     {
//       title: "东港大黄蚬子",
//       description: "肉质饱满，营养丰富，可蒸、炒、炖，鲜美无比。",
//       imageUrl:
//         "https://pics2.baidu.com/feed/b999a9014c086e06f8f3dbd9d397e3fb0bd1cb7d.jpeg@f_auto?token=d0b35afed070211295556b49d5b10164",
//       tags: ["海鲜", "当季推荐", "高蛋白"],
//     },
//   ];

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             特色小吃推荐
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             品尝丹东独特的当地小吃，感受舌尖上的边境风情，这些美食将带给您难忘的味觉体验。
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {snacks.map((snack, index) => (
//             <FoodRecommendCard
//               key={index}
//               title={snack.title}
//               description={snack.description}
//               imageUrl={snack.imageUrl}
//               tags={snack.tags}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// 添加时令美食推荐部分
// const SeasonalFoodSection = () => {
//   const seasonalFoods = [
//     {
//       season: "春季",
//       foods: [
//         {
//           name: "春季海蛎子",
//           description: "春季的海蛎子肉质饱满，鲜美多汁，富含蛋白质和矿物质。",
//           imageUrl: "https://pics2.baidu.com/feed/8ad4b31c8701a18b00da2c5bf4d51f072938fefe.jpeg@f_auto?token=d3379589c8fe5db1f553f61348acb5a1"
//         },
//         {
//           name: "清蒸河豚",
//           description: "丹东的河豚经过专业处理，保留了鲜美的口感，是春季限定美食。",
//           imageUrl: "/images/steamed-puffer.jpg"
//         },
//         {
//           name: "春笋炒肉",
//           description: "采用当地新鲜春笋，与优质猪肉一起炒制，鲜嫩爽口。",
//           imageUrl: "/images/bamboo-shoots.jpg"
//         }
//       ]
//     },
//     {
//       season: "夏季",
//       foods: [
//         {
//           name: "朝鲜冷面",
//           description: "炎炎夏日的解暑佳品，弹性十足的面条配以冰镇高汤，清爽可口。",
//           imageUrl: "/images/summer-coldnoodle.jpg"
//         },
//         {
//           name: "鲜虾水饺",
//           description: "用当地新鲜捕获的虾制作的馅料，鲜香四溢，口感独特。",
//           imageUrl: "/images/shrimp-dumplings.jpg"
//         }
//       ]
//     },
//     {
//       season: "秋季",
//       foods: [
//         {
//           name: "梭子蟹",
//           description: "秋季的梭子蟹最为肥美，肉质饱满，营养丰富，是丹东海鲜的代表。",
//           imageUrl: "/images/autumn-crab.jpg"
//         },
//         {
//           name: "烤全羊",
//           description: "秋季进补的上佳选择，采用传统烤制工艺，肉质鲜嫩，风味独特。",
//           imageUrl: "/images/roasted-lamb.jpg"
//         }
//       ]
//     },
//     {
//       season: "冬季",
//       foods: [
//         {
//           name: "温泉煮海鲜",
//           description: "利用丹东特有的温泉资源，煮制各类海鲜，保留了最原始的鲜美味道。",
//           imageUrl: "/images/hotspring-seafood.jpg"
//         },
//         {
//           name: "暖锅",
//           description: "东北特色火锅，加入当地特产食材，温暖又美味，是冬季必备美食。",
//           imageUrl: "/images/winter-hotpot.jpg"
//         }
//       ]
//     }
//   ];

//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12">时令美食推荐</h2>
//         <div className="space-y-12">
//           {seasonalFoods.map((season, index) => (
//             <div
//               key={index}
//               className="bg-gray-50 rounded-xl p-6 shadow-sm"
//               style={{
//                 opacity: 0,
//                 animation: `fadeIn 0.5s ease-out forwards ${index * 0.2}s`
//               }}
//             >
//               <h3 className="text-xl font-bold text-gray-900 mb-6 inline-block bg-secondary-100 text-secondary-800 px-4 py-2 rounded-lg">{season.season}</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {season.foods.map((food, foodIndex) => (
//                   <div key={foodIndex} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
//                     <div className="relative h-48">
//                       <Image
//                         src={food.imageUrl}
//                         alt={food.name}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="p-4">
//                       <h4 className="font-bold text-gray-900 mb-2">{food.name}</h4>
//                       <p className="text-sm text-gray-600">{food.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

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
            
            {/* 餐厅推荐线路 */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8">美食游推荐线路</h3>
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-secondary-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">经典三日美食路线 (网友推荐)</h4>
                      <p className="text-gray-600 mb-2">丹东三日游推荐美食安排</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">Day 1: 午餐-戴家叉子 → 晚餐-金家高丽火盆</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">Day 2: 午餐-天福汤饭 → 晚餐-老纪烤肉店</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">Day 3: 午餐-伟豪市场逛吃 → 晚餐-白马江炭烤</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-secondary-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">断桥美食之旅 (推荐时间: 半天)</h4>
                      <p className="text-gray-600 mb-2">探索断桥附近的特色美食</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">戴家叉子(午餐) → 江畔文艺咖啡馆(下午茶) → 金家高丽火盆(晚餐)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-secondary-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">朝鲜美食体验 (推荐时间: 半天)</h4>
                      <p className="text-gray-600 mb-2">品尝正宗朝鲜族美食</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">天福汤饭(午餐) → 金达莱朝鲜族餐厅(晚餐) → 朝鲜族特色餐厅(小吃)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-secondary-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">本地特色美食一日游 (推荐时间: 1天)</h4>
                      <p className="text-gray-600 mb-2">体验丹东本地美食文化</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">伟豪市场(早午餐) → 百乐烧鸡店(购买特产) → 安东老街(小吃) → 老纪烤肉店(晚餐)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-secondary-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">虎山长城美食游 (推荐时间: 1天)</h4>
                      <p className="text-gray-600 mb-2">结合景点和美食的完美体验</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">老边饺子(早餐) → 虎山长城游览 → 虎山长城农家乐(午餐) → 返回市区 → 白马江炭烤(晚餐)</span>
                      </div>
                    </div>
                  </div>
                </div>
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

        {/* Call to Action */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-2 mb-6">开启您的美食之旅</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              让我们带您探索丹东的美食文化， 品尝最地道的美味。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/attractions"
                className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                查看景点美食
              </Link>
              <Link
                href="/routes"
                className="inline-block bg-white hover:bg-gray-100 text-secondary-600 border border-secondary-600 px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                美食行程推荐
              </Link>
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
