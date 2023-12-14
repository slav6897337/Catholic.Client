import React, {ReactNode} from 'react';
import styles from './Header.module.css';

interface IProps {
  children: ReactNode;
}

const Header: React.FC<IProps> = ({children}) => {
  return (
    <header className={styles.headerContainer}>
      {children}
    </header>
  );
};
export default Header;