import { useState } from 'react';
import { parseStockData } from '../utils/common';

export default function SearchBar({ onSelect }: any) {
  const [input, setInput] = useState('sh603058,sz000981');

  const handleSearch = async () => {
    try {
      const response = await getStockList(`${input}`);
      console.log('Search result:', response.data);
      // 处理返回数据，这里需要根据实际API响应结构解析
      // const stockInfo = parseStockData(response.data);
      // onSelect(stockInfo);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入代码"
      />
      <button onClick={handleSearch}>搜索</button>
    </div>
  );
}
