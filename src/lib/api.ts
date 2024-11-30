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
  