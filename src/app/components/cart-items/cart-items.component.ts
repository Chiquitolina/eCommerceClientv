import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { Cart } from '../../models/Cart';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss',
})
export class CartItemsComponent {
  cartServ = inject(CartService);
  currentCart!: Cart;
  private cartSubscription!: Subscription;

  ngOnInit() {
    this.cartSubscription = this.cartServ.cart$.subscribe(cart => {
      this.currentCart = cart;
      console.log('Carrito actualizado:', this.currentCart);
    });
  }

}
