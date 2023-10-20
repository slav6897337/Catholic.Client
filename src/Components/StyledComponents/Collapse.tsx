import React, {FC, FunctionComponent, MouseEventHandler, ReactNode, useEffect, useRef, useState} from "react";
import styles from "./Collapse.module.css";


interface IProps {
  isExpanded: boolean
  icon?: string;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
  textClassName?: string;
  children?: ReactNode;
}

export const Collapse: FC<IProps> = ({
                                       isExpanded,
                                       children,
                                     }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setContentHeight(ref.current.clientHeight);
    }
  }, [children]);

  return (
    <div
      className="collapse"
      style={{
        height: isExpanded ? contentHeight : 0,
      }}
    >
      <div ref={ref}>
        {children}
      </div>
    </div>
  );
};
