import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProductsListComponent } from './products-list.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [ProductsListComponent, CreateProductComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzPaginationModule,
    NzTagModule,
    NzTableModule,
    NzDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    NzAvatarModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzModalModule,
    NzFormModule,
    NzPopconfirmModule,
    RouterModule,
  ],
})
export class ProductsListModule {}
