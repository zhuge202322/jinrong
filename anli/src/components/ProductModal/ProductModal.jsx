import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, ArrowRight } from 'lucide-react';
import { formatAmount } from '../../utils/helpers';
import styles from './ProductModal.module.css';

export default function ProductModal({ product, open, onClose, onApply }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.panel}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* 顶部 */}
            <div className={styles.header}>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={20} strokeWidth={2} />
              </button>
              <span className={styles.headerTitle}>{product.name}</span>
              <div style={{ width: 36 }} />
            </div>

            {/* 内容 */}
            <div className={styles.content}>
              {/* 亮点 */}
              <div className={styles.highlight}>{product.highlight}</div>

              {/* 核心数据 */}
              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>额度范围</span>
                  <span className={styles.statValue}>
                    {formatAmount(product.amountMin)}~{formatAmount(product.amountMax)}
                  </span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>利率范围</span>
                  <span className={styles.statValue}>
                    {product.rateMin}%~{product.rateMax}%
                  </span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>最长期限</span>
                  <span className={styles.statValue}>{product.term}</span>
                </div>
              </div>

              {/* 准入门槛 */}
              <div className={styles.section}>
                <div className={styles.sectionLabel}>准入门槛</div>
                <div className={styles.threshold}>{product.threshold}</div>
              </div>

              {/* 基本条件 */}
              <div className={styles.section}>
                <div className={styles.sectionLabel}>基本条件</div>
                <ul className={styles.conditions}>
                  {product.conditions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 底部按钮 */}
            <div className={styles.footer}>
              <button className={styles.footerBtn} onClick={() => onApply(product)}>
                <QrCode size={18} strokeWidth={2} />
                扫码拿码进件
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
