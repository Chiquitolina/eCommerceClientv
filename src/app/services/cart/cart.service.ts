import { Injectable } from '@angular/core';
import { Cart } from '../../models/Cart';
import { CartItem } from '../../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cart: Cart = {
    items: [],
    finalPrice: 0,
    totalItems: 0,
  };

  public addItemToCart(cartItem: CartItem): boolean {
    const foundItem = this.cart.items.find(
      (item) => item.product.name === cartItem.product.name
    );

    if (foundItem) {
      foundItem.cantidad++;
    } else {
      this.cart.items.push(cartItem);
    }
    this.cart.finalPrice += Number(cartItem.product.price);
    return !!foundItem;
  }

  public removeItemFromCart(itemcart: CartItem, side?: any): boolean {
    const indexItem = this.cart.items.findIndex(
      (item) => item.product.name === itemcart.product.name
    );

    if (indexItem !== -1) {
      this.cart.items.splice(indexItem, 1);
      this.cart.finalPrice -= itemcart.product.price * itemcart.cantidad;
      if (this.cart.items.length === 0 && side) {
        side.close();
      }
      return true;
    }
    return false;
  }

  public cleanCart(): void {
    this.cart = {
      items: [],
      finalPrice: 0,
      totalItems: 0,
    };
  }

}
