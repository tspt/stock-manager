export function parseStockData(data: string) {
  // 示例解析新浪返回格式
  const match = data.match(/="(.+)"/)
  if (!match) return null

  const arr = match[1].split(',')
  return {
    name: arr[0],
    code: arr[1],
    open: parseFloat(arr[2]),
    high: parseFloat(arr[3]),
    low: parseFloat(arr[4]),
    close: parseFloat(arr[5]),
    volume: parseFloat(arr[6]),
    // 转换为Highcharts需要的K线格式
    kline: [
      [
        Date.parse(arr[30]), // 日期
        parseFloat(arr[2]), // open
        parseFloat(arr[3]), // high
        parseFloat(arr[4]), // low
        parseFloat(arr[5]) // close
      ]
    ]
  }
}
