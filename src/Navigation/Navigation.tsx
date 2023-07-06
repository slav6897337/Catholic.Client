import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import HolyMassPage from "../Pages/HolyMassPage";

const Navigation = () => {
  useEffect(() => {
    if (window.location.hostname === "www.holymass-dev.store" && window.location.pathname !== '/') {
      window.location.href = `http://www.catholic-dev.store${window.location.pathname}`;
    } else if (window.location.pathname === '/holy-mass') {
      window.location.href = 'http://www.holymass-dev.store';
    }
  }, [window.location.pathname]);

  return (
    <div className="body-container">
      <Routes>
        {window.location.hostname === "www.holymass-dev.store" && <Route index={true} element={<HolyMassPage/>}/>}
        {AppRoutes.map((route, index) => {
          const {element, ...rest} = route;
          return <Route key={index} {...rest} element={element}/>;
        })}
      </Routes>
    </div>
  );
};

export default Navigation;
