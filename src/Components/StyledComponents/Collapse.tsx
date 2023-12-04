import React, {FC, ReactNode, useRef, useState} from "react";
import styles from "./Collapse.module.css";

interface IProps {
  isExpanded: boolean
  icon?: string;
  text?: string;
  onClick: (value: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
  textClassName?: string;
  children?: ReactNode;
}

export const Collapse: FC<IProps> = ({
                                       text,
                                       onClick,
                                       isExpanded,
                                       children,
                                     }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | string | undefined>(ref.current?.clientHeight);

  const open = () => {
    window.scrollTo(0, document.body.scrollHeight);
    onClick(!isExpanded);
    setContentHeight(ref.current?.clientHeight);
    setTimeout(() => {
      setContentHeight('auto')
      window.scrollTo(0, document.body.scrollHeight - 80);
    }, 400);
  }

  return (
    <div className={styles.collapseContainer}>

      {!isExpanded
        ? <div className={styles.collapseButtonContainer} onClick={() => open()}>
          <div className={styles.collapseWrapper}>
            <div className={`${styles.collapseIcon} ${styles.first}`}/>
            <div className={`${styles.collapseIcon} ${styles.second}`}/>
            {text && <p className={styles.collapseText}>{text}</p>}
          </div>
        </div>
        : null
      }

      <div
        className={styles.collapse}
        style={{
          height: isExpanded ? contentHeight : 0,
        }}
      >
        <div ref={ref}>
          {children}
        </div>
      </div>
    </div>

  );
};
