"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, LayoutDashboard, ShoppingBag } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/shops", label: "Shops", icon: Store },
    { href: "/products", label: "Products", icon: ShoppingBag },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">ShopYangu Admin</h1>
      </div>
      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
