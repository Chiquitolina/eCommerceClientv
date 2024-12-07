import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

import { CartService } from '../../services/cart/cart.service';
import { PaymentsService } from '../../services/payments/payments.service';
import { CartItemsComponent } from '../public/cart-items/cart-items.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Cart } from '../../models/Cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CheckoutComponent, CartItemsComponent, MatStepperModule, MatButtonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  providers: [PaymentsService]
})
export class CheckoutComponent {

  dialogRef = inject(MatDialogRef<CheckoutComponent>)
  _formBuilder = inject(FormBuilder)
  cartSer = inject(CartService)
  private _paymentSer = inject(PaymentsService)

  currentCart!: Cart;
  private cartSubscription!: Subscription;

  isLinear = true;
  responser: boolean = false;
  url: string = '';

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  ngOnInit() {
    this.cartSubscription = this.cartSer.cart$.subscribe(cart => {
      this.currentCart = cart;
    });
  }

  public backToCart(): void {
    this.dialogRef.close();
  }

  public abrirPago() {
    window.open(this.url, '_blank');
  }

  generateOrder() {
    this.responser = false;
    this.cartSer.cart$.subscribe((cart) => {
      // Envías el valor del carrito (cart) a la solicitud HTTP
      this._paymentSer.createOrder(cart).subscribe((response: any) => {
        this.responser = true
        console.log('Orden creada:', response);
      });
    });

  }

  public onNext(event: MouseEvent): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto
    this.generateOrder(); // Llamar al método para generar la orden
  }

}
