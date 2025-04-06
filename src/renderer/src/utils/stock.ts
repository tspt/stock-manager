class Stock {
  ema12: number[]
  ema26: number[]
  dif: number[]
  dea: number[]
  histogram: number[]

  static downColor: any = '#26A69A'
  static upColor: any = '#F44336'

  constructor() {
    this.ema12 = []
    this.ema26 = []
    this.dif = []
    this.dea = []
    this.histogram = []
  }

  calculateMACD(closePrices) {
    this.ema12 = this.getEMA(closePrices, 12)
    console.log(this.ema12)
    this.ema26 = this.getEMA(closePrices, 26)
    this.dif = this.getDIF(this.ema12, this.ema26)
    this.dea = this.getEMA(this.dif, 9) // 计算DEA（信号线，即DIF的9日EMA）
    this.histogram = this.getHistogram(this.dif, this.dea) // 计算MACD柱（BAR）
    return {
      dif: this.dif,
      dea: this.dea,
      histogram: this.histogram
    }
  }
  /**
   * 计算EMA（指数移动平均线）
   * @param {Array} data 收盘价数组
   * @param {Number} period 周期
   */
  getEMA(data: string | any[], period: number) {
    const ema: number[] = []
    const smoothingFactor = 2 / (period + 1) // 平滑因子
    // 初始值为第一个数据点（简化处理，实际应为前period日的SMA）
    ema.push(data[0])
    for (let i = 1; i < data.length; i++) {
      const currentEMA = (1 - smoothingFactor) * ema[i - 1] + smoothingFactor * data[i]
      ema.push(currentEMA) // 计算当前EMA并添加到ema数组中
    }
    return ema
  }
  /**
   * 计算DIF（差离值）
   * @param {Array} ema12 EMA12数组
   * @param {Array} ema26 EMA26数组
   */
  getDIF(ema12: string | any[], ema26: number[]) {
    const dif: number[] = []
    for (let i = 0; i < ema12.length; i++) {
      dif.push(ema12[i] - ema26[i])
    }
    return dif
  }
  /**
   * 计算MACD柱（BAR）
   * @param {Array} dif DIF数组
   * @param {Array} dea DEA数组
   */
  getHistogram(dif: string | any[], dea: number[]) {
    const histogram: number[] = []
    for (let i = 0; i < dif.length; i++) {
      histogram.push(2 * (dif[i] - dea[i]))
    }
    return histogram
  }
  /**
   * 计算MA（移动平均线）
   * @param {Number} dayCount 移动平均的天数
   * @param {Array} data 原始数据
   */
  calculateMA(
    dayCount: number,
    data: {
      categoryData?: string[]
      values: any
      volumes?: number[][]
      dif?: number[]
      dea?: number[]
      histogram?: number[]
    }
  ) {
    var result: (string | number)[] = []
    for (var i = 0, len = data.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-')
        continue
      }
      var sum = 0
      for (var j = 0; j < dayCount; j++) {
        sum += data.values[i - j][1]
      }
      result.push(+(sum / dayCount).toFixed(3))
    }
    return result
  }
  splitData(rawData: number[][] | string[][]) {
    let categoryData: string[] = []
    let values: number[][] = []
    let volumes: number[][] = []
    // 收盘价列表
    let closePrices = (rawData as string[][]).map((item: string[]) => parseFloat(item[2]))

    const { dif, dea, histogram } = this.calculateMACD(closePrices)
    // 遍历数据，将其转换为 K 线图所需的数据格式
    for (let i = 0; i < rawData.length; i++) {
      categoryData.push(String(rawData[i].splice(0, 1)[0]))
      values.push(
        (rawData[i] as (string | number)[]).map((item: string | number) =>
          typeof item === 'string' ? parseFloat(item) : item
        )
      )
      volumes.push([i, parseFloat(rawData[i][4] as string), rawData[i][0] > rawData[i][1] ? 1 : -1])
    }
    return {
      categoryData,
      values,
      volumes,
      dif,
      dea,
      histogram
    }
  }

  getCandlestick(sourceData) {
    let data = this.splitData(sourceData)
    return {
      animation: false,
      legend: {
        top: 10,
        left: 'center',
        data: ['Volume', 'Volume', 'MA5', 'MA10', 'MA20', 'MA30', 'MA60', 'MA120', 'MA240'],
        itemStyle: {
          opacity: 0 // 图例图标完全透明
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
          const obj = {
            top: 10
          }
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
          return obj
        }
        // extraCssText: 'width: 170px'
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: 'all'
          }
        ],
        label: {
          backgroundColor: '#666'
        }
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false
          },
          brush: {
            type: ['lineX', 'clear']
          }
        }
      },
      visualMap: {
        show: false,
        seriesIndex: [0, 1], // 对应series的index
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: Stock.downColor
          },
          {
            value: -1,
            color: Stock.upColor
          }
        ]
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '30%'
        },
        {
          left: '10%',
          right: '8%',
          top: '40%',
          height: '15%'
        },
        {
          left: '10%',
          right: '8%',
          top: '55%',
          height: '15%'
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: data.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        },
        {
          type: 'category',
          gridIndex: 1,
          data: data.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax'
        },
        {
          type: 'category',
          gridIndex: 2,
          data: data.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax'
        }
      ],
      yAxis: [
        {
          scale: true,
          gridIndex: 0,
          splitArea: {
            show: true
          }
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false }
        },
        {
          scale: true,
          gridIndex: 2,
          splitLine: { show: false },
          splitNumber: 4
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 0,
          end: 100
        },
        {
          type: 'inside',
          xAxisIndex: [1, 2],
          start: 0,
          end: 100
        }
        // {
        //   type: 'inside',
        //   xAxisIndex: [0, 1],
        //   start: 98,
        //   end: 100
        // },
      ],
      series: [
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.volumes
        },
        // MACD-DIF（快线）
        {
          type: 'line',
          symbol: 'none', // 关键配置：隐藏数据点
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: data.dif,
          smooth: true,
          lineStyle: { color: '#FF9800' }
        },
        // MACD-DEA（慢线）
        {
          type: 'line',
          symbol: 'none', // 关键配置：隐藏数据点
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: data.dea,
          smooth: true,
          lineStyle: { color: '#666' }
        },
        // MACD柱状图（红涨绿跌）
        {
          type: 'bar',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: data.histogram.map((item) => ({
            value: item,
            itemStyle: {
              color: item > 0 ? Stock.upColor : Stock.downColor
            }
          }))
        },
        {
          name: 'Dow-Jones index',
          type: 'candlestick',
          data: data.values,
          itemStyle: {
            color: Stock.upColor,
            color0: Stock.downColor,
            borderColor: undefined,
            borderColor0: undefined
          }
        },
        {
          name: 'MA5',
          type: 'line',
          symbol: 'none', // 关键配置：隐藏数据点
          data: stockInstance.calculateMA(5, data),
          smooth: true,
          lineStyle: {
            opacity: 0.3
          }
        },
        {
          name: 'MA10',
          type: 'line',
          symbol: 'none', // 关键配置：隐藏数据点
          data: stockInstance.calculateMA(10, data),
          smooth: true,
          lineStyle: {
            opacity: 0.3
          }
        },
        {
          name: 'MA20',
          type: 'line',
          symbol: 'none', // 关键配置：隐藏数据点
          data: stockInstance.calculateMA(20, data),
          smooth: true,
          lineStyle: {
            opacity: 0.3
          }
        },
        {
          name: 'MA30',
          type: 'line',
          symbol: 'none', // 关键配置：隐藏数据点
          data: stockInstance.calculateMA(30, data),
          smooth: true,
          lineStyle: {
            opacity: 0.3
          }
        },
        {
          name: 'MA60',
          type: 'line',
          symbol: 'none', // 关键配置：隐藏数据点
          data: stockInstance.calculateMA(60, data),
          smooth: true,
          lineStyle: {
            opacity: 0.3
          }
        },
        {
          name: 'MA120',
          type: 'line',
          symbol: 'none', // 关键配置：隐藏数据点
          data: stockInstance.calculateMA(120, data),
          smooth: true,
          lineStyle: {
            opacity: 0.3
          }
        },
        {
          name: 'MA240',
          type: 'line',
          symbol: 'none', // 关键配置：隐藏数据点
          data: stockInstance.calculateMA(240, data),
          smooth: true,
          lineStyle: {
            opacity: 0.3
          }
        }
      ]
    }
  }
}

const stockInstance = new Stock()

export default stockInstance
