import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss'
})
export class CartItemsComponent {

  cartServ = inject(CartService)

}
