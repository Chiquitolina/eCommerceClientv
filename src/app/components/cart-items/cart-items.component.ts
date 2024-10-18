import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { Cart } from '../../models/Cart';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [MatButtonModule, ButtonModule, InputNumberModule, FormsModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss',
})
export class CartItemsComponent {
  cartServ = inject(CartService);
  currentCart!: Cart;
  private cartSubscription!: Subscription;

  value1: number = 50;

  ngOnInit() {
    this.cartSubscription = this.cartServ.cart$.subscribe(cart => {
      this.currentCart = cart;
    });
  }

}
