"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, FileText, Phone, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "产品管理", path: "/admin/products", icon: Package },
    { name: "资讯管理", path: "/admin/news", icon: FileText },
    { name: "联系信息", path: "/admin/contact", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-4 bg-[#DC0034] rounded-sm"></div>
            <div className="w-2 h-4 bg-[#E7C154] rounded-sm"></div>
            <span className="text-gray-900 font-bold text-lg tracking-wider ml-1">后台管理系统</span>
          </div>
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? "bg-[#DC0034] text-white shadow-md shadow-red-500/20" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <LogOut size={18} />
            返回前台首页
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm shrink-0">
          <h2 className="text-lg font-bold text-gray-800">
            {navItems.find(item => pathname?.startsWith(item.path))?.name || "概览"}
          </h2>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
