"use client";

import { useState, useEffect } from "react";
import { MessageCircle, QrCode, CheckCircle, ChevronLeft, Headphones, Share2 } from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = useState("");
  const [contactInfo, setContactInfo] = useState({ wechat: "bandao-jinrong", qrCode: "", avatarUrl: "" });

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data && data.wechat) {
          setContactInfo(data);
        }
      })
      .catch(err => console.error("Failed to fetch contact info:", err));
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white h-14">
        <button className="p-1" onClick={() => window.history.back()}>
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-medium text-gray-900">联系我们</h1>
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
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center py-6">
          {contactInfo.avatarUrl ? (
            <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={contactInfo.avatarUrl} alt="客服" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-[#FDF3F5] text-[#DC0034] rounded-full flex items-center justify-center mb-3">
              <MessageCircle size={32} strokeWidth={1.5} />
            </div>
          )}
          <h1 className="text-xl font-bold text-gray-900 mb-2">联系我们</h1>
          <p className="text-sm text-gray-500 mb-4">房抵易融专业贷款顾问团队</p>
          <div className="flex items-center gap-3 text-xs text-[#E7C154] font-medium">
            <span className="flex items-center gap-1"><CheckCircle size={12} strokeWidth={2} />正规资质</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} strokeWidth={2} />专业可靠</span>
            <span className="flex items-center gap-1"><CheckCircle size={12} strokeWidth={2} />极速响应</span>
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="mb-6">
          <h2 className="text-[17px] font-bold text-gray-900 mb-3 px-1">快捷联系</h2>
          <div className="space-y-3">
            {/* WeChat */}
            <div onClick={() => handleCopy(contactInfo.wechat, "wechat")} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-50 active:scale-[0.98] transition-transform cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF9E6] text-[#C49A00] flex items-center justify-center">
                  <MessageCircle size={20} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">微信公众号</span>
                  <span className="text-[17px] font-bold text-gray-900 tracking-wide">{contactInfo.wechat}</span>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${copied === 'wechat' ? 'bg-[#E7C154] text-white' : 'bg-gray-100 text-gray-500'}`}>
                {copied === 'wechat' ? '已复制' : '复制'}
              </span>
            </div>
          </div>
        </div>

        {/* QR Codes */}
        <div className="mb-6">
          <h2 className="text-[17px] font-bold text-gray-900 mb-3 px-1">扫码关注</h2>
          <div className="bg-white p-6 rounded-xl flex flex-col items-center shadow-sm border border-gray-50 text-center">
            <div className="w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden relative">
              {contactInfo.qrCode ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={contactInfo.qrCode} alt="二维码" className="w-full h-full object-cover" />
              ) : (
                <QrCode size={48} strokeWidth={1.5} className="text-[#DC0034]" />
              )}
            </div>
            <p className="text-[16px] font-bold text-gray-900 mb-1.5">微信公众号</p>
            <p className="text-[12px] text-gray-500 leading-tight">长按识别关注获取最新贷款资讯<br/>专业顾问1对1解答</p>
          </div>
        </div>

        {/* Service Promises */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E7C154]/20 p-4 mb-2">
          <h2 className="text-[15px] font-bold text-gray-900 mb-3">服务承诺</h2>
          <div className="grid grid-cols-1 gap-2.5">
            {[
              "严格保护客户隐私信息安全",
              "所有产品均为正规银行官方产品",
              "免费咨询，不收取任何中介费用",
              "专业顾问1对1服务，全程跟进"
            ].map((promise, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle size={14} strokeWidth={2} className="text-[#E7C154]" />
                <span className="text-sm text-gray-700">{promise}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
