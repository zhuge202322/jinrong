import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, X } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import BottomNav from '../../components/BottomNav/BottomNav';
import styles from './SearchPage.module.css';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showApply, setShowApply] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.highlight.toLowerCase().includes(q) ||
        p.bank.toLowerCase().includes(q)
    );
  }, [query]);

  const handleDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleApply = (product) => {
    setShowModal(false);
    setSelectedProduct(product);
    setShowApply(true);
  };

  return (
    <div className={styles.page}>
      {/* 搜索头部 */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
          <div className={styles.searchBox}>
            <Search size={16} strokeWidth={2} className={styles.searchIcon} />
            <input
              autoFocus
              type="search"
              className={styles.input}
              placeholder="搜索贷款产品..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className={styles.clearBtn} onClick={() => setQuery('')}>
                <X size={14} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 搜索结果 */}
      <div className={styles.content}>
        {query.trim() === '' ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <Search size={32} strokeWidth={1.5} />
            </div>
            <p className={styles.emptyText}>输入关键词搜索产品</p>
            <p className={styles.emptyHint}>支持产品名称、银行、特点等关键词</p>
          </div>
        ) : results.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <Search size={32} strokeWidth={1.5} />
            </div>
            <p className={styles.emptyText}>未找到相关产品</p>
            <p className={styles.emptyHint}>试试其他关键词</p>
          </div>
        ) : (
          <>
            <div className={styles.resultCount}>
              找到 <strong>{results.length}</strong> 个相关产品
            </div>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onApply={(p) => { setSelectedProduct(p); setShowApply(true); }}
                onDetails={handleDetails}
              />
            ))}
            <div style={{ height: 'calc(var(--bottom-nav-height) + var(--safe-bottom) + 16px)' }} />
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
