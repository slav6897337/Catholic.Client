import React, {FunctionComponent, ReactNode} from "react";
import styles from "./GoldBorder.module.css";


interface IProps {
  containerStyle?: React.CSSProperties;
  container?: string;
  children: ReactNode;
}


const GoldBorder: FunctionComponent<IProps> = (props) => {
  return (
    <div className={`${styles.container} ${styles.border} ${props.container}`} style={props.containerStyle}>
      <div className={`${styles.secondBorder} ${styles.border}`}>
        <div className={styles.content}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default GoldBorder;
