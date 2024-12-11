import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterState } from '../../../shared/models/FiltersState';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  // Inicializa el BehaviorSubject con el estado inicial
  private initialFilters: FilterState = {
    sale: [],
    size: [],
    price: [],
  };

  // Inicializa el BehaviorSubject con el estado inicial
  private filters = new BehaviorSubject<FilterState>({
    ...this.initialFilters,
  });

  // Retorna el observable de los filtros
  getFilters(): Observable<FilterState> {
    return this.filters.asObservable();
  }

  getCurrentFilters(): FilterState {
    return this.filters.getValue(); // Devuelve el valor actual del BehaviorSubject
  }

  updateFilters(newFilters: Partial<FilterState>): void {
    this.filters.next({ ...this.filters.getValue(), ...newFilters });
  }
  
  cleanFilters(): void {
    this.filters.next({ ...this.initialFilters });
  }
}
