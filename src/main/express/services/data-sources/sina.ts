import axios from 'axios'
import config from '../../config/stock'

export class SinaDataSource implements StockDataSource {
  async fetch(code: string) {
    const response = await axios.get<string>(`${config.sina.endpoint}${code}`, {
      headers: config.sina.headers,
      timeout: config.sina.timeout
      // responseType: 'arraybuffer'
    })
    console.log(response.data)

    return this.parseData(response.data)
  }

  private parseData(data: string): StockData {
    // 示例解析格式：var hq_str_sh601006="大秦铁路, 6.36, 6.35, 6.34,...";
    const match = data.match(/="(.+?)"/)
    if (!match) throw new Error('无效的数据格式')

    const fields = match[1].split(',')
    return {
      code: fields[0],
      name: fields[0],
      price: parseFloat(fields[3]),
      open: parseFloat(fields[1]),
      high: parseFloat(fields[4]),
      low: parseFloat(fields[5]),
      volume: parseFloat(fields[8]),
      amounts
      timestamp: Date.now(),
      kline: this.parseKLine(fields)
    }
  }

  private parseKLine(fields: string[]): Array<[number, number, number, number, number]> {
    // 根据新浪返回的实际数据结构实现
    return [
      [
        Date.now(),
        parseFloat(fields[1]),
        parseFloat(fields[4]),
        parseFloat(fields[5]),
        parseFloat(fields[3])
      ]
    ]
  }
}
