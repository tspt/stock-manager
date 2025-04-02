import { useState, useEffect } from 'react'
import { Divider, Button, List, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import SearchBar from '@/components/SearchBar'
import StockChart from '@/components/stock/StockChart'

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState(null)


  const [option, setOption] = useState({
    title: { text: 'Loading...' }
  });


  useEffect(() => {
    // 模拟异步数据获取
    setTimeout(() => {
      const newOption = {
        title: {
          text: '季度销售数据',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Q1', 'Q2', 'Q3', 'Q4']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'bar',
          data: [145, 210, 189, 245],
          name: '销售额'
        }]
      };
      setOption(newOption);
    }, 1000);
  }, []);

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
  ];

  return (
    <div className='stock-container'>
      <div className='stock-left-part'>
        <div className='flex-center stock-left-top'>
          <Button className='font20 mgl-10 mgr-10' type="text"><PlusOutlined /></Button>
          <Button className='font20 mgl-10 mgr-10' type="text"><EditOutlined /></Button>
          {/* <Button className='font20 mgl-10 mgr-10' type="text"><DeleteOutlined /></Button> */}
        </div>
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <div className='stock-name'>{item.stockName}</div>
              <div className='stock-price'>{item.price}</div>
              <div className='stock-rate'>{item.rate}</div>
              <Typography.Text className='font20'>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </div>
      <div className='stock-right-part'>
        <SearchBar onSelect={setSelectedStock} />
        <StockChart
          option={option}
          style={{ height: '60vh' }}
          onEvents={{
            click: (params: any) => {
              console.log('Chart clicked:', params);
            }
          }}
        />
      </div>

      {/* {selectedStock && <StockChart data={selectedStock} />} */}

      {/* <StockChart
        option={yourOption}
        style={{ height: 500 }}
        loading={isLoading}
      /> */}


    </div>
  )
}

export default Dashboard
