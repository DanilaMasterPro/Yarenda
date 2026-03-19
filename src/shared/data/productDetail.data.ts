import type { Review, IUserProduct } from "@/shared/types";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProductDetailOwner {
  id?: number;
  name: string;
  avatar: string;
  rating: number;
  joinedDate: string;
}

export interface ProductDetailFeature {
  /** Feather / icon name — each platform resolves to its own icon component */
  icon: string;
  label: string;
}

export interface ProductDetail {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  location: string;
  owner: ProductDetailOwner;
  images: string[];
  features: ProductDetailFeature[];
  description: string;
  reviews: Review[];
  relatedProducts: IUserProduct[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const productDetails: ProductDetail[] = [
  {
    id: 1,
    title: "Дрель-шуруповёрт DeWalt DCD796",
    price: 650,
    originalPrice: 850,
    rating: 4.9,
    reviewCount: 47,
    location: "Москва, Центральный район",
    owner: {
      id: 1123123,
      name: "Александр М.",
      avatar: "",
      rating: 5.0,
      joinedDate: "Сентябрь 2022",
    },
    images: [
      "https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGRyaWxsJTIwZHJpdmVyfGVufDF8fHx8MTc3MTU3MTg2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1760376208640-2ece4c4a0adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tZXIlMjBkcmlsbCUyMGNvbnN0cnVjdGlvbiUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1530124566582-a45a7c79de09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    features: [
      { icon: "package", label: "Отличное состояние" },
      { icon: "truck", label: "Доставка в тот же день" },
      { icon: "battery-charging", label: "Батарея и зарядное устройство в комплекте" },
    ],
    description: `Сверхкомпактная дрель-шуруповёрт идеально подходит для сверления:

Подходит для небольших проектов

Поставляется с двумя батареями и зарядным устройством

Я могу при необходимости включить набор сверл, которые вы видите на первой картинке, но если вы берете инструмент на более длительный срок, пожалуйста, будьте осторожны с ними.`,
    reviews: [
      {
        id: 1,
        author: "Иван К.",
        rating: 5,
        date: "12 января 2026",
        text: "Отличный инструмент! Александр был очень любезен и услужлив.",
      },
      {
        id: 2,
        author: "Мария С.",
        rating: 5,
        date: "5 января 2026",
        text: "Быстрая доставка, инструмент в идеальном состоянии!",
      },
      {
        id: 3,
        author: "Дмитрий П.",
        rating: 4,
        date: "28 декабря 2025",
        text: "Хороший инструмент, мощный и удобный в использовании.",
      },
    ],
    relatedProducts: [
      {
        id: 2,
        title: "Перфоратор Bosch",
        price: 900,
        period: "день",
        rating: 5.0,
        reviews: 145,
        location: "Москва, Южный округ",
        owner: "Александр М.",
        popular: false,
        image:
          "https://images.unsplash.com/photo-1770386582823-3a7094e35b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3NjaCUyMGhhbW1lciUyMGRyaWxsJTIwY2FzZXxlbnwxfHx8fDE3NzE1NzM5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 3,
        title: "Шуруповёрт Makita",
        price: 550,
        period: "день",
        rating: 4.8,
        reviews: 203,
        location: "Москва, Центр",
        owner: "Александр М.",
        popular: true,
        image:
          "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 4,
        title: "Электролобзик Bosch",
        price: 500,
        period: "день",
        rating: 4.7,
        reviews: 56,
        location: "Москва, Центр",
        owner: "Александр М.",
        popular: false,
        image:
          "https://images.unsplash.com/photo-1615746363486-92cd8c5e0a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaWdzYXclMjBwb3dlciUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 5,
        title: "Циркулярная пила Makita",
        price: 700,
        period: "день",
        rating: 4.9,
        reviews: 145,
        location: "Москва, Центр",
        owner: "Александр М.",
        popular: true,
        image:
          "https://images.unsplash.com/photo-1619759247378-6a73e3ad45f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMHNhdyUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NzE1NzE4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
    ],
  },
];
