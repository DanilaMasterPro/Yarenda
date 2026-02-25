import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageTitle } from "@/components/ui/PageTitle";
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
        <Breadcrumbs
          items={[
            { label: "Все категории" },
          ]}
        />

        <PageTitle title="Все категории" />

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
