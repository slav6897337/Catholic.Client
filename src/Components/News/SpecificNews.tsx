import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment/moment';
import './SpecificNews.css';

interface ISpecificNews {
  title: string,
  date: Date,
  description: string,
  link?: string,
}

const SpecificNews = (props: ISpecificNews) => {
  if(!props.title || !props.date || !props.description || !props.link) return null;
  
  return (
    <Link to={props.link} className={`news ${props.link ? 'newsClickable' : 'newsNonClickable'}`} >
      <div className="news__title">
        <h1>{props.title}</h1>
        <p>{moment(props.date).format('DD.MM.yyyy')}</p>
      </div>
      <p>{props.description}</p>
    </Link>
  );
};

export default SpecificNews;