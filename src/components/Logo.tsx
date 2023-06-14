import { FunctionComponent } from "react";
import {inspect} from "util";
import styles from "./Logo.module.css"

const Logo: FunctionComponent = () => {
  return (
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
  );
};

export default Logo;
