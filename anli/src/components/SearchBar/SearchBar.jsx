import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { storage } from '../../utils/helpers';
import styles from './SearchBar.module.css';

const HOT_SEARCH = ['公积金贷款', '信用贷', '按揭房贷款', '学历贷', '秒批', '低利率'];

export default function SearchBar({ autoFocus = false }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const history = storage.get('search_history', []);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSearch = (keyword) => {
    const kw = keyword.trim();
    if (!kw) return;
    const newHistory = [kw, ...history.filter((h) => h !== kw)].slice(0, 10);
    storage.set('search_history', newHistory);
    navigate(`/search?q=${encodeURIComponent(kw)}`);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setValue(val);
    if (val.length > 0) {
      setShowHistory(false);
      const matches = PRODUCTS.filter(
        (p) =>
          p.name.includes(val) ||
          p.tags.some((t) => t.includes(val)) ||
          p.highlight.includes(val)
      ).map((p) => ({ id: p.id, name: p.name, category: p.category }));
      setSuggestions(matches.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  const clearHistory = () => {
    storage.remove('search_history');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <Search size={18} strokeWidth={2} className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder="搜索贷款产品..."
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
        />
        {value && (
          <button className={styles.clearBtn} onClick={() => { setValue(''); setSuggestions([]); }} aria-label="清除">
            <X size={16} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* 搜索建议 */}
      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map((s) => (
            <button
              key={s.id}
              className={styles.suggestionItem}
              onClick={() => navigate(`/search?q=${encodeURIComponent(s.name)}`)}
            >
              <Search size={14} strokeWidth={2} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* 历史记录和热门搜索 */}
      {showHistory && suggestions.length === 0 && (
        <div className={styles.dropdown}>
          {history.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Clock size={14} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
                <span>搜索历史</span>
                <button className={styles.clearHistory} onClick={clearHistory}>清除</button>
              </div>
              <div className={styles.historyTags}>
                {history.map((h) => (
                  <button
                    key={h}
                    className={styles.historyTag}
                    onClick={() => handleSearch(h)}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <TrendingUp size={14} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
              <span>热门搜索</span>
            </div>
            <div className={styles.historyTags}>
              {HOT_SEARCH.map((h) => (
                <button
                  key={h}
                  className={styles.historyTag}
                  onClick={() => handleSearch(h)}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
