/// <reference types="vite/client" />

interface GuardProps {
  children: ReactNode
}

interface ReactEChartsProps {
  notMerge?: boolean
  lazyUpdate?: boolean
  theme?: string | object
  opts?: {
    devicePixelRatio?: number
    renderer?: 'canvas' | 'svg'
    width?: number | string
    height?: number | string
  }
}

interface StockData {
  code: string
  name: string
  price: number
  rate: number
}

interface EchartsWrapperProps extends ReactEChartsProps {
  option: ECOption
  style?: React.CSSProperties
}

declare module '@/router/index'
declare module '@/router/guard'
declare module '@/pages/Dashboard'
declare module '@/pages/Home'

declare module '@/components/layout/BasicLayout'

declare module '@/components/common/Chart'
declare module '@/components/common/Loading'
declare module '@/components/common/SvgIcon'

declare module '@/lib/echarts/echarts-core'
declare module '@/lib/echarts/candlestick-config'
declare module '@/lib/echarts/timeshare-config'

declare module '@/utils/stock'
