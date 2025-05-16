import { useEffect, useState } from 'react'
import { SiteAPI } from '../../fetcher'
import './CurrencyList.css'

const API = new SiteAPI()

function CurrencyList() {
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await API.fetchCurrencyRate()
        setCurrencies(data)
      } catch (err) {
        setError('Ошибка загрузки курсов валют')
        console.error('Ошибка загрузки курсов валют:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrencies()
  }, [])

  if (loading) {
    return (
      <div className="currency-list">
        <div className="currency-item">
          <span>Загрузка...</span>
          <span className="loading"></span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="currency-list">
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <div className="currency-list">
      {currencies.map(currency => (
        <div key={currency.code} className="currency-item">
          <span>{currency.name} ({currency.code})</span>
        </div>
      ))}
    </div>
  )
}

export default CurrencyList