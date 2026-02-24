import Image from "next/image";

const sections = [
  {
    title: "НАЙДИТЕ ТО, ЧТО НУЖНО",
    description:
      "Тысячи предложений в одном месте. Ищите среди сотен категорий — от инструментов и техники до спортивного снаряжения и товаров для праздника. Умный поиск поможет найти идеальный вариант рядом с вами.",
    image: "/assets/banner1.png",
    imageAlt: "Разнообразие инструментов и техники для аренды",
    imagePosition: "right" as const,
  },
  {
    title: "ЗАБРОНИРУЙТЕ ОНЛАЙН",
    description:
      "Быстро и удобно, без звонков и очередей. Выберите нужные даты в календаре, согласуйте детали с владельцем прямо в чате и оформите бронирование в пару кликов. Безопасная оплата онлайн.",
    image: "/assets/banner2.png",
    imageAlt: "Онлайн бронирование через смартфон",
    imagePosition: "left" as const,
  },
  {
    title: "ЗАБЕРИТЕ ИЛИ ПОЛУЧИТЕ ДОСТАВКУ",
    description:
      "Гибкие варианты получения на любой случай. Договоритесь о встрече в удобном месте или закажите доставку прямо до двери. Проверьте товар при получении и начинайте использовать.",
    image: "/assets/banner3.png",
    imageAlt: "Доставка и передача товара",
    imagePosition: "right" as const,
  },
  {
    title: "ПОЛЬЗУЙТЕСЬ И ВОЗВРАЩАЙТЕ",
    description:
      "Наслаждайтесь использованием без забот. Используйте арендованные вещи сколько нужно в рамках срока аренды. Верните в оговоренное время и в том же состоянии — это всё, что нужно для успешной аренды.",
    image: "/assets/banner4.png",
    imageAlt: "Использование арендованного оборудования",
    imagePosition: "left" as const,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Как это работает
          </h2>
          <p className="text-lg text-gray-600">
            Простой процесс аренды за 4 шага
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-24">
          {sections.map((section, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image - always first on mobile, positioned by imagePosition on desktop */}
              <div
                className={`order-1 ${section.imagePosition === "right" ? "lg:order-2" : "lg:order-1"}`}
              >
                <div className="relative h-80 sm:h-96 lg:h-[450px] lg:w-[450px] rounded-2xl overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Text Content */}
              <div
                className={`order-2 ${section.imagePosition === "right" ? "lg:order-1" : "lg:order-2"}`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 tracking-wide">
                  {section.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
