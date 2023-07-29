import React, {ReactElement, useEffect, useState} from 'react';
import styles from './Gallery.module.css';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';


const specificNewsWidth = 22 * 16 + 16 * 2;

interface IProps {
  items: ReactElement[];
  title?: string;
  containerStyle?: string;
  onReachEnd?: () => void;
}

const Gallery: React.FC<IProps> = (props) => {
  const [width, setWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSwiperSlideChange = async (swiper: SwiperCore) => {
    const {isEnd} = swiper;
    if (isEnd && props.onReachEnd) {
      props.onReachEnd();
    }
  };

  return (
    <div className={`${styles.gallery} ${props.containerStyle}`}>
      {props.title
        ? <h1 className={styles.galleryTitle}>{props.title}</h1>
        : null}

      <div className={styles.galleryContainer}>
        <Swiper
          slidesPerView={Math.floor(width / specificNewsWidth)}
          spaceBetween={20}
          navigation={true}
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            horizontalClass: styles.swiperPagination
          }}
          onReachEnd={handleSwiperSlideChange}
          wrapperClass={styles.swiperWrapper}
        >
          {props.items.map((item, index) => (
            <SwiperSlide key={index}>
              {item}
              <div className={styles.paginationSpase}/>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
};

export default Gallery;

