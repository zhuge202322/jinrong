"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, Headphones, Share2, Flame, Grid3x3, Building2, Home as HomeIcon, Landmark, Car, Briefcase, Cpu, Wallet, QrCode, CheckCircle, X } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";

const ICON_MAP: Record<string, any> = {
  Grid3x3,
  Building2,
  Home: HomeIcon,
  Landmark,
  Car,
  Briefcase,
  Cpu,
  Wallet,
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("fdjyd");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyProduct, setApplyProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>(PRODUCTS);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllProducts(data);
        }
      })
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const filteredProducts = useMemo(() => {
    return activeCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory, allProducts]);

  const handleDetails = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleApply = (product: any) => {
    setShowModal(false);
    setApplyProduct(product);
    setShowApplyModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white h-14">
        <button className="p-1">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-medium text-gray-900">房抵易融</h1>
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

      <main className="px-4 mt-4">
        {/* Banners */}
        <div className="bg-gradient-to-r from-[#DC0034] to-[#E7C154] rounded-xl p-5 mb-5 text-white shadow-sm relative overflow-hidden">
          {/* Logo on the left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-[120%]">
            <img src="/logo.png" alt="Logo" className="h-full w-auto object-contain" />
          </div>

          {/* Text on the right */}
          <div className="relative z-20 text-right">
            <h2 className="text-xl font-bold mb-1 tracking-wider">房抵易融·贷款服务平台</h2>
            <p className="text-xs opacity-90">房抵·车抵·企业贷·公积金贷 全覆盖</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Grid3x3;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-[#FDF3F5] text-[#DC0034] border border-[#DC0034]"
                    : "bg-white text-gray-600 border border-gray-100 shadow-sm"
                }`}
              >
                <Icon size={13} className={isActive ? "text-[#DC0034]" : "text-gray-500"} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* List Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-[17px] font-bold text-gray-900">
            {activeCategory === "all" ? "精选贷款产品" : `${CATEGORIES.find((c) => c.id === activeCategory)?.label}产品`}
          </h2>
          <span className="text-xs text-gray-500">{filteredProducts.length} 个产品</span>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative bg-white rounded-xl p-4 pt-5 overflow-hidden shadow-sm border border-[#E7C154]/20"
                >
                  {/* NEW Tag */}
                  {product.featured && (
                    <div className="absolute -left-7 top-3 -rotate-45 bg-[#DC0034] text-white text-[10px] font-bold py-0.5 px-8 shadow-sm z-10 text-center w-24">
                      HOT
                    </div>
                  )}

                  {/* Top Right Tag */}
                  <div className="absolute right-0 top-0 bg-[#FFF9E6] text-[#C49A00] text-xs px-3 py-1.5 rounded-bl-xl font-medium">
                    {product.tags?.[1] || product.tags?.[0] || CATEGORIES.find(c => c.id === product.category)?.label || product.category}
                  </div>

                  {/* Title */}
                  <div className="flex items-center gap-1.5 mb-4 pl-1">
                    <h3 className="text-[17px] font-bold text-gray-900">
                      {product.name}
                    </h3>
                    {product.featured && (
                      <Flame
                        className="w-[18px] h-[18px] text-[#DC0034] fill-[#DC0034]/20"
                        strokeWidth={2}
                      />
                    )}
                  </div>

                  {/* Info Area */}
                  <div className="flex items-start">
                    {/* Left: Amount */}
                    <div className="w-[110px] flex-shrink-0 flex flex-col items-start pl-1">
                      <div className="text-[#DC0034] flex items-baseline gap-0.5 tracking-tight">
                        <span className="text-[28px] font-bold font-sans leading-none">
                          {product.amountMax}
                        </span>
                        <span className="text-[13px] font-medium leading-none ml-0.5">
                          万
                        </span>
                      </div>
                      <div className="text-gray-500 text-[13px] mt-2">最高可贷</div>
                    </div>

                    {/* Right: Details */}
                    <div className="flex-1 flex flex-col justify-center pt-0.5 pl-3 border-l border-gray-100/80">
                      <div className="text-[14px] font-bold text-gray-800 mb-2 leading-snug line-clamp-2">
                        {product.highlight}
                      </div>
                      <div className="flex items-center text-[12px] text-gray-500 gap-3">
                        <span>期限<span className="text-[#DC0034]">{product.term}</span></span>
                        <span>利率<span className="text-[#DC0034]">{product.rateMin}%起</span></span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-gray-50">
                    <div className="text-[11px] text-gray-400 flex gap-1 items-center mb-3">
                      {product.bank} · 额度 {product.amountMin}-{product.amountMax}万
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleApply(product)}
                        className="flex-1 bg-[#DC0034] text-white text-[13px] font-medium py-2 rounded-md shadow-sm active:scale-[0.98] transition-transform"
                      >
                        拿码进件
                      </button>
                      <button 
                        onClick={() => handleDetails(product)}
                        className="flex-1 bg-[#E7C154] text-white text-[13px] font-medium py-2 rounded-md shadow-sm active:scale-[0.98] transition-transform"
                      >
                        产品大纲
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center items-center gap-1.5 py-6 text-gray-400 text-xs">
                <CheckCircle size={12} className="text-[#E7C154]" />
                <span>以上产品均为正规银行产品，以实际审批为准</span>
              </div>
            </>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-gray-400">
              <QrCode size={40} className="mb-3 text-gray-300" strokeWidth={1.5} />
              <p className="text-[15px] text-gray-500 mb-1">该分类暂无产品</p>
              <p className="text-xs">更多产品正在陆续上线中</p>
            </div>
          )}
        </div>

        {/* Product Details Modal */}
        {showModal && selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
            <div className="bg-white w-full sm:w-[400px] h-[85vh] sm:h-[650px] rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">{selectedProduct.name} - 产品大纲</h3>
                <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                 {/* Conditions */}
                 <div>
                    <h4 className="text-[15px] font-bold text-[#DC0034] mb-3 flex items-center gap-2">
                      <div className="w-1 h-3.5 bg-[#DC0034] rounded-full"></div>申请条件
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.conditions?.map((c: string, i: number) => (
                        <li key={i} className="text-[13px] text-gray-600 flex items-start gap-2 leading-relaxed">
                          <span className="text-[#E7C154] mt-0.5">•</span>{c}
                        </li>
                      ))}
                    </ul>
                 </div>
                 {/* Materials */}
                 <div>
                    <h4 className="text-[15px] font-bold text-[#DC0034] mb-3 flex items-center gap-2">
                      <div className="w-1 h-3.5 bg-[#DC0034] rounded-full"></div>所需材料
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.materials?.map((c: string, i: number) => (
                        <li key={i} className="text-[13px] text-gray-600 flex items-start gap-2 leading-relaxed">
                          <span className="text-[#E7C154] mt-0.5">•</span>{c}
                        </li>
                      ))}
                    </ul>
                 </div>
                 {/* Process */}
                 <div>
                    <h4 className="text-[15px] font-bold text-[#DC0034] mb-3 flex items-center gap-2">
                      <div className="w-1 h-3.5 bg-[#DC0034] rounded-full"></div>办理流程
                    </h4>
                    <div className="space-y-3">
                      {selectedProduct.process?.map((c: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-[13px] text-gray-600">
                          <div className="w-5 h-5 rounded-full bg-[#FDF3F5] text-[#DC0034] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                            {i + 1}
                          </div>
                          {c}
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
              <div className="p-4 border-t border-gray-100">
                <button onClick={() => handleApply(selectedProduct)} className="w-full bg-[#DC0034] text-white font-bold py-3.5 rounded-xl shadow-md active:scale-[0.98] transition-transform">
                  拿码进件
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Apply (QR Code) Modal */}
        {showApplyModal && applyProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowApplyModal(false)}>
            <div className="bg-white w-full max-w-[320px] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
              <div className="bg-gradient-to-r from-[#DC0034] to-[#E7C154] p-5 text-white relative">
                <button onClick={() => setShowApplyModal(false)} className="absolute top-3 right-3 p-1 text-white/80 hover:text-white">
                  <X size={20} />
                </button>
                <h3 className="text-lg font-bold mb-1">扫码进件</h3>
                <p className="text-[13px] opacity-90">{applyProduct.name} - {applyProduct.bank}</p>
              </div>
              <div className="p-6 flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-50 border-2 border-dashed border-[#E7C154]/50 rounded-xl flex flex-col items-center justify-center mb-5 text-[#DC0034] overflow-hidden">
                  {applyProduct.qrCodeUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={applyProduct.qrCodeUrl} alt="进件二维码" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <QrCode size={80} strokeWidth={1.5} />
                      <span className="text-[13px] font-medium text-gray-500 mt-3">进件二维码</span>
                    </>
                  )}
                </div>
                <p className="text-[13px] text-gray-600 text-center leading-relaxed mb-6 font-medium">
                  请使用微信扫描上方二维码<br/>或截图保存后微信扫一扫打开
                </p>
                <div className="w-full bg-[#F7F7F7] rounded-xl p-4 text-[12px] text-gray-600 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#DC0034] text-white flex items-center justify-center flex-shrink-0 font-bold text-[10px]">1</span>
                    长按识别或保存上方二维码
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#DC0034] text-white flex items-center justify-center flex-shrink-0 font-bold text-[10px]">2</span>
                    进入银行官方申请页面
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#DC0034] text-white flex items-center justify-center flex-shrink-0 font-bold text-[10px]">3</span>
                    填写资料提交申请
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
