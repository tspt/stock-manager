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

interface EchartsWrapperProps extends ReactEChartsProps {
  option: ECOption
  style?: React.CSSProperties
}

declare module '@/router/index'
declare module '@/router/guard'
declare module '@/pages/Dashboard'
declare module '@/pages/Home'
declare module '@/components/SvgIcon'
declare module '@/components/SearchBar'
declare module '@/components/Loading'
declare module '@/components/stock/StockChart'
declare module '@/lib/echarts-core'
declare module '@/lib/echarts/candlestick-config'
declare module '@/lib/echarts/timeshare-config'
