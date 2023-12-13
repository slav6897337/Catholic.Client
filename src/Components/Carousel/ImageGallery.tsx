import React from 'react';
import styles from './ImageGallery.module.css';
import Gallery from "./Gallery";
import {Image} from "../StyledComponents/Image";
import {useSwiperPagination} from "../../hookcs/useSwiperPagination";
import {EventEmitter, POPUP_SHOWN} from "../../Utiles/EventEmitter";
import ImageViewer from "./ImageViewer";
import ImageButtons from "./ImageButtons";

interface IProps {
  images: string[];
  leftButtonText?: string;
  leftButtonIcon?: string;
  leftButtonOnClick?: (image?: string) => void;
  leftButtonCondition?: (image?: string) => boolean;
  rightButtonText?: string;
  rightButtonIcon?: string;
  rightButtonOnClick?: (image?: string) => void;
  className?: string;
  onReachEnd?: () => void;
  onClick?: () => void;
  title?: string;
}

const ImageGallery: React.FC<IProps> = (props) => {
  useSwiperPagination();

  if (!props.images?.length) return null;

  return (
    <div className={`${styles.gallery} ${props.className}`}>
      <div className={styles.galleryWrapper}>
        <Gallery
          className={styles.galleryMargin}
          title={props.title}
          items={props.images.map((item, index) => (
            <div className={styles.imageContainer} key={index}>
              <Image className={styles.galleryImage}
                     selfSrc={item}
                     alt={index.toString()}
                     onClick={() => EventEmitter.trigger(POPUP_SHOWN, <ImageViewer index={index} {...props} images={props.images}/>)}
              />
              <ImageButtons
                {...props}
                image={item}
              />

            </div>
          ))}/>
      </div>



    </div>
  );
};

export default ImageGallery;

