export interface Shop {
    id: number;
    name: string;
    description: string;
    logo: string;
  }
  
  export interface Product {
    id: number;
    shopId: number;
    name: string;
    price: number;
    stockLevel: number;
    description: string;
    image: string;
  }
  
  export interface StockStatus {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  }
  
  export interface DashboardStats {
    totalShops: number;
    totalProducts: number;
    totalStock: number;
    totalValue: number;
    stockStatus: StockStatus;
    topShops: Array<{
      id: number;
      name: string;
      stockLevel: number;
    }>;
  }