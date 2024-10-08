import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopViewComponent } from './shop-view.component';

describe('ShopViewComponent', () => {
  let component: ShopViewComponent;
  let fixture: ComponentFixture<ShopViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
