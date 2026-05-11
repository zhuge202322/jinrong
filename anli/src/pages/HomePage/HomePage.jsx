import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, CheckCircle } from 'lucide-react';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductModal from '../../components/ProductModal/ProductModal';
import BottomNav from '../../components/BottomNav/BottomNav';
import { PRODUCTS, getProductsByCategory } from '../../data/products';
import styles from './HomePage.module.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyProduct, setApplyProduct] = useState(null);

  const products = useMemo(
    () => getProductsByCategory(activeCategory),
    [activeCategory]
  );

  const handleDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleApply = (product) => {
    setShowModal(false);
    setApplyProduct(product);
    setShowApplyModal(true);
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* 横幅轮播 */}
        <Banner />

        {/* 分类标签 */}
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        {/* 产品列表标题 */}
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>
            {activeCategory === 'all'
              ? '精选贷款产品'
              : `${products[0]?.categoryName || ''}贷款产品`}
          </h2>
          <span className={styles.listCount}>{products.length} 个产品</span>
        </div>

        {/* 产品列表 */}
        <div className={styles.productList}>
          <AnimatePresence mode="wait">
            {products.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onApply={handleApply}
                    onDetails={handleDetails}
                  />
                ))}
                <div className={styles.bottomTip}>
                  <CheckCircle size={13} strokeWidth={2} style={{ color: '#52C41A' }} />
                  <span>以上产品均为正规银行产品，信息仅供参考，以银行实际审批为准</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className={styles.empty}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={styles.emptyIcon}>
                  <QrCode size={40} strokeWidth={1.5} />
                </div>
                <p className={styles.emptyText}>该分类暂无产品</p>
                <p className={styles.emptySubtext}>更多产品正在陆续上线中</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 底部留白，避免被底部导航遮挡 */}
        <div style={{ height: 'calc(var(--bottom-nav-height) + var(--safe-bottom) + 20px)' }} />
      </main>

      {/* 产品大纲弹窗 */}
      <ProductModal
        product={selectedProduct}
        open={showModal}
        onClose={() => setShowModal(false)}
        onApply={handleApply}
      />

      {/* 拿码进件弹窗 */}
      <AnimatePresence>
        {showApplyModal && applyProduct && (
          <>
            <motion.div
              className={styles.applyBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowApplyModal(false)}
            />
            <motion.div
              className={styles.applyPanel}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className={styles.applyHandle} />
              <div className={styles.applyHeader}>
                <span className={styles.applyTitle}>扫码进件</span>
                <button
                  className={styles.applyClose}
                  onClick={() => setShowApplyModal(false)}
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
              <div className={styles.applyContent}>
                <div className={styles.applyProductName}>{applyProduct.name}</div>
                <div className={styles.applyBank}>{applyProduct.bank}</div>

                {/* 二维码区域 */}
                <div className={styles.qrSection}>
                  <div className={styles.qrPlaceholder}>
                    <div className={styles.qrCode}>
                      <QrCode size={80} strokeWidth={1.5} style={{ color: 'var(--primary)' }} />
                      <p className={styles.qrHint}>进件二维码</p>
                    </div>
                    <p className={styles.qrDesc}>
                      请使用微信扫描上方二维码<br />
                      或截图保存后微信扫一扫打开
                    </p>
                  </div>
                </div>

                {/* 操作说明 */}
                <div className={styles.applySteps}>
                  <div className={styles.applyStep}>
                    <span className={styles.stepNum}>1</span>
                    <span>长按识别上方二维码</span>
                  </div>
                  <div className={styles.applyStep}>
                    <span className={styles.stepNum}>2</span>
                    <span>进入银行官方申请页面</span>
                  </div>
                  <div className={styles.applyStep}>
                    <span className={styles.stepNum}>3</span>
                    <span>填写资料提交申请</span>
                  </div>
                </div>

                <div className={styles.applyNote}>
                  <CheckCircle size={14} strokeWidth={2} style={{ color: 'var(--success)', flexShrink: 0 }} />
                  <span>房抵易融全程服务，有疑问可联系客服</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
