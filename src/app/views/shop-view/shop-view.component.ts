import { Component, inject, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ACCORDION_FILTERS, AccordionFilter } from '../../common/constants';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { ArticlesDisplayComponent } from '../../components/articles-display/articles-display.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/Products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-view',
  standalone: true,
  imports: [ArticlesDisplayComponent, CommonModule, MatButtonModule, ProductCardComponent, HttpClientModule, MatSidenavModule , MatExpansionModule, MatCheckboxModule, MatIcon, MatSliderModule,MatAccordion],
  templateUrl: './shop-view.component.html',
  styleUrl: './shop-view.component.scss',
  providers: [ProductsService]
})
export class ShopViewComponent {

  accordion = ViewChild(MatAccordion);
  productSer = inject(ProductsService)
  route = inject(ActivatedRoute)

  filtersState: string = 'Hide';
  products : Product[] = []
  
  accordionFilters : AccordionFilter[] = ACCORDION_FILTERS;

  onDrawerToggle(opened: boolean) {
    this.filtersState = opened ? 'Hide' : 'Show';
  }

  category: string | null = null;
  subcategory: string | null = null;

  
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.subcategory = params['subcategory'] || null; // Si no hay subcategoría, asigna null
      this.loadProducts();
    });

    this.productSer.getProducts(this.category, this.subcategory).subscribe({
      next: (data) => {
        this.products = data;
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  loadProducts(): void {
    console.log('Cargar productos para', this.category, this.subcategory);
    
  }

}
