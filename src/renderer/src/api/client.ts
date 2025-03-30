import axios from 'axios'
import iconv from 'iconv-lite'

// 渲染进程请求配置
const apiBaseURL =
  process.env.NODE_ENV === 'production' ? `http://localhost:3001/api` : 'http://localhost:3001/api'

const apiClient = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000,
  responseType: 'arraybuffer', // 接收二进制数据
  transformResponse: [
    (data) => {
      return iconv.decode(Buffer.from(data), 'GBK')
    }
  ]
})

export const getStockData = (code: string) => {
  // return apiClient.get(`/stock?code=${code}`)
  return apiClient.get(`/stock/${code}`)
}
