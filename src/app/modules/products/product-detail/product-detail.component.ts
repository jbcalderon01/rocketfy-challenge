import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IProduct, IProductChangeHistory } from 'src/app/interfaces';
import { ApiProductsService } from 'src/app/services/api-products.service';

const PRODUCT_ERRORS: Record<string, string> = {
  PRODUCT_SKU_ALREADY_EXIST: 'El SKU de este producto ya existe',
};

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  imageSrcPlaceholder = 'assets/placeholder-image.jpg';
  productForm: FormGroup = this.formBuilder.group({
    image_url: ['', Validators.required],
    name: ['', Validators.required],
    sku: ['', Validators.required],
    quantity: ['', Validators.required],
    price: ['', Validators.required],
    tags: [[], Validators.required],
    description: ['', Validators.required],
  });
  isOpenModalProductTimeLine = false;
  dataProduct?: IProduct;
  dataProductHistoryChange: IProductChangeHistory[] = [];
  isLoadingChangeHistory = false;
  isLoadingUpdate = false;
  isLoading = false;

  get imageUrl() {
    return this.productForm.value.image_url;
  }

  constructor(
    private formBuilder: FormBuilder,
    private apiProduct: ApiProductsService,
    private message: NzMessageService,
    private modal: NzModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.getProduct(params['id']);
      },
    });
  }
  getProduct(productId: string) {
    this.isLoading = true;
    this.apiProduct.getProduct(productId).subscribe({
      next: (product) => {
        this.isLoading = false;
        this.dataProduct = product;
        this.productForm.reset(product);
      },
      error: (err) => {
        this.isLoading = false;
        this.message.error(err.message);
        this.router.navigateByUrl('/products');
      },
    });
  }

  deleteProduct() {
    if (this.isLoadingUpdate) return;
    const messageId = this.message.loading('Eliminando producto...').messageId;
    this.apiProduct.deleteProduct(this.dataProduct!._id).subscribe({
      next: () => {
        this.message.remove(messageId);
        this.message.success('Producto eliminado correctamente');
        this.router.navigateByUrl('/products');
      },
      error: () => {
        this.message.error('Se ha producido un error');
      },
    });
  }
  handleClickDeleteProduct() {
    this.modal.confirm({
      nzTitle: '¿Esta seguro que quiere eliminar este producto?',
      nzOkText: 'Confirmar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteProduct(),
      nzCancelText: 'Cancelar',
    });
  }

  showModalProductTimeline() {
    this.isLoadingChangeHistory = true;
    this.apiProduct.getProductChangeHistory(this.dataProduct!._id).subscribe({
      next: (productChangeHistory) => {
        this.dataProductHistoryChange = productChangeHistory;
        this.isLoadingChangeHistory = false;
      },
      error: (err) => {
        this.message.error(err.message ?? 'Se ha producido un error');
        this.isLoadingChangeHistory = false;
      },
    });
    this.isOpenModalProductTimeLine = true;
  }

  handleModalProductTimeLine() {
    this.isOpenModalProductTimeLine = !this.isOpenModalProductTimeLine;
  }

  onErrorImage(event: any) {
    event.target.src = this.imageSrcPlaceholder;
  }

  updateProduct() {
    if (this.isLoadingUpdate) return;
    if (this.productForm.valid) {
      this.isLoadingUpdate = true;
      const updateObj = {
        ...this.productForm.value,
        _id: this.dataProduct!._id,
      };
      this.apiProduct.updateProduct(updateObj).subscribe({
        next: () => {
          this.isLoadingUpdate = false;
          this.message.success('Producto actualizado correctamente');
          this.getProduct(this.dataProduct!._id);
        },
        error: (err: any) => {
          this.message.error(
            PRODUCT_ERRORS[err.error.message] ?? 'Se ha producido un error'
          );
          this.isLoadingUpdate = false;
        },
      });
    } else {
      Object.values(this.productForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
