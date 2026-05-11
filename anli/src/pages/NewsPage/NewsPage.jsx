import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, Newspaper } from 'lucide-react';
import Header from '../../components/Header/Header';
import BottomNav from '../../components/BottomNav/BottomNav';
import { NEWS_LIST } from '../../data/news';
import styles from './NewsPage.module.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function NewsPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* 页面标题 */}
        <div className={styles.pageHeader}>
          <div className={styles.headerIcon}>
            <Newspaper size={24} strokeWidth={2} />
          </div>
          <div>
            <h1 className={styles.pageTitle}>热门资讯</h1>
            <p className={styles.pageSubtitle}>贷款知识科普·产品推荐·政策解读</p>
          </div>
        </div>

        {/* 资讯列表 */}
        <motion.div
          className={styles.newsList}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {NEWS_LIST.map((news) => (
            <motion.div key={news.id} variants={item}>
              <Link to={`/news/${news.id}`} className={styles.newsCard}>
                <div className={styles.newsContent}>
                  <div className={styles.newsMeta}>
                    <span className={styles.categoryTag}>{news.category}</span>
                    <span className={styles.date}>{news.date}</span>
                  </div>
                  <h3 className={styles.newsTitle}>{news.title}</h3>
                  <p className={styles.newsSummary}>{news.summary}</p>
                  <div className={styles.newsFooter}>
                    <span className={styles.views}>
                      <Eye size={12} strokeWidth={2} />
                      {news.views.toLocaleString()} 阅读
                    </span>
                    <span className={styles.readMore}>
                      阅读全文 <ArrowRight size={12} strokeWidth={2} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ height: 'calc(var(--bottom-nav-height) + var(--safe-bottom) + 16px)' }} />
      </main>

      <BottomNav />
    </div>
  );
}
