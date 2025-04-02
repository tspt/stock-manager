// import { useEffect, useRef } from 'react';
// import ReactECharts from 'echarts-for-react';
// import echarts from '@/lib/echart-core';

// ReactECharts.echarts = echarts;

// const StockChart = ({ option, style, loading }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       chartInstance.current = echarts.init(chartRef.current);
//     }

//     const handleResize = () => {
//       chartInstance.current?.resize();
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       chartInstance.current?.dispose();
//     };
//   }, []);

//   useEffect(() => {
//     if (chartInstance.current && option) {
//       if (loading) {
//         chartInstance.current.showLoading();
//       } else {
//         chartInstance.current.hideLoading();
//         chartInstance.current.setOption(option);
//       }
//     }
//   }, [option, loading]);

//   return <div ref={chartRef} style={{ width: '100%', ...style }} />;
// };

// // 默认 props
// StockChart.defaultProps = {
//   style: { height: 400 },
//   loading: false
// };

// export default StockChart;

import { forwardRef } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import echarts from '@/lib/echarts-core';

const StockChart = forwardRef<ReactEChartsCore, EchartsWrapperProps>(
  ({ option, style = { height: 400 }, ...props }, ref) => {
    return (
      <ReactEChartsCore
        ref={ref}
        echarts={echarts}
        option={option}
        style={style}
        opts={{ renderer: 'canvas' }}
        notMerge={true}
        {...props}
      />
    );
  }
);

StockChart.displayName = 'StockChart';

export default StockChart;
