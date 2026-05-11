import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  QrCode,
  MapPin,
  Clock,
  CheckCircle,
  Copy,
  ExternalLink,
  Mail,
} from 'lucide-react';
import Header from '../../components/Header/Header';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from './ContactPage.module.css';

const PHONE = '400-888-8888';
const WECHAT = 'bandao-jinrong';
const ADDRESS = '山东省青岛市黄岛区长江中路XX号半岛金融中心';
const HOURS = '周一至周五 09:00-18:00';

export default function ContactPage() {
  const [copied, setCopied] = useState('');

  const handleCall = () => {
    window.location.href = `tel:${PHONE}`;
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* 页面标题区 */}
        <div className={styles.hero}>
          <div className={styles.heroAvatar}>
            <MessageCircle size={32} strokeWidth={1.5} />
          </div>
          <h1 className={styles.heroTitle}>联系我们</h1>
          <p className={styles.heroSubtitle}>房抵易融专业贷款顾问团队</p>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>
              <CheckCircle size={12} strokeWidth={2} />
              正规资质
            </span>
            <span className={styles.heroBadge}>
              <CheckCircle size={12} strokeWidth={2} />
              专业可靠
            </span>
            <span className={styles.heroBadge}>
              <CheckCircle size={12} strokeWidth={2} />
              极速响应
            </span>
          </div>
        </div>

        {/* 联系方式卡片 */}
        <motion.div
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className={styles.sectionTitle}>快捷联系</h2>

          {/* 电话 */}
          <div className={styles.contactCard} onClick={handleCall}>
            <div className={styles.contactIcon} style={{ background: 'rgba(82,196,26,0.1)', color: '#52C41A' }}>
              <Phone size={20} strokeWidth={2} />
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>客服热线</span>
              <span className={styles.contactValue}>{PHONE}</span>
            </div>
            <div className={styles.contactAction}>
              <Phone size={18} strokeWidth={2} style={{ color: '#52C41A' }} />
            </div>
          </div>

          {/* 微信 */}
          <div className={styles.contactCard} onClick={() => handleCopy(WECHAT, 'wechat')}>
            <div className={styles.contactIcon} style={{ background: 'rgba(82,196,26,0.1)', color: '#52C41A' }}>
              <MessageCircle size={20} strokeWidth={2} />
            </div>
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>微信公众号</span>
              <span className={styles.contactValue}>{WECHAT}</span>
            </div>
            <div className={styles.contactAction}>
              <span className={styles.copyTag}>{copied === 'wechat' ? '已复制' : '复制'}</span>
            </div>
          </div>
        </motion.div>

        {/* 二维码区域 */}
        <motion.div
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.sectionTitle}>扫码关注</h2>
          <div className={styles.qrCards}>
            {/* 公众号二维码 */}
            <div className={styles.qrCard}>
              <div className={styles.qrPlaceholder}>
                <QrCode size={56} strokeWidth={1.5} style={{ color: 'var(--primary)' }} />
              </div>
              <p className={styles.qrLabel}>微信公众号</p>
              <p className={styles.qrHint}>长按识别关注，获取最新贷款资讯</p>
            </div>

            {/* 进件助手二维码 */}
            <div className={styles.qrCard}>
              <div className={styles.qrPlaceholder}>
                <QrCode size={56} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
              </div>
              <p className={styles.qrLabel}>进件助手</p>
              <p className={styles.qrHint}>扫码进入在线申请通道</p>
            </div>
          </div>
        </motion.div>

        {/* 联系信息 */}
        <motion.div
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={styles.sectionTitle}>详细信息</h2>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <MapPin size={16} strokeWidth={2} style={{ color: 'var(--primary)' }} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>公司地址</span>
                <span className={styles.infoValue}>{ADDRESS}</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Clock size={16} strokeWidth={2} style={{ color: 'var(--primary)' }} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>工作时间</span>
                <span className={styles.infoValue}>{HOURS}</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Mail size={16} strokeWidth={2} style={{ color: 'var(--primary)' }} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>电子邮箱</span>
                <span className={styles.infoValue}>contact@bandao-jinrong.com</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 服务承诺 */}
        <motion.div
          className={styles.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={styles.sectionTitle}>服务承诺</h2>
          <div className={styles.promises}>
            <div className={styles.promise}>
              <CheckCircle size={18} strokeWidth={2} style={{ color: 'var(--success)' }} />
              <span>严格保护客户隐私信息安全</span>
            </div>
            <div className={styles.promise}>
              <CheckCircle size={18} strokeWidth={2} style={{ color: 'var(--success)' }} />
              <span>所有产品均为正规银行官方产品</span>
            </div>
            <div className={styles.promise}>
              <CheckCircle size={18} strokeWidth={2} style={{ color: 'var(--success)' }} />
              <span>免费咨询，不收取任何中介费用</span>
            </div>
            <div className={styles.promise}>
              <CheckCircle size={18} strokeWidth={2} style={{ color: 'var(--success)' }} />
              <span>专业顾问1对1服务，全程跟进</span>
            </div>
          </div>
        </motion.div>

        <div style={{ height: 'calc(var(--bottom-nav-height) + var(--safe-bottom) + 32px)' }} />
      </main>

      <BottomNav />
    </div>
  );
}
