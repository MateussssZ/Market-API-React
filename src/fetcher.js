const API_KEY = import.meta.env.VITE_API_KEY
const USE_FAKE_DATA = true; // Переключить на false для реального API

export class SiteAPI {
  BASE_URL = "https://api.marketstack.com/v2"

  async fetchCurrencyRate() {
    if (USE_FAKE_DATA) {
      return new Promise(resolve => {
        setTimeout(() => resolve([
          { code: "USD", name: "Доллар США" },
          { code: "EUR", name: "Евро" },
          { code: "GBP", name: "Фунт стерлингов" },
          { code: "JPY", name: "Японская иена" },
          { code: "CNY", name: "Китайский юань" },
          { code: "RUB", name: "Российский рубль" },
          { code: "BTC", name: "Биткоин" },
          { code: "ETH", name: "Эфириум" }
        ]), 800); // Имитация задержки сети
      });
    }

    try {
      const response = await fetch(`${this.BASE_URL}/currencies?access_key=${API_KEY}`)
      if (!response.ok) throw new Error('Сетевая ошибка')
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error('Ошибка загрузки курсов валют:', error)
      throw error
    }
  }

  async fetchStock(ticker, exchange) {
    if (USE_FAKE_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.2) { // 80% успешных запросов для имитации
            resolve({
              name: `${this.getRandomCompany()} Inc.`,
              symbol: ticker,
              exchange_code: exchange,
              price_currency: "USD",
              open: this.getRandomPrice(100, 200),
              high: this.getRandomPrice(200, 250),
              low: this.getRandomPrice(50, 100),
              close: this.getRandomPrice(100, 200),
              volume: Math.floor(Math.random() * 100000000),
              date: new Date().toISOString()
            });
          } else {
            reject(new Error('Фейковая ошибка: акция не найдена'));
          }
        }, 1000);
      });
    }

    try {
      const response = await fetch(
        `${this.BASE_URL}/tickers/${ticker}/eod/latest?access_key=${API_KEY}&exchange=${exchange}`
      )
      if (!response.ok) throw new Error('Сетевая ошибка')
      const data = await response.json()
      if (!data || !data.symbol) throw new Error('Акция не найдена')
      return data
    } catch (error) {
      console.error('Ошибка поиска акции:', error)
      throw error
    }
  }

  // Вспомогательные методы для генерации фейковых данных
  getRandomCompany() {
    const companies = ["Apple", "Microsoft", "Google", "Amazon", "Tesla", "Meta", "Nvidia", "Intel"];
    return companies[Math.floor(Math.random() * companies.length)];
  }

  getRandomPrice(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }
}