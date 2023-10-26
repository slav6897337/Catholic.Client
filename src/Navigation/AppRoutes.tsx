import React, {ReactNode} from "react";
import BibleQuotes from '../Components/HomePage/DailyBibleQuote';
import HomePage from '../Pages/HomePage';
import HolyMassPage from "../Pages/HolyMassPage";
import NewsPage from "../Pages/NewsPage";
import BibleGroupPage from "../Pages/BibleGroupPage";
import ChoirPage from "../Pages/ChoirPage";
import AdminPage from "../Pages/Admin/AdminPage";
import EditPage from "../Pages/Admin/EditPage";
import LogInPage from "../Pages/Admin/LogInPage";
import AdminNewsPage from "../Pages/Admin/AdminNewsPage";
import EditNewsPage from "../Pages/Admin/EditNewsPage";
import EditHolyMassPage from "../Pages/Admin/EditHolyMassPage";


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
    path: '/english-bible-group',
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
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/admin/edit/holy-mass',
    element: <EditHolyMassPage />
  },
  {
    path: '/admin/edit/:id',
    element: <EditPage />
  },
  {
    path: '/admin/edit-news/:id',
    element: <EditNewsPage />
  },
  {
    path: '/admin/new-news',
    element: <EditNewsPage />
  },
  {
    path: '/admin/new-page',
    element: <EditPage />
  },
  {
    path: '/admin/log-in',
    element: <LogInPage />
  },
  {
    path: '/admin/news',
    element: <AdminNewsPage />
  },
  {
    path: '*',
    element: <NewsPage />
  },
];

export default AppRoutes;
