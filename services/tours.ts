import { Tour, TourCategory } from '../types';

export const MOCK_TOURS: Tour[] = [
  {
    id: 't1',
    title: '西安古都穿越记：兵马俑修复体验',
    title_en: 'Xi’an Ancient Capital: Terracotta Warriors Restoration',
    subtitle: '亲手制作兵马俑，夜游大唐不夜城',
    subtitle_en: 'Hand-craft warriors and explore the Great Tang All Day Mall',
    category: TourCategory.STUDY,
    price: 6800,
    privatePrice: 8500,
    originalPrice: 7500,
    days: 5,
    location: '中国西安',
    location_en: 'Xi’an, China',
    image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=2070&auto=format&fit=crop',
    description: '深度体验秦汉文化，对话考古学家。不仅仅是参观，更是一次穿越千年的对话。适合10-15岁青少年及家庭。',
    description_en: 'Deeply experience Qin and Han culture and talk to archaeologists. It is not just a visit, but a dialogue across thousands of years. Suitable for teenagers aged 10-15 and families.',
    minGroupSize: 10,
    currentGroupSize: 8,
    maxGroupSize: 20,
    startDate: '2024-07-15',
    features: ['考古专家讲座', '兵马俑手作体验', '大唐不夜城VIP', '陕历博绿色通道'],
    features_en: ['Archaeologist Lecture', 'Terracotta DIY', 'Tang Paradise VIP', 'Museum Fast Track'],
    itinerary: [
      { day: 1, title: '抵达西安', desc: '入住城墙边特色酒店，开营仪式。' },
      { day: 2, title: '兵马俑博物馆', desc: 'VIP通道参观，并在修复师指导下体验陶俑修复。' },
      { day: 3, title: '大唐不夜城', desc: '汉服体验，沉浸式夜游。' }
    ],
    itinerary_en: [
      { day: 1, title: 'Arrive in Xi’an', desc: 'Check into hotel near City Wall, Opening Ceremony.' },
      { day: 2, title: 'Terracotta Warriors', desc: 'VIP access and restoration workshop with experts.' },
      { day: 3, title: 'Great Tang Mall', desc: 'Hanfu costume experience and immersive night tour.' }
    ],
    cashbackRate: 0.05,
    commissionRate: 0.03
  },
  {
    id: 't2',
    title: '上海杭州数字经济考察团',
    title_en: 'Shanghai & Hangzhou Digital Economy Delegation',
    subtitle: '深入阿里巴巴总部，探访特斯拉超级工厂',
    subtitle_en: 'Visit Alibaba HQ and Tesla Gigafactory',
    category: TourCategory.BUSINESS,
    price: 12800,
    privatePrice: 16800,
    originalPrice: 15800,
    days: 4,
    location: '上海 & 杭州',
    location_en: 'Shanghai & Hangzhou',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    description: '高端商务局。与行业高管面对面交流，探寻中国数字经济发展的底层逻辑。适合企业家、创业者及投资人。',
    description_en: 'High-end business delegation. Face-to-face communication with industry executives to explore the underlying logic of China\'s digital economy. Suitable for entrepreneurs and investors.',
    minGroupSize: 15,
    currentGroupSize: 12,
    maxGroupSize: 25,
    startDate: '2024-09-10',
    features: ['阿里总部参访', '特斯拉工厂流水线', '高管闭门交流会', '五星级行政酒廊社交'],
    features_en: ['Alibaba HQ Visit', 'Tesla Gigafactory', 'Executive Closed-door Meeting', '5-Star Networking'],
    itinerary: [
      { day: 1, title: '上海金融中心', desc: '陆家嘴金融考察与欢迎晚宴。' },
      { day: 2, title: '特斯拉超级工厂', desc: '实地观摩自动化生产线。' },
      { day: 3, title: '杭州阿里巴巴', desc: '数字生态系统深度解析。' }
    ],
    itinerary_en: [
      { day: 1, title: 'Shanghai Financial Center', desc: 'Lujiazui tour and welcome dinner.' },
      { day: 2, title: 'Tesla Gigafactory', desc: 'On-site observation of automated production lines.' },
      { day: 3, title: 'Alibaba Hangzhou', desc: 'Deep analysis of the digital ecosystem.' }
    ],
    cashbackRate: 0.05,
    commissionRate: 0.05
  },
  {
    id: 't3',
    title: '桂林山水：画中骑行之旅',
    title_en: 'Guilin Landscape: Cycling in a Painting',
    subtitle: '避开人流的私家路线，遇龙河竹筏漂流',
    subtitle_en: 'Private route avoiding crowds, bamboo rafting on Yulong River',
    category: TourCategory.TOURISM,
    price: 3200,
    privatePrice: 4200,
    originalPrice: 4500,
    days: 4,
    location: '桂林 & 阳朔',
    location_en: 'Guilin & Yangshuo',
    image: 'https://images.unsplash.com/photo-1548266652-99cf27701ced?q=80&w=2000&auto=format&fit=crop',
    description: '纯玩无购物。在山水画卷中骑行，体验地道的白族扎染，享受阳朔的慢生活。',
    description_en: 'Pure travel, no shopping stops. Cycling in the landscape painting, experiencing authentic tie-dye, and enjoying the slow life of Yangshuo.',
    minGroupSize: 8,
    currentGroupSize: 2,
    maxGroupSize: 16,
    startDate: '2024-06-20',
    features: ['悦榕庄或同级酒店', '私人竹筏', '田园骑行', '印象刘三姐VIP席'],
    features_en: ['Banyan Tree or similar', 'Private Bamboo Raft', 'Countryside Cycling', 'Impression Sanjie Liu VIP'],
    itinerary: [
      { day: 1, title: '抵达桂林', desc: '象鼻山与两江四湖夜景。' },
      { day: 2, title: '漓江精华段', desc: '兴坪古镇与20元人民币背景打卡。' }
    ],
    itinerary_en: [
      { day: 1, title: 'Arrive in Guilin', desc: 'Elephant Trunk Hill and Night Cruise.' },
      { day: 2, title: 'Li River Core', desc: 'Xingping Ancient Town and 20 RMB scenery.' }
    ],
    cashbackRate: 0.03,
    commissionRate: 0.02
  }
];

export const getTours = () => MOCK_TOURS;
export const getTourById = (id: string) => MOCK_TOURS.find(t => t.id === id);