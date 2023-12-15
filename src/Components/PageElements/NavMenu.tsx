import * as React from 'react';

import styles from './NavMenu.module.css';
import {NavLink, useLocation} from "react-router-dom";
import useWindowDimensions from "../../hookcs/useWindowDimensions";
import {ILink, links} from "../../Navigation/Lincks";
import Button from "../StyledComponents/Button";
import {useEffect} from "react";

interface INavMenuProps {
  onMenuClick?: (open: boolean) => void;
}

export const NavMenu: React.FC<INavMenuProps> = ({
                                                   onMenuClick = () => {
                                                   }
                                                 }) => {
  const {width} = useWindowDimensions();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  const navRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
      onMenuClick(false);
    }
  };

  const menuClassName = `${styles.navContainer} ${menuOpen ? styles.open : ''}`;

  return (
    <nav ref={navRef}
         className={`${styles.mobileMenuContainer} ${menuOpen ? styles.mobileMenuContainerDecoration : null}`}>
      {menuOpen || width > 1000
        ? <div
          className={`${menuClassName} `}
          onClick={() => {
            setMenuOpen(false);
            onMenuClick(false);
          }}>
          {links.map((link: ILink, index: number) =>
            <NavLink
              key={index}
              className={`${styles.navLink} ${location.pathname === link.path ? styles.currentLink : null}`}
              to={link.path}>
              {link.name}
            </NavLink>
          )}
        </div>
        : <Button
          className={styles.menuButton}
          iconClassName={styles.menuButtonIcon}
          onClick={() => {
            setMenuOpen(true);
            onMenuClick(true);
          }}
          icon='/icons/menu.png'/>
      }
    </nav>

  );
}

export default NavMenu;