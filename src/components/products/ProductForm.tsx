import { useState } from "react";
import { Upload } from "lucide-react";

interface ProductFormProps {
  initialData?: {
    name: string;
    price: number;
    stockLevel: number;
    description: string;
    image: string;
    shopId: number;
  };
  shops: Array<{ id: number; name: string }>;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const ProductForm = ({
  initialData,
  shops,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || 0,
    stockLevel: initialData?.stockLevel || 0,
    description: initialData?.description || "",
    image: initialData?.image || "",
    shopId: initialData?.shopId || shops[0]?.id || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value.toString());
    });
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-200 p-6"
    >
      <h2 className="text-xl font-semibold mb-6">
        {initialData ? "Edit Product" : "Create New Product"}
      </h2>

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Product Image</label>
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Product image"
                className="w-full h-full object-contain"
              />
            ) : (
              <>
                <Upload size={24} className="text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">Upload image</span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData((prev) => ({
                      ...prev,
                      image: reader.result as string,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Shop</label>
          <select
            value={formData.shopId}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                shopId: Number(e.target.value),
              }))
            }
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Stock Level</label>
            <input
              type="number"
              min="0"
              value={formData.stockLevel}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  stockLevel: Number(e.target.value),
                }))
              }
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {initialData ? "Update Product" : "Create Product"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
