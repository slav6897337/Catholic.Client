import React, {Suspense, useEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import {AppRoutes, AdminRoutes} from './AppRoutes';
import HolyMassPage from "../Pages/HolyMassPage";
import Loading from "../Components/PageElements/Loading";

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
          const {element, component, ...rest} = route;
          return <Route key={index} {...rest} element={element}/>;
        })}
        {AdminRoutes.map((route, index) => (
          <Route
            key={index}
            {...route}
            element={
              <Suspense fallback={<Loading/>}>
                {route.component}
              </Suspense>
            }
          />
        ))}
      </Routes>
    </div>
  );
};

export default Navigation;
