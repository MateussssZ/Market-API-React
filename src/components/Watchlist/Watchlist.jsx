import { useState, useEffect } from 'react';
import './Watchlist.css';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [newTicker, setNewTicker] = useState('');

  // Загрузка избранного из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = () => {
    if (newTicker && !watchlist.includes(newTicker.toUpperCase())) {
      setWatchlist([...watchlist, newTicker.toUpperCase()]);
      setNewTicker('');
    }
  };

  const removeFromWatchlist = (ticker) => {
    setWatchlist(watchlist.filter(item => item !== ticker));
  };

  return (
    <div className="watchlist">
      <h3>Мои избранные акции</h3>
      <div className="watchlist-controls">
        <input
          type="text"
          value={newTicker}
          onChange={(e) => setNewTicker(e.target.value)}
          placeholder="Добавить тикер"
          onKeyPress={(e) => e.key === 'Enter' && addToWatchlist()}
        />
        <button onClick={addToWatchlist}>+</button>
      </div>
      <ul className="watchlist-items">
        {watchlist.map(ticker => (
          <li key={ticker}>
            <span>{ticker}</span>
            <button onClick={() => removeFromWatchlist(ticker)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Watchlist;