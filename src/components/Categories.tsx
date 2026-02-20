import Link from "next/link";
import { CategoryCard } from "./CategoryCard";
import { allCategories } from "../data/categories";

export function Categories() {
  // Показываем только первые 3 категории на главной странице
  const displayedCategories = allCategories.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Популярные категории
          </h2>
          <p className="text-lg text-gray-600">
            Найдите то, что вам нужно
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} maxSubcategories={5} />
          ))}
        </div>

        {/* View All Categories Link */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-yellow-600 font-medium hover:underline transition-colors"
          >
            Посмотреть все категории
            <span className="text-sm">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}