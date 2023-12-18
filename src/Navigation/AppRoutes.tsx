import React, {lazy, ReactNode} from "react";
import HomePage from '../Pages/HomePage';
import HolyMassPage from "../Pages/HolyMassPage";
import BibleGroupPage from "../Pages/BibleGroupPage";
import BibleQuotes from '../Components/HomePage/DailyBibleQuote';
import NewsPage from "../Pages/NewsPage";
import ChoirPage from "../Pages/ChoirPage";
import ListNewsPage from "../Pages/ListNewsPage";
import ContactsPage from "../Pages/ContactsPage";

interface IAppRoutes {
  element?: ReactNode,
  component?: ReactNode,
  index?: boolean,
  path?: string
}

const AdminPage = lazy(() => import('../Pages/Admin/AdminPage'));
const LogInPage = lazy(() => import("../Pages/Admin/LogInPage"));
const AdminNewsPage = lazy(() => import("../Pages/Admin/AdminNewsPage"));
const AdminNotesPage = lazy(() => import("../Pages/Admin/AdminNotesPage"));
const EditPage = lazy(() => import("../Pages/Admin/EditPage"));
const EditNewsPage = lazy(() => import("../Pages/Admin/EditNewsPage"));
const EditHolyMassPage = lazy(() => import("../Pages/Admin/EditHolyMassPage"));
const EditHomePage = lazy(() => import("../Pages/Admin/EditHomePage"));
const EditNotesPage = lazy(() => import("../Pages/Admin/EditNotesPage"));

export const AppRoutes: IAppRoutes[] = [
  {
    index: true,
    element: <HomePage/>
  },
  {
    path: '/holy-mass',
    element: <HolyMassPage/>
  },
  {
    path: '/english-bible-group',
    element: <BibleGroupPage/>
  },
  {
    path: '/bible-quotes',
    element: <BibleQuotes/>
  },
  {
    path: '/choir',
    element: <ChoirPage/>
  },
  {
    path: '/news',
    element: <ListNewsPage/>
  },
  {
    path: '/contacts',
    element: <ContactsPage/>
  },
  {
    path: '*',
    element: <NewsPage/>
  },
];

export const AdminRoutes: IAppRoutes[] = [
  {
    path: '/admin',
    component: <AdminPage/>
  },
  {
    path: '/admin/edit/home',
    component: <EditHomePage/>
  },
  {
    path: '/admin/edit/holy-mass',
    component: <EditHolyMassPage/>
  },
  {
    path: '/admin/edit/:id',
    component: <EditPage/>
  },
  {
    path: '/admin/edit-news/:id',
    component: <EditNewsPage/>
  },
  {
    path: '/admin/new-news',
    component: <EditNewsPage/>
  },
  {
    path: '/admin/new-page',
    component: <EditPage/>
  },
  {
    path: '/admin/log-in',
    component: <LogInPage/>
  },
  {
    path: '/admin/news',
    component: <AdminNewsPage/>
  },
  {
    path: '/admin/notes',
    component: <AdminNotesPage/>
  },
  {
    path: '/admin/edit-notes/:id',
    component: <EditNotesPage/>
  },
  {
    path: '/admin/new-notes',
    component: <EditNotesPage/>
  }
];
