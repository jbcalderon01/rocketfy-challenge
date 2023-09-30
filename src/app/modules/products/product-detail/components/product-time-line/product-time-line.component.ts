import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IProductChangeHistory } from 'src/app/interfaces';

@Component({
  selector: 'app-product-time-line',
  templateUrl: './product-time-line.component.html',
  styleUrls: ['./product-time-line.component.scss'],
})
export class ProductTimeLineComponent {
  @Input('isLoading')
  isLoading = false;

  @Input('dataChangeHistory')
  dataTimeLine: IProductChangeHistory[] = [];

  productActions: Record<string, string> = {
    PRODUCT_CREATED: 'Producto creado',
    PRODUCT_UPDATED: 'Producto actualizado',
  };

  formatDate(date: Date) {
    return moment(date).format('YYYY-MM-DD:HH:mm');
  }
}
