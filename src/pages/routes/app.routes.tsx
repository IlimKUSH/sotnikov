import {Navigate, Outlet, RouteObject} from 'react-router-dom';
import { Layout } from '../../components';
import { BrowserRoute } from '../../routes/browser.route';
import { NotFound } from '../NotFound';
import {PostList} from "../PostList";
import {BackendRoutes} from "../../routes/backed.route";
import {PhotoList} from "../PhotoList";


export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={BrowserRoute.posts} />,
      },
      {
        path: BrowserRoute.posts,
        element: <PostList />,
      },
      {
        path: BrowserRoute.photos,
        element: <PhotoList />,
      },
      {
        path: BrowserRoute.tasks,
        element: <PostList />,
      },
      // {
      //   path: BrowserRoute.analytics,
      //   element: <NotFound />,
      // },
    ],
  },
];
