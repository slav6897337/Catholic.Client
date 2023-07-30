import React, {ReactNode} from "react";
import BibleQuotes from '../Components/HomePage/DailyBibleQuote';
import HomePage from '../Pages/HomePage';
import HolyMassPage from "../Pages/HolyMassPage";
import NewsPage from "../Pages/NewsPage";
import BibleGroupPage from "../Pages/BibleGroupPage";
import ChoirPage from "../Pages/ChoirPage";


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
    path: '/bible-group',
    element: <BibleGroupPage />
  },
  {
    path: '/bible-quotes',
    element: <BibleQuotes />
  },
  {
    path: '/choir',
    element: <ChoirPage />
  },
  {
    path: '*',
    element: <NewsPage />
  },
];

export default AppRoutes;
