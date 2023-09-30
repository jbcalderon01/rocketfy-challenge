import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiProductsService } from 'src/app/services/api-products.service';
import { NzMessageService } from 'ng-zorro-antd/message';

const PRODUCT_ERRORS: Record<string, string> = {
  PRODUCT_ALREADY_EXIST: 'Este producto ya existe',
};

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
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
  isLoading = false;

  @Output('onOk')
  onOk = new EventEmitter();
  @Output('onCancel')
  onCancel = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private apiProduct: ApiProductsService,
    private message: NzMessageService
  ) {}

  get imageUrl() {
    return this.productForm.value.image_url;
  }

  handleSubmit() {
    if (this.isLoading) return;
    if (this.productForm.valid) {
      this.isLoading = true;
      this.apiProduct.createProduct(this.productForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.message.success('Producto creado correctamente');
          this.onOk.emit();
        },
        error: (err: any) => {
          this.message.error(
            PRODUCT_ERRORS[err.error.message] ?? 'Se ha producido un error'
          );
          this.isLoading = false;
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

  handleCancel() {
    if (this.isLoading) return;
    this.onCancel.emit();
  }

  onErrorImage(event: any) {
    event.target.src = this.imageSrcPlaceholder;
  }
}
