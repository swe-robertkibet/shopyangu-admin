"use client";

import { useEffect, useState } from "react";
import ShopList from "@/components/shops/ShopList";
import ShopForm from "@/components/shops/ShopForm";
import { useStore } from "@/lib/store";

export default function ShopsPage() {
  const { fetchShops, shops, isLoading, error } = useStore();
  const [isCreateMode, setIsCreateMode] = useState(false);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  if (error.shops) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading shops: {error.shops}
      </div>
    );
  }

  if (isLoading.shops) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isCreateMode) {
    return (
      <ShopForm
        onSubmit={async (data) => {
          try {
            await useStore.getState().createShop(data);
            setIsCreateMode(false);
          } catch (error) {
            alert("Error creating shop: " + error.message);
          }
        }}
        onCancel={() => setIsCreateMode(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shops</h1>
        <button
          onClick={() => setIsCreateMode(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Shop
        </button>
      </div>
      <ShopList />
    </div>
  );
}
