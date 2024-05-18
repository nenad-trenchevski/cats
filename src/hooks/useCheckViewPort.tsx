import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const useCheckViewPort = (callback: () => void) => {
  // ref:
  // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  const { ref, inView } = useInView({
    triggerOnce: false,
    initialInView: true,
  });

  useEffect(() => {
    console.log('IN VIEW', inView);
    if (inView) {
      callback();
    }
  }, [inView, callback]);

  return ref;
};

export default useCheckViewPort;
