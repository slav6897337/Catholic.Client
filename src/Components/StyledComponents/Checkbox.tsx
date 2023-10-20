import React, {FunctionComponent} from "react";
import styles from "./Checkbox.module.css";

interface IProps {
  value: boolean;
  text?: string;
  onClick?: (v: boolean) => void;
  className?: string;
}


const Checkbox: FunctionComponent<IProps> = ({value, text, onClick, className}) => {
  return (
    <div className={styles.checkbox}>
      {text && <p className={styles.checkboxText}>{text}</p>}
      <div
        className={`${styles.checkboxContainer} ${value ? styles.checkedContainer : null}`}
        onClick={() => onClick ? onClick(!value) : null}>
        <div className={`${styles.checkboxMark} ${value ? styles.checkedMark : null}`}/>
      </div>
    </div>
  );
};

export default Checkbox;
