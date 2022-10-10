import React, { lazy, Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
// const Test = lazy(() => import('@/pages/Test'));
// const Sample = lazy(() => import('@/pages/Sample'));
import Test from '@/pages/Test';
import Sample from '@/pages/Sample';
import Component from '@/pages/Component';
import Nested from '@/pages/Nested';

interface MapRouterProps {
  path: string;
  element: JSX.Element;
  children?: React.ReactNode | MapRouterProps[] | undefined;
  theme?: string;
  setTheme?: (theme: string) => void;
}

const routes = (props: any): MapRouterProps[] => [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '/sample',
    element: <Sample />
  },
  {
    path: '/component',
    element: <Component />
  },
  {
    path: '/nested',
    element: <Nested />
  },
  // {
  //   path: '/test',
  //   element: (
  //     <Suspense fallback={<div>loading</div>}>
  //       <Test />
  //     </Suspense>
  //   )
  // },
  // {
  //   path: '/sample',
  //   element: (
  //     <Suspense fallback={<div>loading</div>}>
  //       <Test />
  //     </Suspense>
  //   )
  // },
  {
    path: '*',
    element: <NotFound />
  }
];

const mapRoutes = (
  routes:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | MapRouterProps[]
    | boolean
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return routes.map(({ path, element, children }) => {
    return {
      path,
      element,
      children: !!children && mapRoutes(children)
    };
  });
};

const BaseRoute = (props: MapRouterProps[]) => useRoutes(mapRoutes(routes(props)));

// @ts-ignore
const Router: React.FC = ({ props }) => {
  // @ts-ignore
  return (
    <BrowserRouter>
      {/*@ts-ignore*/}
      <BaseRoute {...props} />
    </BrowserRouter>
  );
};

export default Router;
