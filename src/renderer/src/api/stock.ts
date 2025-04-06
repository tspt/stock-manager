import apiClient from './client'

// 股票列表
export const getStockList = (params) => {
  return apiClient.get(`/stock/getList`, params)
}

// 股票分时图
export const getStockTimeShare = (params) => {
  return apiClient.get(`/stock/getTimeShare`, params)
}

// 股票K线图
export const getStockCandlestick = (params) => {
  return apiClient.get(`/stock/getCandlestick`, params)
}
