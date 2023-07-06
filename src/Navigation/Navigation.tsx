import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import HolyMassPage from "../Pages/HolyMassPage";


const Navigation = () => {
  const hostname = window.location.hostname;
  return (
    <div className="body-container">
      <Routes>
        {hostname === "www.holymass-dev.store" ? <Route index={true} element={<HolyMassPage/>}/> : null}
        {hostname === "www.holymass-dev.store" && window.location.pathname !== '/' ? window.location.href = "www.catholic-dev.store" : null}
        {window.location.pathname === '/holy-mass' ? window.location.href= 'www.holymass-dev.store' : null}

        {AppRoutes.map((route, index) => {
          const {element, ...rest} = route;
          return <Route key={index} {...rest} element={element}/>;
        })}
      </Routes>
    </div>
  );
};

export default Navigation;
