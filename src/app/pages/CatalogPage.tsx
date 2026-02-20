import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Heart, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const filters = [
  {
    title: "Возраст инструмента",
    options: ["Новый", "До 1 года", "1-3 года", "Более 3 лет"],
  },
  {
    title: "Набор бит",
    options: ["В комплекте", "Не требуется"],
  },
  {
    title: "Тип",
    options: ["Ударная дрель", "Безударная дрель", "Перфоратор"],
  },
  {
    title: "Производитель",
    options: ["Makita", "Bosch", "DeWalt", "Hitachi", "Milwaukee"],
  },
];

const products = [
  {
    id: 1,
    title: "Дрель Makita с набором бит",
    location: "Москва, Центральный район",
    price: "650",
    period: "день",
    rating: 4.8,
    owner: "Александр М.",
    popular: true,
    image: "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    title: "Перфоратор Bosch Professional",
    location: "Москва, Южный округ",
    price: "900",
    period: "день",
    rating: 5.0,
    owner: "Дмитрий К.",
    popular: false,
    image: "https://images.unsplash.com/photo-1770386582823-3a7094e35b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3NjaCUyMGhhbW1lciUyMGRyaWxsJTIwY2FzZXxlbnwxfHx8fDE3NzE1NzM5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    title: "Дрель-шуруповёрт Makita 18V",
    location: "Санкт-Петербург",
    price: "550",
    period: "день",
    rating: 4.9,
    owner: "Иван П.",
    popular: true,
    image: "https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGRyaWxsJTIwZHJpdmVyfGVufDF8fHx8MTc3MTU3MTg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    title: "Ударная дрель Bosch GSB 13",
    location: "Москва, Западный округ",
    price: "600",
    period: "день",
    rating: 4.7,
    owner: "Михаил С.",
    popular: false,
    image: "https://images.unsplash.com/photo-1760376208640-2ece4c4a0adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tZXIlMjBkcmlsbCUyMGNvbnN0cnVjdGlvbiUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    title: "Набор инструментов Makita",
    location: "Казань",
    price: "1200",
    period: "день",
    rating: 5.0,
    owner: "Сергей В.",
    popular: true,
    image: "https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtpdGElMjBkcmlsbCUyMHNldCUyMGNhc2V8ZW58MXx8fHwxNzcxNTczOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 6,
    title: "Шуруповёрт DeWalt аккумуляторный",
    location: "Екатеринбург",
    price: "700",
    period: "день",
    rating: 4.8,
    owner: "Андрей Т.",
    popular: false,
    image: "https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGRyaWxsJTIwZHJpdmVyfGVufDF8fHx8MTc3MTU3MTg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function CatalogPage() {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap min-w-max">
            <Link to="/" className="hover:text-yandex-yellow-600">
              Главная
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link to="/catalog" className="hover:text-yandex-yellow-600">
              Строительное оборудование и инструменты
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-gray-900">Дрели и шуруповёрты</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Дрели и шуруповёрты
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Вы можете взять напрокат много дрелей и шуруповёртов рядом с вами! 
            Используйте профессиональный инструмент для строительства, ремонта или 
            личных нужд. Если вам нужен дорогой профессиональный инструмент, который 
            вы не хотите покупать, или инструмент для разовых работ, мы можем помочь!
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block w-80 flex-shrink-0`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Фильтры</h2>
                <button className="text-sm text-yandex-yellow-600 hover:underline">
                  Сбросить все
                </button>
              </div>

              <div className="space-y-6">
                {filters.map((filter) => (
                  <div key={filter.title} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="font-medium text-gray-900 mb-3">
                      {filter.title}
                    </h3>
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Фильтры
              </Button>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600 mb-6">
              Найдено {products.length} предложений
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button 
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to favorites logic
                      }}
                    >
                      <Heart className="w-5 h-5 text-gray-700" />
                    </button>
                    {product.popular && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-yandex-green-500 text-white text-sm rounded-full">
                        Популярное
                      </span>
                    )}
                    {/* Owner Avatar */}
                    <Avatar className="absolute bottom-3 right-3 w-12 h-12 border-2 border-white shadow-lg">
                      <AvatarFallback className="bg-yandex-yellow-500 text-yandex-dark-500 text-sm font-semibold">
                        {product.owner.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-yandex-yellow-600 transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3">
                      {product.location}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          {product.price}₽
                        </span>
                        <span className="text-gray-600 text-sm">/{product.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-orange-400">★</span>
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-yandex-yellow-500 text-yandex-yellow-600 hover:bg-yandex-yellow-50"
              >
                Показать больше
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}