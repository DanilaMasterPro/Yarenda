import Link from "next/link";
import { ChevronRight, LucideIcon } from "lucide-react";

interface Subcategory {
  name: string;
  icon: LucideIcon;
  count: string;
  iconBg: string;
  iconColor: string;
}

interface Category {
  title: string;
  slug: string;
  subcategories: Subcategory[];
}

interface CategoryCardProps {
  category: Category;
  maxSubcategories?: number;
}

export function CategoryCard({ category, maxSubcategories }: CategoryCardProps) {
  const displayedSubcategories = maxSubcategories 
    ? category.subcategories.slice(0, maxSubcategories)
    : category.subcategories;

  return (
    <div className="space-y-4">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          {category.title}
        </h2>
        <Link
          href={`/catalog?category=${category.slug}`}
          className="text-sm text-yellow-600 hover:underline"
        >
          Показать все
        </Link>
      </div>

      {/* Subcategories */}
      <div className="space-y-1">
        {displayedSubcategories.map((subcategory) => {
          const Icon = subcategory.icon;
          return (
            <Link
              key={subcategory.name}
              href={`/catalog?subcategory=${subcategory.name}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              {/* Icon */}
              <div className={`${subcategory.iconBg} ${subcategory.iconColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900">
                  {subcategory.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {subcategory.count}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}