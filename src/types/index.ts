export interface Course {
  id: number;
  title: string;
  instructor: string;
  level: string;
  instrument: string;
  price: number;
  duration: string;
  students: number;
  rating: number;
  description: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviews: number;
  stock: number;
  badge?: string | null;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type UserRole = 'guest' | 'member' | 'instructor' | 'admin';
