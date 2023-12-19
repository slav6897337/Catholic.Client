import React, {lazy, Suspense, useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {AdminRoutes, AppRoutes} from './AppRoutes';
import Loading from "../Components/PageElements/Loading";
import Body from "../Components/PageElements/Body";

const HolyMassPage = lazy(() => import("../Pages/HolyMassPage"));

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
    <Routes>
      {window.location.hostname === churchDomain && <Route index={true} element={
        <Suspense fallback={<Body center={true}><Loading/></Body>}>
          <HolyMassPage/>
        </Suspense>
      }/>}
      {AppRoutes.map((route, index) => {
        const {element, component, ...rest} = route;
        return <Route key={index} {...rest} element={element}/>;
      })}
      {AdminRoutes.map((route, index) => (
        <Route
          key={index}
          {...route}
          element={
            <Suspense fallback={<Body center={true}><Loading/></Body>}>
              {route.component}
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default Navigation;
