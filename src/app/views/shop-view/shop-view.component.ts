import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Product } from '../../models/Products';
import { PRODUCT_SIZES } from '../../common/constants';
import { FilterState } from '../../models/FiltersState';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { ArticlesDisplayComponent } from '../../components/public/articles-display/articles-display.component';
import { ProductCardComponent } from '../../components/public/product-card/product-card.component';
import { ProductsService } from '../../services/products/products.service';
import { CapitalizePipe } from '../../pipes/capitalize/capitalize.pipe';
import { AccordionFiltersComponent } from '../../components/public/accordion-filters/accordion-filters.component';
import { FiltersService } from '../../services/filters/filters.service';
import { ReplaceCharPipe } from '../../pipes/replaceChar/replace-char.pipe';

@Component({
  selector: 'app-shop-view',
  standalone: true,
  imports: [
    ArticlesDisplayComponent,
    CommonModule,
    MatButtonModule,
    ProductCardComponent,
    HttpClientModule,
    MatSidenavModule,
    MatIcon,
    FormsModule,
    CapitalizePipe,
    AccordionFiltersComponent,
    ReplaceCharPipe
  ],
  templateUrl: './shop-view.component.html',
  styleUrl: './shop-view.component.scss',
  providers: [ProductsService],
})
export class ShopViewComponent {
  productSer = inject(ProductsService);
  filterSer = inject(FiltersService)
  route = inject(ActivatedRoute);
  router = inject(Router)

  products: Product[] = [];

  filtersState: string = 'Hide';

  rangeValues: number[] = [];
  sizes: any[] = [];

  sidebarVisible = false;

  category!: string;
  subcategory!: string;
  discount?: number | null;
  size?: number | null;
  priceMin?: number;
  priceMax?: number;

  isLoading!: boolean;

  ngOnInit() {

    this.isLoading = true;
    // Suscribirse a los parámetros de la ruta y cargar productos cuando cambien
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.subcategory = params['subcategory'];
      this.loadProducts();
    });

    // Obtener query parameters
    this.route.queryParams.subscribe((queryParams) => {
      this.discount = queryParams['discount']
        ? Number(queryParams['discount'])
        : null;
      this.size = queryParams['size'] ? Number(queryParams['size']) : null;
      this.priceMin = queryParams['price_min']
        ? Number(queryParams['price_min'])
        : 0;
      this.priceMax = queryParams['price_max']
        ? Number(queryParams['price_max'])
        : Infinity;
      this.loadProducts();
    });

    // Simula una petición de datos con un retardo
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simula una carga de 3 segundos
  }

    loadProducts(): void {
      this.products = [];
  
      // Obtener los filtros seleccionados
      const selectedFilters = this.filterSer.getCurrentFilters();

      const sizeFilters = selectedFilters.size ? selectedFilters.size.map(size => size.toString()) : [];
      const saleFilters = selectedFilters.sale ? selectedFilters.sale.map(size => size.toString()) : [];
  
      // Solicitar productos usando el servicio, pasando también los filtros
      this.productSer.getProducts(this.category, this.subcategory, {
        sale: saleFilters,
        size: sizeFilters,
        price: selectedFilters.price,
      }).subscribe({
        next: (data) => {
          this.products = data;
  
          this.rangeValues = [0, this.getMaxProductPrice()];
  
          this.subcategory === 'calzado'
            ? (this.sizes = PRODUCT_SIZES.Calzados)
            : (this.sizes = PRODUCT_SIZES.Ropa);
        },
        error: (error) => {
          console.error('Error al cargar productos:', error);
        },
      });
  }

  getMaxProductPrice() {
    if (this.products.length == 0) {
      return 0;
    }

    return this.products.reduce((prev, current) => {
      return prev.price > current.price ? prev : current;
    }).price;
  }

  onFiltersChanged(newFilters: any) {
    console.log("New Filters:", newFilters); // Agrega esta línea para depurar
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newFilters,
      queryParamsHandling: 'merge' // Mantiene los query params existentes y agrega o actualiza los nuevos
    });
  }

  onDrawerToggle(opened: boolean) {
    this.filtersState = opened ? 'Esconder' : 'Mostrar';
  }

  cleanFilters() {
    this.filterSer.cleanFilters();
    this.loadProducts()
  }
}
