import axios from 'axios'
import iconv from 'iconv-lite'
import config from '../../config/stock'

export class TencentDataSource implements StockDataSource {
  private getQueryString(params) {
    return `?_var=kline_${params.type}&param=${params.code},${params.type},,,2000,&r=${Math.random()}`
  }
  async fetchCandlestick(params) {
    console.log(params)
    const response = await axios.get(`${config.tencent.endpoint + this.getQueryString(params)}`, {
      headers: config.tencent.headers,
      timeout: config.tencent.timeout
    })
    const result = response.data.split('=')
    try {
      const data = JSON.parse(result[1])
      return data
    }
    console.log(response.data)
    console.log(typeof response.data)
    // GBK转UTF-8
    // const decodedData = iconv.decode(Buffer.from(response.data), 'GBK')
    return response.data //this.parseCandlestick(decodedData)
  }
  
  // async fetchTimeShare(code: string) {
  //   const response = await axios.get(`${config.tencent.endpoint}${code}`, {
  //     headers: config.tencent.headers,
  //     timeout: config.tencent.timeout,
  //     responseType: 'arraybuffer'
  //   })
  //   // GBK转UTF-8
  //   const decodedData = iconv.decode(Buffer.from(response.data), 'GBK')
  //   return this.parseTimeShare(decodedData) // { code: 0, data: this.parseData(decodedData) }
  // }
  // private parseCandlestick(data: string) {
  //   const lines = data.split('\n')
  //   const result: StockFullData[] = []
  //   for (let i = 1; i < lines.length - 1; i++) {
  //     const [code, name, price, close, open, high, low, volume, amounts, timestamp, buyer, seller] =
  //       lines[i].split(',')
  //     result.push({
  //       code,
  //       name,
  //       price: parseFloat(price),
  //       close: parseFloat(close),
  //       open: parseFloat(open),
  //       high: parseFloat(high),
  //       low: parseFloat(low),
  //       volume: parseFloat(volume),
  //       amounts: parseFloat(amounts),
  //       timestamp: parseInt(timestamp)
  //     })
  //   }
  //   return result
  // }
  // private parseTimeShare(data: string) {
  //   const lines = data.split('\n')
  //   const result: StockFullData[] = []
  //   for (let i = 1; i < lines.length - 1; i++) {
  //     const [code, name, price, close, open, high, low, volume, amounts, timestamp, buyer, seller] =
  //       lines[i].split(',')
  //     result.push({
  //       code,
  //       name,
  //       price: parseFloat(price),
  //       close: parseFloat(close),
  //       open: parseFloat(open),
  //       high: parseFloat(high),
  //       low: parseFloat(low),
  //       volume: parseFloat(volume),
  //       amounts: parseFloat(amounts),
  //       timestamp: parseInt(timestamp)
  //     })
  //   }
  //   return result
  // }
}
