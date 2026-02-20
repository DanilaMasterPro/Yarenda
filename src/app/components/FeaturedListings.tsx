import { Heart, Star, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const listings = [
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
    image: "https://images.unsplash.com/photo-1760376208640-2ece4c4a0adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tZXIlMjBkcmlsbCUyMGNvbnN0cnVjdGlvbiUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    image: "https://images.unsplash.com/photo-1710242078536-fe62a305a86c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JkbGVzcyUyMGRyaWxsJTIwZHJpdmVyfGVufDF8fHx8MTc3MTU3MTg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    image: "https://images.unsplash.com/photo-1652265156920-dda0e6f900ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW1vbGl0aW9uJTIwaGFtbWVyJTIwamFja2hhbW1lcnxlbnwxfHx8fDE3NzE1NzE4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    image: "https://images.unsplash.com/photo-1615746363486-92cd8c5e0a90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaWdzYXclMjBwb3dlciUyMHRvb2x8ZW58MXx8fHwxNzcxNTcxODY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    image: "https://images.unsplash.com/photo-1619759247378-6a73e3ad45f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMHNhdyUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NzE1NzE4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    image: "https://images.unsplash.com/photo-1674117068691-034b4bf87bc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmdsZSUyMGdyaW5kZXIlMjB0b29sfGVufDF8fHx8MTc3MTU3MTg2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function FeaturedListings() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Популярные предложения
          </h2>
          <p className="text-lg text-gray-600">
            Проверенные предметы от надежных арендодателей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              to={`/listings/${listing.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
                {listing.popular && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-yandex-green-500 text-white text-sm rounded-full">
                    Популярное
                  </span>
                )}
                {/* Owner Avatar */}
                <Avatar className="absolute bottom-3 right-3 w-12 h-12 border-2 border-white shadow-lg">
                  <AvatarFallback className="bg-yandex-yellow-500 text-yandex-dark-500 text-sm font-semibold">
                    {listing.owner.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-yandex-yellow-600 transition-colors">
                  {listing.title}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {listing.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({listing.reviews} отзывов)
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {listing.location}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      {listing.price}₽
                    </span>
                    <span className="text-gray-600 ml-1">/{listing.period}</span>
                  </div>
                  <Button className="bg-yandex-yellow-500 hover:bg-yandex-yellow-600 text-yandex-dark-500">
                    Забронировать
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/listings">
            <Button variant="outline" size="lg" className="border-yandex-yellow-500 text-yandex-yellow-600 hover:bg-yandex-yellow-50">
              Показать больше
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}