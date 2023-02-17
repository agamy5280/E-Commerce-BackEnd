import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStarsComponent } from './product-stars.component';

describe('ProductStarsComponent', () => {
  let component: ProductStarsComponent;
  let fixture: ComponentFixture<ProductStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
