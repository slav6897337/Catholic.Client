import React, {ReactElement, useEffect, useRef, useState} from 'react';
import styles from './Gallery.module.css';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import useWindowDimensions from "../../hookcs/useWindowDimensions";


const specificItemWidth = 22 * 16 + 16 * 2 + 40;

interface IProps {
  items: ReactElement[];
  title?: string;
  containerStyle?: string;
  onReachEnd?: () => void;
  onClick?: () => void;
  singleSlidePerView?: boolean;
}

const Gallery: React.FC<IProps> = (props) => {
  const {height, width} = useWindowDimensions();

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
          slidesPerView={props.singleSlidePerView ? 'auto' : Math.floor(width / specificItemWidth)}
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

