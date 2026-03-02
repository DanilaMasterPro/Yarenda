// ─── Types ───────────────────────────────────────────────────────────────────

export interface CatalogFilter {
  title: string;
  options: string[];
}

// ─── Catalog Filters (страница каталога) ─────────────────────────────────────

export const catalogFilters: CatalogFilter[] = [
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
