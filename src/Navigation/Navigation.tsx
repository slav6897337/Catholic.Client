import React, {useEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import AppRoutes from './AppRoutes';
import HolyMassPage from "../Pages/HolyMassPage";

const catholicDomain = 'www.catholic-dev.store';
const churchDomain = 'www.holymass-dev.store';

const Navigation = () => {
  const location = useLocation();
  const [isFirstTime, setFirstTime] = React.useState(true);

  useEffect(() => {
    if (!isFirstTime) {
      if (window.location.hostname === churchDomain) {
        window.location.assign(`http://${catholicDomain}${window.location.pathname}`);
      }
      if (window.location.hostname === catholicDomain && window.location.pathname === '/holy-mass') {
        window.location.assign(`http://${churchDomain}`);
      }
    }
    setFirstTime(false);
  }, [location]);

  return (
    <div className="body-container">
      <Routes>
        {window.location.hostname === churchDomain && <Route index={true} element={<HolyMassPage/>}/>}
        {AppRoutes.map((route, index) => {
          const {element, ...rest} = route;
          return <Route key={index} {...rest} element={element}/>;
        })}
      </Routes>
    </div>
  );
};

export default Navigation;
