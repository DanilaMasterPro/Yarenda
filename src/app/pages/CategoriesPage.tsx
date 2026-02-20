import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import {
  Hammer,
  Drill,
  Wrench,
  Zap,
  Settings,
  Paintbrush,
  Ruler,
  Laptop,
  Camera,
  Tv,
  Headphones,
  Gamepad2,
  Speaker,
  Music,
  Video,
  Film,
  Projector,
  Trees,
  Shovel,
  Flower,
  Scissors,
  Sprout,
  Home,
  Sofa,
  UtensilsCrossed,
  Armchair,
  Lamp,
  Coffee,
  Wine,
  Plug,
  PartyPopper,
  Cake,
  Gift,
  Utensils,
  GlassWater,
  Music2,
  Disc,
  Bike,
  Dumbbell,
  Trophy,
  Mountain,
  Waves,
  Tent,
  Backpack,
  Car,
  Truck,
  Ship,
  PlaneTakeoff,
  Package,
  Box,
  Tag,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const allCategories = [
  {
    title: "Строительство и инструменты",
    slug: "construction",
    subcategories: [
      { name: "Электроинструменты", icon: Drill, count: "1,234 предмета", iconBg: "bg-yandex-yellow-100", iconColor: "text-yandex-yellow-600" },
      { name: "Перфораторы и дрели", icon: Hammer, count: "856 предметов", iconBg: "bg-yandex-red-100", iconColor: "text-yandex-red-500" },
      { name: "Пилы и резка", icon: Settings, count: "645 предметов", iconBg: "bg-yandex-purple-100", iconColor: "text-yandex-purple-500" },
      { name: "Шлифовка и полировка", icon: Disc, count: "423 предмета", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { name: "Измерительные инструменты", icon: Ruler, count: "312 предметов", iconBg: "bg-green-100", iconColor: "text-green-600" },
      { name: "Малярное оборудование", icon: Paintbrush, count: "567 предметов", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
      { name: "Ручной инструмент", icon: Wrench, count: "789 предметов", iconBg: "bg-yandex-gray-100", iconColor: "text-yandex-gray-500" },
      { name: "Отбойные молотки", icon: Zap, count: "234 предмета", iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
      { name: "Строительное оборудование", icon: Package, count: "456 предметов", iconBg: "bg-gray-100", iconColor: "text-gray-600" },
    ],
  },
  {
    title: "Электроника",
    slug: "electronics",
    subcategories: [
      { name: "Ноутбуки и компьютеры", icon: Laptop, count: "923 предмета", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { name: "Камеры и фототехника", icon: Camera, count: "1,123 предмета", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
      { name: "Проекторы и ТВ", icon: Tv, count: "567 предметов", iconBg: "bg-indigo-100", iconColor: "text-indigo-600" },
      { name: "Наушники и аудио", icon: Headphones, count: "789 предметов", iconBg: "bg-pink-100", iconColor: "text-pink-600" },
      { name: "Игровые консоли", icon: Gamepad2, count: "456 предметов", iconBg: "bg-red-100", iconColor: "text-red-600" },
      { name: "Колонки и акустика", icon: Speaker, count: "634 предмета", iconBg: "bg-teal-100", iconColor: "text-teal-600" },
    ],
  },
  {
    title: "Фото и видео",
    slug: "photo-video",
    subcategories: [
      { name: "Фотокамеры", icon: Camera, count: "845 предметов", iconBg: "bg-yandex-yellow-100", iconColor: "text-yandex-yellow-600" },
      { name: "Видеокамеры", icon: Video, count: "423 предмета", iconBg: "bg-yandex-red-100", iconColor: "text-yandex-red-500" },
      { name: "Объективы", icon: Film, count: "678 предметов", iconBg: "bg-yandex-purple-100", iconColor: "text-yandex-purple-500" },
      { name: "Студийное освещение", icon: Lamp, count: "312 предметов", iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
      { name: "Стабилизаторы", icon: Music, count: "234 предмета", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { name: "Проекторы", icon: Projector, count: "189 предметов", iconBg: "bg-green-100", iconColor: "text-green-600" },
    ],
  },
  {
    title: "Сад и огород",
    slug: "garden",
    subcategories: [
      { name: "Садовая техника", icon: Trees, count: "567 предметов", iconBg: "bg-yandex-green-100", iconColor: "text-yandex-green-500" },
      { name: "Газонокосилки", icon: Shovel, count: "423 предмета", iconBg: "bg-green-100", iconColor: "text-green-600" },
      { name: "Садовый инструмент", icon: Scissors, count: "789 предметов", iconBg: "bg-lime-100", iconColor: "text-lime-600" },
      { name: "Посадка и уход", icon: Flower, count: "345 предметов", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
      { name: "Теплицы и грядки", icon: Sprout, count: "234 предмета", iconBg: "bg-teal-100", iconColor: "text-teal-600" },
    ],
  },
  {
    title: "Дом и интерьер",
    slug: "home",
    subcategories: [
      { name: "Мебель и декор", icon: Home, count: "1,456 предметов", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
      { name: "Диваны и кресла", icon: Sofa, count: "678 предметов", iconBg: "bg-yandex-yellow-100", iconColor: "text-yandex-yellow-600" },
      { name: "Кухонная техника", icon: UtensilsCrossed, count: "923 предмета", iconBg: "bg-red-100", iconColor: "text-red-600" },
      { name: "Стулья и столы", icon: Armchair, count: "567 предметов", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
      { name: "Освещение", icon: Lamp, count: "789 предметов", iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
      { name: "Кофемашины", icon: Coffee, count: "423 предмета", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
      { name: "Посуда и приборы", icon: Wine, count: "345 предметов", iconBg: "bg-pink-100", iconColor: "text-pink-600" },
      { name: "Бытовая техника", icon: Plug, count: "1,123 предмета", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
    ],
  },
  {
    title: "Вечеринки и праздники",
    slug: "party",
    subcategories: [
      { name: "Декор и украшения", icon: PartyPopper, count: "567 предметов", iconBg: "bg-pink-100", iconColor: "text-pink-600" },
      { name: "Торты и сладости", icon: Cake, count: "234 предмета", iconBg: "bg-red-100", iconColor: "text-red-600" },
      { name: "Подарки", icon: Gift, count: "456 предметов", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
      { name: "Кейтеринг", icon: Utensils, count: "189 предметов", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
      { name: "Посуда и фуршет", icon: GlassWater, count: "345 предметов", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { name: "Музыка и DJ", icon: Music2, count: "278 предметов", iconBg: "bg-yandex-purple-100", iconColor: "text-yandex-purple-500" },
    ],
  },
  {
    title: "Спорт и отдых",
    slug: "sports",
    subcategories: [
      { name: "Велосипеды", icon: Bike, count: "789 предметов", iconBg: "bg-yandex-green-100", iconColor: "text-yandex-green-500" },
      { name: "Фитнес оборудование", icon: Dumbbell, count: "567 предметов", iconBg: "bg-red-100", iconColor: "text-red-600" },
      { name: "Спортивный инвентарь", icon: Trophy, count: "456 предметов", iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
      { name: "Горные лыжи", icon: Mountain, count: "234 предмета", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { name: "Водные виды спорта", icon: Waves, count: "345 предметов", iconBg: "bg-cyan-100", iconColor: "text-cyan-600" },
      { name: "Кемпинг и туризм", icon: Tent, count: "489 предметов", iconBg: "bg-green-100", iconColor: "text-green-600" },
      { name: "Походное снаряжение", icon: Backpack, count: "623 предмета", iconBg: "bg-orange-100", iconColor: "text-orange-600" },
    ],
  },
  {
    title: "Транспорт",
    slug: "vehicle",
    subcategories: [
      { name: "Автомобили", icon: Car, count: "456 предметов", iconBg: "bg-yandex-yellow-100", iconColor: "text-yandex-yellow-600" },
      { name: "Грузовые авто", icon: Truck, count: "234 предмета", iconBg: "bg-gray-100", iconColor: "text-gray-600" },
      { name: "Лодки и катера", icon: Ship, count: "123 предмета", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
      { name: "Авиа транспорт", icon: PlaneTakeoff, count: "45 предметов", iconBg: "bg-indigo-100", iconColor: "text-indigo-600" },
    ],
  },
  {
    title: "Другое",
    slug: "other",
    subcategories: [
      { name: "Упаковка и переезд", icon: Package, count: "567 предметов", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
      { name: "Хранение", icon: Box, count: "345 предметов", iconBg: "bg-gray-100", iconColor: "text-gray-600" },
      { name: "Разное", icon: Tag, count: "1,234 предмета", iconBg: "bg-slate-100", iconColor: "text-slate-600" },
    ],
  },
];

export function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-yandex-yellow-600">
              Главная
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Все категории</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Все категории
          </h1>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCategories.map((category) => (
            <div key={category.slug} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {category.title}
                </h2>
                <Link
                  to={`/catalog?category=${category.slug}`}
                  className="text-sm text-yandex-yellow-600 hover:underline"
                >
                  Показать все
                </Link>
              </div>

              {/* Subcategories */}
              <div className="space-y-1">
                {category.subcategories.map((subcategory) => {
                  const Icon = subcategory.icon;
                  return (
                    <Link
                      key={subcategory.name}
                      to={`/catalog?subcategory=${subcategory.name}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      {/* Icon */}
                      <div className={`${subcategory.iconBg} ${subcategory.iconColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 group-hover:text-yandex-yellow-600 transition-colors">
                          {subcategory.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {subcategory.count}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yandex-yellow-600 transition-colors flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
