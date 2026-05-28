export interface VillageNews {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

export interface VillageEvent {
  id: number;
  day: string;
  month: string;
  title: string;
  description: string;
  time: string;
  location: string;
}

export interface Announcement {
  id: number;
  title: string;
  category: 'Услуги' | 'Продажа' | 'Обмен' | 'Разное';
  author: string;
  phone: string;
  date: string;
  content: string;
}

export interface ShopItem {
  id: number;
  name: string;
  price: string;
  category: 'Продукты' | 'Фрукты/Овощи' | 'Выпечка' | 'Белорусские товары';
  inStock: boolean;
}

export interface DirectoryItem {
  id: number;
  title: string;
  phone: string;
  person?: string;
}
