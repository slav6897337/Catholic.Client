import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className='logo-container'>
      <div className='cross-vertical-line'/>
      <div className='cross-horizontal-line'/>
      <div className='cross-top-left-angle'/>
      <div className='cross-top-right-angle'/>
      <div className='cross-bottom-right-angle'/>
      <div className='cross-bottom-left-angle'/>
      <div className="site-name">Catholic.sk</div>
      <div className="site-description">The place where the community meets</div>
    </div>
  );
};
export default Logo;