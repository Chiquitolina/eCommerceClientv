import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Product } from '../../models/Products';
import { PRODUCT_SIZES } from '../../common/constants';
import { FilterState } from '../../models/FiltersState';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { ArticlesDisplayComponent } from '../../components/articles-display/articles-display.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products/products.service';
import { CapitalizePipe } from '../../pipes/capitalize/capitalize.pipe';
import { AccordionFiltersComponent } from '../../components/accordion-filters/accordion-filters.component';
import { FiltersService } from '../../services/filters/filters.service';

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
  ],
  templateUrl: './shop-view.component.html',
  styleUrl: './shop-view.component.scss',
  providers: [ProductsService],
})
export class ShopViewComponent {
  productSer = inject(ProductsService);
  filterSer = inject(FiltersService)
  route = inject(ActivatedRoute);

  products: Product[] = [];

  filtersState: string = 'Hide';

  rangeValues: number[] = [];
  sizes: any[] = [];

  sidebarVisible = false;

  onDrawerToggle(opened: boolean) {
    this.filtersState = opened ? 'Hide' : 'Show';
  }

  category!: string;
  subcategory!: string;
  discount?: number | null;
  size?: number | null;
  priceMin?: number;
  priceMax?: number;

  ngOnInit() {
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
  }

  loadProducts(): void {
    this.products = [];

    // Solicitar productos usando el servicio
    this.productSer.getProducts(this.category, this.subcategory).subscribe({
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
}
