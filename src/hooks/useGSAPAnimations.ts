import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Регистрируем ScrollTrigger плагин
gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const pathname = usePathname();

  // Функция для инициализации анимаций
  const initAnimations = useCallback(() => {
    // Убиваем все существующие ScrollTrigger
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Задержка для завершения рендера компонентов
    setTimeout(() => {
      // Настройка fade-in анимаций для элементов с классом fade-in
      const fadeInElements = gsap.utils.toArray('.fade-in');
      
      if (fadeInElements.length === 0) {
        console.log('No elements with .fade-in class found');
        return;
      }

      console.log(`Found ${fadeInElements.length} elements with .fade-in class`);
      
      fadeInElements.forEach((element, index) => {
        // Сбрасываем состояние элемента к начальному (невидимому)
        gsap.set(element as Element, { opacity: 0, y: 40 });
        
        // Создаем анимацию к финальному состоянию
        gsap.to(element as Element, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element as Element,
            start: 'top 90%',
            toggleActions: 'play none none none',
            // onToggle: (self) => {
            //   console.log(`Animation ${index} triggered:`, self.isActive);
            // },
          },
        });
      });

      // Обновляем ScrollTrigger
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  useEffect(() => {
    // Инициализируем анимации при изменении роута
    initAnimations();

    // Обновляем ScrollTrigger при загрузке страницы
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    // Очистка при размонтировании компонента или смене роута
    return () => {
      window.removeEventListener('load', handleLoad);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pathname, initAnimations]);

  // Функция для ручного обновления ScrollTrigger (полезно при динамическом контенте)
  const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
  };

  // Функция для сброса и переинициализации анимаций
  const resetAnimations = () => {
    initAnimations();
  };

  return { refreshScrollTrigger, resetAnimations };
};
