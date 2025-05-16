import './StockInfo.css'

function StockInfo({ data }) {
  const currency = data.price_currency
  const stockPriceChange = data.close - data.open
  const changePercent = (stockPriceChange / data.open) * 100

  return (
    <div className="stock-info">
      <h2>{data.name} ({data.symbol})</h2>
      <div className="info-grid">
        <div className="info-item">
          <div className="info-label">Цена</div>
          <div>{data.close.toFixed(2)} {currency}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Изменение</div>
          <div style={{ color: stockPriceChange >= 0 ? 'green' : 'red' }}>
            {stockPriceChange >= 0 ? '+' : ''}{stockPriceChange.toFixed(2)} 
            ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
          </div>
        </div>
        <div className="info-item">
          <div className="info-label">Открытие</div>
          <div>{data.open.toFixed(2)} {currency}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Максимум</div>
          <div>{data.high.toFixed(2)} {currency}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Минимум</div>
          <div>{data.low.toFixed(2)} {currency}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Объем</div>
          <div>{data.volume.toLocaleString()}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Биржа</div>
          <div>{data.exchange_code}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Дата</div>
          <div>{new Date(data.date).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

export default StockInfo