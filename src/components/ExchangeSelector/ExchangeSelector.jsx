import { useState } from 'react'
import './ExchangeSelector.css'

function ExchangeSelector({ onExchangeChange, onSearch, showTickerSearch, errorMessage, isLoading }) {
  const [ticker, setTicker] = useState('')
  const [exchange, setExchange] = useState('')

  const handleExchangeSelect = (e) => {
    const value = e.target.value
    setExchange(value)
    onExchangeChange(value)
  }

  const handleSearchClick = () => {
    onSearch(ticker, exchange)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(ticker, exchange)
    }
  }

  return (
    <div className="exchange-selector">
      <h2>Выберите биржу</h2>
      <select 
        id="exchangeSelect"
        value={exchange}
        onChange={handleExchangeSelect}
      >
        <option value="">-- Выберите биржу --</option>
        <option value="XNAS">NASDAQ</option>
        <option value="XNYS">NYSE</option>
        <option value="BATS">Электронная биржа BATS</option>
        <option value="XSHG">Шанхайская биржа</option>
      </select>
      
      {showTickerSearch && (
        <div className="ticker-search">
          <h3>Введите тикер акции</h3>
          <input 
            type="text" 
            id="tickerInput" 
            placeholder="Например: AAPL, MSFT, TSLA"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            id="searchButton" 
            onClick={handleSearchClick}
            disabled={isLoading}
          >
            {isLoading ? 'Поиск...' : 'Поиск'}
            {isLoading && <span className="loading"></span>}
          </button>
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
      )}
    </div>
  )
}

export default ExchangeSelector