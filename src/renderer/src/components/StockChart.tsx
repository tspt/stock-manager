import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

export default function StockChart({ data }: any) {
  const options = {
    title: { text: data?.name },
    series: [{
      type: 'candlestick',
      name: '价格走势',
      data: data?.kline || []
    }],
    // 其他图表配置...
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  );
}

// const StockChart = ({ data }) => {
//   const options = {
//     title: { text: '股票走势' },
//     series: [
//       {
//         type: 'candlestick',
//         data: data.map((item) => [
//           new Date(item.trade_date).getTime(), // 时间戳
//           item.open,
//           item.high,
//           item.low,
//           item.close
//         ])
//       }
//     ]
//   }

//   return <HighchartsReact highcharts={Highcharts} options={options} />
// }

// export default StockChart

