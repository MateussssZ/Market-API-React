import { useState } from 'react'
import { SiteAPI } from './fetcher'
import CurrencyList from './components/CurrencyList/CurrencyList'
import ExchangeSelector from './components/ExchangeSelector/ExchangeSelector'
import Watchlist from './components/Watchlist/Watchlist';
import PriceChart from './components/PriceChart/PriceChart';
import StockInfo from './components/StockInfo/StockInfo'
import './App.css'

const API = new SiteAPI()

function App() {
  const [showTickerSearch, setShowTickerSearch] = useState(false)
  const [showStockInfo, setShowStockInfo] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true); // Для мобильной версии
  const [errorMessage, setErrorMessage] = useState('')  
  const [stockData, setStockData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleExchangeChange = (value) => {
    setShowTickerSearch(!!value)
    setShowStockInfo(false)
  }

  const handleSearch = async (ticker, exchange) => {
    if (!ticker) {
      setErrorMessage('Пожалуйста, введите тикер акции')
      return
    }

    setErrorMessage('')
    setIsLoading(true)
    setShowStockInfo(false)

    try {
      const data = await API.fetchStock(ticker, exchange)
      setStockData(data)
      setShowStockInfo(true)
    } catch (error) {
      setErrorMessage(error.message || 'Произошла ошибка при поиске акции')
      console.error('Ошибка поиска акции:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <button 
        className="mobile-menu-button"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? 'Скрыть валюты' : 'Показать валюты'}
      </button>
      <div className={`sidebar ${!showSidebar ? 'hidden-on-mobile' : ''}`}>
        <h2>Доступные валюты для торга</h2>
        <CurrencyList />
      </div>
      
      <div className="main-content">
        <h1>Финансовый дашборд</h1>
        
        <ExchangeSelector 
          onExchangeChange={handleExchangeChange}
          onSearch={handleSearch}
          showTickerSearch={showTickerSearch}
          errorMessage={errorMessage}
          isLoading={isLoading}
        />
        
        {showStockInfo && stockData && <StockInfo data={stockData} />}
        <PriceChart symbol={stockData?.symbol} exchange={stockData?.exchange_code} />
        <Watchlist />
      </div>
    </div>
  )
}

export default App