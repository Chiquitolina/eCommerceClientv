import { Component, inject, Input, Output, EventEmitter } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FiltersService } from '../../../core/services/filters/filters.service';

import { FilterState } from '../../../shared/models/FiltersState';
import { CapitalizePipe } from '../../../core/pipes/capitalize/capitalize.pipe';
import { SliderModule } from 'primeng/slider';

import {
  ACCORDION_FILTERS,
  AccordionFilter,
  AccordionFilters,
} from '../../../common/constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-accordion-filters',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionModule,
    MatCheckboxModule,
    CapitalizePipe,
    CommonModule,
    SliderModule,
    FormsModule,
    MatDividerModule
  ],
  templateUrl: './accordion-filters.component.html',
  styleUrl: './accordion-filters.component.scss',
})
export class AccordionFiltersComponent {
  @Input() sizesReceived?: any[];
  @Input() range!: number[];
  @Output() filtersChanged = new EventEmitter<any>(); // Crea un evento para emitir los filtros

  filterSer = inject(FiltersService);
  filters!: any;

  sizes: any[] = [];
  priceSliderState: boolean = false;

  accordionFilters: AccordionFilter[] = ACCORDION_FILTERS;

  selectedFilters = {
    sale: [],
    size: [],
    price: [],
  };

  ngOnInit() {
    this.filterSer.getFilters().subscribe((filters: FilterState) => {
      this.filters = Object.entries(filters).map(([key, value]) => ({
        key,
        value,
      }));
    });
  }

  addFilter(category: keyof FilterState, filter: any) {
    const currentFilters = this.filterSer.getCurrentFilters();

    const currentCategoryFilters = currentFilters[category] || [];

    const updatedCategoryFilters = currentCategoryFilters.includes(filter)
      ? currentCategoryFilters.filter((item: any) => item !== filter) // Elimina el filtro si ya está
      : [...currentCategoryFilters, filter]; // Agrega el filtro si no está

    this.filterSer.updateFilters({ [category]: updatedCategoryFilters });

    // Después de actualizar los filtros, emites el evento
    this.filtersChanged.emit(this.filterSer.getCurrentFilters());
  }

  managePriceSliderState(event: MatCheckboxChange) {
    this.priceSliderState = !this.priceSliderState;
  }
}
