export enum ProductActions {
  PRODUCT_CREATED = 'PRODUCT_CREATED',
  PRODUCT_UPDATED = 'PRODUCT_UPDATED',
}

export interface IProductChangeHistory {
  _id: string;
  product_id: string;
  action: ProductActions;
  quantity: number;
  price: number;
  timestamp: Date;
}
