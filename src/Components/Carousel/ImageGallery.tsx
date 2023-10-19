import React, {useRef, useState} from 'react';
import styles from './ImageGallery.module.css';
import Popup, {ModalHandle} from "../PopUp/Popup";
import Gallery from "./Gallery";
import Api from "../../Utiles/Api";
import Button from "../StyledComponents/Button";
import useWindowDimensions from "../../hookcs/useWindowDimensions";


interface IProps {
  images: string[];
  buttonText?: string;
  buttonIcon?: string;
  buttonOnClick?: (index: number) => void;
  containerStyle?: string;
  onReachEnd?: () => void;
  onClick?: () => void;
}

const ImageGallery: React.FC<IProps> = (props) => {
  const {height, width} = useWindowDimensions();

  const modalRef = useRef<ModalHandle | null>(null);

  if (!props.images?.length) return null;

  return (
    <div className={`${styles.gallery} ${props.containerStyle}`}>
      <div className={styles.galleryWrapper}>
        <Gallery
          items={props.images.map((item, index) => (
            <div className={styles.imageContainer} key={index}>
              <img className={styles.galleryImage}
                   src={Api.getImageUrl(item)}
                   alt={index.toString()}
                   onClick={() => modalRef?.current?.toggle()}
              />
              {props.buttonOnClick &&
                  <Button
                      className={styles.button}
                      icon={props.buttonIcon}
                      text={props.buttonText}
                      onClick={() => props.buttonOnClick}
                  />
              }
            </div>
          ))}/>
      </div>

      {width > 760 ?
        <Popup ref={modalRef} modalStyle={styles.modalStyles}>
          <div className={styles.galleryWrapper}>
            <Gallery
              items={props.images.map((item, index) => (
                <div className={styles.imageContainer} key={index}>
                  <img className={styles.fullImage}
                       src={Api.getImageUrl(item)}
                       alt={index.toString()}
                  />
                  {props.buttonOnClick &&
                      <Button
                          className={`${styles.button} ${styles.fullButton}`}
                          icon={props.buttonIcon}
                          text={props.buttonText}
                          onClick={() => props.buttonOnClick}
                      />
                  }
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

