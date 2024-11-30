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