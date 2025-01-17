import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckProductsComponent } from './check-products.component';

describe('CheckProductsComponent', () => {
  let component: CheckProductsComponent;
  let fixture: ComponentFixture<CheckProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
