import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizesAvailableComponent } from './sizes-available.component';

describe('SizesAvailableComponent', () => {
  let component: SizesAvailableComponent;
  let fixture: ComponentFixture<SizesAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizesAvailableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizesAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
