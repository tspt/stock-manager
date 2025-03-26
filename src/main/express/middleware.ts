import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import config from './config/stock'

export function applyMiddleware(app: express.Express): void {
  // 添加 CSP 中间件
  app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      `default-src 'self' 'unsafe-inline' data:; connect-src 'self' http://localhost:${config.port} https://hq.sinajs.cn; img-src 'self' data:; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';`
    )
    next()
  })

  // CORS 配置
  app.use(
    cors({
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      origin: [
        'http://localhost:5173', // React开发服务器
        'file://' // 生产环境文件协议
      ]
    })
  )

  // 请求体解析
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // 请求限流
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 500, // 每个IP限制500次请求
      standardHeaders: true,
      legacyHeaders: false
    })
  )

  // 请求日志
  app.use((req, _, next) => {
    console.log(`[Express] ${req.method} ${req.path}`)
    next()
  })
}
