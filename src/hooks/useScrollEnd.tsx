import { useEffect, useState, useRef } from 'react';

// possible approach to avoid delay/debounce and scroll:
// ref:
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const useScrollEnd = (threshold: number = 50) => {
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      // delay/debounce execution for 300ms
      timeoutRef.current = window.setTimeout(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        setIsScrolledToEnd(scrollHeight - scrollTop - clientHeight <= threshold);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold]);

  useEffect(() => {
    if (setIsScrolledToEnd) {
      console.log('CALLED');

      setIsScrolledToEnd(false);
    }
  }, [isScrolledToEnd]);

  return isScrolledToEnd;
};

export default useScrollEnd;
