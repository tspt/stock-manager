import { lazy, Suspense } from 'react'
import { RouteObject, Navigate, createHashRouter } from 'react-router-dom'
import BasicLayout from '../layouts/BasicLayout'
import RouterGuard from './guard'
import Loading from '@components/Loading'

// 路由懒加载封装
const lazyLoad = (component: Promise<any>) => {
  const LazyComponent = lazy(() => component)
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  )
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/',
    element: <BasicLayout />, // 使用布局
    children: [
      {
        path: 'dashboard',
        element: <RouterGuard>{lazyLoad(import('@pages/Dashboard'))}</RouterGuard>
      }
      // {
      //   path: 'login',
      //   element: lazyLoad(import('../pages/Login'))
      // }
    ]
  }
  // {
  //   path: '/404',
  //   element: lazyLoad(import('@/pages/404'))
  // },
  // {
  //   path: '*',
  //   element: <Navigate to="/404" replace />
  // }
]

const router = createHashRouter(routes)

export default router
