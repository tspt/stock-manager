import { SinaDataSource } from './data-sources/sina'
import config from '../config/stock'

// 数据源类型映射
const dataSources: Record<string, StockDataSource> = {
  sina: new SinaDataSource()
}

export class StockService {
  private cache = new Map<string, Promise<any>>()
  private cacheTimer: NodeJS.Timeout

  constructor() {
    // 每5分钟清理一次缓存
    this.cacheTimer = setInterval(() => {
      this.cache.clear()
    }, 3000)
  }

  async getStockData(code: string): Promise<StockData> {
    const source = config.defaultSource
    const cacheKey = `${source}:${code}`

    try {
      // 带缓存的请求
      if (!this.cache.has(cacheKey)) {
        const promise = dataSources[source].fetch(code)
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
