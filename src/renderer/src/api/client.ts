import axios from 'axios'

// 渲染进程请求配置
const baseURL =
  process.env.NODE_ENV === 'production' ? `http://localhost:3001/api` : 'http://localhost:3001/api'

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

class apiClient {
  // 封装请求方法
  constructor() {}
  // get 请求
  get(url: string, params?: any) {
    return axiosInstance.get(url, { params })
  }
  // post 请求
  post(url: string, data?: any) {
    return axiosInstance.post(url, data)
  }
  // post json 请求
  postJson(url: string, data?: any) {
    return axiosInstance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default new apiClient()
