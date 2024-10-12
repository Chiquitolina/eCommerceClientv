import { Component, inject, Input } from '@angular/core';

import { MatAccordion } from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FiltersService } from '../../filters.service';

import { FilterState } from '../../models/FiltersState';
import { CapitalizePipe } from '../../pipes/capitalize/capitalize.pipe';
import { SliderModule } from 'primeng/slider';

import { ACCORDION_FILTERS, AccordionFilter, AccordionFilters } from '../../common/constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accordion-filters',
  standalone: true,
  imports: [MatAccordion, MatExpansionModule, MatCheckboxModule, CapitalizePipe, CommonModule, SliderModule, FormsModule],
  templateUrl: './accordion-filters.component.html',
  styleUrl: './accordion-filters.component.scss'
})
export class AccordionFiltersComponent {

  @Input() sizesReceived?: any[];
  @Input() range!: number[];

  filterSer = inject(FiltersService);
  filters!: any;
  filtersApplied: any = [];

  sizes: any[] = [];
  priceSliderState: boolean = false;

  accordionFilters: AccordionFilter[] = ACCORDION_FILTERS;

  ngOnInit() {
    this.filterSer.getFilters().subscribe((filters: FilterState) => {
      this.filters = Object.entries(filters).map(([key, value]) => ({ key, value }));
      console.log('Filtros actualizados:', this.filters);
    });
  }

  addFilter(category: string, filter: any) {
    // Obtén el valor actual de los filtros
    const currentFilters = this.filterSer.getCurrentFilters(); // Llama al nuevo método
    const currentSizeFilters = currentFilters.size || []; // Accede al array de tamaños
  
    // Verifica si el filtro ya está, si está lo quita, si no lo agrega
    const updatedSizeFilters = currentSizeFilters.includes(filter)
      ? currentSizeFilters.filter((size: number) => size !== filter) // Elimina el filtro si ya está
      : [...currentSizeFilters, filter]; // Agrega el filtro si no está
  
    // Actualiza el estado con el nuevo array de tamaños
    this.filterSer.updateFilters({ [category]: updatedSizeFilters });
  }

  addOrRemoveSizeFromFiltersApplied(size: string | number): void {
    if (this.filtersApplied.includes(size)) {
      this.filtersApplied = this.filtersApplied.filter(
        (element: string | number) => element !== size
      );
    } else {
      this.filtersApplied.push(size);
    }
  }

  onCheckboxChange(filter: string | number, event: MatCheckboxChange): void {
    if (!event.checked) {
      this.filtersApplied = this.filtersApplied.filter(
        (element: string | number) => element !== filter
      );
    }
  }

  managePriceSliderState(event: MatCheckboxChange) {
    this.priceSliderState = !this.priceSliderState;
  }


}
