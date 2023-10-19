import {FunctionComponent, ReactNode} from "react";
import styles from "./WhiteContainer.module.css";


interface IProps {
  children: ReactNode;
  title?: string;
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}


const WhiteContainer: FunctionComponent<IProps> = (props) => {
  return (
    <div className={`${styles.whiteContainer} ${props.className}`} style={props.style}>
      {props.title ?
        <h3 className={`${styles.title} ${props.titleClassName}`} style={props.titleStyle}>
          {props.title}
        </h3>
        : null}
      {props.children}
    </div>
  );
};

export default WhiteContainer;
