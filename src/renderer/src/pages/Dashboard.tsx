import { useState } from 'react';
import SearchBar from '@components/SearchBar'
import StockChart from '@components/StockChart'


export default function Dashboard() {

  const [selectedStock, setSelectedStock] = useState(null);

  return (
    <div>
      <SearchBar onSelect={setSelectedStock} />
      {selectedStock && <StockChart data={selectedStock} />}
    </div>
  );
}

