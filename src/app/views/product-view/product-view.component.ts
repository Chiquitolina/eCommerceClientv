import { Component, inject } from '@angular/core';
import { productSelectedAccordionObject } from '../../common/constants';
import { ProductsService } from '../../services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/CartItem';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatExpansionModule, MatIcon],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
  providers: [ProductsService]
})
export class ProductViewComponent {

  private _prodSer = inject(ProductsService)
  private _route = inject(ActivatedRoute)
  private _cartSer = inject(CartService)

  product: any;
  selectedImage!: string;
  selectedSize!: number;

  productSelectedAccordionObject = productSelectedAccordionObject;

  addProduct(cartItem: CartItem, productname: string) {
    this._cartSer.addItemToCart(cartItem);
   /* this._alertSer.showAlert(
      `¡Producto ${productname} añadido al carrito correctamente!`,
      'Cerrar',
      3000,
      'snackbar-success',
      productname
    );*/
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
          error: (error) => {
            console.error('Error fetching product:', error);
          },
        });
      }
    });
  }

  changeImage(image: string): void {
    this.selectedImage = image;
    console.log(image);
  }

  selectSize(size: number) {
    this.selectedSize = size;
    console.log(this.selectedSize)
  }

}
