import React, {FunctionComponent, MouseEventHandler} from "react";
import styles from "./Button.module.css";


interface IProps {
  icon?: string;
  text?: string;
  onClick?: (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
  textClassName?: string;
}


const Button: FunctionComponent<IProps> = (props) => {
  return (
    <button className={`${styles.sButton} ${props.className}`} style={props.style} onClick={props.onClick}>
      {props.icon
        ? <img className={`${styles.sButtonIcon} ${props.iconClassName}`} src={props.icon} alt={props.text}/>
        : null
      }
      {props.text
        ? <p className={`${styles.sButtonText} ${props.textClassName}`}>{props.text}</p>
        : null
      }
    </button>
  );
};

export default Button;
