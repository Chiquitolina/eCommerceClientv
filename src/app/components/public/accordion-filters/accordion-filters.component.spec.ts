import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionFiltersComponent } from './accordion-filters.component';

describe('AccordionFiltersComponent', () => {
  let component: AccordionFiltersComponent;
  let fixture: ComponentFixture<AccordionFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
