import {FunctionComponent, ReactNode} from "react";
import styles from "./Modal.module.css";
import Button from "../StyledComponents/Button";

interface IProps {
  children?: ReactNode;
  title?: string;
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  okOnClick?: () => void;
  cancelOnClick?: () => void;
}

const Modal: FunctionComponent<IProps> = (props) => {
  return (
    <div className={styles.modalContainer} title={props.title}>
      {props.title
        ? <h3 className={`${styles.modalText} ${props.titleClassName}`} style={props.titleStyle}>{props.title}</h3>
        : null}

      {props.children ? props.children : null}

      <div className={styles.modalButtons}>
        {props.okOnClick ? <Button icon='/icons/ok.png' text='Ok' onClick={props.okOnClick}/> : null}
        {props.okOnClick ? <Button icon='/icons/cancel.png' text='Cancel' onClick={props.cancelOnClick}/> : null}
      </div>
    </div>
  );
};

export default Modal;