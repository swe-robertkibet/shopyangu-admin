"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ShopForm from "@/components/shops/ShopForm";
import ProductList from "@/components/products/ProductList";
import { useStore } from "@/lib/store";

export default function ShopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shopId = Number(params.id);
  const { shops, products, fetchShops, fetchProducts, isLoading, error } =
    useStore();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchShops();
    fetchProducts();
  }, [fetchShops, fetchProducts]);

  const shop = shops.find((s) => s.id === shopId);
  const shopProducts = products.filter((p) => p.shopId === shopId);

  if (error.shops || error.products) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading shop details: {error.shops || error.products}
      </div>
    );
  }

  if (isLoading.shops || isLoading.products) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-600 rounded-lg">
        Shop not found
      </div>
    );
  }

  if (isEditing) {
    return (
      <ShopForm
        initialData={shop}
        onSubmit={async (data) => {
          try {
            await useStore.getState().updateShop(shopId, data);
            setIsEditing(false);
          } catch (error) {
            alert("Error updating shop: " + error.message);
          }
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{shop.name}</h1>
          <p className="text-gray-600">{shop.description}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Edit Shop
          </button>
          <button
            onClick={async () => {
              if (shopProducts.length > 0) {
                alert("Cannot delete shop with active products");
                return;
              }
              if (confirm("Are you sure you want to delete this shop?")) {
                try {
                  await useStore.getState().deleteShop(shopId);
                  router.push("/shops");
                } catch (error) {
                  alert("Error deleting shop: " + error.message);
                }
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Shop
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Shop Products</h2>
        <ProductList shopId={shopId} />
      </div>
    </div>
  );
}
