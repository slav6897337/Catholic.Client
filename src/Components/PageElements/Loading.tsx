import React, {FunctionComponent} from "react";
import ReactLoading from 'react-loading';
import styles from "./Loading.module.css";

const Loading: FunctionComponent = () =>
    <ReactLoading className={styles.loading} type='spinningBubbles' color="#016066" height={'10%'} width={'10%'} />

export default Loading;
