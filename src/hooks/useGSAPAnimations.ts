import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Регистрируем ScrollTrigger плагин
gsap.registerPlugin(ScrollTrigger);

interface UseGSAPAnimationsOptions {
  waitForPreloader?: boolean;
  isPreloaderComplete?: boolean;
}

export const useGSAPAnimations = (options?: UseGSAPAnimationsOptions) => {
  const pathname = usePathname();
  const { waitForPreloader = false, isPreloaderComplete = true } =
    options || {};

  // Функция для инициализации анимаций
  const initAnimations = useCallback((skipHero = false) => {
    // Убиваем все существующие ScrollTrigger
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Задержка для завершения рендера компонентов
    setTimeout(() => {
      // Настройка fade-in анимаций для элементов с классом fade-in
      const fadeInElements = gsap.utils.toArray(".fade-in");
      const fadeInHeroElements = gsap.utils.toArray(".fade-in-hero");

      // Фильтруем элементы Hero, если нужно их пропустить
      const elementsToAnimate = skipHero
        ? fadeInElements.filter((el) => !fadeInHeroElements.includes(el))
        : [...fadeInElements, ...fadeInHeroElements];

      if (elementsToAnimate.length === 0) {
        console.log("No elements with .fade-in class found");
        return;
      }

      console.log(`Found ${elementsToAnimate.length} elements to animate`);

      elementsToAnimate.forEach((element, index) => {
        const isHeroElement = fadeInHeroElements.includes(element);

        // Сбрасываем состояние элемента к начальному (невидимому)
        gsap.set(element as Element, { opacity: 0, y: 40 });

        // Для Hero элементов используем прямую анимацию без ScrollTrigger
        if (isHeroElement) {
          gsap.to(element as Element, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.2, // Задержка между элементами
            ease: "power2.out",
          });
        } else {
          // Для остальных элементов используем ScrollTrigger
          gsap.to(element as Element, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element as Element,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      // Обновляем ScrollTrigger
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  // Функция для анимации Hero элементов после прелоадера
  const animateHeroElements = useCallback(() => {
    const fadeInHeroElements = gsap.utils.toArray(".fade-in-hero");

    if (fadeInHeroElements.length === 0) {
      console.log("No .fade-in-hero elements found");
      return;
    }

    console.log(`Animating ${fadeInHeroElements.length} Hero elements`);

    fadeInHeroElements.forEach((element, index) => {
      gsap.set(element as Element, { opacity: 0, y: 40 });

      gsap.to(element as Element, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.15, // Задержка между элементами
        ease: "power2.out",
      });
    });
  }, []);

  useEffect(() => {
    if (waitForPreloader && !isPreloaderComplete) {
      // Если ждем прелоадер, инициализируем только не-Hero элементы
      initAnimations(true);
    } else {
      // Иначе инициализируем все элементы
      initAnimations(false);
    }

    // Обновляем ScrollTrigger при загрузке страницы
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    // Очистка при размонтировании компонента или смене роута
    return () => {
      window.removeEventListener("load", handleLoad);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname, initAnimations, waitForPreloader, isPreloaderComplete]);

  // Эффект для анимации Hero элементов после завершения прелоадера
  useEffect(() => {
    if (waitForPreloader && isPreloaderComplete) {
      // Небольшая задержка после завершения прелоадера
      setTimeout(() => {
        animateHeroElements();
      }, 200);
    }
  }, [waitForPreloader, isPreloaderComplete, animateHeroElements]);

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
