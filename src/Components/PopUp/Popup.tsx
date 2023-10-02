import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styles from './Popup.module.css';

interface ModalProps {
  children?: React.ReactNode;
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
      <div className={styles.modalStyle}>
        {props.children}
      </div>
    </div>
  );
});

export default Popup;