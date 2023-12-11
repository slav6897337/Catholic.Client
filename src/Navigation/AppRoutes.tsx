import React, {ReactNode} from "react";
import BibleQuotes from '../Components/HomePage/DailyBibleQuote';
import HomePage from '../Pages/HomePage';
import HolyMassPage from "../Pages/HolyMassPage";
import NewsPage from "../Pages/NewsPage";
import ChoirPage from "../Pages/ChoirPage";
import AdminPage from "../Pages/Admin/AdminPage";
import EditPage from "../Pages/Admin/EditPage";
import LogInPage from "../Pages/Admin/LogInPage";
import AdminNewsPage from "../Pages/Admin/AdminNewsPage";
import EditNewsPage from "../Pages/Admin/EditNewsPage";
import EditHolyMassPage from "../Pages/Admin/EditHolyMassPage";
import EditHomePage from "../Pages/Admin/EditHomePage";
import ListNewsPage from "../Pages/ListNewsPage";
import AdminNotesPage from "../Pages/Admin/AdminNotesPage";
import EditNotesPage from "../Pages/Admin/EditNotesPage";
import BibleGroupPage from "../Pages/BibleGroupPage";

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
    path: '/news',
    element: <ListNewsPage />
  },
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/admin/edit/home',
    element: <EditHomePage />
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
    path: '/admin/notes',
    element: <AdminNotesPage />
  },
  {
    path: '/admin/edit-notes/:id',
    element: <EditNotesPage />
  },
  {
    path: '/admin/new-notes',
    element: <EditNotesPage />
  },
  {
    path: '*',
    element: <NewsPage />
  },
];

export default AppRoutes;
