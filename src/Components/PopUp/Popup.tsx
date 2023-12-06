import React, {forwardRef, useImperativeHandle, useState} from 'react';
import styles from './Popup.module.css';
import Loading from "../PageElements/Loading";
import Button from "../StyledComponents/Button";
import BlurContainer from "../PageElements/BlurContainer";

interface ModalProps {
  children?: React.ReactNode;
  loading?: boolean;
  modalStyle?: string;
}

export interface ModalHandle {
  toggle: () => void;
}

const Popup = forwardRef<ModalHandle, ModalProps>((props, ref) => {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle: () => {
      setShow(prevShow => !prevShow);
    }
  }));


  if (!show) {
    return null;
  }

  return (
    <div className={styles.overlayStyle}>
      <div className={`${styles.modalStyle} ${props.modalStyle}`}>
        <Button
          className={styles.mButton}
          iconClassName={styles.mButtonIcon}
          icon='/icons/cancel.png'
          onClick={() => setShow(prevShow => !prevShow)}
        />
        {props.loading
          ? <div className={styles.loading}><Loading/></div>
          : props.children
        }
      </div>
    </div>
  );
});

export default Popup;