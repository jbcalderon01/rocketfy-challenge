import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import {
  CreateProductDto,
  IProduct,
  IProductChangeHistory,
  IProductQueryParams,
  TPagination,
  UpdateProductDto,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiProductsService {
  private baseUrl = environment.productApi;
  constructor(private http: HttpClient) {}
  buildQueryString(params: Record<string, unknown>): string {
    const localParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          if (value.length) {
            localParams.append(key, JSON.stringify(value));
          }
        } else {
          localParams.append(key, value as string);
        }
      }
    });

    return localParams.toString();
  }

  getProducts(
    filters?: IProductQueryParams
  ): Observable<TPagination<IProduct>> {
    const url = `${this.baseUrl}/products?${this.buildQueryString(
      filters ?? {}
    )}`;
    return this.http.get<TPagination<IProduct>>(url);
  }

  createProduct(data: CreateProductDto) {
    const url = `${this.baseUrl}/products`;
    return this.http.post<IProduct>(url, data);
  }
  updateProduct(data: UpdateProductDto) {
    const url = `${this.baseUrl}/products/${data._id}`;
    return this.http.put<IProduct>(url, data);
  }

  deleteProduct(productId: string) {
    const url = `${this.baseUrl}/products/${productId}`;
    return this.http.delete(url);
  }

  getProduct(productId: string) {
    const url = `${this.baseUrl}/products/${productId}`;
    return this.http.get<IProduct>(url);
  }
  getProductChangeHistory(productId: string) {
    const url = `${this.baseUrl}/products/${productId}/product-change-histories`;
    return this.http.get<IProductChangeHistory[]>(url);
  }
}
