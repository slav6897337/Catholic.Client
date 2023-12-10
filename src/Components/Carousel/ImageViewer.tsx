import React, {useEffect, useState} from 'react';
import styles from './ImageGallery.module.css';
import Popup from "../PopUp/Popup";
import Gallery from "./Gallery";
import useWindowDimensions from "../../hookcs/useWindowDimensions";
import {Image} from "../StyledComponents/Image";
import {useSwiperPagination} from "../../hookcs/useSwiperPagination";
import {ISize} from "../../Domain/ISize";
import {EventEmitter, POPUP_SHOWN} from "../../Utiles/EventEmitter";
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
  containerStyle?: string;
  onReachEnd?: () => void;
  onClick?: (index: number) => void;
  title?: string;
}

const ImageViewer: React.FC<IProps> = (props) => {
  const {height, width} = useWindowDimensions();
  const [imageWidth, setImageWidth] = useState<number>();
  const [slideTo, setSlideTo] = useState<number>();
  useSwiperPagination();

  useEffect(() => {
    EventEmitter.on(POPUP_SHOWN, (index) => {
      setSlideTo(index);
    });

    return () => EventEmitter.off(POPUP_SHOWN);
  }, []);

  const processImage = (size: ISize) => {
    if (!size) return;
    const width = size.width * height / 1.2 / size?.height;
    if (!imageWidth || width > imageWidth) setImageWidth(width);
  };

  if (!props.images?.length || width < 760) return null;

  return (
    <Popup modalStyle={styles.modalStyles}>
      <div className={styles.galleryWrapper} style={{width: imageWidth}}>
        <Gallery
          className={styles.galleryContainer}
          items={props.images.map((item, index) => (
            <div className={styles.imageFullContainer} key={index}>
              <Image className={styles.fullImage}
                     style={{maxHeight: height / 1.2}}
                     selfSrc={item}
                     alt={index.toString()}
                     onSizeChange={s => processImage(s.naturalSize)}
              />
              <ImageButtons {...props} image={item}/>
            </div>
          ))}
          singleSlidePerView={true}
          slideTo={slideTo}
        />
      </div>
    </Popup>
  );
};

export default ImageViewer;