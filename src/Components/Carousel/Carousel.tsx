import React, {FunctionComponent} from "react";
import styles from "./Carousel.module.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './custom-swiper.css';
import {Swiper, SwiperProps, SwiperSlide} from "swiper/react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import { Navigation, Pagination, Autoplay} from 'swiper/modules';

interface IProps extends SwiperProps {
  items: ReactJSXElement[];
  containerStyle?: React.CSSProperties;
  container?: string;
}

const defaultProps: IProps = {
  items: [],
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  centeredSlides: true,
  navigation: true,
  pagination: {
    clickable: true
  },
  spaceBetween: 30
}

const Carousel: FunctionComponent<IProps> = (props) => {
  const finalProps = {...defaultProps, ...props};

  return (
    <div className={`${styles.carousel} ${styles.border} ${props.container}`} style={props.containerStyle}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        id={styles.swiper}
        className={styles.myCustomSwiperContainer}
        {...finalProps}
      >
        {props.items.map((item, index) =>
          (<SwiperSlide key={index}>
            {item}
          </SwiperSlide>))}
      </Swiper>
      <div className={`${styles.carouselBorder} ${styles.border}`}></div>
    </div>
  );
};

export default Carousel;
