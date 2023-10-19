import React from 'react';
import styles from './Footer.module.css';
import {ILink, links} from "../../Navigation/Lincks";
import {NavLink, useLocation} from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const MenuContent = () =>
    <div className={styles.footerMenu}>{
      links.map((link: ILink, index: number) =>
        <NavLink
          key={index}
          className={`${styles.footerLink} ${location.pathname === link.path ? styles.currentLink : null} `}
          to={link.path}>
          {link.name}
        </NavLink>
      )}</div>

  return (
    <div className={styles.footer}>
      <div className={styles.footerTopContainer}>
        <div className={styles.footerLogo}>
          <h2>Catholic.sk</h2>
          <p>The place where the community meets</p>
        </div>

        <MenuContent/>
      </div>

      <div className={styles.footerLine}/>
      <div className={styles.footerBottom}>
        <p>© Catholic.sk. All rights reserved</p>
      </div>
    </div>
  );
};
export default Footer;