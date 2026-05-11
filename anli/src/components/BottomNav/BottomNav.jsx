import { NavLink } from 'react-router-dom';
import { Home, Newspaper, Phone, MessageCircle } from 'lucide-react';
import styles from './BottomNav.module.css';

const NAV_ITEMS = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/news', icon: Newspaper, label: '热门资讯' },
  { path: '/contact', icon: MessageCircle, label: '联系我们' },
];

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={styles.icon}
                />
                <span className={styles.label}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
