import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './modules/products/products-list/products-list.component';
import { ProductDetailComponent } from './modules/products/product-detail/product-detail.component';
import { ProductsListModule } from './modules/products/products-list/products-list.module';
import { ProductDetailModule } from './modules/products/product-detail/product-detail.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProductsListModule,
    ProductDetailModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
