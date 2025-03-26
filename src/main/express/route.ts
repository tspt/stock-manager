import { Express } from 'express'
import { stockRouter } from './routes/stock.router'

export function registerRoutes(app: Express): void {
  // 健康检查端点
  app.get('/api/health', (_, res) => {
    res.json({ status: 'OK', timestamp: Date.now() })
  })

  // 业务路由模块
  app.use('/api/stock', stockRouter)

  // 404 处理
  app.use((_, res) => {
    res.status(404).json({ error: 'Endpoint not found' })
  })
}
