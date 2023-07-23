import React, {ReactNode} from 'react';
import styles from './Header.module.css';

interface IProps {
  children: ReactNode;
}

const Header: React.FC<IProps> = ({children}) => {
  return (
    <div className={styles.headerContainer}>
      {children}
    </div>
  );
};
export default Header;