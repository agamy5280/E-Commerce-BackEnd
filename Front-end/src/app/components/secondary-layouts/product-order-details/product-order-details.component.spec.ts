import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderDetailsComponent } from './product-order-details.component';

describe('ProductOrderDetailsComponent', () => {
  let component: ProductOrderDetailsComponent;
  let fixture: ComponentFixture<ProductOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOrderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
