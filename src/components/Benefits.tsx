import { DollarSign, Leaf, Users, Shield, Wallet } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Экономьте деньги",
    description: "Платите только за время использования вместо покупки дорогих вещей",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Leaf,
    title: "Берегите природу",
    description: "Совместное потребление снижает производство и сохраняет ресурсы планеты",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Wallet,
    title: "Создавайте сообщество",
    description: "Зарабатывайте на вещах, которые редко используете, и познакомьтесь с соседями",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Shield,
    title: "Застрахованные сделки",
    description: "Все аренды защищены страховкой и службой поддержки 24/7",
    color: "bg-purple-100 text-purple-600",
  },
];

export function Benefits() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Почему Яренда?
          </h2>
          <p className="text-lg text-gray-600">
            Современный подход к владению вещами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${benefit.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}