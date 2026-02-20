import { Wrench, Drill, Hammer, Zap, CircleDot, Settings } from "lucide-react";

const categories = [
  { name: "Перфораторы", icon: Hammer, color: "bg-yandex-red-100 text-yandex-red-500" },
  { name: "Дрели и шуруповёрты", icon: Drill, color: "bg-yandex-yellow-100 text-yandex-yellow-600" },
  { name: "Пилы", icon: CircleDot, color: "bg-yandex-purple-100 text-yandex-purple-500" },
  { name: "Шлифмашины", icon: Settings, color: "bg-pink-100 text-pink-600" },
  { name: "Отбойные молотки", icon: Zap, color: "bg-blue-100 text-blue-600" },
  { name: "Другое оборудование", icon: Wrench, color: "bg-yandex-green-100 text-yandex-green-500" },
];

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Популярные категории
          </h2>
          <p className="text-lg text-gray-600">
            Найдите то, что вам нужно
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                className="group p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 text-center">
                  {category.name}
                </h3>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}