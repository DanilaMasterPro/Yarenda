import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/widgets/Header";
import { Footer } from "@/components/widgets/Footer";
import { CategoryCard } from "@/components/widgets/CategoryCard";
import { allCategories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap min-w-max">
            <Link href="/" className="hover:text-gray-900">
              Главная
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-gray-900">Все категории</span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Все категории</h1>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
