import { AppButton } from "../ui/AppButton";
import Link from "next/link";
import { ProductCard } from "./ProductCard";

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
            Проверенные предметы от надежных арендодтелей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ProductCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              price={listing.price}
              period={listing.period}
              rating={listing.rating}
              reviews={listing.reviews}
              location={listing.location}
              owner={listing.owner}
              popular={listing.popular}
              image={listing.image}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/catalog">
            <AppButton variant="outline" size="lg" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
              Показать больше
            </AppButton>
          </Link>
        </div>
      </div>
    </section>
  );
}