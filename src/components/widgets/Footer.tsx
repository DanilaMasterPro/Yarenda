import { Button } from "../ui/button";

const footerLinks = {
  company: {
    title: "Компания",
    links: ["О нас", "Блог"],
  },
  renting: {
    title: "Аренда",
    links: ["Правила аренды", "Отмена бронирования"],
  },
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="fade-in text-2xl font-bold text-white mb-4">
              Яренда
            </div>
            <p className="fade-in text-sm text-gray-400 mb-4">
              Платформа совместного потребления для аренды вещей у соседей
            </p>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="fade-in font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="fade-in text-sm hover:text-gray-300 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Support Button */}
          <div className="fade-in col-span-2 md:col-span-2 lg:col-span-2 flex md:justify-end items-start">
            <Button variant="primary">Поддержка</Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="fade-in text-sm text-gray-400">
              © 2026 Яренда. Все права защищены.
            </p>
            <div className="fade-inflex gap-6 text-sm">
              <a href="#" className="hover:text-gray-100 transition-colors">
                Условия использования
              </a>
              <a href="#" className="hover:text-gray-100 transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-gray-100 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
