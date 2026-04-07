import type { ProductCardData } from "@/shared/types/product.types";

export type { ProductCardData };

/** @deprecated Use ProductCardData from @/shared/types/product.types */
export type ProductCard = ProductCardData;

// ─── Featured Listings (главная страница) ────────────────────────────────────

export const featuredListings: ProductCard[] = [
  {
    id: 1,
    title: "Перфоратор Bosch GBH 2-28",
    category: "Перфораторы",
    price: 800,
    period: "день",
    rating: 4.9,
    reviews: 127,
    location: "Москва, Арбат",
    owner: { username: "Александр М.", avatar: null },
    popular: true,
    image:
      "https://images.unsplash.com/photo-1760376208640-2ece4c4a0adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tZXIlMjBkcmlsbCUyMGNvbnN0cnVjdGlvbiUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Шуруповёрт Makita 18V",
    category: "Дрели-шуруповёрты",
    price: 600,
    period: "день",
    rating: 4.8,
    reviews: 89,
    location: "Санкт-Петербург",
    owner: { username: "Дмитрий К.", avatar: null },
    popular: false,
    image:
      "https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGRyaWxsJTIwZHJpdmVyfGVufDF8fHx8MTc3MTU3MTg2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Отбойный молоток DeWalt",
    category: "Отбойные молотки",
    price: 1500,
    period: "день",
    rating: 5.0,
    reviews: 203,
    location: "Москва, Центр",
    owner: { username: "Иван П.", avatar: null },
    popular: true,
    image:
      "https://images.unsplash.com/photo-1652265156920-dda0e6f900ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbGl0aW9uJTIwaGFtbWVyJTIwamFja2hhbW1lcnxlbnwxfHx8fDE3NzE1NzE4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Электролобзик Bosch PST 900",
    category: "Электролобзики",
    price: 500,
    period: "день",
    rating: 4.7,
    reviews: 56,
    location: "Казань",
    owner: { username: "Михаил С.", avatar: null },
    popular: false,
    image:
      "https://images.unsplash.com/photo-1615746363486-92cd8c5e0a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaWdzYXclMjBwb3dlciUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Циркулярная пила Makita 1800W",
    category: "Циркулярные пилы",
    price: 700,
    period: "день",
    rating: 4.9,
    reviews: 145,
    location: "Екатеринбург",
    owner: { username: "Сергей В.", avatar: null },
    popular: true,
    image:
      "https://images.unsplash.com/photo-1619759247378-6a73e3ad45f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMHNhdyUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NzE1NzE4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    title: "Угловая шлифмашина (Болгарка) 2000W",
    category: "Угловые шлифмашины",
    price: 450,
    period: "день",
    rating: 4.8,
    reviews: 92,
    location: "Новосибирск",
    owner: { username: "Андрей Т.", avatar: null },
    popular: false,
    image:
      "https://images.unsplash.com/photo-1674117068691-034b4bf87bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmdsZSUyMGdyaW5kZXIlMjB0b29sfGVufDF8fHx8MTc3MTU3MTg2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

// ─── Catalog Products (страница каталога) ────────────────────────────────────
// coords will come from API in future — for now mock data with some products sharing same building

export const catalogProducts: ProductCard[] = [
  {
    id: 1,
    title: "Дрель Makita с набором бит",
    location: "Москва, Центральный район",
    price: "650",
    period: "день",
    rating: 4.8,
    reviews: 89,
    owner: { username: "Александр М.", avatar: null },
    popular: true, // Такого параметра не будет, популярность должна рассчитываться изходя из количества выкупов
    coords: [55.7558, 37.6173],
    image:
      "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Перфоратор Bosch Professional",
    location: "Москва, Центральный район",
    price: "900",
    period: "день",
    rating: 5.0,
    reviews: 145,
    owner: { username: "Дмитрий К.", avatar: null },
    popular: false,
    coords: [55.756, 37.6176], // same building as #1
    image:
      "https://images.unsplash.com/photo-1770386582823-3a7094e35b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3NjaCUyMGhhbW1lciUyMGRyaWxsJTIwY2FzZXxlbnwxfHx8fDE3NzE1NzM5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Дрель-шуруповёрт Makita 18V",
    location: "Москва, Центральный район",
    price: "550",
    period: "день",
    rating: 4.9,
    reviews: 203,
    owner: { username: "Иван П.", avatar: null },
    popular: true,
    coords: [55.7556, 37.617], // same building as #1
    image:
      "https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGRyaWxsJTIwZHJpdmVyfGVufDF8fHx8MTc3MTU3MTg2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Ударная дрель Bosch GSB 13",
    location: "Москва, Западный округ",
    price: "600",
    period: "день",
    rating: 4.7,
    reviews: 56,
    owner: { username: "Михаил С.", avatar: null },
    popular: false,
    coords: [55.742, 37.615],
    image:
      "https://images.unsplash.com/photo-1760376208640-2ece4c4a0adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tZXIlMjBkcmlsbCUyMGNvbnN0cnVjdGlvbiUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Набор инструментов Makita",
    location: "Москва, Западный округ",
    price: "1200",
    period: "день",
    rating: 5.0,
    reviews: 127,
    owner: { username: "Сергей В.", avatar: null },
    popular: true,
    coords: [55.7421, 37.6153], // same building as #4
    image:
      "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    title: "Шуруповёрт DeWalt аккумуляторный",
    location: "Москва, Южный округ",
    price: "700",
    period: "день",
    rating: 4.8,
    reviews: 92,
    owner: { username: "Андрей Т.", avatar: null },
    popular: false,
    coords: [55.73, 37.65],
    image:
      "https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGRyaWxsJTIwZHJpdmVyfGVufDF8fHx8MTc3MTU3MTg2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 7,
    title: "Лобзик Bosch PST 700E",
    location: "Москва, Южный округ",
    price: "450",
    period: "день",
    rating: 4.6,
    reviews: 34,
    owner: { username: "Олег Р.", avatar: null },
    popular: false,
    coords: [55.7302, 37.6503], // same building as #6
    image:
      "https://images.unsplash.com/photo-1615746363486-92cd8c5e0a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaWdzYXclMjBwb3dlciUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 8,
    title: "Болгарка Makita 2000W",
    location: "Москва, Арбат",
    price: "500",
    period: "день",
    rating: 4.9,
    reviews: 78,
    owner: { username: "Николай Г.", avatar: null },
    popular: true,
    coords: [55.7494, 37.5872],
    image:
      "https://images.unsplash.com/photo-1674117068691-034b4bf87bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmdsZSUyMGdyaW5kZXIlMjB0b29sfGVufDF8fHx8MTc3MTU3MTg2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 9,
    title: "Циркулярная пила DeWalt 1800W",
    location: "Москва, Арбат",
    price: "750",
    period: "день",
    rating: 4.8,
    reviews: 112,
    owner: { username: "Павел Д.", avatar: null },
    popular: false,
    coords: [55.7496, 37.5875], // same building as #8
    image:
      "https://images.unsplash.com/photo-1619759247378-6a73e3ad45f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMHNhdyUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NzE1NzE4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 10,
    title: "Перфоратор Metabo KHE 2660",
    location: "Москва, Арбат",
    price: "850",
    period: "день",
    rating: 4.7,
    reviews: 63,
    owner: { username: "Виктор Л.", avatar: null },
    popular: true,
    coords: [55.7493, 37.587], // same building as #8
    image:
      "https://images.unsplash.com/photo-1760376208640-2ece4c4a0adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tZXIlMjBkcmlsbCUyMGNvbnN0cnVjdGlvbiUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 11,
    title: "Строительный фен Bosch GHG 660",
    location: "Москва, Таганка",
    price: "400",
    period: "день",
    rating: 4.5,
    reviews: 28,
    owner: { username: "Артём С.", avatar: null },
    popular: false,
    coords: [55.7395, 37.6536],
    image:
      "https://images.unsplash.com/photo-1652265156920-dda0e6f900ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbGl0aW9uJTIwaGFtbWVyJTIwamFja2hhbW1lcnxlbnwxfHx8fDE3NzE1NzE4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 12,
    title: "Электрорубанок Makita KP0810",
    location: "Москва, Беговой район",
    price: "550",
    period: "день",
    rating: 4.6,
    reviews: 41,
    owner: { username: "Максим Н.", avatar: null },
    popular: false,
    coords: [55.774, 37.5621],
    image:
      "https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGRyaWxsJTIwZHJpdmVyfGVufDF8fHx8MTc3MTU3MTg2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 13,
    title: "Шлифмашина Bosch GEX 125",
    location: "Москва, Беговой район",
    price: "380",
    period: "день",
    rating: 4.4,
    reviews: 19,
    owner: { username: "Евгений О.", avatar: null },
    popular: false,
    coords: [55.7742, 37.5624], // same building as #12
    image:
      "https://images.unsplash.com/photo-1674117068691-034b4bf87bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmdsZSUyMGdyaW5kZXIlMjB0b29sfGVufDF8fHx8MTc3MTU3MTg2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 14,
    title: "Отбойный молоток Makita HM1203C",
    location: "Москва, Марьино",
    price: "1500",
    period: "день",
    rating: 5.0,
    reviews: 67,
    owner: { username: "Роман В.", avatar: null },
    popular: true,
    coords: [55.65, 37.744],
    image:
      "https://images.unsplash.com/photo-1652265156920-dda0e6f900ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbGl0aW9uJTIwaGFtbWVyJTIwamFja2hhbW1lcnxlbnwxfHx8fDE3NzE1NzE4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 15,
    title: "Миксер строительный Bosch GRW 18",
    location: "Москва, Сокольники",
    price: "480",
    period: "день",
    rating: 4.3,
    reviews: 15,
    owner: { username: "Кирилл Б.", avatar: null },
    popular: false,
    coords: [55.789, 37.68],
    image:
      "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 16,
    title: "Штроборез Makita SG1251J",
    location: "Москва, Сокольники",
    price: "950",
    period: "день",
    rating: 4.9,
    reviews: 88,
    owner: { username: "Денис Ф.", avatar: null },
    popular: true,
    coords: [55.7892, 37.6803], // same building as #15
    image:
      "https://images.unsplash.com/photo-1770386582823-3a7094e35b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3NjaCUyMGhhbW1lciUyMGRyaWxsJTIwY2FzZXxlbnwxfHx8fDE3NzE1NzM5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];
