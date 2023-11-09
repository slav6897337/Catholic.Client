import {FunctionComponent, useEffect, useState} from "react";
import styles from "./PhotoCarousel.module.css";
import Carousel from "../Carousel/Carousel";
import Api from "../../Utiles/Api";

interface IProps {
  images: (string | undefined)[];
}

const getImages = (images: (string | undefined)[]) => {
  // eslint-disable-next-line eqeqeq
  const newImages = images.filter(Boolean);
  if (newImages.length) {
    return newImages.map(i => Api.getImageUrl(i ?? ''));
  }
  return defaultImages;
};

const PhotoCarousel: FunctionComponent<IProps> = (props) => {
  const [imagesData, setImages] = useState<string[]>(getImages(props.images));

  useEffect(() => {
    const newImages = getImages(props.images);
    if (newImages.length) {
      setImages(newImages);
    }

  }, [props.images]);

  const images = imagesData.map((image, index) =>
    <img className={styles.photoCarouselImage} src={image} alt={index.toString()}/>);

  return (
    <Carousel items={images}/>
  );
};

const defaultImages = [
  '/img/reading.png',
];

export default PhotoCarousel;
