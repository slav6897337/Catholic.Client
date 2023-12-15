import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./SticklyHeader.module.css"
import NavMenu from "./NavMenu";

const StickyHeader: FunctionComponent = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const controlLogo = () => {
    setIsFixed(window.scrollY > 500);
    if (window.scrollY > lastScrollY) {
      setShowLogo(false);
    } else {
      setShowLogo(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlLogo);

    return () => {
      window.removeEventListener('scroll', controlLogo);
    };
  }, [lastScrollY]);

  if(!isFixed) return null;

  return (
    <div className={`${styles.logoContainer} ${showLogo || isMenuOpen ? '' : styles.hiddenLogo} ${isFixed ? styles.fixedLogoContainer : ''}`}>
      <div className={styles.logo}>
        <button className={styles.logotext} onClick={() => window.location.href = '/'}>
          <b className={styles.catholicsk}>Catholic.sk</b>
        </button>
        <button className={styles.crosslogo} onClick={() => window.location.href = '/'} aria-label="Catholic.sk">
          <img
            className={styles.crosslogoChild}
            alt="Cross Catholic Logo"
            src="/img/cross.svg"
          />
        </button>
      </div>

      <div className={styles.navWrapper}>
        <NavMenu onMenuClick={f => setIsMenuOpen(f)}/>
      </div>


    </div>
  );
};

export default StickyHeader;
