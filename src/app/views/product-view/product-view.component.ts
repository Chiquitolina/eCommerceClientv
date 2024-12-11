import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { productSelectedAccordionObject } from '../../common/constants';
import { CartItem } from '../../shared/models/CartItem';

import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';

import { DiscountPricePipe } from '../../core/pipes/discountPrice/discount-price.pipe';

import { MatIcon } from '@angular/material/icon';

import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';

import { SizesAvailableComponent } from '../../shared/components/public/sizes-available/sizes-available.component';
@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    DiscountPricePipe,
    RatingModule,
    FormsModule,
    SizesAvailableComponent,
    CardModule,
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
  providers: [ProductsService],
})
export class ProductViewComponent {
  private _prodSer = inject(ProductsService);
  private _route = inject(ActivatedRoute);
  private _cartSer = inject(CartService);

  product: any;
  selectedImage!: string;
  selectedSize!: number;

  value!: number;

  value1: number = 20;
  value2: number = 10.5;
  value3: number = 25;

  productSelectedAccordionObject = productSelectedAccordionObject;

  addProduct(cartItem: CartItem, productname: string) {
    this._cartSer.addItemToCart(cartItem);
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this._prodSer.getProductById(productId).subscribe({
          next: (data) => {
            this.product = data;
            this.selectedImage = this.product.image;
          },
        });
      }
    });
  }

  changeImage(image: string): void {
    this.selectedImage = image;
    console.log(image);
  }

  onSizedChange(value: number): void {
    this.selectedSize = value;
    console.log('selectedsize:', value)  
  }
  
}
