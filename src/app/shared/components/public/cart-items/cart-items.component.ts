import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../../core/services/cart/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { Cart } from '../../../models/Cart';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SizesAvailableComponent } from '../sizes-available/sizes-available.component';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../models/CartItem';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [MatButtonModule, ButtonModule, CardModule, InputNumberModule, FormsModule, DialogModule, SizesAvailableComponent, CommonModule
  ],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss',
})
export class CartItemsComponent {

 @Input() isSideCartOpen = true;

  cartServ = inject(CartService);
  currentCart!: Cart;
  private cartSubscription!: Subscription;

  visible: boolean = false;

  ngOnInit() {
    this.cartSubscription = this.cartServ.cart$.subscribe(cart => {
      this.currentCart = cart;
    });
  }

  showDialog(event: Event) {
    event.preventDefault()
    this.visible = true;
  }

  deleteItem(item: CartItem) {
    this.cartServ.removeItemFromCart(item);
  }

  

}
