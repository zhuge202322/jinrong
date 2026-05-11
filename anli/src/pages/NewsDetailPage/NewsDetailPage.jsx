import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Calendar, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getNewsById } from '../../data/news';
import { wechatUtils } from '../../utils/wechat';
import styles from './NewsDetailPage.module.css';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = getNewsById(id);

  const handleShare = () => {
    if (wechatUtils.isWeChat) {
      wechatUtils.setShareData({
        title: news?.title,
        desc: news?.summary,
      });
    } else {
      if (navigator.share) {
        navigator.share({ title: news.title, text: news.summary, url: window.location.href });
      } else {
        navigator.clipboard.writeText(window.location.href);
      }
    }
  };

  if (!news) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
          <span className={styles.headerTitle}>文章详情</span>
          <div style={{ width: 40 }} />
        </div>
        <div className={styles.notFound}>文章不存在或已被删除</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* 顶部导航 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
        <span className={styles.headerTitle}>资讯详情</span>
        <button className={styles.shareBtn} onClick={handleShare}>
          <Share2 size={18} strokeWidth={2} />
        </button>
      </div>

      {/* 文章内容 */}
      <motion.div
        className={styles.article}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* 文章头部 */}
        <div className={styles.articleHeader}>
          <span className={styles.categoryTag}>{news.category}</span>
          <h1 className={styles.articleTitle}>{news.title}</h1>
          <div className={styles.articleMeta}>
            <span className={styles.metaItem}>
              <Calendar size={12} strokeWidth={2} />
              {news.date}
            </span>
            <span className={styles.metaItem}>
              <Eye size={12} strokeWidth={2} />
              {news.views.toLocaleString()} 阅读
            </span>
          </div>
        </div>

        {/* 文章正文 */}
        <div
          className={styles.articleBody}
          dangerouslySetInnerHTML={{
            __html: news.content
              .trim()
              .split('\n\n')
              .map((p) => {
                const trimmed = p.trim();
                if (!trimmed) return '';
                if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                  return `<h3>${trimmed.replace(/\*\*/g, '')}</h3>`;
                }
                if (trimmed.startsWith('- ') || trimmed.startsWith('1.') || /^\d+\./.test(trimmed)) {
                  const items = trimmed.split('\n').filter(Boolean);
                  return `<ul>${items.map((item) => `<li>${item.replace(/^[-\d.]+\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('')}</ul>`;
                }
                if (trimmed.startsWith('|')) {
                  return trimmed;
                }
                return `<p>${trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
              })
              .join(''),
          }}
        />
      </motion.div>

      {/* 底部 */}
      <div style={{ height: 'calc(var(--bottom-nav-height) + var(--safe-bottom) + 32px)' }} />
    </div>
  );
}
