"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "首页", path: "/", icon: Home },
    { name: "联系我们", path: "/contact", icon: LayoutGrid },
    { name: "热门资讯", path: "/news", icon: LayoutGrid },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-[50px] pb-safe z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.path || pathname?.startsWith(tab.path + "/");
        // Special case for root path to avoid matching everything
        const isActuallyActive = tab.path === "/" ? pathname === "/" : isActive;
        
        return (
          <Link
            href={tab.path}
            key={tab.path}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActuallyActive ? "text-[#DC0034]" : "text-gray-500"
            }`}
          >
            <Icon className="w-5 h-5" strokeWidth={isActuallyActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
