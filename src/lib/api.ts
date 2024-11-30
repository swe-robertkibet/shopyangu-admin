import { Shop, Product, DashboardStats } from '../types';

const API_URL = 'http://localhost:3001';

async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
  
    return response.json();
  }
  
  export const shopsApi = {
    getAll: () => fetchApi<Shop[]>('/shops'),
    
    getById: (id: number) => fetchApi<Shop>(`/shops/${id}`),
    
    create: (data: Omit<Shop, 'id'>) => 
      fetchApi<Shop>('/shops', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    update: (id: number, data: Partial<Shop>) =>
      fetchApi<Shop>(`/shops/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    
    delete: (id: number) =>
      fetchApi<void>(`/shops/${id}`, {
        method: 'DELETE',
      }),
  };

  export const productsApi = {
    getAll: () => fetchApi<Product[]>('/products'),
    
    getById: (id: number) => fetchApi<Product>(`/products/${id}`),
    
    getByShop: (shopId: number) => 
      fetchApi<Product[]>(`/products?shopId=${shopId}`),
    
    create: (data: Omit<Product, 'id'>) =>
      fetchApi<Product>('/products', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    update: (id: number, data: Partial<Product>) =>
      fetchApi<Product>(`/products/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    
    delete: (id: number) =>
      fetchApi<void>(`/products/${id}`, {
        method: 'DELETE',
      }),
  };

  export const dashboardApi = {
    getStats: async (): Promise<DashboardStats> => {
      const [shops, products] = await Promise.all([
        shopsApi.getAll(),
        productsApi.getAll(),
      ]);
  
      const totalStock = products.reduce((sum, p) => sum + p.stockLevel, 0);
      const totalValue = products.reduce((sum, p) => sum + (p.price * p.stockLevel), 0);
  
      const stockStatus = products.reduce(
        (acc, product) => {
          if (product.stockLevel === 0) acc.outOfStock++;
          else if (product.stockLevel <= 5) acc.lowStock++;
          else acc.inStock++;
          return acc;
        },
        { inStock: 0, lowStock: 0, outOfStock: 0 }
      );
  
      // Calculate top shops by stock level
      const shopStocks = shops.map(shop => {
        const shopProducts = products.filter(p => p.shopId === shop.id);
        return {
          id: shop.id,
          name: shop.name,
          stockLevel: shopProducts.reduce((sum, p) => sum + p.stockLevel, 0),
        };
      });
  
      const topShops = shopStocks
        .sort((a, b) => b.stockLevel - a.stockLevel)
        .slice(0, 5);
  
      return {
        totalShops: shops.length,
        totalProducts: products.length,
        totalStock,
        totalValue,
        stockStatus,
        topShops,
      };
    },
  };