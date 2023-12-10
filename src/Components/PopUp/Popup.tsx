import React, {useEffect, useRef, useState} from 'react';
import styles from './Popup.module.css';
import Loading from "../PageElements/Loading";
import Button from "../StyledComponents/Button";
import EventListener from "../../Utiles/EventListener";
import {POPUP_HIDDEN, POPUP_SHOWN} from "../../Utiles/EventEmitter";

interface ModalProps {
  children?: React.ReactNode;
  loading?: boolean;
  modalStyle?: string;
}

const Popup: React.FC<ModalProps> =(props) => {
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <>
      <EventListener event={POPUP_SHOWN} callback={() => {
        setShow(true);
      }} />
      <EventListener event={POPUP_HIDDEN} callback={() => {
        setShow(false);
      }} />
      {show ?
        <div className={styles.overlayStyle}>
          <div
            ref={modalRef}
            className={`${styles.modalStyle} ${props.modalStyle}`}
          >
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
      : null}
    </>

  );
};

export default Popup;