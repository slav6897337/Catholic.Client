import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment/moment';
import './SpecificNews.css';

interface ISpecificNews {
  title: string,
  date: Date,
  description: string,
  link?: string,
  style?: React.CSSProperties;
}

const SpecificNews = (props: ISpecificNews) => {
  if (!props.title || !props.date || !props.description) return null;

  const Content = () => (
    <>
      <div className="news__title">
        <h1>{props.title}</h1>
        <p>{moment(props.date).format('DD.MM.yyyy')}</p>
      </div>
      <p>{props.description}</p>
    </>);


  return (
    props.link?.length ?
      <Link to={`/${props.link}`} className="news newsClickable" style={props.style}>
        <Content/>
      </Link> :
      <div className="news newsNonClickable" style={props.style}>
        <Content/>
      </div>
  );
};

export default SpecificNews;