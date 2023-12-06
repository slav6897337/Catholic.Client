import React, {useRef, useState} from 'react';
import styles from './ImageGallery.module.css';
import Popup, {ModalHandle} from "../PopUp/Popup";
import Gallery from "./Gallery";
import Button from "../StyledComponents/Button";
import useWindowDimensions from "../../hookcs/useWindowDimensions";
import {Image} from "../StyledComponents/Image";
import {useSwiperPagination} from "../../hookcs/useSwiperPagination";
import {ISize} from "../../Domain/ISize";

interface IProps {
  images: string[];
  leftButtonText?: string;
  leftButtonIcon?: string;
  leftButtonOnClick?: (image: string) => void;
  leftButtonCondition?: (image: string) => boolean;
  rightButtonText?: string;
  rightButtonIcon?: string;
  rightButtonOnClick?: (image: string) => void;
  containerStyle?: string;
  onReachEnd?: () => void;
  onClick?: () => void;
  title?: string;
}

const ImageGallery: React.FC<IProps> = (props) => {
  const {height, width} = useWindowDimensions();
  const [imageWidth, setImageWidth] = useState<number>();
  useSwiperPagination();
  const modalRef = useRef<ModalHandle | null>(null);

  const processImage = (size: ISize) => {
    if(!size) return;
    const width = size.width * height / 1.2 / size?.height;
    if(!imageWidth || width > imageWidth) setImageWidth(width);
  };

  const Buttons: React.FC<{
    item: string
  }> = ({item}) => (
    <div className={styles.buttonsContainer}>
      {props.leftButtonOnClick && props.leftButtonCondition && props.leftButtonCondition(item) &&
          <Button
              className={`${styles.lButton}`}
              icon={props.leftButtonIcon}
              text={props.leftButtonText}
              onClick={() => props.leftButtonOnClick ? props.leftButtonOnClick(item) : null}
          />
      }
      {props.rightButtonOnClick &&
          <Button
              className={``}
              icon={props.rightButtonIcon}
              text={props.rightButtonText}
              onClick={() => props.rightButtonOnClick ? props.rightButtonOnClick(item) : null}
          />
      }
    </div>
  );

  if (!props.images?.length) return null;

  return (
    <div className={`${styles.gallery} ${props.containerStyle}`}>
      <div className={styles.galleryWrapper}>
        <Gallery
          title={props.title}
          items={props.images.map((item, index) => (
            <div className={styles.imageContainer} key={index}>
              <Image className={styles.galleryImage}
                     selfSrc={item}
                     alt={index.toString()}
                     onClick={() => modalRef?.current?.toggle()}
              />
              <Buttons item={item}/>

            </div>
          ))}/>
      </div>

      {width > 760 ?
        <Popup ref={modalRef} modalStyle={styles.modalStyles}>
          <div className={styles.galleryWrapper} style={{width:imageWidth}}>
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
                  <Buttons item={item}/>
                </div>
              ))}

              singleSlidePerView={true}
            />
          </div>
        </Popup>
        : null}

    </div>
  );
};

export default ImageGallery;

