import React from 'react';
import styles from './ImageGallery.module.css';
import Button from "../StyledComponents/Button";

interface IProps {
  image?: string;
  leftButtonText?: string;
  leftButtonIcon?: string;
  leftButtonOnClick?: (image?: string) => void;
  leftButtonCondition?: (image?: string) => boolean;
  rightButtonText?: string;
  rightButtonIcon?: string;
  rightButtonOnClick?: (image?: string) => void;
}

const ImageButtons: React.FC<IProps> = (props) => {

  if (!props.image) return null;

  return (
    <div className={styles.buttonsContainer}>
      {props.leftButtonOnClick && props.leftButtonCondition && props.leftButtonCondition(props.image) &&
          <Button
              className={`${styles.lButton}`}
              icon={props.leftButtonIcon}
              text={props.leftButtonText}
              onClick={() => props.leftButtonOnClick ? props.leftButtonOnClick(props.image) : null}
          />
      }
      {props.rightButtonOnClick &&
          <Button
              className={``}
              icon={props.rightButtonIcon}
              text={props.rightButtonText}
              onClick={() => props.rightButtonOnClick ? props.rightButtonOnClick(props.image) : null}
          />
      }
    </div>
  );
};

export default ImageButtons;