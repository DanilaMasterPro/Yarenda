import { Button } from "../ui/button";
import { ImageWithFallback } from "../ui/ImageWithFallback";

export function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="p-8 lg:p-12 text-dark-500">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Начните зарабатывать на своих вещах
              </h2>
              <p className="text-lg text-dark-400 mb-8">
                Превратите редко используемые вещи в источник дохода. Размещение
                объявления занимает всего 5 минут.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  Разместить объявление
                </Button>
                <Button variant="secondary" size="lg">
                  Узнать больше
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-yellow-400">
                <div>
                  <div className="text-3xl font-bold mb-1">50K+</div>
                  <div className="text-sm text-dark-400">Предметов</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">15K+</div>
                  <div className="text-sm text-dark-400">Пользователей</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">4.8★</div>
                  <div className="text-sm text-dark-400">Рейтинг</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-full min-h-[300px] lg:min-h-[500px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1620825141088-a824daf6a46b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXIlMjB0b29scyUyMGVxdWlwbWVudCUyMHdvcmtzaG9wfGVufDF8fHx8MTc3MTU3NTgwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Construction tools workshop"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
