import { DollarSign, Package, ShoppingBag, Store } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        {trend && (
          <p
            className={`text-sm mt-2 ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </p>
        )}
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">{icon}</div>
    </div>
  </div>
);

const StatsCards = () => {
  const stats = [
    {
      title: "Total Shops",
      value: "24",
      icon: <Store className="w-6 h-6 text-blue-600" />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Total Products",
      value: "145",
      icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Total Stock",
      value: "1,890",
      icon: <Package className="w-6 h-6 text-blue-600" />,
      trend: { value: 3, isPositive: false },
    },
    {
      title: "Total Value",
      value: "$45,231",
      icon: <DollarSign className="w-6 h-6 text-blue-600" />,
      trend: { value: 15, isPositive: true },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
