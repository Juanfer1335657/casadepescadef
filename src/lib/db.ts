import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default sql;

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  created_at: Date;
}

export interface ProductWithImages extends Product {
  images: ProductImage[];
}