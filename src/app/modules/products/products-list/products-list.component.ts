import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IProduct, IProductQueryParams } from 'src/app/interfaces';
import { ApiProductsService } from 'src/app/services/api-products.service';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  filters = this.formBuilder.group<IProductQueryParams>({
    name: undefined,
    tags: undefined,
    sku: undefined,
    price: undefined,
    quantity: undefined,
  });
  perPage = 5;
  page = 0;
  totalCount = 0;
  dataProducts: IProduct[] = [];
  isVisibleModalCreateProduct = false;
  isLoading = false;

  constructor(
    private apiProduct: ApiProductsService,
    private formBuilder: FormBuilder,
    private message: NzMessageService
  ) {}

  getProducts() {
    this.isLoading = true;
    this.apiProduct
      .getProducts({
        ...(<IProductQueryParams>this.filters.value),
        page: this.page,
        per_page: this.perPage,
      })
      .subscribe({
        next: (value) => {
          this.totalCount = value.total_count;
          this.page = value.page;
          this.perPage = value.per_page;
          this.dataProducts = value.data;
        },
        complete: () => {
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  showModal(): void {
    this.isVisibleModalCreateProduct = true;
  }

  handleOk(): void {
    this.isVisibleModalCreateProduct = false;
    this.getProducts();
  }

  handleCancel(): void {
    this.isVisibleModalCreateProduct = false;
  }

  handleClickFilter(): void {
    this.page = 0;
    this.getProducts();
  }
  handleChangePage(event: any) {
    this.page = event - 1;
    this.getProducts();
  }

  handleConfirmDeleteProduct(productId: string) {
    const messageId = this.message.loading('Eliminando producto...').messageId;
    this.apiProduct.deleteProduct(productId).subscribe({
      next: () => {
        this.message.remove(messageId);
        this.message.success('Producto eliminado correctamente');
        this.getProducts();
      },
      error: () => {
        this.message.error('Se ha producido un error');
      },
    });
  }
}
