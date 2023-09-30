import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailComponent } from './product-detail.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { ProductTimeLineComponent } from './components/product-time-line/product-time-line.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductDetailComponent, ProductTimeLineComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzTagModule,
    NzDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzModalModule,
    NzFormModule,
    NzIconModule,
    NzTimelineModule,
    RouterModule,
  ],
})
export class ProductDetailModule {}
