import React, {ReactNode} from "react";
import BibleQuotes from '../Components/HomePage/DailyBibleQuote';
import HomePage from '../Pages/HomePage';
import HolyMassPage from "../Pages/HolyMassPage";
import NewsPage from "../Pages/NewsPage";


interface IAppRoutes {
  element: ReactNode,
  index?: boolean,
  path?: string
}

const AppRoutes:IAppRoutes[] = [
  {
    index: true,
    element: <HomePage />
  },
  {
    path: '/holy-mass',
    element: <HolyMassPage />
  },
  {
    path: '/bible-quotes',
    element: <BibleQuotes />
  },
  {
    path: '*',
    element: <NewsPage />
  },
];

export default AppRoutes;
