import axios from 'axios'
import iconv from 'iconv-lite'
import config from '../../config/stock'

export class SinaDataSource implements StockDataSource {
  async fetch(code: string) {
    const response = await axios.get(`${config.sina.endpoint}${code}`, {
      headers: config.sina.headers,
      timeout: config.sina.timeout,
      responseType: 'arraybuffer'
    })

    // GBK转UTF-8
    const decodedData = iconv.decode(Buffer.from(response.data), 'GBK')
    return this.parseData(decodedData)
  }

  private parseData(data: string): StockData[] {
    console.log(data)
    // 解析数据（示例：假设返回文本为 var hq_str_sh601006="数据";）
    const resultData = data
      .trim()
      .split('\n')
      .map((line) => {
        const cleanedData = line
          .replace(/"/g, '')
          .replace(/var hq_str_/g, '')
          .trim()

        // 示例数据格式：sh600519=大秦铁路,6.36,6.35,...;
        const [codePart, ...values] = cleanedData.split('=')
        const code = codePart.split('_').pop() || ''
        const fields = values.join('').split(',')

        return {
          code: code,
          name: fields[0],
          price: parseFloat(fields[3]),
          rate: (
            ((parseFloat(fields[3]) - parseFloat(fields[2])) / parseFloat(fields[2])) *
            100
          ).toFixed(2)
        }
      })
    return resultData
  }

  private parseFullData(data: string): StockFullData {
    // 清洗非法字符
    const cleanedData = data
      .replace(/"/g, '')
      .replace(/var hq_str_/g, '')
      .trim()

    // 示例数据格式：sh600519=大秦铁路,6.36,6.35,...;
    const [codePart, ...values] = cleanedData.split('=')
    const code = codePart.split('_').pop() || ''

    const fields = values.join('').split(',')

    const timestamp = new Date(fields[30] + ' ' + fields[31]).getTime()

    return {
      code: code,
      name: fields[0],
      open: parseFloat(fields[1]),
      close: parseFloat(fields[2]),
      price: parseFloat(fields[3]),
      high: parseFloat(fields[4]),
      low: parseFloat(fields[5]),
      volume: parseFloat(fields[8]),
      amounts: parseFloat(fields[9]),
      buyer: [
        {
          price: parseFloat(fields[10]),
          volume: parseFloat(fields[11])
        },
        {
          price: parseFloat(fields[12]),
          volume: parseFloat(fields[13])
        },
        {
          price: parseFloat(fields[14]),
          volume: parseFloat(fields[15])
        },
        {
          price: parseFloat(fields[16]),
          volume: parseFloat(fields[17])
        },
        {
          price: parseFloat(fields[18]),
          volume: parseFloat(fields[19])
        }
      ],
      seller: [
        {
          price: parseFloat(fields[20]),
          volume: parseFloat(fields[21])
        },
        {
          price: parseFloat(fields[22]),
          volume: parseFloat(fields[23])
        },
        {
          price: parseFloat(fields[24]),
          volume: parseFloat(fields[25])
        },
        {
          price: parseFloat(fields[26]),
          volume: parseFloat(fields[27])
        },
        {
          price: parseFloat(fields[28]),
          volume: parseFloat(fields[29])
        }
      ],
      timestamp: timestamp,
      kline: this.parseKLine(fields, timestamp)
    }
  }

  private parseKLine(fields: string[], timestamp): Array<[number, number, number, number, number]> {
    // 根据新浪返回的实际数据结构实现
    return [
      [
        timestamp,
        parseFloat(fields[1]),
        parseFloat(fields[4]),
        parseFloat(fields[5]),
        parseFloat(fields[3])
      ]
    ]
  }
}
