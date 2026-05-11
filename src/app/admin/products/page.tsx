"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, Check, UploadCloud } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/products";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<any[]>(PRODUCTS);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
      });
  }, []);

  const saveToServer = async (newProducts: any[]) => {
    setProducts(newProducts);
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProducts)
      });
    } catch (err) {
      console.error("Failed to save to db:", err);
      alert("保存到数据库失败！");
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.includes(searchTerm) || p.bank.includes(searchTerm)
  );

  const handleEdit = (product: any) => {
    setCurrentProduct({ ...product });
    setIsEditing(true);
  };

  const handleAdd = () => {
    setCurrentProduct({
      id: `new-${Date.now()}`,
      name: "",
      category: CATEGORIES[0].id,
      bank: "",
      amountMin: 0,
      amountMax: 0,
      rateMin: 0,
      rateMax: 0,
      term: "",
      highlight: "",
      conditions: [""],
      materials: [""],
      process: [""],
      qrCodeUrl: "",
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("确定要删除该产品吗？")) {
      saveToServer(products.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    let newProducts;
    if (products.find(p => p.id === currentProduct.id)) {
      newProducts = products.map(p => p.id === currentProduct.id ? currentProduct : p);
    } else {
      newProducts = [...products, currentProduct];
    }
    saveToServer(newProducts);
    setIsEditing(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setCurrentProduct({ ...currentProduct, qrCodeUrl: data.url });
      } else {
        alert("上传失败！");
      }
    } catch (error) {
      console.error(error);
      alert("上传出错！");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...currentProduct[field]];
    newArray[index] = value;
    setCurrentProduct({ ...currentProduct, [field]: newArray });
  };

  const addArrayItem = (field: string) => {
    setCurrentProduct({ ...currentProduct, [field]: [...currentProduct[field], ""] });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = currentProduct[field].filter((_: any, i: number) => i !== index);
    setCurrentProduct({ ...currentProduct, [field]: newArray });
  };

  if (isEditing && currentProduct) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#DC0034] rounded-full"></div>
            {currentProduct.id.startsWith("new") ? "添加新产品" : "编辑产品"}
          </h3>
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors">
              取消
            </button>
            <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-[#DC0034] text-white hover:bg-[#C0002D] font-medium transition-colors flex items-center gap-2">
              <Check size={16} /> 保存产品
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左侧：基本信息与数值 */}
          <div className="space-y-6">
            <h4 className="font-bold text-gray-800 text-lg mb-4">基本信息</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">产品名称</label>
              <input type="text" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]" placeholder="如：企业经营贷（房抵）" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">所属分类</label>
                <select value={currentProduct.category} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]">
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">放款机构(银行)</label>
                <input type="text" value={currentProduct.bank} onChange={e => setCurrentProduct({...currentProduct, bank: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]" placeholder="如：国有大行" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">一句话亮点 (Highlight)</label>
              <input type="text" value={currentProduct.highlight} onChange={e => setCurrentProduct({...currentProduct, highlight: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]" placeholder="如：额度高、利率低、资金用途灵活..." />
            </div>

            <h4 className="font-bold text-gray-800 text-lg mt-8 mb-4">额度与费率</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">额度范围 (万)</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={currentProduct.amountMin} onChange={e => setCurrentProduct({...currentProduct, amountMin: Number(e.target.value)})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-center" />
                  <span className="text-gray-400">-</span>
                  <input type="number" value={currentProduct.amountMax} onChange={e => setCurrentProduct({...currentProduct, amountMax: Number(e.target.value)})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-center" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">利率范围 (%)</label>
                <div className="flex items-center gap-2">
                  <input type="number" step="0.1" value={currentProduct.rateMin} onChange={e => setCurrentProduct({...currentProduct, rateMin: Number(e.target.value)})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-center" />
                  <span className="text-gray-400">-</span>
                  <input type="number" step="0.1" value={currentProduct.rateMax} onChange={e => setCurrentProduct({...currentProduct, rateMax: Number(e.target.value)})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-center" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">最长期限</label>
              <input type="text" value={currentProduct.term} onChange={e => setCurrentProduct({...currentProduct, term: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" placeholder="如：最长10年" />
            </div>

            <h4 className="font-bold text-gray-800 text-lg mt-8 mb-4">进件配置</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">二维码图片</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden group"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center text-[#DC0034]">
                    <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin mb-2"></div>
                    <span className="text-sm font-medium">正在上传...</span>
                  </div>
                ) : currentProduct.qrCodeUrl ? (
                  <div className="flex flex-col items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={currentProduct.qrCodeUrl} alt="二维码预览" className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm mb-3" />
                    <span className="text-sm font-medium text-gray-500 group-hover:text-[#DC0034] flex items-center gap-1">
                      <UploadCloud size={16} /> 点击重新上传
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <ImageIcon size={32} className="mb-2 text-gray-300 group-hover:text-[#DC0034] transition-colors" />
                    <span className="text-sm font-medium">点击上传进件二维码图片</span>
                    <span className="text-xs mt-1">建议尺寸: 400x400px</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          </div>

          {/* 右侧：产品大纲列表编辑 */}
          <div className="space-y-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-gray-800 text-lg mb-4 border-b border-gray-200 pb-2">产品大纲配置</h4>

            {/* 申请条件 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-bold text-[#E7C154]">申请条件</label>
                <button onClick={() => addArrayItem('conditions')} className="text-xs text-[#DC0034] font-medium flex items-center gap-1"><Plus size={12}/> 添加条件</button>
              </div>
              <div className="space-y-2">
                {currentProduct.conditions?.map((c: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-2.5 text-gray-400 text-xs">•</span>
                    <textarea value={c} onChange={e => handleArrayChange('conditions', i, e.target.value)} rows={2} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none" placeholder="输入申请条件..." />
                    <button onClick={() => removeArrayItem('conditions', i)} className="p-2 text-gray-400 hover:text-red-500 mt-1"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* 所需材料 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-bold text-[#E7C154]">所需材料</label>
                <button onClick={() => addArrayItem('materials')} className="text-xs text-[#DC0034] font-medium flex items-center gap-1"><Plus size={12}/> 添加材料</button>
              </div>
              <div className="space-y-2">
                {currentProduct.materials?.map((c: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-2.5 text-gray-400 text-xs">•</span>
                    <input type="text" value={c} onChange={e => handleArrayChange('materials', i, e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm" placeholder="如：身份证原件" />
                    <button onClick={() => removeArrayItem('materials', i)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* 办理流程 */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-bold text-[#E7C154]">办理流程</label>
                <button onClick={() => addArrayItem('process')} className="text-xs text-[#DC0034] font-medium flex items-center gap-1"><Plus size={12}/> 添加步骤</button>
              </div>
              <div className="space-y-2">
                {currentProduct.process?.map((c: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#DC0034] text-white flex items-center justify-center text-xs font-bold shrink-0">{i+1}</span>
                    <input type="text" value={c} onChange={e => handleArrayChange('process', i, e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm" placeholder="如：线上提交申请" />
                    <button onClick={() => removeArrayItem('process', i)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
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
            placeholder="搜索产品或银行名称..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#DC0034]/20 focus:border-[#DC0034]"
          />
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#DC0034] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#C0002D] transition-colors shadow-sm"
        >
          <Plus size={18} /> 添加新产品
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
              <th className="py-4 px-4 font-medium rounded-tl-xl">产品名称</th>
              <th className="py-4 px-4 font-medium">分类</th>
              <th className="py-4 px-4 font-medium">放款机构</th>
              <th className="py-4 px-4 font-medium">额度范围</th>
              <th className="py-4 px-4 font-medium">利率</th>
              <th className="py-4 px-4 font-medium rounded-tr-xl w-28 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-bold text-gray-900">{product.name}</div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-[200px]">{product.highlight}</div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#FFF9E6] text-[#C49A00]">
                    {CATEGORIES.find(c => c.id === product.category)?.label || product.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{product.bank}</td>
                <td className="py-4 px-4 text-sm font-bold text-[#DC0034]">{product.amountMin}-{product.amountMax}万</td>
                <td className="py-4 px-4 text-sm text-gray-700">{product.rateMin}%-{product.rateMax}%</td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleEdit(product)} className="p-2 text-gray-400 hover:text-[#E7C154] bg-white rounded-lg border border-gray-100 shadow-sm transition-colors" title="编辑">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 bg-white rounded-lg border border-gray-100 shadow-sm transition-colors" title="删除">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  没有找到相关产品
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
