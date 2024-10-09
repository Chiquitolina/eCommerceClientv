import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Product } from '../../models/Products';
import { ACCORDION_FILTERS, AccordionFilter } from '../../common/constants';
import { PRODUCT_SIZES } from '../../common/constants';

import { MatAccordion } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { SliderModule } from 'primeng/slider';

import { ArticlesDisplayComponent } from '../../components/articles-display/articles-display.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products/products.service';
import { CapitalizePipe } from '../../pipes/capitalize/capitalize.pipe';

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
    MatExpansionModule,
    MatCheckboxModule,
    MatIcon,
    MatAccordion,
    SliderModule,
    FormsModule,
    CapitalizePipe,
  ],
  templateUrl: './shop-view.component.html',
  styleUrl: './shop-view.component.scss',
  providers: [ProductsService],
})
export class ShopViewComponent {
  accordion = ViewChild(MatAccordion);
  productSer = inject(ProductsService);
  route = inject(ActivatedRoute);

  products: Product[] = [];

  filtersState: string = 'Hide';
  filtersApplied: any = [];

  rangeValues: number[] = [];
  priceSliderState : boolean = false;
  sizes: any[] = [];

  accordionFilters: AccordionFilter[] = ACCORDION_FILTERS;

  sidebarVisible = false;

  onDrawerToggle(opened: boolean) {
    this.filtersState = opened ? 'Hide' : 'Show';
  }

  category: string | null = null;
  subcategory: string | null = null;

  ngOnInit() {
    // Suscribirse a los parámetros de la ruta y cargar productos cuando cambien
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.subcategory = params['subcategory'];
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.products = [];

    console.log('Cargando productos para:', this.category, this.subcategory);

    // Solicitar productos usando el servicio
    this.productSer.getProducts(this.category, this.subcategory).subscribe({
      next: (data) => {
        this.products = data;
        console.log('Productos cargados:', data);

        this.rangeValues = [0, this.getMaxProductPrice()]

        this.subcategory === 'calzado'
          ? (this.sizes = PRODUCT_SIZES.Calzados)
          : (this.sizes = PRODUCT_SIZES.Ropa);

        console.log(this.sizes);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      },
    });
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
    this.priceSliderState = !this.priceSliderState
  }

  getMaxProductPrice() {
    if (this.products.length == 0) {
      return 0;
    }
    
    return this.products.reduce((prev, current) => {
      return (prev.price > current.price) ? prev : current;
    }).price;
  }

}
