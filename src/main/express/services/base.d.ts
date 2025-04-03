// 类型定义
interface StockDataSource {
  fetch(code: string): Promise<StockFullData | StockData[]>
}
interface StockFullData {
  code: string
  name: string
  price: number
  close: number
  open: number
  high: number
  low: number
  volume: number
  amounts: number
  timestamp: number
  buyer: Array<{
    price: number
    volume: number
  }>
  seller: Array<{
    price: number
    volume: number
  }>
  kline: Array<[number, number, number, number, number]>
}
interface StockData {
  code: string
  name: string
  price: number
  rate: string
}
