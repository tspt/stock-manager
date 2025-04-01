import { useEffect, useRef } from 'react';
import echarts from '@/utils/echarts/chartConfig'; // 导入配置好的实例

const StockChart = ({ option, style, loading }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartInstance.current && option) {
      if (loading) {
        chartInstance.current.showLoading();
      } else {
        chartInstance.current.hideLoading();
        chartInstance.current.setOption(option);
      }
    }
  }, [option, loading]);

  return <div ref={chartRef} style={{ width: '100%', ...style }} />;
};

// 默认 props
StockChart.defaultProps = {
  style: { height: 400 },
  loading: false
};

export default StockChart;
