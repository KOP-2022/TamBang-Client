import { useEffect, useState } from 'react';

export const useInjectDaumPostcode = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const postcode = document.createElement('script');
    postcode.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    postcode.id = 'daumpostcodemapv2';
    document.head.appendChild(postcode);
    setIsLoading(false);
    return () => {
      document.head.removeChild(postcode);
    };
  }, []);

  return { isLoading };
};
