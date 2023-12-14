import React, {FunctionComponent, ReactNode} from "react";
import styles from "./BlurContainer.module.css";


interface IProps {
  children: ReactNode;
  title?: string;
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}


const BlurContainer: FunctionComponent<IProps> = (props) => {
  if (!props.children) return null;

  return (
    <article className={`${styles.blurContainer} ${props.className}`} style={props.style}>
      {props.title ?
        <h1 className={`${styles.title} ${props.titleClassName}`} style={props.titleStyle}>
          {props.title}
        </h1>
        : null}
      {props.children}
    </article>
  );
};

export default BlurContainer;
