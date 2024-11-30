"use client";

import { useEffect, useState } from "react";
import ProductList from "@/components/products/ProductList";
import ProductForm from "@/components/products/ProductForm";
import { useStore } from "@/lib/store";

export default function ProductsPage() {
  const { fetchProducts, fetchShops, products, shops, isLoading, error } =
    useStore();
  const [isCreateMode, setIsCreateMode] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchShops();
  }, [fetchProducts, fetchShops]);

  if (error.products || error.shops) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading products: {error.products || error.shops}
      </div>
    );
  }

  if (isLoading.products || isLoading.shops) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isCreateMode) {
    return (
      <ProductForm
        shops={shops}
        onSubmit={async (data) => {
          try {
            await useStore.getState().createProduct(data);
            setIsCreateMode(false);
          } catch (error) {
            alert("Error creating product: " + error.message);
          }
        }}
        onCancel={() => setIsCreateMode(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setIsCreateMode(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Product
        </button>
      </div>
      <ProductList />
    </div>
  );
}
