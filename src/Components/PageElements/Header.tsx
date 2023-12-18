import React, {ReactNode} from 'react';
import styles from './Header.module.css';

interface IProps {
  className?: string;
  children: ReactNode;
}

const Header: React.FC<IProps> = ({children, className}) => {
  return (
    <header className={`${styles.headerContainer} ${className}`}>
      {children}
    </header>
  );
};
export default Header;