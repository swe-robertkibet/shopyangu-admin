import { Bell, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Welcome back, Admin
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Settings size={20} className="text-gray-600" />
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white text-sm font-medium">A</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
