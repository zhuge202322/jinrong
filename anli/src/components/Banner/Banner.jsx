import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BANNERS } from '../../data/products';
import styles from './Banner.module.css';

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const total = BANNERS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const next = () => setCurrent((prev) => (prev + 1) % total);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className={styles.slide}
            style={{ background: BANNERS[current].bgColor }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className={styles.content}>
              <h2 className={styles.title}>{BANNERS[current].title}</h2>
              <p className={styles.subtitle}>{BANNERS[current].subtitle}</p>
              <div className={styles.decor}>
                <span className={styles.decorText}>房抵易融</span>
              </div>
            </div>
            <div className={styles.decorCircle} />
            <div className={styles.decorCircle2} />
          </motion.div>
        </AnimatePresence>

        {/* 箭头控制 */}
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="上一个">
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="下一个">
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>

        {/* 指示器 */}
        <div className={styles.dots}>
          {BANNERS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`第${i + 1}个`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
