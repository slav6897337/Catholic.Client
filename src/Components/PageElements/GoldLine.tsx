import React, {FunctionComponent} from "react";
import styles from "./GoldLine.module.css";


interface IProps {
  className?: string;
  style?: React.CSSProperties;
}


const GoldLine: FunctionComponent<IProps> = (props) => (
  <div className={`${styles.goldLine} ${props.className}`} style={props.style}/>
);

export default GoldLine;
