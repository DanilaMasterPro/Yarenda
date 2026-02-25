import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [
    { label: "Главная", href: "/" },
    ...items,
  ];

  return (
    <div className="overflow-x-auto pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap min-w-max">
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-gray-900">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900">{item.label}</span>
            )}
            {index < allItems.length - 1 && (
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
