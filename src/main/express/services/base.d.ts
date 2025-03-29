// 类型定义
interface StockDataSource {
  fetch(code: string): Promise<StockData>
}
interface StockData {
  code: string
  name: string
  price: number
  open: number
  high: number
  low: number
  volume: number
  timestamp: number
  kline: Array<[number, number, number, number, number]>
}
