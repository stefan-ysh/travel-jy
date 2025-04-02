export interface Attraction {
  id: string;
  name: string;
  description: string;
  images: {
    url: string;
    alt: string;
  }[];
  tel?: string;
  location: {
    lat: number;
    lng: number;
  };
  ticketPrice: string;
  traffic: string;
  openingHours: string;
  bestTimeToVisit: string;
  tags: string[];
}

export interface FoodSpot {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  priceRange: string;
  cuisine: string[];
  mustTry: string[];
}

export interface Dish {
  name: string;
  description: string;
  price: string;
  season: string;
}

export interface FoodCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  dishes: Dish[];
}

export interface Restaurant {
  name: string;
  description: string;
  address: string;
  openTime: string;
  image: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Culture {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface CultureHighlight {
  title: string;
  content: string;
}

export interface SeasonalActivity {
  season: string;
  activities: string[];
}

export interface Location {
  id: string;
  name: string;
  type: "attraction" | "food" | "shopping" | "other";
  position: [number, number];
  description: string;
  openingHours?: string;
  ticketPrice?: string;
  phone?: string;
  images?: { url: string; alt: string }[];
}

export interface RouteActivity {
  time: string;
  activity: string;
  location: string;
  description: string;
  tips: string;
  transportation: string;
  tickets?: {
    price: string;
    includes: string[];
    notes: string;
  };
  image: string;
  mustSee?: string[];
  photoSpots?: string[];
  recommendations?: string[];
  priceRange?: string;
  restaurants?: {
    name: string;
    address: string;
    phone: string;
  }[];
  mustBuy?: string[];
}

export interface Route {
  title: string;
  date: string;
  weatherInfo: {
    temperature: string;
    description: string;
    tips: string[];
  };
  routeOverview: {
    duration: string;
    distance: string;
    difficulty: string;
    bestTime: string;
    highlights: string[];
  };
  schedule: RouteActivity[];
  tips: {
    beforeTrip: string[];
    duringTrip: string[];
    transportation: string[];
  };
}

export const attractions: Attraction[] = [
  {
    id: "yalu-river",
    name: "鸭绿江断桥",
    description:
      "跨于鸭绿江上的鸭绿江断桥是丹东的标志性景点之一，它紧挨着鸭绿江大桥（中朝友谊桥），是抗美援朝战争的历史见证。走上大桥，看着桥体上遗留的累累弹痕和桥梁钢架，能感受到枪炮声与战机划破长空的声响仿佛就在耳边。站在桥上还可饱览中朝两岸风光。鸭绿江断桥是鸭绿江上诸多桥中的第一桥，1911年由当时殖民机构日本驻鲜总督府铁道局所建。桥长944.2米，从中方数第四孔为开闭梁，以四号墩为轴，可旋转90度，便于过往船只航行。1950年11月至1951年2月，侵朝美军飞机多次对大桥狂轰滥炸，使这座桥成为废桥。",
    images: [
      {
        url: "https://bkimg.cdn.bcebos.com/pic/ae51f3deb48f8c5494eec6bd7e703af5e0fe9925d152?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_853",
        alt: "鸭绿江断桥全景",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/0EQ4k12000cbjb2yp5417_R_1600_10000.jpg",
        alt: "鸭绿江断桥近景",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/100811000000rh7dqCBE4_R_1600_10000.jpg",
        alt: "鸭绿江断桥夜景",
      },
    ],
    location: {
      lat: 40.1164,
      lng: 124.3935,
    },
    traffic:
      "乘坐公交105、121、127、303路至断桥(公交站)下，步行即可到达。（距市中心882m）",
    tel: "0415-2122145",
    ticketPrice: "￥30",
    openingHours: "全年 08:00-17:00",
    bestTimeToVisit: "4-10月",
    tags: ["历史", "地标", "江景", "丹东的标志性景点之一", "地标观景"],
  },
  {
    id: "help-korean-war-museum",
    name: "抗美援朝纪念馆",
    description:
      "抗美援朝纪念馆是丹东的景点，它坐落于丹东市区的英华山上，是当年志愿军指挥所所在地。这座始建于1958年的专题纪念馆分为陈列馆、全景画馆、纪念塔，从方方面面展示了抗美援朝战争的历史，不仅可以了解战斗英雄们的事迹，还能看到很多武器和战时的生活用品和还原战场情景的360度全景画，相当震撼。",
    images: [
      {
        url: "https://ts1.tc.mm.bing.net/th/id/R-C.544c81cd7041a81d0b185962c62d6237?rik=fXpUi5W5TKwc9A&riu=http%3a%2f%2fp5.itc.cn%2fq_70%2fimages03%2f20200922%2f0cdf8dce778641ab862e4b8f7330a3cb.jpeg&ehk=lsIOgQgYSFAQd%2bzRCpNtey8s6n6kApxSTVeeFmXhJyA%3d&risl=&pid=ImgRaw&r=0",
        alt: "抗美援朝纪念馆",
      },
      {
        url: "https://p4.itc.cn/images01/20210630/803a18a6b117475f8da3c7549bd1dc35.jpeg",
        alt: "抗美援朝纪念馆",
      },
    ],
    location: {
      lat: 40.124695,
      lng: 124.371088,
    },
    traffic: "辽宁省丹东市振兴区山上街7号（距市中心2.1km）",
    tel: "0415-2175988",
    ticketPrice: "免费（提前预约）",
    openingHours: "全年 09:00-16:30（周一闭馆）",
    bestTimeToVisit: "全年",
    tags: ["历史", "博物馆", "抗美援朝战争", "重温抗美援朝历史"],
  },
  {
    id: "dandong-tianqiaogou-scenic-area",
    name: "丹东天桥沟景区",
    description:
      "天桥沟位于丹东市宽甸县北部，距离县城约60公里。此地曾为清王朝时的“龙兴之地”所以几百年来一直没有被破坏，山上森林密布，大树古木众多，山间还有清澈的山泉溪流，环境非常优美。这里地貌独特，山上有很多的奇峰怪石，造型各异，可以一一观赏游玩。而每到秋天，漫山枫叶遍布，更是观赏和拍摄红叶的地点。",
    images: [
      {
        url: "https://dimg04.c-ctrip.com/images/01013120005b716iy8151_C_1600_1200.jpg",
        alt: "丹东天桥沟景区",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/0105f120005b6zotb7A10_C_1600_1200.jpg",
        alt: "丹东天桥沟景区",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/01011120005b712u47B1C_C_1600_1200.jpg",
        alt: "丹东天桥沟景区",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/1lo5a12000drsprew6533_R_1600_10000.jpg",
        alt: "丹东天桥沟景区",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/0106q120005b700vhAC00_C_1600_1200.jpg",
        alt: "丹东天桥沟景区",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/0102o120005b6zfjeF96F_C_1600_1200.jpg",
        alt: "丹东天桥沟景区",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/01067120005b714bn3545_C_1600_1200.jpg",
        alt: "丹东天桥沟景区",
      },
    ],
    location: {
      lat: 41.066292,
      lng: 124.634855,
    },
    traffic: "辽宁省丹东市宽甸满族自治县天桥沟（距市中心>100km）",
    tel: "0415-5956666",
    ticketPrice: "¥120",
    openingHours: "全年 08:00-16:00",
    bestTimeToVisit: "5 月和 10 月",
    tags: ["峰奇林密的天外小庐山", "赏枫胜地", "避暑胜地", "自然风光"],
  },
  {
    id: "andong-street",
    name: "安东老街",
    description:
      "安东老街建筑外形主要参照丹东二十世纪二、三十年代老街号建筑形式，复制了一部分标志建筑、老街名在项目里，采用了民国时期主要建筑符号做外墙及街景装饰，分为老安东美食街、安东旅游接待服务中心两部分，是集怀旧观光、经典美食、旅游购物等于一体多功能文化商街。外街以及内街商铺借鉴老安东经典建筑元素，配合老物件和街景雕塑，设计再现老街景，包括百年老字号、品牌餐饮、东北特产、海产品、风味小吃、地方戏表演、以及各种民间艺术，分别以安东时期繁荣一时的中富街、天后宫街、兴隆街、聚宝街等著名老街命名。",
    images: [
      {
        url: "https://dimg04.c-ctrip.com/images/0105n12000ez9e1ah41D3_R_10000_1200.jpg",
        alt: "安东老街",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/01019120008j3kvvi74E1_R_1600_10000.jpg",
        alt: "安东老街",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/0101t12000ez9dv80A1AE_R_10000_1200.jpg",
        alt: "安东老街",
      },
    ],
    location: {
      lat: 41.066292,
      lng: 124.634855,
    },
    traffic: "辽宁省丹东市振兴区人民路49号（距市中心3km）",
    tel: "0415-3186088",
    ticketPrice: "免费",
    openingHours: "全年 10:00-00:00",
    bestTimeToVisit: "全年",
    tags: ["怀旧观光", "经典美食", "旅游购物", "文化商街"],
  },
  {
    id: "tiger-mountain",
    name: "虎山长城",
    description:
      "虎山长城位于丹东市东北鸭绿江畔，是明长城的较东端，现在的长城是92年在原址上修筑的，有城楼、长城、古栈道、睡观音等多个景观，景区内还有一座长城历史博物馆可以参观。整个景区与朝鲜隔江相望，可以在山上看到对岸朝鲜的村庄和人民生活的场景，还有一步跨景区和朝鲜相隔仅有几米，游客可以在此拍照留念。这里的长城长约1250米，沿长城而上栈道下来全程两三公里，可以步行游览。",
    images: [
      {
        url: "https://dimg04.c-ctrip.com/images/01011120008n5rc4h0A83_R_1600_10000.jpg",
        alt: "虎山长城全景",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/100911000000rjex5B3A7_R_1600_10000.jpg",
        alt: "虎山长城远眺",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/01034120009zis4n5E1EF_R_1600_10000.jpg",
        alt: "虎山长城近景",
      },
    ],
    location: {
      lat: 40.4521,
      lng: 124.3356,
    },
    tel: "0415-5578511",
    ticketPrice: "￥65",
    traffic:
      "可以乘坐丹东-宽甸东线、丹东-虎山长城、虎山长城专线至虎山长城站下，步行可达。(打车约 40 元)（距市中心15.8km）",
    openingHours: "全年 08:30-16:30",
    bestTimeToVisit: "5-10月",
    tags: ["长城", "边境风光", "丹东的标志性景点之一", "地标观景"],
  },
  {
    id: "feng-huang-shan",
    name: "凤凰山",
    description:
      "丹东凤凰山位于丹东凤城市南郊，以秀美的山岳风光闻名。夏季的凤凰山清幽凉爽、环境宜人，是辽东有名的避暑胜地。而到了十月金秋，这里便红枫满山，是赏叶品秋的好去处。",
    images: [
      {
        url: "https://dimg04.c-ctrip.com/images/0103k120008ctj1fl75BE_C_1600_1200.jpg",
        alt: "凤凰山",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/100d0w000000k4l09C659_R_1600_10000.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U5433I.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190424/1-1Z4240T5425G.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190424/1-1Z4240K40N21.jpg",
        alt: "凤凰山",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/01017120008w149b839A8_C_1600_1200.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U921216.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U9494A.jpg",
        alt: "凤凰山",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/0100b1200086nabixEEDD_R_1600_10000.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230UH1625.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190424/1-1Z4240S635193.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190424/1-1Z4240T3155S.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230Z036351.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230Z11M95.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U434C5.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U50R96.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U613142.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230UF1251.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U613142.jpg",
        alt: "凤凰山",
      },
    ],
    location: {
      lat: 40.415964,
      lng: 124.086713,
    },
    traffic: "直通车沿途不停靠 从丹东直达凤凰山（距市中心42.0km）",
    tel: "0415-8126042",
    ticketPrice: "￥80",
    openingHours: "全年 06:30-16:30",
    bestTimeToVisit: "5-10月",
    tags: ["赏叶品秋胜地", "登高爬山"],
  },
  {
    id: "yalu-river-cruise",
    name: "丹东鸭绿江游船",
    description:
      "丹东鸭绿江游船与朝鲜新义州市隔江相望，在此乘船游览鸭绿江，不仅可以欣赏到见证了抗美援朝战争的鸭绿江断桥，还可以近距离欣赏到朝鲜的神秘风光。",
    images: [
      {
        url: "https://dimg04.c-ctrip.com/images/1lo4s12000evbaof269B7_R_1600_10000.jpg",
        alt: "丹东鸭绿江游船",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/1lo2x12000evbaqxi5101_R_1600_10000.jpg",
        alt: "丹东鸭绿江游船",
      },
    ],
    location: {
      lat: 40.127906,
      lng: 124.404019,
    },
    traffic:
      "乘坐公交105、121、127、303路至断桥(公交站)下，步行即可到达。（距市中心1.4km）",
    tel: "0415-8126042",
    ticketPrice: "￥80",
    openingHours:
      "1号码头营业时间：08:00-17:00 2号码头每日发船时间：10:30、13:30、15:00,根据现场人数景区会做调整",
    bestTimeToVisit: "5-10月",
    tags: ["自然", "风景"],
  },
];

export const foodSpots: FoodSpot[] = [
  {
    id: "korean-restaurant",
    name: "朝鲜族餐厅",
    description: "正宗的朝鲜族美食，提供冷面、打糕等特色菜品。",
    imageUrl: "/images/korean-food.jpg",
    location: {
      lat: 40.1164,
      lng: 124.3935,
    },
    priceRange: "￥50-100/人",
    cuisine: ["朝鲜族", "韩式"],
    mustTry: ["冷面", "打糕", "石锅拌饭"],
  },
  {
    id: "seafood-market",
    name: "丹东海鲜市场",
    description: "新鲜的海鲜市场，可以选购各类海产品并现场加工。",
    imageUrl:
      "https://picx.zhimg.com/v2-63abdb063e36c92bb7944fb5ca0e0d59_1440w.jpg",
    location: {
      lat: 40.1245,
      lng: 124.3829,
    },
    priceRange: "￥100-200/人",
    cuisine: ["海鲜", "本地"],
    mustTry: ["梭子蟹", "对虾", "海参"],
  },
];

export const foodCategories: FoodCategory[] = [
  {
    id: "seafood",
    title: "海鲜美食",
    description:
      "丹东依江临海，盛产各类海鲜。春季的海蛎子鲜美多汁，夏秋时节的梭子蟹肥美，冬季的温泉海鲜更是一绝。在东港海鲜市场，您可以品尝到最新鲜的海产品。",
    image:
      "https://picx.zhimg.com/v2-63abdb063e36c92bb7944fb5ca0e0d59_1440w.jpg",
    dishes: [
      {
        name: "梭子蟹",
        description: "肉质鲜美，营养丰富",
        price: "市场价",
        season: "夏秋最佳",
      },
      {
        name: "海蛎子",
        description: "鲜嫩多汁，春季必尝",
        price: "市场价",
        season: "春季最佳",
      },
      {
        name: "黄蚬子",
        description: "个大肉嫩，四季可尝",
        price: "市场价",
        season: "全年",
      },
      {
        name: "对虾",
        description: "个大肉嫩，四季可尝",
        price: "市场价",
        season: "全年",
      },
      {
        name: "海参",
        description: "营养丰富，滋补佳品",
        price: "市场价",
        season: "全年",
      },
    ],
  },
  {
    id: "korean",
    title: "朝鲜族美食",
    description:
      "丹东的朝鲜族美食独具特色，以冷面、打糕等为代表。这里的朝鲜族餐厅不仅能品尝到正宗的朝鲜族美食，还能体验独特的用餐文化。",
    image:
      "https://p6.itc.cn/images01/20210619/4dea743f545c43a1be4549e6b452f16f.jpeg",
    dishes: [
      {
        name: "朝鲜冷面",
        description: "劲道爽滑，开胃解暑",
        price: "25-35元",
        season: "夏季最佳",
      },
      {
        name: "打糕",
        description: "香甜软糯，传统小吃",
        price: "15-20元",
        season: "全年",
      },
      {
        name: "辣白菜",
        description: "开胃爽口，传统腌制",
        price: "15-25元",
        season: "全年",
      },
      {
        name: "石锅拌饭",
        description: "营养美味，现场制作",
        price: "30-40元",
        season: "全年",
      },
    ],
  },
  {
    id: "local",
    title: "东北特色",
    description:
      "丹东的东北菜融合了当地特色，以锅包肉、地三鲜等为代表。这里的餐厅不仅保持着传统的东北口味，还融入了现代的烹饪理念。",
    image: "/images/local-food.jpg",
    dishes: [
      {
        name: "草莓",
        description: "新鲜多汁，春季必尝",
        price: "市场价",
        season: "春季最佳",
      },
      {
        name: "锅包肉",
        description: "外酥里嫩，酸甜可口",
        price: "45-55元",
        season: "全年",
      },
      {
        name: "地三鲜",
        description: "家常美味，营养搭配",
        price: "28-35元",
        season: "全年",
      },
      {
        name: "小鸡炖蘑菇",
        description: "汤鲜肉嫩，滋补养生",
        price: "68-88元",
        season: "全年",
      },
      {
        name: "酱骨头",
        description: "肉质酥烂，味道浓郁",
        price: "58-78元",
        season: "全年",
      },
    ],
  },
];

export const restaurants: Restaurant[] = [
  {
    name: "东港海鲜市场",
    description:
      "丹东最大的海鲜市场，可以买到最新鲜的海产品，还有很多海鲜大排档。",
    address: "丹东市东港市东港海鲜市场",
    openTime: "全天营业",
    image: "/images/donggang-market.jpg",
    location: {
      lat: 40.1245,
      lng: 124.3829,
    },
  },
  {
    name: "鸭绿江畔餐厅",
    description: "临江而建的特色餐厅，可以一边品尝美食一边欣赏江景。",
    address: "丹东市振兴区鸭绿江畔",
    openTime: "10:00-22:00",
    image: "/images/riverside-restaurant.jpg",
    location: {
      lat: 40.1164,
      lng: 124.3935,
    },
  },
  {
    name: "朝鲜族特色餐厅",
    description: "正宗的朝鲜族美食，环境优雅，服务周到。",
    address: "丹东市振兴区锦山大街",
    openTime: "10:30-21:30",
    image: "/images/korean-restaurant.jpg",
    location: {
      lat: 40.1164,
      lng: 124.3935,
    },
  },
];

export const routes: Route = {
  title: "丹东一日游精品路线",
  date: "2025年4月5日",
  weatherInfo: {
    temperature: "10-20℃",
    description: "春季天气宜人，早晚温差大",
    tips: ["携带外套", "注意防晒", "建议带伞"],
  },
  routeOverview: {
    duration: "1天",
    distance: "市区内",
    difficulty: "中等",
    bestTime: "4-5月份",
    highlights: [
      "鸭绿江断桥 - 感受历史",
      "虎山长城 - 登高望远",
      "东港海鲜 - 品味美食",
      "江边夜市 - 体验生活",
    ],
  },
  schedule: [
    {
      time: "08:30-10:00",
      activity: "鸭绿江断桥 + 抗美援朝纪念馆",
      location: "丹东市振兴区鸭绿江断桥景区",
      description:
        "1. 鸭绿江（满语：Yalu ula，韩语：압록강，罗马音：amnokgang），原为中国内河，现为中国和朝鲜之间的界河。江中的朝方岛屿——绸缎岛和薪岛等与中国陆地接壤。目前河口为双方共用。 \n2.抗美援朝纪念馆位于辽宁省丹东市振兴区桃源街附近，坐落在市中心北部风景秀丽的英华山上，是一座塔楼式建筑群。该馆是中国唯一一座全面反映抗美援朝战争的专题纪念馆，纪念馆始建于1958年10月。1993年7月27日，新馆落成并正式开馆。",
      tips: "早晨人较少，适合拍照，建议先游览断桥再参观纪念馆",
      transportation: "可乘坐2路公交车到达",
      tickets: {
        price: "80元/人",
        includes: ["断桥门票", "纪念馆门票"],
        notes: "学生证可享受半价优惠",
      },
      image:
        "https://bkimg.cdn.bcebos.com/pic/ae51f3deb48f8c5494eec6bd7e703af5e0fe9925d152?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_853",
      mustSee: ["断桥遗址", "纪念馆展区", "和平广场"],
      photoSpots: ["断桥观景台", "纪念馆前广场"],
    },
    {
      time: "10:30-12:00",
      activity: "虎山长城",
      location: "丹东市振兴区虎山长城景区",
      description:
        "虎山长城位于丹东市城东十五公里的鸭绿江畔，是国家级鸭绿江风景名胜区的一个重要景区，它隔江与朝鲜的于赤岛和古城义州相望。是绝好的旅游胜地。景区内的虎山长城始建于明成化五年即公元1469年，当时的主要作用是为防御建州女真人的侵扰。",
      tips: "建议乘坐缆车上山，步行下山，节省体力",
      transportation: "从断桥打车约20分钟",
      tickets: {
        price: "120元/人",
        includes: ["景区门票", "往返缆车票"],
        notes: "老人及儿童有优惠票价",
      },
      image:
        "https://bbs.djicdn.com/data/attachment/forum/202310/22/093904uijjjizfdvplfe2y.jpg",
      mustSee: ["长城主体", "观景平台", "界碑"],
      photoSpots: ["长城制高点", "江景观景台"],
    },
    {
      time: "12:00-13:30",
      activity: "午餐 - 东港海鲜",
      location: "丹东市东港市场",
      description: "品尝当季海鲜，春季海蛎子最为鲜美",
      tips: "建议提前预订餐厅，避免等位",
      transportation: "从虎山长城打车约30分钟",
      recommendations: ["海蛎子（春季特产）", "梭子蟹", "对虾", "海参"],
      image:
        "https://picx.zhimg.com/v2-63abdb063e36c92bb7944fb5ca0e0d59_1440w.jpg",
      priceRange: "人均100-200元",
      restaurants: [
        {
          name: "老渔港海鲜",
          address: "东港市场内",
          phone: "0415-xxxxxxxx",
        },
      ],
    },
    {
      time: "14:00-15:30",
      activity: "凤凰山",
      location: "丹东市振兴区凤凰山景区",
      description:
        '凤凰山，位于辽宁省丹东凤城市，由东山和西山两大景区组成，最高峰"攒云峰"海拔836米，面积216平方公里，凤凰山是奉天四大名山之一，辽东地区第一名山。',
      tips: "适合徒步和摄影，建议带些水和零食",
      transportation: "从东港打车约25分钟",
      tickets: {
        price: "60元/人",
        includes: ["景区门票"],
        notes: "含观景台",
      },
      image: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U5433I.jpg",
      mustSee: ["观景台", "杜鹃花区", "山顶凉亭"],
      photoSpots: ["山顶观景点", "花海区域"],
    },
    {
      time: "16:00-17:30",
      activity: "鸭绿江游船",
      location: "丹东市鸭绿江游船码头",
      description: "乘船游览鸭绿江，近距离观察朝鲜风光",
      tips: "傍晚时分光线最佳，适合拍照",
      transportation: "从凤凰山打车约15分钟",
      tickets: {
        price: "100元/人",
        includes: ["游船票", "导游讲解"],
        notes: "1小时航程",
      },
      image:
        "https://dimg04.c-ctrip.com/images/100c1f000001gsxg063A8_R_1600_10000.jpg",
      mustSee: ["江上风光", "对岸风景", "日落景色"],
      photoSpots: ["船头观景区", "甲板观景点"],
    },
    {
      time: "18:00-19:30",
      activity: "晚餐 - 朝鲜族特色美食",
      location: "丹东市振兴区",
      description: "品尝正宗朝鲜族美食，感受异域风情",
      tips: "推荐冷面、石锅拌饭等特色菜品",
      transportation: "从游船码头步行可达",
      recommendations: ["朝鲜冷面", "石锅拌饭", "辣白菜", "打糕"],
      image:
        "https://p6.itc.cn/images01/20210619/4dea743f545c43a1be4549e6b452f16f.jpeg",
      priceRange: "人均50-100元",
      restaurants: [
        {
          name: "平壤馆",
          address: "振兴区xxx路xx号",
          phone: "0415-xxxxxxxx",
        },
      ],
    },
    {
      time: "20:00-21:30",
      activity: "江边夜市",
      location: "丹东市鸭绿江畔夜市",
      description: "体验丹东夜生活，品尝地道小吃",
      tips: "可以买些海产品作为伴手礼",
      transportation: "从餐厅步行可达",
      recommendations: ["烤海鲜", "特色小吃", "手工艺品", "海产干货"],
      image: "/images/night-market.jpg",
      priceRange: "人均30-50元",
      mustBuy: ["海产干货", "特色小吃", "手工艺品"],
    },
  ],
  tips: {
    beforeTrip: [
      "提前查看天气预报",
      "准备舒适的步行鞋",
      "带上相机或手机",
      "准备充足现金",
      "提前预订酒店",
    ],
    duringTrip: [
      "合理安排体力",
      "注意防晒",
      "保管好随身物品",
      "遵守景区规定",
      "注意拍照安全",
    ],
    transportation: [
      "景点间建议打车",
      "可提前下载打车软件",
      "保存好出租车发票",
      "记录常用公交线路",
    ],
  },
};

export const cultures: Culture[] = [
  {
    id: "border-culture",
    title: "边境文化",
    description:
      "丹东是中国距离朝鲜最近的城市，鸭绿江将两国一分为二，却又将两国文化紧密相连。在这里，你可以近距离观察朝鲜新义州的生活场景，感受独特的边境文化氛围。乘坐游船，欣赏两岸风光，体验独特的边境风情。",
    image: "/images/border-culture.jpg",
    features: [
      "鸭绿江断桥 - 抗美援朝的历史见证",
      "中朝边境游船体验",
      "江边夜市文化",
      "新义州对岸风光观赏",
    ],
  },
  {
    id: "food-culture",
    title: "美食文化",
    description:
      "丹东的美食融合了朝鲜族特色和东北地方特色，以海鲜和朝鲜族美食最为出名。这里的冷面、打糕、海鲜都极具特色。春季可以品尝到最新鲜的海蛎子，夏秋季节则有肥美的梭子蟹，冬季的温泉煮海鲜更是一绝。",
    image: "/images/food-culture.jpg",
    features: [
      "东港海鲜市场 - 品尝最新鲜海鲜",
      "朝鲜族冷面 - 正宗口味",
      "特色小吃 - 打糕、锅包肉",
      "温泉煮海鲜体验",
    ],
  },
  {
    id: "historical-culture",
    title: "红色文化",
    description:
      "丹东是著名的抗美援朝纪念城市，这里保存着许多珍贵的历史遗迹和故事。从鸭绿江断桥到抗美援朝纪念馆，每一处都诉说着那段波澜壮阔的历史。漫步断桥遗址，感受历史的沧桑与震撼。",
    image: "/images/historical-culture.jpg",
    features: [
      "抗美援朝纪念馆 - 感受历史",
      "鸭绿江断桥 - 战争遗迹",
      "爱国主义教育基地",
      "虎山长城 - 明长城东端",
    ],
  },
  {
    id: "natural-culture",
    title: "自然人文",
    description:
      "丹东不仅有独特的地理位置，还拥有壮美的自然景观。从虎山长城到凤凰山，从鸭绿江风光到各色温泉，自然与人文在这里完美融合。春季樱花烂漫，秋季层林尽染，冬季温泉养生，四季皆有不同风情。",
    image: "/images/natural-culture.jpg",
    features: [
      "凤凰山 - 观赏鸭绿江全景",
      "五龙温泉 - 天然温泉胜地",
      "青山沟 - 原始森林探索",
      "天华山 - 赏花休闲胜地",
    ],
  },
];

export const cultureHighlights: CultureHighlight[] = [
  {
    title: "最佳游览季节",
    content: "春季赏樱花，夏季享海鲜，秋季观红叶，冬季泡温泉",
  },
  {
    title: "文化体验建议",
    content: "早晨游江赏景，中午品尝海鲜，下午探访历史，晚上体验夜市",
  },
  {
    title: "特色推荐",
    content: "东港海鲜市场、鸭绿江游船、断桥观光、凤凰山登高望远",
  },
];

export const seasonalActivities: SeasonalActivity[] = [
  {
    season: "春季",
    activities: [
      "天华山赏樱花",
      "品尝春季海蛎子",
      "漫步鸭绿江畔",
      "登凤凰山赏春景",
    ],
  },
  {
    season: "夏季",
    activities: ["东港海鲜美食", "游船观光避暑", "青山沟避暑", "夜市文化体验"],
  },
  {
    season: "秋季",
    activities: ["登高赏秋叶", "品尝梭子蟹", "虎山长城观景", "边境文化体验"],
  },
  {
    season: "冬季",
    activities: ["温泉养生", "冰雪摄影", "温泉煮海鲜", "赏雪观江景"],
  },
];

export const locations: Location[] = [
  {
    id: "yalu-river",
    name: "鸭绿江断桥",
    type: "attraction",
    position: [124.3935, 40.1164],
    description:
      "跨于鸭绿江上的鸭绿江断桥是丹东的标志性景点之一，它紧挨着鸭绿江大桥（中朝友谊桥），是抗美援朝战争的历史见证。走上大桥，看着桥体上遗留的累累弹痕和桥梁钢架，能感受到枪炮声与战机划破长空的声响仿佛就在耳边。站在桥上还可饱览中朝两岸风光。鸭绿江断桥是鸭绿江上诸多桥中的第一桥，1911年由当时殖民机构日本驻鲜总督府铁道局所建。桥长944.2米，从中方数第四孔为开闭梁，以四号墩为轴，可旋转90度，便于过往船只航行。1950年11月至1951年2月，侵朝美军飞机多次对大桥狂轰滥炸，使这座桥成为废桥。",
    openingHours: "全年 08:00-17:00",
    ticketPrice: "￥30",
    images: [
      {
        url: "https://bkimg.cdn.bcebos.com/pic/ae51f3deb48f8c5494eec6bd7e703af5e0fe9925d152?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_853",
        alt: "鸭绿江断桥全景",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/0EQ4k12000cbjb2yp5417_R_1600_10000.jpg",
        alt: "鸭绿江断桥近景",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/100811000000rh7dqCBE4_R_1600_10000.jpg",
        alt: "鸭绿江断桥夜景",
      },
    ],
  },
  {
    id: "tiger-mountain",
    name: "虎山长城",
    type: "attraction",
    position: [124.3356, 40.4521],
    description:
      "虎山长城位于丹东市东北鸭绿江畔，是明长城的较东端，现在的长城是92年在原址上修筑的，有城楼、长城、古栈道、睡观音等多个景观，景区内还有一座长城历史博物馆可以参观。整个景区与朝鲜隔江相望，可以在山上看到对岸朝鲜的村庄和人民生活的场景，还有一步跨景区和朝鲜相隔仅有几米，游客可以在此拍照留念。这里的长城长约1250米，沿长城而上栈道下来全程两三公里，可以步行游览。",
    openingHours: "全年 08:30-16:30",
    ticketPrice: "￥65",
    images: [
      {
        url: "https://dimg04.c-ctrip.com/images/01011120008n5rc4h0A83_R_1600_10000.jpg",
        alt: "虎山长城全景",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/100911000000rjex5B3A7_R_1600_10000.jpg",
        alt: "虎山长城远眺",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/01034120009zis4n5E1EF_R_1600_10000.jpg",
        alt: "虎山长城近景",
      },
    ],
  },
  {
    id: "feng-huang-shan",
    name: "凤凰山",
    type: "attraction",
    position: [124.086713, 40.415964],
    description:
      "丹东凤凰山位于丹东凤城市南郊，以秀美的山岳风光闻名。夏季的凤凰山清幽凉爽、环境宜人，是辽东有名的避暑胜地。而到了十月金秋，这里便红枫满山，是赏叶品秋的好去处。",
    openingHours: "全年 06:30-16:30",
    ticketPrice: "￥80",
    images: [
      {
        url: "https://dimg04.c-ctrip.com/images/0103k120008ctj1fl75BE_C_1600_1200.jpg",
        alt: "凤凰山",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/100d0w000000k4l09C659_R_1600_10000.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U5433I.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190424/1-1Z4240T5425G.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190424/1-1Z4240K40N21.jpg",
        alt: "凤凰山",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/01017120008w149b839A8_C_1600_1200.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U921216.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U9494A.jpg",
        alt: "凤凰山",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/0100b1200086nabixEEDD_R_1600_10000.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230UH1625.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190424/1-1Z4240S635193.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190424/1-1Z4240T3155S.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230Z036351.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230Z11M95.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U434C5.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U50R96.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U613142.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230UF1251.jpg",
        alt: "凤凰山",
      },
      {
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U613142.jpg",
        alt: "凤凰山",
      },
    ],
  },
  {
    id: "yalu-river-cruise",
    name: "丹东鸭绿江游船",
    type: "attraction",
    position: [124.395414, 40.118729],
    description:
      "丹东鸭绿江游船与朝鲜新义州市隔江相望，在此乘船游览鸭绿江，不仅可以欣赏到见证了抗美援朝战争的鸭绿江断桥，还可以近距离欣赏到朝鲜的神秘风光。",
    openingHours:
      "1号码头营业时间：08:00-17:00 2号码头每日发船时间：10:30、13:30、15:00,根据现场人数景区会做调整",
    images: [
      {
        url: "https://dimg04.c-ctrip.com/images/1lo4s12000evbaof269B7_R_1600_10000.jpg",
        alt: "丹东鸭绿江游船",
      },
      {
        url: "https://dimg04.c-ctrip.com/images/1lo2x12000evbaqxi5101_R_1600_10000.jpg",
        alt: "丹东鸭绿江游船",
      },
    ],
  },
  {
    id: "donggang-market",
    name: "东港海鲜市场",
    type: "food",
    position: [124.152775, 39.863198],
    description:
      "丹东最大的海鲜市场，可以买到最新鲜的海产品，还有很多海鲜大排档。",
    openingHours: "全天营业",
    ticketPrice: "￥100-200/人",
    images: [
      {
        url: "https://picx.zhimg.com/v2-63abdb063e36c92bb7944fb5ca0e0d59_1440w.jpg",
        alt: "东港海鲜市场",
      },
    ],
  },
  {
    id: "yalu-river-cruise-boat",
    name: "丹东鸭绿江游船",
    type: "attraction",
    position: [124.395414, 40.118729],
    description: "乘船游览鸭绿江，近距离观察朝鲜风光",
    openingHours:
      "1号码头营业时间：08:00-17:00 2号码头每日发船时间：10:30、13:30、15:00,根据现场人数景区会做调整",
    ticketPrice: "￥80",
    images: [
      {
        url: "https://dimg04.c-ctrip.com/images/100c1f000001gsxg063A8_R_1600_10000.jpg",
        alt: "丹东鸭绿江游船",
      },
    ],
  },
];
