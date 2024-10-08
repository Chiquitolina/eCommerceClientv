import { Component, inject, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ACCORDION_FILTERS, AccordionFilter } from '../../common/constants';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { ArticlesDisplayComponent } from '../../components/articles-display/articles-display.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/Products';
import { ActivatedRoute } from '@angular/router';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { PRODUCT_SIZES } from '../../common/constants';
import { MatCheckboxChange } from '@angular/material/checkbox';

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
    MatSliderModule,
    MatAccordion,
    SliderModule,
    FormsModule,
  ],
  templateUrl: './shop-view.component.html',
  styleUrl: './shop-view.component.scss',
  providers: [ProductsService],
})
export class ShopViewComponent {

  accordion = ViewChild(MatAccordion);
  productSer = inject(ProductsService);
  route = inject(ActivatedRoute);

  filtersState: string = 'Hide';
  filtersApplied : any = []

  rangeValues: number[] = [20, 80];
  sizes: any[] = [];

  products: Product[] = [];

  accordionFilters: AccordionFilter[] = ACCORDION_FILTERS;

  onDrawerToggle(opened: boolean) {
    this.filtersState = opened ? 'Hide' : 'Show';
  }

  category: string | null = null;
  subcategory: string | null = null;

  ngOnInit() {
    // Suscribirse a los parámetros de la ruta y cargar productos cuando cambien
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.subcategory = params['subcategory'] || null;
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

        this.subcategory === 'calzado'
        ? (this.sizes = PRODUCT_SIZES.Calzados)
        : (this.sizes = PRODUCT_SIZES.Ropa);

        console.log(this.sizes)
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      },
    });
  }

  addOrRemoveSizeFromFiltersApplied(size: string | number): void {
    if (this.filtersApplied.includes(size)) {
      this.filtersApplied = this.filtersApplied.filter((element: string | number) => element !== size);
    } else {
      this.filtersApplied.push(size);
    }
  }

  onCheckboxChange(filter: string | number, event: MatCheckboxChange): void {
    if (!event.checked) {
      // Si el checkbox está desmarcado, elimina el filter del array
      this.filtersApplied = this.filtersApplied.filter((element: string | number) => element !== filter);
    }
  }
  
}
