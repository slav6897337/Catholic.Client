import React, {FunctionComponent} from "react";
import styles from "./NotFound.module.css";
import Button from "./Button";


interface IProps {
  containerStyle?: React.CSSProperties;
  container?: string;
}


export const NotFound: FunctionComponent<IProps> = (props) => {
  return (
    <div className={`${styles.container} ${props.container}`} style={props.containerStyle}>
      <div className={styles.circle}>
        <div className={styles.numbers}>404</div>
        <div className={styles.sorryText}>Sorry, this page not found</div>
        <div className={styles.text}>
          <p>Either something went wrong </p>
          <p>or the page doesn’t exist anymore.</p>
        </div>

        <Button text='Go home' onClick={() => window.location.href = '/'}/>
      </div>

    </div>
  );
};