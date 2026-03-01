import Link from "next/link";
import { CategoryCard } from "./CategoryCard";
import { allCategories } from "../../data/categories";
import { Button } from "../ui/button";

interface CategoriesProps {
  backgroundVariant?: "solid" | "gradient";
}

export function Categories({ backgroundVariant = "solid" }: CategoriesProps) {
  // Показываем только первые 3 категории на главной странице
  const displayedCategories = allCategories.slice(0, 3);

  const backgroundClass = 
    backgroundVariant === "gradient"
      ? "bg-gradient-to-t from-gray-50 to-transparent"
      : "bg-gray-50";

  return (
    <section className={`py-16 ${backgroundClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="fade-in text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Популярные категории
          </h2>
          <p className="fade-in text-lg text-gray-600">
            Найдите то, что вам нужно
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              maxSubcategories={5}
            />
          ))}
        </div>

        {/* View All Categories Link */}
        <div className="fade-in text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/categories">Посмотреть все категории</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
