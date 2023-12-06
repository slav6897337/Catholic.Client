import { useEffect } from 'react';

export const useSwiperPagination = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `.swiper-button-prev, .swiper-button-next, .swiper-pagination { z-index: auto !important; }`;
    style.id = 'image-picker-style'; // Give the style tag an ID for easy removal

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('image-picker-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);
};