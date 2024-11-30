import { useState } from "react";
import { Upload } from "lucide-react";

interface ShopFormProps {
  initialData?: {
    name: string;
    description: string;
    logo: string;
  };
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const ShopForm = ({ initialData, onSubmit, onCancel }: ShopFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    logo: initialData?.logo || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-200 p-6"
    >
      <h2 className="text-xl font-semibold mb-6">
        {initialData ? "Edit Shop" : "Create New Shop"}
      </h2>

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Shop Logo</label>
          <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
            {formData.logo ? (
              <img
                src={formData.logo}
                alt="Shop logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <>
                <Upload size={24} className="text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">Upload logo</span>
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
                      logo: reader.result as string,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Shop Name</label>
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
            {initialData ? "Update Shop" : "Create Shop"}
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

export default ShopForm;
