import Image from "next/image";

const steps = [
  {
    number: 1,
    text: "НАЙДИТЕ ТО, ЧТО НУЖНО",
    description:
      "Тысячи предложений в сотнях категорий. Умный поиск поможет найти идеальный вариант рядом с вами.",
    bgColor: "bg-purple-200",
  },
  {
    number: 2,
    text: "ЗАБРОНИРУЙТЕ ОНЛАЙН",
    description:
      "Выберите даты, согласуйте детали в чате и оформите бронирование в пару кликов. Безопасная оплата онлайн.",
    bgColor: "bg-yellow-100",
  },
  {
    number: 3,
    text: "ЗАБЕРИТЕ ИЛИ ПОЛУЧИТЕ ДОСТАВКУ",
    description:
      "Встреча в удобном месте или доставка до двери. Проверьте товар при получении и начинайте использовать.",
    bgColor: "bg-green-100",
  },
  {
    number: 4,
    text: "ПОЛЬЗУЙТЕСЬ И ВОЗВРАЩАЙТЕ",
    description:
      "Используйте вещи в рамках срока аренды. Верните в оговоренное время и состоянии — это всё, что нужно.",
    bgColor: "bg-blue-100",
  },
];

export function HowItWorksV2() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="fade-in text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Как это работает?
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Steps Column - Order 2 on mobile, order 1 on desktop */}
          <div className="order-2 lg:order-1 space-y-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="fade-in  flex items-start gap-6"
              >
                {/* Number Circle */}
                <div
                  className={`flex-shrink-0 w-14 h-14 ${step.bgColor} rounded-full flex items-center justify-center`}
                >
                  <span className="text-[20px] font-bold text-gray-900">
                    {step.number}
                  </span>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.text}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Image Column - Order 1 on mobile, order 2 on desktop */}
          <div className="order-1 lg:order-2">
            <div className="fade-in relative h-80 sm:h-96 lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/banner3.png"
                alt="Процесс аренды"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
