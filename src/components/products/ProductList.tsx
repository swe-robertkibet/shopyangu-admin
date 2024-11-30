import { useState } from "react";
import { Edit, Trash2, Plus, Search } from "lucide-react";

interface Product {
  id: number;
  shopId: number;
  name: string;
  price: number;
  stockLevel: number;
  description: string;
  image: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      shopId: 1,
      name: "Smartphone",
      price: 599.99,
      stockLevel: 10,
      description: "Latest smartphone model",
      image: "/placeholder.png",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    // API call would go here
    setProducts(products.filter((product) => product.id !== id));
  };

  const getStockStatus = (level: number) => {
    if (level === 0)
      return { label: "Out of Stock", color: "text-red-600 bg-red-50" };
    if (level <= 5)
      return { label: "Low Stock", color: "text-yellow-600 bg-yellow-50" };
    return { label: "In Stock", color: "text-green-600 bg-green-50" };
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => {
              const stockStatus = getStockStatus(product.stockLevel);

              return (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-4"
                >
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      <span className="text-lg font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${stockStatus.color}`}
                      >
                        {stockStatus.label} ({product.stockLevel})
                      </span>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
