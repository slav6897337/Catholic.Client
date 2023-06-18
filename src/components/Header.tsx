import React from 'react';
import styles from './Header.module.css';
import Logo from "./Logo";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Logo/>
      <div className={styles.logoHorizontalLine}/>
    </div>
  );
};
export default Header;