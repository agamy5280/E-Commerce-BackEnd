import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesHomepageComponent } from './categories-homepage.component';

describe('CategoriesHomepageComponent', () => {
  let component: CategoriesHomepageComponent;
  let fixture: ComponentFixture<CategoriesHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
