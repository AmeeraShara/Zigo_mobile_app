import axios from "axios";

export const API_URL = "http://192.168.100.169:3000/api";

export interface Product {
  id: number;
  code: string;
  description: string;
  po_description: string;
  min_w_rate: number;
  max_w_rate: number;
  max_r_rate: number;
  default_cost: number;
  default_price: number;
  commision: number | null;
  status: number;
  unit: number | null;
  pr_sr: number;
  supplier: number;
  category_name: string;
  primary_image: string | null;
  image_count: number;
}

export interface ProductImage {
  id: number;
  filename: string;
  url: string;
  public_url: string;
  is_primary: number;
  alt_text: string | null;
  created_at: string;
}

export interface ProductDetail extends Product {
  images: ProductImage[];
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response) {
    }
    return Promise.reject(error);
  },
);

export const productApi = {
  // Get products by category
  getProductsByCategory: async (categoryName: string): Promise<Product[]> => {
    try {
      const response = await api.get(
        `/products/category/${encodeURIComponent(categoryName)}`,
      );

      // Your backend returns { success: true, data: [...], message: '...' }
      if (response.data && response.data.success) {
        return response.data.data || [];
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else {
        return response.data?.data || [];
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  // Get product details by ID
  getProductById: async (id: number): Promise<ProductDetail> => {
    try {
      const response = await api.get(`/products/product/${id}`);

      // Your backend returns { success: true, data: {...}, message: '...' }
      if (response.data && response.data.success) {
        const product = response.data.data;
        // Ensure images is always an array
        if (!product.images) {
          product.images = [];
        }
        return product;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (params: {
    q?: string;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Product[]; pagination: any }> => {
    try {
      const response = await api.get("/products/search", { params });
      if (response.data && response.data.success) {
        return {
          data: response.data.data || [],
          pagination: response.data.pagination || {},
        };
      }
      return response.data || { data: [], pagination: {} };
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },
};

export default api;
