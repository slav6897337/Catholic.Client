import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment/moment';
import styles from './SpecificNews.module.css';
import {Image} from "../StyledComponents/Image";

interface ISpecificNews {
  title: string,
  date: Date,
  description: string,
  link?: string,
  image?: string,
  style?: React.CSSProperties;
}

const SpecificNews = (props: ISpecificNews) => {
  if (!props.title || !props.date || !(props.description || props.image)) return null;

  const Content = () => (
    <>
      <div className={styles.newsTitle}>
        <h1 className={styles.newsTitleText}>{props.title}</h1>
        <p className={styles.newsDate}>{moment(props.date).format('DD.MM.yyyy')}</p>
      </div>
      <div className={styles.bodyContainer}>
        {props.image && <Image className={props.description ? styles.separate : styles.center} selfSrc={props.image} alt={props.title}/>}
        <div>
          {props.description && <p className={styles.newsBody}>{props.description}</p>}
        </div>
      </div>
    </>);


  return (
    props.link?.length ?
      <Link to={`/${props.link}`} className={`${styles.news} ${styles.newsClickable}`} style={props.style}>
        <Content/>
      </Link> :
      <div className={`${styles.news} ${styles.newsNonClickable}`} style={props.style}>
        <Content/>
      </div>
  );
};

export default SpecificNews;