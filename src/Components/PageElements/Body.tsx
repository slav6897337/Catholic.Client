import React, {FunctionComponent} from "react";
import styles from "./Body.module.css"
import Header from "./Header";

interface IBodyProps {
  className?: string;
  headerClassName?: string;
  headerContent?: React.ReactNode;
  bodyClassName?: string;
  children?: React.ReactNode;
  center?: boolean;
}

const Body: FunctionComponent<IBodyProps> = ({className, headerClassName, headerContent, children, center = false}) => {
  return (
    <div className={`${styles.bodyContainerWithBackgroundImage}`}>

        <img
          className={styles.backgroundBodyImage}
          src='/background.webp'
          srcSet='/background.webp 1024w, /background768.webp 768w, /background414.webp 414w, /background320.webp 320w'
          sizes="(min-width: 769px) 1024px,
               (min-width: 415px) 768px,
               (min-width: 321px) 414px,
               320px"
          alt="Sv. Ladislav Church"
        />



      {headerContent ?
        <Header className={headerClassName}>
          {headerContent}
        </Header>
        : null
      }

      <article className={`${center ? 'center' : ''} ${styles.bodyContainerWithWhiteGradient} ${className}`}>
        {children}
      </article>

    </div>
  );
};

export default Body;
