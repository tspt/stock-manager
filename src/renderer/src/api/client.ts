import axios from 'axios'

// 渲染进程请求配置
const apiBaseURL =
  process.env.NODE_ENV === 'production' ? `http://localhost:3001/api` : 'http://localhost:3001/api'

const apiClient = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000
})

export const getStockList = (code: string) => {
  return apiClient.get(`/stock/getList?code=${code}`)
  // return apiClient.get(`/stock/${code}`)
}
