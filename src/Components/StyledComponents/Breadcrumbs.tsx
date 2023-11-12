import React, {FunctionComponent} from "react";
import styles from "./Breadcrumbs.module.css";
import {Link} from "react-router-dom";

interface IBreadcrumb {
  text: string;
  to?: string;
}

interface IProps {
  breadcrumbs: IBreadcrumb[];
  className?: string;
  style?: React.CSSProperties;
  iconClassName?: string;
  textClassName?: string;
}


export const Breadcrumbs: FunctionComponent<IProps> = (props) => {
  return (
    <div className={`${styles.breadcrumbsContainer} ${props.className}`} style={props.style}>
      {props.breadcrumbs.map((breadcrumb, index) =>
        <>
        {breadcrumb.to ?
          <Link key={index} className={`${styles.breadcrumb} ${styles.link} ${props.className}`} style={props.style} to={breadcrumb.to}>
            {breadcrumb.text}
          </Link>
          : <p className={`${styles.breadcrumb} ${props.textClassName}`}>{breadcrumb.text}</p>
        }
          {props.breadcrumbs.length - 1 !== index ?
            <p className={`${styles.arrow} ${props.iconClassName}`}>{`>`}</p>
            : null

          }
        </>


      )}
    </div>
  );
};