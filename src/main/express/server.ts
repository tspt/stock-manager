import express, { Express } from 'express'
import { Server } from 'http'
import { applyMiddleware } from './middleware'
import { registerRoutes } from './route'
import config from './config/stock'

export class ExpressServer {
  private app: Express
  private server?: Server
  private port: number

  constructor(port: number = config.port) {
    this.app = express()
    this.port = port

    this.configureServer()
  }

  private configureServer(): void {
    // 应用中间件
    applyMiddleware(this.app)

    // 注册路由
    registerRoutes(this.app)

    // 错误处理中间件
    this.app.use(this.errorHandler)
  }

  public start(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.server = this.app
        .listen(this.port, () => {
          console.log(`Express server running on port ${this.port}`)
          resolve(this.port)
        })
        .on('error', (error: NodeJS.ErrnoException) => {
          if (error.code === 'EADDRINUSE') {
            console.error(`Port ${this.port} is in use, trying alternative...`)
            this.server = this.app.listen(0, () => {
              this.port = (this.server?.address() as any).port
              console.log(`Express server running on dynamic port ${this.port}`)
              resolve(this.port)
            })
          } else {
            reject(error)
          }
        })
    })
  }

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.server) return resolve()

      this.server.close((error) => {
        if (error) {
          reject(error)
        } else {
          console.log('Express server closed')
          resolve()
        }
      })
    })
  }

  private errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
    console.error('[Express Error]', err.stack)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
