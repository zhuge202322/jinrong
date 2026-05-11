import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/products';
import { getCategoryColor } from '../../utils/helpers';
import { Grid3x3, Building2, Home, Landmark, Car, Briefcase, Cpu, Wallet } from 'lucide-react';
import styles from './CategoryTabs.module.css';

const ICON_MAP = {
  Grid3x3,
  Building2,
  Home,
  Landmark,
  Car,
  Briefcase,
  Cpu,
  Wallet,
};

export default function CategoryTabs({ active, onChange }) {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeBtn = container.querySelector(`[data-id="${active}"]`);
    if (!activeBtn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    setIndicatorStyle({
      width: btnRect.width,
      left: btnRect.left - containerRect.left + container.scrollLeft,
    });
  }, [active]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.scroll}>
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Grid3x3;
            const isActive = cat.id === active;
            const colorInfo = getCategoryColor(cat.id);

            return (
              <button
                key={cat.id}
                data-id={cat.id}
                className={`${styles.tab} ${isActive ? styles.active : ''}`}
                onClick={() => onChange(cat.id)}
                style={
                  isActive
                    ? {
                        background: colorInfo.bg,
                        color: colorInfo.text,
                        borderColor: colorInfo.text,
                      }
                    : {}
                }
              >
                <Icon size={14} strokeWidth={2} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
