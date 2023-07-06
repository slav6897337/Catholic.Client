import React, {FunctionComponent} from "react";
import styles from "./Logo.module.css"

const Logo: FunctionComponent = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo}>
        <button className={styles.logotext}>
          <b className={styles.catholicsk}>Catholic.sk</b>
          <div className={styles.thePlaceWhere}>
            The place where the community meets
          </div>
        </button>
        <button className={styles.crosslogo}>
          <img
            className={styles.crosslogoChild}
            alt=""
            src="/img/cross.svg"
          />
        </button>
      </div>
      <div className={styles.logoHorizontalLine}/>
    </div>
  );
};

export default Logo;