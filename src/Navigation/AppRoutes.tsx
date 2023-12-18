import React, {lazy, ReactNode} from "react";

interface IAppRoutes {
  element?: ReactNode,
  component?: ReactNode,
  index?: boolean,
  path?: string
}

const HomePage = lazy(() => import("../Pages/HomePage"));
const HolyMassPage = lazy(() => import("../Pages/HolyMassPage"));
const BibleGroupPage = lazy(() => import("../Pages/BibleGroupPage"));
const BibleQuotes = lazy(() => import('../Components/HomePage/DailyBibleQuote'));
const NewsPage = lazy(() => import("../Pages/NewsPage"));
const ChoirPage = lazy(() => import("../Pages/ChoirPage"));
const ListNewsPage = lazy(() => import("../Pages/ListNewsPage"));
const ContactsPage = lazy(() => import("../Pages/ContactsPage"));

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
