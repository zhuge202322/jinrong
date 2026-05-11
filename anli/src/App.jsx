import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import NewsPage from './pages/NewsPage/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage/NewsDetailPage';
import ContactPage from './pages/ContactPage/ContactPage';
import { wechatUtils } from './utils/wechat';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  useEffect(() => {
    // 尝试配置微信 JSSDK
    wechatUtils.config(
      { appId: '', signature: '', timestamp: 0, nonceStr: '' },
      () => {
        wechatUtils.setShareData({});
      },
      (err) => {
        console.warn('微信 JSSDK 配置失败:', err);
      }
    );
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
