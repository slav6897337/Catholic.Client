import React, {FunctionComponent} from "react";
import ReactLoading from 'react-loading';
import styles from "./Loading.module.css";

interface IProps {
  height?: string;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Loading: FunctionComponent<IProps> = (props) =>
  <ReactLoading
    className={styles.loading}
    type='spinningBubbles'
    color="#016066"
    height={'10%'}
    width={'10%'}
    {...props}
  />

export default Loading;