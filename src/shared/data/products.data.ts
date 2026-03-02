// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProductCard {
  id: number;
  title: string;
  category?: string;
  price: number | string;
  period: string;
  rating: number;
  reviews: number;
  location: string;
  owner: string;
  popular: boolean;
  image: string;
}

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
    owner: "Александр М.",
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
    owner: "Дмитрий К.",
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
    owner: "Иван П.",
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
    owner: "Михаил С.",
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
    owner: "Сергей В.",
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
    owner: "Андрей Т.",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1674117068691-034b4bf87bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmdsZSUyMGdyaW5kZXIlMjB0b29sfGVufDF8fHx8MTc3MTU3MTg2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

// ─── Catalog Products (страница каталога) ────────────────────────────────────

export const catalogProducts: ProductCard[] = [
  {
    id: 1,
    title: "Дрель Makita с набором бит",
    location: "Москва, Центральный район",
    price: "650",
    period: "день",
    rating: 4.8,
    reviews: 89,
    owner: "Александр М.",
    popular: true,
    image:
      "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Перфоратор Bosch Professional",
    location: "Москва, Южный округ",
    price: "900",
    period: "день",
    rating: 5.0,
    reviews: 145,
    owner: "Дмитрий К.",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1770386582823-3a7094e35b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3NjaCUyMGhhbW1lciUyMGRyaWxsJTIwY2FzZXxlbnwxfHx8fDE3NzE1NzM5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Дрель-шуруповёрт Makita 18V",
    location: "Санкт-Петербург",
    price: "550",
    period: "день",
    rating: 4.9,
    reviews: 203,
    owner: "Иван П.",
    popular: true,
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
    owner: "Михаил С.",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1760376208640-2ece4c4a0adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tZXIlMjBkcmlsbCUyMGNvbnN0cnVjdGlvbiUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Набор инструментов Makita",
    location: "Казань",
    price: "1200",
    period: "день",
    rating: 5.0,
    reviews: 127,
    owner: "Сергей В.",
    popular: true,
    image:
      "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    title: "Шуруповёрт DeWalt аккумуляторный",
    location: "Екатеринбург",
    price: "700",
    period: "день",
    rating: 4.8,
    reviews: 92,
    owner: "Андрей Т.",
    popular: false,
    image:
      "https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGRyaWxsJTIwZHJpdmVyfGVufDF8fHx8MTc3MTU3MTg2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];
