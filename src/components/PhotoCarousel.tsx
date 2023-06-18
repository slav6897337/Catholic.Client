import {FunctionComponent} from "react";
import styles from "./PhotoCarousel.module.css";
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './custom-swiper.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";


const PhotoCarousel: FunctionComponent = () => {


  return (
    <div className={styles.photoCarousel}>

      <div className={styles.photoCarouselChild}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          style={{
            color: "#fff",

          }}
        >
          {images.map((image) =>
            (<SwiperSlide><img className={styles.photoCarouselImage} src={image.imgPath} alt={image.label} /></SwiperSlide>))}

        </Swiper>
      </div>

    </div>
  );
};

const images = [
  {
    label: 'Holly Mass',
    imgPath: '/welcome-image.png',
  },
  {
    label: 'Bible',
    imgPath: '/img/bible.png',
  },
  {
    label: 'Bible',
    imgPath:
      '/img/bible-rosary.png',
  },
  {
    label: 'Reading',
    imgPath: '/img/reading.png',
  },
];

export default PhotoCarousel;
