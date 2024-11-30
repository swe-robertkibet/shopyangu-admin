import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";

interface Shop {
  id: number;
  name: string;
  description: string;
  logo: string;
}

const ShopList = () => {
  const [shops, setShops] = useState<Shop[]>([
    {
      id: 1,
      name: "Electronics Store",
      description: "Best electronics in town",
      logo: "/placeholder.png",
    },
  ]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this shop?")) return;
    // API call would go here
    setShops(shops.filter((shop) => shop.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Shops</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Add Shop
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={shop.logo}
                    alt={shop.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{shop.name}</h3>
                  <p className="text-sm text-gray-600">{shop.description}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(shop.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopList;
