/**
 * 通用工具函数
 */

/**
 * 格式化金额显示
 * @param {number} amount - 金额（万元）
 */
export const formatAmount = (amount) => {
  if (amount >= 100) {
    return `最高${amount}万`;
  }
  return `${amount}万`;
};

/**
 * 格式化利率显示
 * @param {number} rate - 利率（%）
 */
export const formatRate = (rate) => {
  return `${rate.toFixed(1)}%`;
};

/**
 * 获取利率对应的颜色
 * @param {number} rate - 利率（%）
 */
export const getRateColor = (rate) => {
  if (rate < 4.0) return 'var(--success)';
  if (rate < 6.0) return 'var(--primary)';
  if (rate < 8.0) return 'var(--accent)';
  return 'var(--danger)';
};

/**
 * 获取分类标签颜色
 * @param {string} categoryId
 */
export const getCategoryColor = (categoryId) => {
  const colors = {
    fdjyd: { bg: 'rgba(0,82,217,0.1)', text: '#0052D9' },
    fdxfd: { bg: 'rgba(82,196,26,0.1)', text: '#52C41A' },
    fday: { bg: 'rgba(245,166,35,0.1)', text: '#F5A623' },
    cdd: { bg: 'rgba(255,77,79,0.1)', text: '#FF4D4F' },
    qydke: { bg: 'rgba(9,109,217,0.1)', text: '#095CD9' },
    zkxdg: { bg: 'rgba(133,73,226,0.1)', text: '#8549E2' },
    gjjxf: { bg: 'rgba(250,140,22,0.1)', text: '#FA8C16' },
  };
  return colors[categoryId] || { bg: 'rgba(0,0,0,0.05)', text: '#666' };
};

/**
 * 防抖函数
 */
export const debounce = (fn, delay = 300) => {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * 节流函数
 */
export const throttle = (fn, delay = 300) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
};

/**
 * 生成唯一ID
 */
export const generateId = () => {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
};

/**
 * 本地存储封装
 */
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('localStorage set failed:', e);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('localStorage remove failed:', e);
    }
  },
};

/**
 * 判断是否为空
 */
export const isEmpty = (value) => {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};
