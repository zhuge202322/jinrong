"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, Check } from "lucide-react";

export default function NewsAdminPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setNewsList(data);
      });
  }, []);

  const saveToServer = async (newList: any[]) => {
    setNewsList(newList);
    try {
      await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newList)
      });
    } catch (err) {
      console.error("Failed to save to db:", err);
      alert("保存到数据库失败！");
    }
  };

  const filteredNews = newsList.filter(n => 
    n.title.includes(searchTerm) || n.category.includes(searchTerm)
  );

  const handleEdit = (news: any) => {
    setCurrentNews({ ...news });
    setIsEditing(true);
  };

  const handleAdd = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    setCurrentNews({
      id: `news-${Date.now()}`,
      title: "",
      summary: "",
      category: "政策解读",
      date: formattedDate,
      views: Math.floor(Math.random() * 1000) + 500,
      link: ""
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("确定要删除该文章吗？")) {
      saveToServer(newsList.filter(n => n.id !== id));
    }
  };

  const handleSave = () => {
    let newList;
    if (newsList.find(n => n.id === currentNews.id)) {
      newList = newsList.map(n => n.id === currentNews.id ? currentNews : n);
    } else {
      newList = [currentNews, ...newsList]; // Insert new at the beginning
    }
    saveToServer(newList);
    setIsEditing(false);
  };

  if (isEditing && currentNews) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#DC0034] rounded-full"></div>
            {currentNews.id.startsWith("news-") && currentNews.title === "" ? "添加新资讯" : "编辑资讯"}
          </h3>
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors">
              取消
            </button>
            <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-[#DC0034] text-white hover:bg-[#C0002D] font-medium transition-colors flex items-center gap-2">
              <Check size={16} /> 保存资讯
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">文章标题</label>
            <input 
              type="text" 
              value={currentNews.title} 
              onChange={e => setCurrentNews({...currentNews, title: e.target.value})} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]" 
              placeholder="请输入文章标题" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">文章标签 (分类)</label>
            <input 
              type="text" 
              value={currentNews.category} 
              onChange={e => setCurrentNews({...currentNews, category: e.target.value})} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]" 
              placeholder="如：政策解读、贷款知识、产品推荐 等" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">简短介绍 (Summary)</label>
            <textarea 
              value={currentNews.summary} 
              onChange={e => setCurrentNews({...currentNews, summary: e.target.value})} 
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034] resize-none" 
              placeholder="请输入要在列表中展示的简短介绍..." 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">公众号文章链接 (跳转URL)</label>
            <input 
              type="text" 
              value={currentNews.link} 
              onChange={e => setCurrentNews({...currentNews, link: e.target.value})} 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]" 
              placeholder="请输入微信公众号文章的网页链接 (https://mp.weixin.qq.com/...)" 
            />
            <p className="text-xs text-gray-500 mt-2">前台用户点击“阅读全文”时，将会直接跳转到这个链接。</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">发布日期</label>
                <input 
                  type="date" 
                  value={currentNews.date} 
                  onChange={e => setCurrentNews({...currentNews, date: e.target.value})} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]" 
                />
             </div>
             <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">虚拟阅读量</label>
                <input 
                  type="number" 
                  value={currentNews.views} 
                  onChange={e => setCurrentNews({...currentNews, views: Number(e.target.value)})} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]" 
                />
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索文章标题或标签..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]"
          />
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#DC0034] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#C0002D] transition-colors shadow-sm"
        >
          <Plus size={18} /> 添加新资讯
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
              <th className="py-4 px-4 font-medium rounded-tl-xl">文章信息</th>
              <th className="py-4 px-4 font-medium">标签</th>
              <th className="py-4 px-4 font-medium">跳转链接</th>
              <th className="py-4 px-4 font-medium">发布日期</th>
              <th className="py-4 px-4 font-medium">阅读量</th>
              <th className="py-4 px-4 font-medium rounded-tr-xl w-28 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredNews.map((news) => (
              <tr key={news.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-bold text-gray-900 line-clamp-1">{news.title}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-[300px]">{news.summary}</div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#FDF3F5] text-[#DC0034]">
                    {news.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm">
                  {news.link ? (
                    <a href={news.link} target="_blank" rel="noreferrer" className="text-[#E7C154] hover:underline line-clamp-1 max-w-[150px]">
                      {news.link}
                    </a>
                  ) : (
                    <span className="text-gray-400">未设置</span>
                  )}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{news.date}</td>
                <td className="py-4 px-4 text-sm text-gray-700">{news.views}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleEdit(news)} className="p-2 text-gray-400 hover:text-[#E7C154] bg-white rounded-lg border border-gray-100 shadow-sm transition-colors" title="编辑">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(news.id)} className="p-2 text-gray-400 hover:text-red-500 bg-white rounded-lg border border-gray-100 shadow-sm transition-colors" title="删除">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredNews.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  没有找到相关资讯
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
