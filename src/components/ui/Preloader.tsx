"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Показываем прелоадер 2 секунды
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 animate-pulse">
            Яренда
          </h1>
          <p className="text-gray-600 text-lg">Загружаем для вас...</p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce-delay-1" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce-delay-2" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce-delay-3" />
        </div>
      </div>
    </div>
  );
}
