import React, {FunctionComponent, ReactNode} from "react";
import styles from "./Button.module.css";
import {Link} from "react-router-dom";


interface IProps {
  icon?: string;
  text?: string;
  to: string;
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
  textClassName?: string;
  children?: ReactNode;
}


const NavButton: FunctionComponent<IProps> = (props) => {
  return (
    <Link className={`${styles.sButton} ${props.className}`} style={props.style} to={props.to}>
      {props.icon
        ? <img className={`${styles.sButtonIcon} ${props.iconClassName}`} src={props.icon} alt={props.text}/>
        : null
      }
      {props.text
        ? <p className={`${styles.sButtonText} ${props.textClassName}`}>{props.text}</p>
        : null
      }
      {props.children && props.children}
    </Link>
  );
};

export default NavButton;
