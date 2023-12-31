import React, {useEffect} from 'react';
import styles from './Gallery.module.css';
import SwiperCore from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import useWindowDimensions from "../../hookcs/useWindowDimensions";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import Loading from "../PageElements/Loading";

interface IProps {
  items: ReactJSXElement[];
  title?: string;
  containerStyle?: string;
  className?: string;
  onReachEnd?: () => void;
  onClick?: () => void;
  singleSlidePerView?: boolean;
  slideTo?: number;
}

const Gallery: React.FC<IProps> = (props) => {
  const {width} = useWindowDimensions();
  const ref = React.useRef<SwiperRef>(null);

  useEffect(() => {
    if (props.slideTo && ref.current) {
      ref.current.swiper.slideTo(props.slideTo);
    }
  }, [props.slideTo]);

  const updateSlidesPerView = () => {
    if (width < 420) {
      return 'auto';
    }
    if (props.singleSlidePerView || props.items.length === 1 || props.items.length <= 1 || width < 900) {
      return 1;
    }
    if (props.items.length === 2 || width < 1300) {
      return 2;
    }
    if (props.items.length === 3 || width < 1700) {
      return 3;
    }
    if (props.items.length === 4 || width < 2000) {
      return 4;
    }
    if (props.items.length === 5 || width < 2400) {
      return 5;
    }
    return 6;
  };

  const handleSwiperSlideChange = async (swiper: SwiperCore) => {
    const {isEnd} = swiper;
    if (isEnd && props.onReachEnd) {
      props.onReachEnd();
    }
  };

  if (!props.items.length) return (
    <div className={`${styles.gallery} ${props.containerStyle}`}>
      {props.title
        ? <h1 className={styles.galleryTitle}>{props.title}</h1>
        : null}

      <div className={styles.galleryContainer}>
        <Loading/>
      </div>
    </div>
  );

  return (
    <>
      <div className={`${styles.gallery} ${props.className}`}>
        {props.title
          ? <h1 className={styles.galleryTitle}>{props.title}</h1>
          : null}

        <div className={styles.galleryContainer}>
          <Swiper
            ref={ref}
            slidesPerView={updateSlidesPerView()}
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
    </>
  );
};

export default Gallery;
