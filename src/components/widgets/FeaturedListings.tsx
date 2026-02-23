import { Button } from "../ui/button";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { featuredListings } from "@/data/products.data";

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
          {featuredListings.map((listing) => (
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
          <Button asChild variant="outline">
            <Link href="/catalog">Показать больше</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
