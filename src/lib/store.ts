import { create } from 'zustand';
import { Shop, Product, DashboardStats } from '../types';
import { shopsApi, productsApi, dashboardApi } from './api';

interface StoreState {
  // Data
  shops: Shop[];
  products: Product[];
  stats: DashboardStats | null;
  
  // Loading states
  isLoading: {
    shops: boolean;
    products: boolean;
    stats: boolean;
  };
  
  // Error states
  error: {
    shops: string | null;
    products: string | null;
    stats: string | null;
  };
  
  // Actions
  fetchShops: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchStats: () => Promise<void>;
  
  createShop: (data: Omit<Shop, 'id'>) => Promise<Shop>;
  updateShop: (id: number, data: Partial<Shop>) => Promise<Shop>;
  deleteShop: (id: number) => Promise<void>;
  
  createProduct: (data: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial state
  shops: [],
  products: [],
  stats: null,
  
  isLoading: {
    shops: false,
    products: false,
    stats: false,
  },
  
  error: {
    shops: null,
    products: null,
    stats: null,
  },
  
  // Fetch actions
  fetchShops: async () => {
    set(state => ({
      isLoading: { ...state.isLoading, shops: true },
      error: { ...state.error, shops: null },
    }));
    
    try {
      const shops = await shopsApi.getAll();
      set({ shops, isLoading: { ...get().isLoading, shops: false } });
    } catch (error) {
      set(state => ({
        isLoading: { ...state.isLoading, shops: false },
        error: { ...state.error, shops: error.message },
      }));
    }
  },
  
  fetchProducts: async () => {
    set(state => ({
      isLoading: { ...state.isLoading, products: true },
      error: { ...state.error, products: null },
    }));
    
    try {
      const products = await productsApi.getAll();
      set({ products, isLoading: { ...get().isLoading, products: false } });
    } catch (error) {
      set(state => ({
        isLoading: { ...state.isLoading, products: false },
        error: { ...state.error, products: error.message },
      }));
    }
  },
  
  fetchStats: async () => {
    set(state => ({
      isLoading: { ...state.isLoading, stats: true },
      error: { ...state.error, stats: null },
    }));
    
    try {
      const stats = await dashboardApi.getStats();
      set({ stats, isLoading: { ...get().isLoading, stats: false } });
    } catch (error) {
      set(state => ({
        isLoading: { ...state.isLoading, stats: false },
        error: { ...state.error, stats: error.message },
      }));
    }
  },
  
  // CRUD actions for shops
  createShop: async (data) => {
    const newShop = await shopsApi.create(data);
    set(state => ({ shops: [...state.shops, newShop] }));
    return newShop;
  },
  
  updateShop: async (id, data) => {
    const updatedShop = await shopsApi.update(id, data);
    set(state => ({
      shops: state.shops.map(shop => 
        shop.id === id ? updatedShop : shop
      ),
    }));
    return updatedShop;
  },
  
  deleteShop: async (id) => {
    await shopsApi.delete(id);
    set(state => ({
      shops: state.shops.filter(shop => shop.id !== id),
    }));
  },
  
  // CRUD actions for products
  createProduct: async (data) => {
    const newProduct = await productsApi.create(data);
    set(state => ({ products: [...state.products, newProduct] }));
    return newProduct;
  },
  
  updateProduct: async (id, data) => {
    const updatedProduct = await productsApi.update(id, data);
    set(state => ({
      products: state.products.map(product => 
        product.id === id ? updatedProduct : product
      ),
    }));
    return updatedProduct;
  },
  
  deleteProduct: async (id) => {
    await productsApi.delete(id);
    set(state => ({
      products: state.products.filter(product => product.id !== id),
    }));
  },
}));