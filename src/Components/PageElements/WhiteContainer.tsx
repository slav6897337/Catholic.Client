import {FunctionComponent, ReactNode} from "react";
import styles from "./WhiteContainer.module.css";
import moment from "moment";


interface IProps {
  children: ReactNode;
  title?: string;
  date?: Date;
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}


const WhiteContainer: FunctionComponent<IProps> = (props) => {
  return (
    <div className={`${styles.whiteContainer} ${props.className}`} style={props.style}>
      {props.date ? <div className={styles.date}>{moment(props.date).format('MMMM D, yyyy')}</div> :null}
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
