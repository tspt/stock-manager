// app/router/index.jsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
const Home = lazy(() => import('../pages/Home'));
const PageLoading = () => <div>Loading...</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<PageLoading />}>
            <Home />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;