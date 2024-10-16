import { Component, inject } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from '../../services/products/products.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-articles-display',
  standalone: true,
  imports: [MatProgressSpinnerModule, ProductCardComponent, MatCardModule, CommonModule, CarouselModule, ButtonModule],
  templateUrl: './articles-display.component.html',
  styleUrl: './articles-display.component.scss',
  providers: [ProductsService]
})
export class ArticlesDisplayComponent {

  _prodSer = inject(ProductsService)

  responsiveOptions: any[] | undefined;

  products: any[] = [];
  isLoading!: boolean;

  ngOnInit(): void {
    this.loadProducts(); // Llama a la función loadProducts() cuando se inicialice el componente

    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '1100px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  
  loadProducts() {
    this.isLoading = true;
    
    this._prodSer.getProducts(null, null).subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = true ;
        console.log('Products loaded successfully:', products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false; // Puedes manejar el estado de carga aquí también
      },
      complete: () => {
        console.log('Product loading completed');
      }
    });

      // Simula una petición de datos con un retardo
      setTimeout(() => {
        this.isLoading = false;
      }, 2000); // Simula una carga de 3 segundos
  }

}
