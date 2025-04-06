import { SinaDataSource } from './data-sources/sina'
import { TencentDataSource } from './data-sources/tencent'
import config from '../config/stock'

// 数据源类型映射
const dataSources: Record<string, StockDataSource> = {
  sina: new SinaDataSource(),
  tencent: new TencentDataSource()
}

export class StockService {
  private cache = new Map<string, Promise<any>>()
  private cacheTimer: NodeJS.Timeout

  constructor() {
    // 定时清理一次缓存
    this.cacheTimer = setInterval(() => {
      this.cache.clear()
    }, config.cacheClearTime)
  }

  async getStockList(code: string): Promise<{ code: number; data: StockData[] }> {
    const source = config.source[0]
    const cacheKey = `${source}:${code}`

    try {
      // 带缓存的请求
      if (!this.cache.has(cacheKey)) {
        if (!dataSources[source].fetch) {
          throw new Error(`Data source "${source}" is not defined`)
        }
        const promise = dataSources[source].fetch(code)
        this.cache.set(cacheKey, promise)
      }

      return await this.cache.get(cacheKey)
    } catch (error: any) {
      console.error(`[StockService] 数据获取失败: ${error.message}`)
      throw new Error('暂时无法获取股票数据')
    }
  }

  async getStockTimeShare(params): Promise<{ code: number; data: StockData[] }> {
    const source = config.source[1]
    const cacheKey = `${source}:${params.code}`
    try {
      // 带缓存的请求
      if (!dataSources[source].fetch) {
        throw new Error(`Data source "${source}" is not defined`)
      }
      if (!this.cache.has(cacheKey)) {
        const promise = dataSources[source].fetch(params)
        this.cache.set(cacheKey, promise)
      }
      return await this.cache.get(cacheKey)
    } catch (error: any) {
      console.error(`[StockService] 数据获取失败: ${error.message}`)
      throw new Error('暂时无法获取股票数据')
    }
  }

  async getStockCandlestick(params): Promise<{ code: number; data: StockData[] }> {
    const source = config.source[1]
    const cacheKey = `${source}:${params.code}`
    try {
      // 带缓存的请求
      if (!dataSources[source].fetchCandlestick) {
        throw new Error(`Data source "${source}" is not defined`)
      }
      if (!this.cache.has(cacheKey)) {
        const promise = dataSources[source].fetchCandlestick(params)
        this.cache.set(cacheKey, promise)
      }
      return await this.cache.get(cacheKey)
    } catch (error: any) {
      console.error(`[StockService] 数据获取失败: ${error.message}`)
      throw new Error('暂时无法获取股票数据')
    }
  }

  destroy() {
    clearInterval(this.cacheTimer)
  }
}

// 初始化服务实例
export const stockService = new StockService()
