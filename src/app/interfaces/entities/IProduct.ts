export interface IProduct {
  _id: string;
  name: string;
  description: string;
  sku: string;
  image_url: string;
  price: number;
  tags: string[];
  quantity: number;
  created_at: Date;
}

export type IProductQueryParams = {
  name?: string;
  sku?: string;
  price?: number;
  quantity?: number;
  tags?: string[];
  per_page?: number;
  page?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
};

export type CreateProductDto = Omit<IProduct, '_id'>;

export type UpdateProductDto = Partial<Omit<IProduct, '_id'>> & {
  _id: string;
};
