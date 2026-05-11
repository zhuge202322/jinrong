"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Image as ImageIcon, UploadCloud } from "lucide-react";

export default function ContactAdminPage() {
  const [contactInfo, setContactInfo] = useState({ wechat: "", qrCode: "", avatarUrl: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingQr, setIsUploadingQr] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const qrInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data) setContactInfo(data);
      });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactInfo)
      });
      alert("保存成功！前台页面已更新。");
    } catch (err) {
      console.error(err);
      alert("保存失败，请稍后重试！");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'qr' | 'avatar') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'qr') setIsUploadingQr(true);
    else setIsUploadingAvatar(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        if (type === 'qr') {
          setContactInfo({ ...contactInfo, qrCode: data.url });
        } else {
          setContactInfo({ ...contactInfo, avatarUrl: data.url });
        }
      } else {
        alert("上传失败！");
      }
    } catch (error) {
      console.error(error);
      alert("上传出错！");
    } finally {
      if (type === 'qr') {
        setIsUploadingQr(false);
        if (qrInputRef.current) qrInputRef.current.value = '';
      } else {
        setIsUploadingAvatar(false);
        if (avatarInputRef.current) avatarInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-1.5 h-5 bg-[#DC0034] rounded-full"></div>
          联系信息管理
        </h3>
        <button 
          onClick={handleSave} 
          disabled={isSaving || isUploadingQr || isUploadingAvatar}
          className="px-5 py-2 rounded-lg bg-[#DC0034] text-white hover:bg-[#C0002D] font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Check size={16} /> {isSaving ? "保存中..." : "保存更改"}
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">微信公众号 / 微信号</label>
          <input 
            type="text" 
            value={contactInfo.wechat} 
            onChange={e => setContactInfo({...contactInfo, wechat: e.target.value})} 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]" 
            placeholder="如：bandao-jinrong" 
          />
          <p className="text-xs text-gray-500 mt-2">这是前台用户点击“一键复制”时所复制的账号。</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">顶部联系图标 (Avatar)</label>
          <div 
            onClick={() => avatarInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group"
          >
            {isUploadingAvatar ? (
              <div className="flex flex-col items-center justify-center text-[#DC0034]">
                <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin mb-2"></div>
                <span className="text-sm font-medium">正在上传...</span>
              </div>
            ) : contactInfo.avatarUrl ? (
              <div className="flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={contactInfo.avatarUrl} alt="图标预览" className="w-16 h-16 object-cover rounded-full border border-gray-200 shadow-sm mb-3" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-[#DC0034] flex items-center gap-1">
                  <UploadCloud size={16} /> 点击重新上传
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <ImageIcon size={32} className="mb-2 text-gray-300 group-hover:text-[#DC0034] transition-colors" />
                <span className="text-sm font-medium">点击上传顶部图标</span>
                <span className="text-xs mt-1 text-gray-400">支持正方形图片 (如 200x200)</span>
              </div>
            )}
            <input 
              type="file" 
              ref={avatarInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={e => handleFileUpload(e, 'avatar')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-800 mb-2">公众号二维码上传</label>
          <div 
            onClick={() => qrInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group"
          >
            {isUploadingQr ? (
              <div className="flex flex-col items-center justify-center text-[#DC0034]">
                <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin mb-2"></div>
                <span className="text-sm font-medium">正在上传...</span>
              </div>
            ) : contactInfo.qrCode ? (
              <div className="flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={contactInfo.qrCode} alt="二维码预览" className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm mb-3" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-[#DC0034] flex items-center gap-1">
                  <UploadCloud size={16} /> 点击重新上传
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <ImageIcon size={36} className="mb-3 text-gray-300 group-hover:text-[#DC0034] transition-colors" />
                <span className="text-sm font-medium text-gray-600">点击上传二维码图片</span>
                <span className="text-xs mt-1 text-gray-400">支持 JPG, PNG, WEBP (建议尺寸 400x400)</span>
              </div>
            )}
            <input 
              type="file" 
              ref={qrInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={e => handleFileUpload(e, 'qr')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
