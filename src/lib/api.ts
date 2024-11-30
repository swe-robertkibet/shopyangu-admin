import { Shop, Product, DashboardStats } from '../types';

const API_URL = 'http://localhost:5000';


async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`;
    console.log(`Fetching from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('API Error Response:', text);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
      throw new Error('Empty response received');
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('JSON Parse Error:', e);
      console.error('Raw Response:', text);
      throw new Error('Invalid JSON response received');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Request Failed:', error);
      throw new Error(`API Request Failed: ${error.message}`);
    }
    throw new Error('An unknown error occurred');
  }
}

// Shops API
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

// Products API
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

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    try {
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch dashboard stats: ${error.message}`);
      }
      throw new Error('Failed to fetch dashboard stats');
    }
  },
};