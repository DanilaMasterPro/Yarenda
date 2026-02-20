import { Search, Calendar, Package, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Найдите то, что нужно",
    description: "Выберите предмет из тысяч объявлений в вашем районе",
  },
  {
    number: 2,
    icon: Calendar,
    title: "Забронируйте онлайн",
    description: "Выберите даты и оформите бронирование за несколько кликов",
  },
  {
    number: 3,
    icon: Package,
    title: "Заберите или получите доставку",
    description: "Встретьтесь с владельцем или закажите доставку к двери",
  },
  {
    number: 4,
    icon: CheckCircle,
    title: "Пользуйтесь и возвращайте",
    description: "Наслаждайтесь использованием и верните в оговоренный срок",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Как это работает
          </h2>
          <p className="text-lg text-gray-600">
            Простой процесс аренды за 4 шага
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {/* Connecting Line */}
                {step.number < 4 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300" />
                )}

                <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-yandex-yellow-500 text-yandex-dark-500 rounded-full flex items-center justify-center font-bold shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 mx-auto shadow-sm">
                    <Icon className="w-8 h-8 text-yandex-yellow-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}