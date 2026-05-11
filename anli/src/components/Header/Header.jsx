import { useNavigate } from 'react-router-dom';
import { Search, Menu, Building2 } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand} onClick={() => navigate('/')}>
          <div className={styles.logo}>
            <Building2 size={20} strokeWidth={2.5} />
          </div>
          <span className={styles.brandName}>房抵易融</span>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.actionBtn}
            onClick={() => navigate('/search')}
            aria-label="搜索"
          >
            <Search size={20} strokeWidth={2} />
          </button>
          <button
            className={styles.actionBtn}
            onClick={onMenuClick}
            aria-label="菜单"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
