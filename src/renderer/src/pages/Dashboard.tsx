import { useState, useEffect } from 'react'
import { Button, List } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Chart from '@/components/common/Chart'
import { stockInstance } from '@/utils/stock'
import { getStockList, getStockTimeShare, getStockCandlestick } from '../api/stock';

const Dashboard = () => {

  const [option, setOption] = useState({
    title: { text: 'Loading...' }
  });

  // 可配置的股票代码列表
  const stockCodes = [
    "sh000001",
    "sh603058",
    "sz000981",
    "sz300129",
    "sz301559",
    "sz002799",
    "sz000927",
    "sh600869",
    "sz002820",

    // 其他
    "sz000753",
    "sh600280",
    "sh603366",
    "sz002127",
    "sz002177",
    "sz002321",
    "sz000620",
    "sz000727",
    "sz002146",
    "sz000016",
    "sz002256",
    "sz002495",
    "sz300110",
    "sz300080",
    "sh600468",
    "sh600533",
    "sh601388",
  ]

  const [stockList, setStockList] = useState([
    {
      "code": "sh603058",
      "name": "永吉股份",
      "price": 8.18,
      "rate": "-0.85"
    },
    {
      "code": "sz000981",
      "name": "山子高科",
      "price": 2.01,
      "rate": "-0.50"
    },
    {
      "code": "sz300129",
      "name": "泰胜风能",
      "price": 7.09,
      "rate": "-2.34"
    },
    {
      "code": "sz301559",
      "name": "中集环科",
      "price": 16.65,
      "rate": "0.60"
    },
    {
      "code": "sz002799",
      "name": "环球印务",
      "price": 7.53,
      "rate": "-0.26"
    },
    {
      "code": "sz000927",
      "name": "中国铁物",
      "price": 2.56,
      "rate": "1.59"
    },
    {
      "code": "sh600869",
      "name": "远东股份",
      "price": 4.8,
      "rate": "-2.04"
    },
    {
      "code": "sz002820",
      "name": "桂发祥",
      "price": 10.65,
      "rate": "1.43"
    },
    {
      "code": "sz000753",
      "name": "漳州发展",
      "price": 5.52,
      "rate": "0.00"
    },
    {
      "code": "sh600280",
      "name": "中央商场",
      "price": 3.46,
      "rate": "2.06"
    },
    {
      "code": "sh603366",
      "name": "日出东方",
      "price": 10.07,
      "rate": "-6.24"
    },
    {
      "code": "sz002127",
      "name": "南极电商",
      "price": 3.89,
      "rate": "-0.51"
    },
    {
      "code": "sz002177",
      "name": "御银股份",
      "price": 4.39,
      "rate": "0.23"
    },
    {
      "code": "sz002321",
      "name": "华英农业",
      "price": 2.4,
      "rate": "2.56"
    },
    {
      "code": "sz000620",
      "name": "新华联",
      "price": 1.69,
      "rate": "-0.59"
    },
    {
      "code": "sz000727",
      "name": "冠捷科技",
      "price": 2.69,
      "rate": "-0.74"
    },
    {
      "code": "sz002146",
      "name": "荣盛发展",
      "price": 1.49,
      "rate": "0.68"
    },
    {
      "code": "sz000016",
      "name": "深康佳Ａ",
      "price": 4.55,
      "rate": "0.00"
    },
    {
      "code": "sz002256",
      "name": "兆新股份",
      "price": 2.32,
      "rate": "0.43"
    },
    {
      "code": "sz002495",
      "name": "佳隆股份",
      "price": 2.43,
      "rate": "2.53"
    },
    {
      "code": "sz300110",
      "name": "华仁药业",
      "price": 3.25,
      "rate": "2.20"
    },
    {
      "code": "sz300080",
      "name": "易成新能",
      "price": 3.79,
      "rate": "-0.26"
    },
    {
      "code": "sh600468",
      "name": "百利电气",
      "price": 4.82,
      "rate": "-2.23"
    },
    {
      "code": "sh600533",
      "name": "栖霞建设",
      "price": 2.2,
      "rate": "0.92"
    },
    {
      "code": "sh601388",
      "name": "怡球资源",
      "price": 2.64,
      "rate": "10.00"
    }
  ]); // 股票列表
  const [stockCode, setStockCode] = useState(''); // 股票代码

  // 获取股票列表数据
  const getStockListData = async (code) => {
    try {
      const response = await getStockList({ code: code.join(',') });
      setStockList(response.data.data);
    } catch (error) {
      console.error('getStockList failed:', error);
    }
  };

  // 获取股票分时数据
  const getStockTimeShareData = async (code) => {
    try {
      const response = await getStockTimeShare({ code: code });
      setStockList(response.data.data);
    } catch (error) {
      console.error('getStockTimeShare failed:', error);
    }
  };


  // useEffect(() => {
  //   // 定时更新股票数据
  //   const interval = setInterval(() => getStockListData(stockCodes), 100000000);
  //   getStockListData(stockCodes); // 初始加载
  //   return () => clearInterval(interval); // 清理定时器
  // }, []);

  getStockCandlestick({
    type: 'day',
    code: 'sh603058',
  });

  // useEffect(() => {
  //   // 定时更新股票数据
  //   const interval = setInterval(() => getStockTimeShareData(stockCode), 100000000);
  //   getStockTimeShareData(stockCode); // 初始加载

  //   // setOption(newOption);
  //   return () => clearInterval(interval); // 清理定时器
  // }, []);

  return (
    <div className='stock-container'>
      <div className='stock-left-part'>
        <div className='flex-center stock-left-top'>
          <Button className='font20 mgl-10 mgr-10' type="text"><PlusOutlined /></Button>
          <Button className='font20 mgl-10 mgr-10' type="text"><EditOutlined /></Button>
          {/* <Button className='font20 mgl-10 mgr-10' type="text"><DeleteOutlined /></Button> */}
        </div>
        <List
          dataSource={stockList}
          renderItem={(item: StockData) => (
            <List.Item className={item.rate > 0 ? 'up-status' : (item.rate < 0 ? 'down-status' : '')}>
              <div className='stock-name'>{item.name}</div>
              <div className='stock-price'>{item.price}</div>
              <div className='stock-rate'>{item.rate > 0 ? '+' + item.rate : item.rate}%</div>
            </List.Item>
          )}
        />
      </div>
      <div className='stock-right-part'>
        {/* <SearchBar onSelect={setSelectedStock} /> */}
        <Chart
          option={option}
          style={{ height: '60vh' }}
          onEvents={{
            click: (params: any) => {
              console.log('Chart clicked:', params);
            }
          }}
        />
      </div>

      {/* {selectedStock && <Chart data={selectedStock} />} */}

      {/* <Chart
        option={yourOption}
        style={{ height: 500 }}
        loading={isLoading}
      /> */}


    </div>
  )
}

export default Dashboard
