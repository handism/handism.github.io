// src/components/ScrollToTopButton.tsx
'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * 画面上部へスクロールするボタン。
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    toggleVisibility(); // Initialize state on mount

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollToTop}
      className={`text-text fixed bottom-6 right-6 z-40 w-12 h-12 bg-card border border-border rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
      aria-label="トップへ戻る"
      aria-hidden={!isVisible}
      disabled={!isVisible}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
