import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTimeLineComponent } from './product-time-line.component';

describe('ProductTimeLineComponent', () => {
  let component: ProductTimeLineComponent;
  let fixture: ComponentFixture<ProductTimeLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTimeLineComponent]
    });
    fixture = TestBed.createComponent(ProductTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
