"use client";

import { useState, useEffect } from 'react';
import { Eye, ArrowRight, Newspaper, ChevronLeft, Headphones, Share2 } from "lucide-react";

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNewsList(data);
        }
      })
      .catch(err => console.error("Failed to fetch news:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white h-14">
        <button className="p-1" onClick={() => window.history.back()}>
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-medium text-gray-900">热门资讯</h1>
          <div className="flex gap-1 mt-1">
            <div className="w-3 h-1 bg-[#DC0034] rounded-full"></div>
            <div className="w-1 h-1 bg-[#E7C154] rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1">
            <Headphones className="w-5 h-5 text-gray-800" />
          </button>
          <button className="p-1">
            <Share2 className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Page Header */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-[#DC0034] to-[#E7C154] text-white p-5 rounded-xl shadow-sm mb-6">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
            <Newspaper size={24} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-xl font-bold mb-1 tracking-wide">热门资讯</h1>
            <p className="text-xs opacity-90">贷款知识科普 · 产品推荐 · 政策解读</p>
          </div>
        </div>

        {/* News List */}
        <div className="space-y-4">
          {newsList.map((news) => (
            <a 
              key={news.id} 
              href={news.link || "#"}
              target={news.link ? "_blank" : "_self"}
              rel="noreferrer"
              className="block bg-white rounded-xl p-4 shadow-sm border border-gray-50 active:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded text-[#DC0034] bg-[#FDF3F5]">
                  {news.category}
                </span>
                <span className="text-[11px] text-gray-400">{news.date}</span>
              </div>
              <h3 className="text-[16px] font-bold text-gray-900 mb-2 leading-snug line-clamp-2">
                {news.title}
              </h3>
              <p className="text-[13px] text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                {news.summary}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Eye size={12} strokeWidth={2} />
                  {news.views.toLocaleString()} 阅读
                </span>
                <span className="text-[12px] font-medium text-[#E7C154] flex items-center gap-1">
                  阅读全文 <ArrowRight size={12} strokeWidth={2.5} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
