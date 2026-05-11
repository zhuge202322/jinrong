import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatAmount } from '../../utils/helpers';
import styles from './ProductCard.module.css';

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const PROGRESS_COLORS = [
  '#C8860A', '#D99B1E', '#C8860A', '#E07B39',
  '#8549E2', '#0A7D6C', '#E07B39', '#2EAE5C',
  '#C56A2D', '#EB2F96',
];

const TAG_CLASSES = {
  blue: styles.tagBlue,
  green: styles.tagGreen,
  orange: styles.tagOrange,
  red: styles.tagRed,
  purple: styles.tagPurple,
};

const TAG_COLOR_MAP = {
  房抵: 'blue', 经营贷: 'blue', 大额: 'blue', 消费贷: 'blue',
  小微: 'green', 装修: 'green', 二抵: 'green',
  按竭二次: 'orange', 置换: 'orange',
  转贷: 'red',
  不押车: 'purple', 追加贷: 'purple', 快速: 'purple',
  信用贷: 'blue', 秒批: 'blue',
  对公: 'blue', 流动资金: 'green',
  专精特新: 'purple', 高新技术: 'purple', 政策贷: 'purple',
  成果转化: 'purple', 科技贷: 'purple',
  公积金: 'green', 先息后本: 'green', 车抵: 'orange',
};

function getTagClass(tag) {
  const color = TAG_COLOR_MAP[tag] || 'blue';
  return `${styles.tag} ${TAG_CLASSES[color]}`;
}

export default function ProductCard({ product, onApply, onDetails, index = 0 }) {
  const progressColor = PROGRESS_COLORS[index % PROGRESS_COLORS.length];
  const progressWidth = 30 + (index % 5) * 14;

  return (
    <motion.div
      className={styles.card}
      variants={item}
      initial="hidden"
      animate="show"
      onClick={() => onDetails(product)}
    >
      {/* 顶部：名称 + 标签 */}
      <div className={styles.top}>
        <div className={styles.productName}>{product.name}</div>
        <div className={styles.tags}>
          {product.tags && product.tags.map((tag) => (
            <span key={tag} className={getTagClass(tag)}>{tag}</span>
          ))}
        </div>
      </div>

      {/* 中间：亮点蓝底 */}
      <div className={styles.highlightBar}>
        <div className={styles.highlightText}>{product.highlight}</div>
      </div>

      {/* 底部：三个数据 */}
      <div className={styles.bottom}>
        <div className={styles.dataItem}>
          <span className={styles.dataLabel}>额度范围</span>
          <span className={styles.dataValue}>
            {formatAmount(product.amountMin)}~{formatAmount(product.amountMax)}
          </span>
        </div>
        <div className={styles.dataItem}>
          <span className={styles.dataLabel}>利率范围</span>
          <span className={styles.dataValueHighlight}>
            {product.rateMin}%~{product.rateMax}%
          </span>
        </div>
        <div className={styles.dataItem}>
          <span className={styles.dataLabel}>最长期限</span>
          <span className={styles.dataValueHighlight}>{product.term}</span>
        </div>
      </div>

      {/* 按钮 */}
      <div className={styles.actions}>
        <button
          className={styles.btnPrimary}
          onClick={(e) => { e.stopPropagation(); onApply(product); }}
        >
          扫码进件
        </button>
        <button
          className={styles.btnSecondary}
          onClick={(e) => { e.stopPropagation(); onDetails(product); }}
        >
          产品大纲 <ArrowRight size={13} strokeWidth={2.5} />
        </button>
      </div>

      {/* 底部进度条 */}
      <div className={styles.progressTrack}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressWidth}%`, background: progressColor }}
        />
      </div>
    </motion.div>
  );
}
