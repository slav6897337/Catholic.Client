import React, {FunctionComponent} from "react";
import styles from "./Avatar.module.css";


interface IProps {
  name: string;
  position?: string;
  photo: string;
  containerStyle?: React.CSSProperties;
  container?: string;
}


const Avatar: FunctionComponent<IProps> = (props) => {
  return (
    <div className={`${styles.container} ${props.container}`} style={props.containerStyle}>
      <div className={styles.avatarText}>
        <p>{props.name}</p>
        {props.position && <p>{props.position}</p>}
      </div>
      <img className={styles.avatar} src={props.photo} alt={props.name}/>
    </div>
  );
};

export default Avatar;
