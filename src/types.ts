/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductSize {
  id: string;
  name: string;
  price: number;
  pieceCount: number;
  weight?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  isNew?: boolean;
  ingredients: string[];
  weight: string; // e.g. "500 جرام"
  pieceCount: number; // e.g. 24
  sweetnessLevel: 1 | 2 | 3; // 1: خفيف, 2: معتدل, 3: حلو غني
  sweetnessDesc: string; // e.g. "معتدل ولذيذ"
  sizes?: ProductSize[];
  flavors?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string; // Lucide icon identifier
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}

export interface DeliveryDetails {
  customerName: string;
  phoneNumber: string;
  city: string;
  address: string;
  deliveryMethod: "delivery" | "pickup";
  paymentMethod: "cash_on_delivery" | "bank_transfer";
  notes?: string;
}
