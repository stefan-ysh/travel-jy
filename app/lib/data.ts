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
  image: string;
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
      '天桥沟位于丹东市宽甸县北部，距离县城约60公里。此地曾为清王朝时的"龙兴之地"，所以几百年来一直没有被破坏，山上森林密布，大树古木众多，山间还有清澈的山泉溪流，环境非常优美。这里地貌独特，山上有很多的奇峰怪石，造型各异，可以一一观赏游玩。而每到秋天，漫山枫叶遍布，更是观赏和拍摄红叶的地点。',
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
        url: "http://www.cnfhs.com/uploads/allimg/190423/1-1Z4230U9494A.jpg",
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
        image:
          "https://www.shuomingshu.cn/wp-content/uploads/images/2023/03/02/01152ae45a0d447eabb28fcaf5ef46bb_am5azwwnjlr.jpg",
        season: "夏秋最佳",
      },
      {
        name: "海蛎子",
        description: "鲜嫩多汁，春季必尝",
        price: "市场价",
        season: "春季最佳",
        image:
          "https://ts1.tc.mm.bing.net/th/id/R-C.f39a2129541f1c09d7ee71db1148c74a?rik=p2OOp0H4cbxsaA&riu=http%3a%2f%2fi2.chuimg.com%2f94bf1290878511e6a9a10242ac110002_800w_600h.jpg%3fimageView2%2f2%2fw%2f660%2finterlace%2f1%2fq%2f90&ehk=URRn0s4QJPqNIqggwtGQPaMk1apbGhCe6epu9QAJpa8%3d&risl=&pid=ImgRaw&r=0",
      },
      {
        name: "黄蚬子",
        description: "个大肉嫩，四季可尝",
        price: "市场价",
        image: "https://pic.nximg.cn/file/20170805/1687102_183547843038_2.jpg",
        season: "全年",
      },
      {
        name: "对虾",
        description: "个大肉嫩，四季可尝",
        price: "市场价",
        image:
          "https://ts1.tc.mm.bing.net/th/id/R-C.0f60dee6d2bb0b390892c7450d6f6ced?rik=vSWBLoxhnrOF9w&riu=http%3a%2f%2fpic.baike.soso.com%2fp%2f20140326%2f20140326100043-824681517.jpg&ehk=ue2sJducvxBEiTgnJzrqxEyYLQFsTz8cEsK9pAGvIbE%3d&risl=&pid=ImgRaw&r=0",
        season: "全年",
      },
      {
        name: "海参",
        description: "营养丰富，滋补佳品",
        price: "市场价",
        image:
          "https://tse4-mm.cn.bing.net/th/id/OIP-C.k6TdFSYBjs8iKA1u4Bt0HwHaE7?rs=1&pid=ImgDetMain",
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
        image:
          "https://pic1.zhimg.com/v2-9bab6a545a564e126ac406f6987430c2_1440w.jpg",
      },
      {
        name: "打糕",
        description: "香甜软糯，传统小吃",
        price: "15-20元",
        season: "全年",
        image: "https://pic.nximg.cn/file/20220315/25051490_233849821103_2.jpg",
      },
      {
        name: "辣白菜",
        description: "开胃爽口，传统腌制",
        price: "15-25元",
        season: "全年",
        image:
          "https://tse1-mm.cn.bing.net/th/id/OIP-C.F2KL0DrgWxOj0pzKLPNXjAHaFQ?rs=1&pid=ImgDetMain",
      },
      {
        name: "石锅拌饭",
        description: "营养美味，现场制作",
        price: "30-40元",
        season: "全年",
        image:
          "https://cp1.douguo.com/upload/caiku/2/a/1/690x390_2a989ab94214016c56f9b3f5746ff2e1.jpg",
      },
    ],
  },
  {
    id: "local",
    title: "本地特色",
    description:
      "丹东的本地特色美食，以锅包肉、丹东焖子、丹东老街烤冷面、丹东泥溜子等为代表。",
    image:
      "https://bkimg.cdn.bcebos.com/pic/7aec54e736d12f2e09d25e4b42c2d562843568c2?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_960",
    dishes: [
      {
        name: "锅包肉",
        description: "外酥里嫩，酸甜可口",
        price: "45-55元",
        image:
          "https://bkimg.cdn.bcebos.com/pic/7aec54e736d12f2e09d25e4b42c2d562843568c2?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_960",
        season: "全年",
      },
      {
        name: "百乐熏鸡",
        description: "百年历史，味道极佳",
        price: "市场价",
        image:
          "https://picx.zhimg.com/70/v2-420913935514721704aa92c11ec9e019_1440w.avis?source=172ae18b&biz_tag=Post",
        season: "全年",
      },
      {
        name: "丹东焖子",
        description: "外焦里嫩，口感滑爽",
        price: "10-15元",
        season: "全年",
        image:
          "https://pica.zhimg.com/v2-02c11daef08cfded7226b699c541319e_1440w.jpg",
      },
      {
        name: "丹东老街烤冷面",
        description: "筋道浓郁，让人欲罢不能",
        price: "10-15元",
        season: "全年",
        image:
          "https://pic3.zhimg.com/v2-26d570906084f84314370ed1df0d4f0c_1440w.jpg",
      },
      {
        name: "丹东泥溜子",
        description: "下酒小菜，新鲜美味",
        price: "20-40元",
        season: "全年",
        image:
          "https://pic1.zhimg.com/v2-1c1451f16ba7fffb7edf1813c9a9f60c_1440w.jpg",
      },
      {
        name: "丹东葱油饼",
        description: "香脆可口，回味无穷",
        price: "10-15元",
        season: "全年",
        image:
          "https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F1212%2F2a8ef8a7j00socqsw001rd200hs00bvg00it00cj.jpg&thumbnail=660x2147483647&quality=80&type=jpg",
      },
      {
        name: "丹东饽饽",
        description: "咸甜适中，口感独特",
        price: "10-15元",
        season: "全年",
        image:
          "https://picx.zhimg.com/v2-171b037e56ae4214d703e5743e6f4913_1440w.jpg",
      },
      {
        name: "丹东大草莓",
        description: "丹东特产，口感鲜美，营养丰富",
        price: "市场价",
        season: "春季",
        image:
          "https://pic1.zhimg.com/v2-9885ce75240ed8669d4f91fefce6e8fe_1440w.jpg",
      },
      {
        name: "大孤山豆腐脑",
        description: "酥脆可口，欲罢不能",
        price: "10-15元",
        season: "全年",
        image:
          "https://pic4.zhimg.com/v2-bade24537ce9cb6082b2b1d00d70d5c3_1440w.jpg",
      },
    ],
  },
];

export const restaurants: Restaurant[] = [
  {
    name: "东港海鲜市场-中国贝都",
    description:
      "丹东最大的海鲜市场，可以买到最新鲜的海产品，还有很多海鲜大排档。",
    address: "丹东市东港市东港海鲜市场",
    openTime: "全天营业",
    image:
      "https://picx.zhimg.com/v2-63abdb063e36c92bb7944fb5ca0e0d59_1440w.jpg",
    location: {
      lat: 39.905138,
      lng: 124.150899,
    },
  },
  {
    name: "鸭绿江畔餐厅",
    description: "临江而建的特色餐厅，可以一边品尝美食一边欣赏江景。",
    address: "丹东市振兴区鸭绿江畔",
    openTime: "10:00-22:00",
    image:
      "https://dimg04.c-ctrip.com/images/100c1f000001gsxg063A8_R_1600_10000.jpg",
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
    image:
      "https://p6.itc.cn/images01/20210619/4dea743f545c43a1be4549e6b452f16f.jpeg",
    location: {
      lat: 40.1164,
      lng: 124.3935,
    },
  },
  {
    name: "丹东小粑鱼馆",
    description:
      "专营丹东当地特色小粑鱼，味道鲜美，环境干净整洁，是品尝本地特色的好去处。",
    address: "丹东市振兴区七经街24号",
    openTime: "10:00-21:00",
    image:
      "https://pic4.zhimg.com/v2-3891f98574acf813be34c8d894c5efc9_1440w.jpg",
    location: {
      lat: 40.1198,
      lng: 124.3856,
    },
  },
  {
    name: "百乐烧鸡店",
    description:
      "百年老字号，传统工艺制作的熏鸡，口感独特，是丹东的名片之一，也是馈赠亲友的佳品。",
    address: "丹东市振兴区锦山大街88号",
    openTime: "08:30-19:00",
    image:
      "https://picx.zhimg.com/70/v2-420913935514721704aa92c11ec9e019_1440w.avis?source=172ae18b&biz_tag=Post",
    location: {
      lat: 40.1212,
      lng: 124.3843,
    },
  },
  {
    name: "老边饺子",
    description:
      "正宗东北水饺，皮薄馅大，口味多样，价格实惠，是本地人常去的餐厅。",
    address: "丹东市振兴区人民路56号",
    openTime: "09:00-20:30",
    image:
      "https://pic1.zhimg.com/v2-7c5b2b9b9b9b9b9b9b9b9b9b9b9b9b9_1440w.jpg",
    location: {
      lat: 40.123,
      lng: 124.3867,
    },
  },
  {
    name: "安东老街美食广场",
    description:
      "集合多家美食的复古风情街区，可以品尝到丹东各式特色小吃和美食，体验当地传统文化。",
    address: "丹东市振兴区人民路49号",
    openTime: "10:00-22:00",
    image:
      "https://dimg04.c-ctrip.com/images/0105n12000ez9e1ah41D3_R_10000_1200.jpg",
    location: {
      lat: 40.1201,
      lng: 124.3884,
    },
  },
  {
    name: "江畔文艺咖啡馆",
    description:
      "位于鸭绿江畔的文艺咖啡馆，环境优雅，视野绝佳，可一边品尝咖啡甜点，一边欣赏江景。",
    address: "丹东市振兴区鸭绿江畔步行街",
    openTime: "10:00-22:00",
    image:
      "https://pic2.zhimg.com/v2-9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9_1440w.jpg",
    location: {
      lat: 40.1167,
      lng: 124.3925,
    },
  },
  {
    name: "金达莱朝鲜族餐厅",
    description:
      "提供正宗朝鲜族美食，冷面、辣白菜、石锅拌饭等应有尽有，还有传统朝鲜族舞蹈表演。",
    address: "丹东市振兴区锦山大街178号",
    openTime: "11:00-21:00",
    image:
      "https://p6.itc.cn/images01/20210619/4dea743f545c43a1be4549e6b452f16f.jpeg",
    location: {
      lat: 40.1224,
      lng: 124.387,
    },
  },
  {
    name: "虎山长城农家乐",
    description:
      "位于虎山长城景区附近的农家餐厅，提供当地特色山野菜和农家菜，环境朴实，价格实惠。",
    address: "丹东市振安区虎山长城景区附近",
    openTime: "08:00-19:00",
    image:
      "https://pic3.zhimg.com/v2-9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9_1440w.jpg",
    location: {
      lat: 40.451,
      lng: 124.3346,
    },
  },
  {
    name: "戴家叉子",
    description:
      "当地老字号，以传统东北菜和特色叉子菜闻名，食材新鲜，味道地道，是当地人和游客都喜欢的餐厅。",
    address: "丹东市振兴区人民路附近",
    openTime: "10:00-21:00",
    image:
      "https://ts1.cn.mm.bing.net/th/id/R-C.9ac8cc9e528cbba4d10c3d11b7fe7b2a?rik=wCDVnS1v5KDhGw&riu=http%3a%2f%2fqcloud.dpfile.com%2fpc%2fHNDxRCH1VvFzUL8Cbi9LPvS6TwD6Ob0wA1NVl4PBx1F_C7TtJ6p1Fyk-PqxBYl5XjoJrvItByyS4HHaWdXyO_DrXIaWutJls2xCVbatkhjYMCsjI_WYFnQduouWMpvLi8KE0OStfxQRNOEYQhXuqmw.jpg&ehk=b8jtmgMnFMGYPk9IHtcPPx2Ksd9BKNaG%2bq8%2b4Ewtmdw%3d&risl=&pid=ImgRaw&r=0",
    location: {
      lat: 40.1235,
      lng: 124.385,
    },
  },
  {
    name: "金家高丽火盆",
    description:
      "正宗朝鲜族火锅餐厅，特色火盆料理结合新鲜海鲜和肉类，风味独特，环境优雅，体验朝鲜族饮食文化的绝佳选择。",
    address: "丹东市振兴区锦山大街",
    openTime: "11:00-21:30",
    image:
      "https://ts1.cn.mm.bing.net/th/id/R-C.e72abb8c8bca1b41d8d51aadb9e7a91c?rik=UkC9RlpTn%2fYY%2fQ&riu=http%3a%2f%2fp0.meituan.net%2fdeal%2f2c7276c10c6c88ef88bb25cd9ba9c9b9106350.jpg%40640w_400h_1e_1c_1l%7cwatermark%3d1%26%26r%3d1%26p%3d9%26x%3d2%26y%3d2%26relative%3d1%26o%3d20&ehk=%2fbmxvriI9qfnSlG2XmQRpDnJA3RkpDy3%2bjLQj9qULnY%3d&risl=&pid=ImgRaw&r=0",
    location: {
      lat: 40.124118212,
      lng: 124.389055,
    },
  },
  {
    name: "天福汤饭",
    description:
      "专营朝鲜族特色汤饭，用料讲究，汤底鲜美，是品尝朝鲜族传统美食的不错选择。",
    address: "丹东市振兴区六经街",
    openTime: "10:30-20:00",
    image:
      "https://qcloud.dpfile.com/pc/CQKsKsB5hcnDDBpFXSj08F68D74rHhZg6qCDNeCIDGX-D6GqBRl8-rVIsTwbvQVCjoJrvItByyS4HHaWdXyO_DrXIaWutJls2xCVbatkhjYMCsjI_WYFnQduouWMpvLi8KE0OStfxQRNOEYQhXuqmw.jpg",
    location: {
      lat: 40.1215,
      lng: 124.3855,
    },
  },
  {
    name: "老纪烤肉店",
    description:
      "地道的东北烧烤，以新鲜的肉类和丰富的烧烤品种闻名，调料独特，味道浓郁，是体验东北烧烤文化的好去处。",
    address: "丹东市振兴区七经街",
    openTime: "16:00-01:00",
    image:
      "https://qcloud.dpfile.com/pc/V5-TQgfSozYSiAHIf8UA0qsm2YEdjXcxl1jv_1MHeYN8vJstzfHxIxUF4FT9PCOH_Gd2X_zVZWVwjnwKFbkIbw.jpg",
    location: {
      lat: 40.126607,
      lng: 124.391885,
    },
  },
  {
    name: "伟豪市场",
    description:
      "大型综合市场，内有各类小吃摊位，可以一站式品尝丹东各种特色美食，价格实惠，品种丰富。",
    address: "丹东市振兴区六纬路",
    openTime: "08:00-19:00",
    image:
      "https://ts1.cn.mm.bing.net/th/id/R-C.fca66a85526e6f4a8a7a77f88a4a8c67?rik=tbzjPh2OTvKdpA&riu=http%3a%2f%2fwww.chinadaily.com.cn%2ffood%2fimg%2fattachement%2jpg%2fsite1%2f20160714%2f448a5bd61c8d18f6307d12.jpg&ehk=yktFaCzLgIi%2bfuQxSM%2fcFwDI%2fYzk%2fTB4x3qn1W6hEu4%3d&risl=&pid=ImgRaw&r=0",
    location: {
      lat: 40.121,
      lng: 124.384,
    },
  },
  {
    name: "白马江炭烤",
    description:
      "以炭火烤制的海鲜和肉类为特色，食材新鲜，独特的烧烤技术保留了食材的原汁原味，是享受晚餐的理想选择。",
    address: "丹东市振兴区锦山大街",
    openTime: "16:30-23:30",
    image:
      "https://bkimg.cdn.bcebos.com/pic/7aec54e736d12f2e09d25e4b42c2d562843568c2?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_960",
    location: {
      lat: 40.1218,
      lng: 124.3853,
    },
  },
];

export const routes: Route = {
  title: "丹东闺蜜游",
  date: "4月4日",
  weatherInfo: {
    temperature: "10°C-25°C",
    description: "春秋季节天气舒适，早晚温差较大。",
    tips: ["带轻薄外套", "舒适鞋子", "防晒霜", "雨具备用", "保暖内搭"],
  },
  routeOverview: {
    duration: "2天游玩 + 1天轻松返程",
    distance: "市区景点间距离约5-10公里",
    difficulty: "轻松休闲，适合所有人群",
    bestTime: "4-5月春季或9-10月秋季",
    highlights: [
      "抗美援朝纪念馆感受历史",
      "品尝正宗中韩料理",
      "鸭绿江断桥游船观江景，俯瞰中朝两国",
      "登顶虎山长城，拍摄绝美风景",
      "入住江景房，欣赏夜景",
      "逛安东老街，体验人间烟火",
    ],
  },
  schedule: [
    {
      time: "Day 1 (4月4日) 12:00-13:00",
      activity: "抵达丹东站",
      location: "丹东站",
      description:
        "抵达丹东火车站，打车前往酒店办理入住。丹东市区不大，交通便利，起步价6元即可到达市区内的大多数地点。",
      tips: "建议选择市中心或鸭绿江畔的酒店，方便游览各个景点。中联大酒店有江景房，可以直接欣赏鸭绿江美景。",
      transportation: "出租车",
      image:
        "/images/station.png",
    },
    {
      time: "Day 1 (4月4日) 13:30-15:30",
      activity: "抗美援朝纪念馆参观",
      location: "抗美援朝纪念馆",
      description:
        "参观抗美援朝纪念馆，这是必去的打卡地！馆内展示了海量战争中的珍贵物品和文献资料，铺天盖地的战争氛围让人深刻感受到和平来之不易，既热血又感动。",
      tips: "参观需提前预约，完全免费。馆内氛围庄严，请保持安静并尊重历史。由于展品众多，建议预留至少1.5小时参观时间。",
      transportation: "出租车",
      tickets: {
        price: "免费（需提前预约）",
        includes: ["馆内全部展区"],
        notes: "需携带身份证，可通过官方渠道预约",
      },
      image:
        "/images/attractions/kmyc-museum.png",
      mustSee: ["主展厅", "战争实物展示", "历史文献资料", "英雄事迹展示"],
    },
    {
      time: "Day 1 (4月4日) 16:00-17:00",
      activity: "高社长长白山中韩料理",
      location: "高社长长白山中韩料理店",
      description:
        "在高社长长白山中韩料理店享用正宗韩式美食。这家店的韩餐特别好吃，性价比最高，是当地强烈推荐的餐厅。",
      tips: "推荐品尝米酒，可以在大众点评上搜索9.9元抢购套餐，很大一碗，非常划算。",
      transportation: "出租车（约16分钟）",
      image:
        "/images/food/高社长长白山中韩料理.png",
      priceRange: "¥60-100/人",
      recommendations: ["米酒", "冷面", "石锅拌饭", "韩式烤肉"],
    },
    {
      time: "Day 1 (4月4日) 17:30-18:30",
      activity: "鸭绿江断桥打卡与游船",
      location: "鸭绿江断桥景区",
      description:
        "参观断桥遗址，了解抗美援朝历史。站在断裂处，可以清晰看到对面朝鲜太阳楼上的'一心团结'四个大字。鸭绿江游船可近距离观察朝鲜人在工厂农田中劳作的场景，体验独特的跨国界感受。",
      tips: "傍晚时分光线柔和，适合拍照。如果住在中联大酒店，凭房卡可免上桥门票，房间还标配望远镜，坐在床上就能看朝鲜。（游船可选）",
      transportation: "出租车（约5分钟）",
      tickets: {
        price: "断桥¥30/人，游船¥60/人",
        includes: ["断桥参观", "江上游览"],
        notes: "住中联大酒店可凭房卡免断桥门票",
      },
      image:
        "/images/attractions/鸭绿江断桥.png",
      photoSpots: ["断桥观景台", "断桥断裂处", "朝鲜太阳楼视角", "船上拍摄朝鲜风光"],
      mustSee: ["断桥保存的弹痕", "朝鲜太阳楼", "'一心团结'四个大字", "朝鲜民众生活场景"],
    },
    {
      time: "Day 1 (4月4日) 18:30-21:00",
      activity: "与亲友聚餐",
      location: "当地餐厅",
      description:
        "与小妹儿母亲共进晚餐，品尝当地美食，享受温馨的聚会时光。",
      tips: "丹东的特色美食有朝鲜冷面、海鲜、烤肉等，可以请当地人推荐正宗的餐馆。",
      transportation: "出租车或步行",
      image:
        "/images/亲友相聚.png",
      priceRange: "¥100-150/人",
    },
    {
      time: "Day 1 (4月4日) 21:00",
      activity: "回酒店休息",
      location: "酒店",
      description:
        "返回酒店休息，为第二天的行程养精蓄锐。如果入住了江景房，可以欣赏鸭绿江夜景。",
      tips: "晚上江边温度较低，记得多穿衣服。江对岸朝鲜与中国一侧形成鲜明对比，中方灯火辉煌，朝方一片漆黑。",
      transportation: "出租车或步行",
      image:
        "https://img3.jiemian.com/101/original/20160531/146469897756646200.jpg",
    },
    {
      time: "Day 2 (4月5日) 9:00-12:00",
      activity: "虎山长城（可选）",
      location: "虎山长城景区",
      description:
        "如果体力允许，可以前往虎山长城。虽然规模不如北京八达岭长城，但登顶后可以俯瞰中朝边境，一眼眺望两国风光，拍照非常出片。",
      tips: "可以乘坐缆车往返，节省体力。山上风大，建议带外套。如果感到疲劳，可以选择跳过这个景点，直接前往东港吃海鲜。",
      transportation: "出租车",
      tickets: {
        price: "¥65/人",
        includes: ["景区门票"],
        notes: "缆车需另付费",
      },
      image:
        "/images/attractions/虎山长城.png",
      mustSee: ["山顶观景台", "长城古迹"],
    },
    {
      time: "Day 2 (4月5日) 9:00-10:30",
      activity: "锦江山公园观景",
      location: "锦江山公园",
      description:
        "如果不想去虎山长城，锦江山公园是个更轻松的选择。爬上锦江亭，可以俯瞰整个丹东市区和朝鲜新义州，视野极佳。这里是观赏两国风光的绝佳位置，可以清晰看到对岸朝鲜的建筑和风景，景色非常壮观。",
      tips: "爬山相对轻松，但仍建议穿舒适的鞋子。山顶风大，带件外套。携带相机或望远镜效果更佳。",
      transportation: "出租车",
      tickets: {
        price: "免费",
        includes: ["公园游览"],
        notes: "",
      },
      image:
        "/images/attractions/锦江山公园.png",
      photoSpots: ["锦江亭", "山顶观景台", "朝鲜新义州全景"],
      mustSee: ["朝鲜新义州全景", "鸭绿江全貌", "丹东市区景观"],
    },
    {
      time: "Day 2 (4月5日) 12:00-13:30",
      activity: "东港海鲜市场游览",
      location: "东港海鲜市场-中国贝都",
      description:
        "前往东港海鲜市场，这里被誉为\"中国贝都\"，以丰富的贝类和海鲜品种闻名。春季是品尝海蛎子、蛤蜊等贝类的最佳季节，新鲜度和口感都达到顶峰。",
      tips: "从市区到东港需要约1小时车程，可根据实际情况调整，或选择市区内其他海鲜餐厅。建议找当地人推荐的店铺，价格实惠质量好。",
      transportation: "出租车（约1小时）",
      image:
        "/images/food/东港海鲜市场.png",
      priceRange: "¥80-150/人",
      recommendations: ["鲜海蛎子", "蛤蜊", "梭子蟹", "海螺", "扇贝"],
    },
    {
      time: "Day 2 (4月5日) 11:00-12:30",
      activity: "自由活动",
      location: "随机",
      description:
        "注意车辆安全，交通比较混乱",
      tips: "购物休闲喝咖啡等",
      transportation: "",
      image:
        "/images/自由活动.png",
      // priceRange: "",
      // recommendations: [],
    },
    {
      time: "Day 2 (4月5日) 13:30-15:30",
      activity: "安东老街逛街",
      location: "安东老街",
      description:
        "前往安东老街，这是一个充满烟火气的地方，汇集了各种美食、小吃和特色商品。在这里可以体验当地的市井文化，感受丹东的风情。",
      tips: "老街上人流较多，注意保管好随身物品。可以品尝各种当地小吃，也可以购买一些特色纪念品。",
      transportation: "出租车",
      image:
        "/images/attractions/安东老街.png",
      priceRange: "因消费项目而异",
      recommendations: ["特色小吃", "手工艺品", "文创商品", "传统美食"],
    },
    {
      time: "Day 2 (4月5日) 16:00-17:30",
      activity: "烧烤晚餐",
      location: "丹东烤肉店",
      description:
        "品尝丹东烧烤，据说是全国天花板级别的美食。推荐好朋友海鲜烧烤、旮旯烤肉、金盾烤肉等，也可自行探索，不必刻意追求网红店。",
      tips: "丹东的烧烤店很多，随便找一家都可能让你惊喜。网红店可能需要排队，建议选择本地人常去的店铺。",
      transportation: "出租车或步行",
      image:
        "https://bkimg.cdn.bcebos.com/pic/7aec54e736d12f2e09d25e4b42c2d562843568c2?x-bce-process=image/format,f_auto/resize,m_lfit,limit_1,h_960",
      priceRange: "¥80-120/人",
      recommendations: ["特色烤肉", "烤海鲜", "烤蘑菇", "烤五花肉"],
    },
    {
      time: "Day 2 (4月5日) 18:00-20:00",
      activity: "江边休闲与夜景",
      location: "鸭绿江畔",
      description:
        "自由活动时间，可以沿江漫步欣赏江景，或在江边咖啡馆休息。推荐hijojo咖啡馆，可以悠闲地看江景，度过惬意的傍晚时光。",
      tips: "晚上江边气温较低，记得多穿衣服。可以带上相机拍摄夜景，江对岸朝鲜与中国一侧形成鲜明对比，景色独特。江边有很多租衣服拍照的可供选择，还有鸽子可以喂食。",
      transportation: "步行",
      image:
        "/images/attractions/江边.png",
      photoSpots: ["江边栈道", "友谊桥夜景", "中朝对比景观"],
    },
    {
      time: "Day 2 (4月5日) 20:00",
      activity: "回酒店休息",
      location: "酒店",
      description:
        "返回酒店休息，为明天的行程养精蓄锐。",
      tips: "可以整理一下购买的纪念品和拍摄的照片，回顾一天的美好时光。",
      transportation: "出租车或步行",
      image:
        "https://tse1-mm.cn.bing.net/th/id/OIP-C.V4VeUCIBeRh2JyFD14ry2wHaE8?rs=1&pid=ImgDetMain",
    },
    {
      time: "Day 3 (4月6日) 9:00-10:00",
      activity: "睡懒觉与轻松早午餐",
      location: "酒店及周边",
      description:
        "最后一天可以睡到自然醒，不用早起。起床后可以在酒店或附近享用一顿悠闲的早午餐。",
      tips: "酒店一般可提供行李寄存服务，方便退房后继续游玩。",
      transportation: "步行",
      image: "/images/sleep.png",
      recommendations: ["酒店早餐", "附近咖啡馆", "便捷小吃"],
    },
    {
      time: "Day 3 (4月6日) 10:00-11:00",
      activity: "伟豪早市体验",
      location: "伟豪市场",
      description:
        "来东北一定要感受这份独特的烟火气！伟豪早市是丹东最具活力的市场，这里有各种令人惊喜的物美价廉商品：99元一箱的草莓、几块钱一斤的黄蚬子、冻梨、大榛子应有尽有，市场氛围热闹非凡。",
      tips: "早市人多，注意保管好随身物品。建议早点去，摊位多选择多。附近有丹东打卡墙（位于赫氏燕窝附近），逛完市场步行几分钟即可到达，很适合拍照留念。",
      transportation: "出租车",
      image:
        "/images/food/weihao.png",
      priceRange: "¥50-100/人",
      recommendations: ["应季水果", "海鲜", "特产小吃", "丹东打卡墙"],
      mustBuy: ["99元草莓", "黄蚬子", "冻梨", "大榛子", "当地特产"],
    },
    {
      time: "Day 3 (4月6日) 15:00",
      activity: "行李整理与返程准备",
      location: "酒店",
      description: "收拾行李，准备返程。根据返程车次适当安排时间，确保不会赶车。",
      tips: "建议预留充足时间到达火车站，避免赶车紧张。",
      transportation: "出租车",
      image: "https://www.travelite.com/media/85/36/74/1691139857/koffergroesen.webp",
    },
  ],
  tips: {
    beforeTrip: [
      "提前预约抗美援朝纪念馆门票",
      "查看天气预报，准备合适衣物",
      "如需住宿，提前预订中联大酒店江景房",
      "下载离线地图和翻译软件",
      "特殊时期，注意准备卫生用品",
      "准备充足现金，部分小店可能不便刷卡",
    ],
    duringTrip: [
      "丹东物价不高，打车起步价6元，打表即可",
      "景点间建议打车，省时省力",
      "注意保管好证件和贵重物品",
      "尊重当地风俗和边境地区规定",
      "拍照时注意安全，特别是江边和长城",
    ],
    transportation: [
      "市区内景点距离不远，打车方便快捷",
      "去虎山长城建议打车",
      "鸭绿江断桥附近景点可步行游览",
      "如需往返火车站，提前规划时间",
      "酒店到安东老街可步行或打车",
    ],
  },
};

export const cultures: Culture[] = [
  {
    id: "border-culture",
    title: "边境文化",
    description:
      "丹东是中国距离朝鲜最近的城市，鸭绿江将两国一分为二，却又将两国文化紧密相连。在这里，你可以近距离观察朝鲜新义州的生活场景，感受独特的边境文化氛围。乘坐游船，欣赏两岸风光，体验独特的边境风情。",
    image:
      "https://dimg04.c-ctrip.com/images/100811000000rh7dqCBE4_R_1600_10000.jpg",
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
    image: "https://pic.nximg.cn/file/20170805/1687102_183547843038_2.jpg",
    features: [
      "东港海鲜市场 - 中国贝都",
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
    image: "http://inews.gtimg.com/newsapp_bt/0/13704545040/1000",
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
    image:
      "https://dimg04.c-ctrip.com/images/01013120005b716iy8151_C_1600_1200.jpg",
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
    id: "yalu-bridge",
    name: "鸭绿江断桥",
    type: "attraction",
    position: [124.40189, 40.123693],
    description: "丹东标志性景点，抗美援朝战争的历史见证。",
    openingHours: "08:00-17:00",
    ticketPrice: "￥30",
    phone: "0415-2122145",
  },
  {
    id: "tiger-mountain",
    name: "虎山长城",
    type: "attraction",
    position: [124.524687, 40.231801],
    description: "中国长城东端起点，可乘缆车俯瞰中朝边境。",
    openingHours: "08:00-16:30",
    ticketPrice: "￥65",
    phone: "0415-2142215",
  },
  {
    id: "war-museum",
    name: "抗美援朝纪念馆",
    type: "attraction",
    position: [124.364722, 40.118056],
    description: "了解抗美援朝战争历史的重要场所。",
    openingHours: "09:00-16:30 (周一闭馆)",
    ticketPrice: "免费(需预约)",
    phone: "0415-2175988",
  },
  {
    id: "yalu-scenic",
    name: "鸭绿江风景区",
    type: "attraction",
    position: [124.394828, 40.119311],
    description: "江边漫步，欣赏中朝两国风光。",
    openingHours: "全天开放",
    ticketPrice: "免费",
  },
  {
    id: "dandong-station",
    name: "丹东站",
    type: "attraction",
    position: [124.387456, 40.123797],
    description: "丹东火车站",
    openingHours: "全天开放",
    ticketPrice: "免费",
  },
  {
    id: "weihao-market",
    name: "伟豪市场",
    type: "shopping",
    position: [124.37768, 40.116246],
    description: "丹东最大的市场，可以购买到各种商品。",
    openingHours: "06:00-18:00",
  },
  {
    id: "donggang-seafood",
    name: "东港海鲜市场-中国贝都",
    type: "food",
    position: [124.150899, 39.905138],
    description: "新鲜海鲜，品种丰富。",
    openingHours: "06:00-18:00",
  },
  {
    id: "andong-street",
    name: "安东老街",
    type: "shopping",
    position: [124.36, 40.104901],
    description: "民国时期风格建筑，特色小吃和商品，体验丹东人间烟火。",
    openingHours: "09:00-21:00",
  },
  {
    id: "korean-restaurant",
    name: "朝鲜风味餐厅",
    type: "food",
    position: [125.535689, 40.897022],
    description: "正宗朝鲜风味美食，冷面和烤肉。",
    openingHours: "10:00-21:00",
  },
  {
    id: "dandong-hotel",
    name: "丹东江畔酒店",
    type: "other",
    position: [124.433882, 40.15161],
    description: "靠近鸭绿江，交通便利的舒适酒店。",
    phone: "0415-3126688",
  },
  // {
  //   id: "riverside-cafe",
  //   name: "江畔文艺咖啡馆",
  //   type: "food",
  //   position: [124.392, 40.118],
  //   description: "临江咖啡馆，欣赏江景，休闲放松的好去处。",
  //   openingHours: "09:00-22:00",
  //   phone: "0415-2566789",
  // },
  {
    id: "zhonglian-hotel",
    name: "中联大酒店",
    type: "other",
    position: [124.393245, 40.119166],
    description:
      "位于断桥对面的高档酒店，江景房可直接观赏鸭绿江和断桥美景，视角绝佳。",
    phone: "0415-3164888",
  },
  {
    id: "gaoshechang-restaurant",
    name: "高社长长白山中韩料理店",
    type: "food",
    position: [124.392978, 40.123636],
    description: "正宗韩餐，特别好吃，性价比最高，当地强烈推荐的餐厅。",
    openingHours: "10:30-20:30",
    phone: "0415-2188866",
  },
  {
    id: "laoji-market",
    name: "老纪烤肉店",
    type: "food",
    position: [124.391885, 40.126607],
    description: "丹东最著名的烧烤店之一，以炭火烤制海鲜和肉类闻名。",
    openingHours: "16:00-01:00",
    phone: "0415-2122145",
  },
  {
    id: "yibukuan-border",
    name: "中朝边境一步跨",
    type: "attraction",
    position: [124.523427,40.228160],
    description: "中朝边境一步跨，可以体验一步跨两国的感觉。",
    openingHours: "06:00-18:00",
  },
  {
    id: "shanghekou-guomen",
    name: "上河口国门",
    type: "attraction",
    position: [124.880519,40.460929],
    
    description: "上河口国门，可以打卡国门。",
  },
  {
    id: "jinshanjiang-park",
    name: "锦江山公园",
    type: "attraction",
    position: [124.382649,40.136004],
    description: "锦江山公园，可以俯瞰整个丹东市区和朝鲜新义州，视野极佳。",
    openingHours: "06:00-18:00",
    ticketPrice: "免费",
  },
  
];
