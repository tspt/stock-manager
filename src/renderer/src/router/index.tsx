import { lazy, Suspense } from 'react'
import { RouteObject, Navigate, createHashRouter } from 'react-router-dom'
import BasicLayout from '@/components/layout/BasicLayout'
import RouterGuard from './guard'
import Loading from '@/components/common/Loading'

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
    element: <BasicLayout />, // 使用布局
    children: [
      {
        path: '/',
        element: <RouterGuard>{lazyLoad(import('@/pages/Dashboard'))}</RouterGuard>
      },
      {
        path: 'home',
        element: <RouterGuard>{lazyLoad(import('@/pages/Home'))}</RouterGuard>
      }
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
