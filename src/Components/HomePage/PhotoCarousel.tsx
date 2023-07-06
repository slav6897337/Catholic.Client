import {FunctionComponent} from "react";
import styles from "./PhotoCarousel.module.css";
import Carousel from "../Carousel/Carousel";


const PhotoCarousel: FunctionComponent = () => {

  const images = imagesData.map(image =>
    <img className={styles.photoCarouselImage} src={image.imgPath} alt={image.label}/>);

  return (
    <Carousel items={images} />
  );
};

const imagesData = [
  {
    label: 'Holly Mass',
    imgPath: '/img/reading.png',
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
