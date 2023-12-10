import React, {FunctionComponent, MouseEventHandler, useState} from "react";
import styles from "./Button.module.css";
import Api from "../../Utiles/Api";
import Loading from "../PageElements/Loading";
import {ISize} from "../../Domain/ISize";

interface IProps {
  icon?: string;
  alt?: string;
  src?: string;
  selfSrc?: string;
  className?: string;
  style?: React.CSSProperties;
  onSizeChange?: (size: { naturalSize: ISize, size: ISize }) => void;
  onClick?: MouseEventHandler<HTMLImageElement> | undefined;
}

export const Image: FunctionComponent<IProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const afterLoad = (image: HTMLImageElement) => {
    setLoading(false);
    setTimeout(() => {
      if (!imgRef.current) return;
      const newSize = {width: imgRef.current.width, height: imgRef.current.height};
      const naturalSize = {width: imgRef.current.naturalWidth, height: imgRef.current.naturalHeight};
      props.onSizeChange?.({naturalSize: naturalSize, size: newSize});
    }, 100);
  };

  if (!props.selfSrc && !props.src) return null;

  return (
    <>{
      loading
        ? <div
          className={`${styles.image} ${props.className}`}
          style={props.style}
        >
          <Loading width='10rem' height='10rem'/>
        </div>
        : null}
      <img
        ref={imgRef}
        className={`${styles.image} ${props.className}`}
        style={{...props.style, display: loading ? 'none' : 'block'}}
        alt={props.alt ?? 'image'}
        src={props.selfSrc ? Api.getImageUrl(props.selfSrc) : (props.src ?? '')}
        onLoad={(e) => afterLoad(e.target as HTMLImageElement)}
        onClick={props.onClick}
      />
    </>
  );
};


