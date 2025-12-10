
import { Region } from '../types';

export const MOCK_REGIONS: Region[] = [
  {
    id: 'r_xian',
    name: '西安',
    name_en: 'Xi’an',
    x: 48,
    y: 45,
    cultureTag: '秦汉风骨',
    cultureTag_en: 'Qin & Han Dynasty',
    description: '十三朝古都，中华文明的摇篮。这里有兵马俑的肃穆，也有大唐不夜城的繁华。',
    description_en: 'The ancient capital of 13 dynasties. Home to the Terracotta Warriors and the glorious Tang culture.',
    image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=2070',
    linkedTourIds: ['t1'] // Links to the Xi'an Tour
  },
  {
    id: 'r_shanghai',
    name: '上海',
    name_en: 'Shanghai',
    x: 82,
    y: 55,
    cultureTag: '摩登东方',
    cultureTag_en: 'Modern Orient',
    description: '东方明珠，魔都魅力。这里是中国经济的心脏，融合了海派文化与现代科技。',
    description_en: 'The Pearl of the Orient. The economic heart of China, blending Haipai culture with modern technology.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
    linkedTourIds: ['t2'] // Links to Business Tour
  },
  {
    id: 'r_guilin',
    name: '桂林',
    name_en: 'Guilin',
    x: 62,
    y: 75,
    cultureTag: '山水甲天下',
    cultureTag_en: 'Karst Landscape',
    description: '千峰环野立，一水抱城流。漓江的山水是国画的现实写照。',
    description_en: 'The finest scenery under heaven. The Li River landscape is a real-life Chinese painting.',
    image: 'https://images.unsplash.com/photo-1548266652-99cf27701ced?q=80&w=2000',
    linkedTourIds: ['t3'] // Links to Tourism Tour
  },
  {
    id: 'r_beijing',
    name: '北京',
    name_en: 'Beijing',
    x: 72,
    y: 28,
    cultureTag: '皇城气象',
    cultureTag_en: 'Imperial City',
    description: '紫禁城的威严，长城的雄伟，胡同的烟火气。',
    description_en: 'The majesty of the Forbidden City, the grandeur of the Great Wall, and the life of the Hutongs.',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2070',
    linkedTourIds: [] // No current tour -> triggers "Make a Wish"
  },
  {
    id: 'r_chengdu',
    name: '成都',
    name_en: 'Chengdu',
    x: 42,
    y: 60,
    cultureTag: '天府之国',
    cultureTag_en: 'Land of Abundance',
    description: '熊猫的故乡，火锅的源头。一座来了就不想走的城市。',
    description_en: 'Hometown of Pandas and Hotpot. A city you never want to leave.',
    image: 'https://images.unsplash.com/photo-1540397106260-e24a595a84ca?q=80&w=2000',
    linkedTourIds: [] // No current tour -> triggers "Make a Wish"
  }
];

export const getRegions = () => MOCK_REGIONS;
