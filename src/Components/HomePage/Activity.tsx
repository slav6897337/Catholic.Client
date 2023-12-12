import React from 'react';
import {Link} from 'react-router-dom';
import './Activity.css';

interface IActivity {
  title: string;
  description: string;
  image: string;
  link: string;
  isImageTop: boolean;
}


const Activity = (props: IActivity) => {
  if (!props.title || !props.description || !props.image || !props.link) return null;

  return (
    <Link className={`activity ${props.isImageTop ? null : 'activity_reverse'}`} to={props.link}>
      <div className="activityImageContainer">
         <img className="activityImage" src={props.image} alt={props.title}/>
      </div>
      <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <div className="activity__link">
          <p>Read More</p>
          <img className="activity__link_arrow" style={{width:25, height:10}} src='/img/arrow.png' alt='arrow'/>
          {/*<p className="activity__link_arrow">{`-->`}</p>*/}
        </div>
      </div>
      {/*<div className="activityImageContainer">*/}
      {/*  {!props.isImageTop ?*/}
      {/*    <img className="activityImage" style={{borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem'}}*/}
      {/*         src={props.image} alt={props.title}/> : null}*/}
      {/*</div>*/}

    </Link>
  );
}

export default Activity;