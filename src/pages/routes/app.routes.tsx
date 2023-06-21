import { Outlet, RouteObject } from 'react-router-dom';
import { Layout } from '../../components';
import { BrowserRoute } from '../../routes/browser.route';
import { UserList } from '../UserList';
import { NotFound } from '../NotFound';
import { AddUserForm } from '../AddUserForm';


export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      // <Auth>
        <Layout>
          <Outlet />
        </Layout>
      // </Auth>
    ),
    children: [
      {
        index: true,
        element: <UserList />,
      },
      {
        path: BrowserRoute.analytics,
        element: <AddUserForm />,
      },
      {
        path: BrowserRoute.banner,
        element: <NotFound />,
      },
      {
        path: BrowserRoute.blog,
        element: <NotFound />,
      },
      {
        path: BrowserRoute.chats,
        element: <NotFound />,
      },
      {
        path: BrowserRoute.profile,
        element: <NotFound />,
      },
      {
        path: BrowserRoute.team,
        element: <UserList />,
      },
      {
        path: BrowserRoute.currency,
        element: <NotFound />,
      },
      {
        path: BrowserRoute.moderation,
        element: <NotFound />,
      },
    ],
  },
];
