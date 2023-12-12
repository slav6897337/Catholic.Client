import React, {useEffect, useRef, useState} from 'react';
import styles from './Popup.module.css';
import Button from "../StyledComponents/Button";
import {EventEmitter, POPUP_HIDDEN, POPUP_SHOWN} from "../../Utiles/EventEmitter";

interface ModalProps {
}

const Popup: React.FC<ModalProps> = (props) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    EventEmitter.on(POPUP_HIDDEN, () => setShow(false));
    EventEmitter.on(POPUP_SHOWN, (c) => {
      setContent(c);
      setShow(true);
    });


    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      EventEmitter.off(POPUP_HIDDEN);
      EventEmitter.off(POPUP_SHOWN);
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
      {show ?
        <div className={styles.overlayStyle}>
          <div
            ref={modalRef}
            className={`${styles.modalStyle}`}
          >
            <Button
              className={styles.mButton}
              iconClassName={styles.mButtonIcon}
              icon='/icons/cancel.png'
              onClick={() => setShow(prevShow => !prevShow)}
            />
            {content ? content : null}
          </div>
        </div>
        : null}
    </>
  );
};

export default Popup;