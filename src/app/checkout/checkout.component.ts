import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

import { MatDialogRef } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

import { CheckProductsComponent } from './components/check-products/check-products.component';


import { Cart } from '../shared/models/Cart';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { InputTextModule } from 'primeng/inputtext';
import { CartService } from '../core/services/cart/cart.service';
import { PaymentsService } from '../core/services/payments/payments.service';
import { CartItemsComponent } from '../shared/components/public/cart-items/cart-items.component';
import { GeoNamesService } from '../core/services/geo-names/geo-names.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CheckoutComponent,
    CartItemsComponent,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    CheckProductsComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  providers: [PaymentsService],
})
export class CheckoutComponent {

  dialogRef = inject(MatDialogRef<CheckoutComponent>);
  cartSer = inject(CartService);
  private _paymentSer = inject(PaymentsService);
  private _geoServ = inject(GeoNamesService)

  currentCart!: Cart;
  private cartSubscription!: Subscription;

  responser: boolean = false;
  url: string = '';
  showReviewedError: boolean = false;

  countries!: any;
  selectedCountry: any;
  states: any;
  selectedState:any;
  cities: any;

  dataReviewedForm: FormGroup = new FormGroup({
    firstCtrl: new FormControl(false, Validators.requiredTrue),
  });

  deliveryDataForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
  });

  paymentDataForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.cartSubscription = this.cartSer.cart$.subscribe((cart) => {
      this.currentCart = cart;
    });
  }

  getCountries() {
    this._geoServ.getCountryList().subscribe({
      next: (data) => {
        this.countries = data.geonames;
        console.log(data)
      },
      error: () => {}
    })
  }

  onCountryChange(event: any): void {
    const geonameId = event.value;
    if (geonameId) {
      this.getStatesByCountry(geonameId);
    } else {
      // Limpiar los estados si no se selecciona ningún país
      this.states = [];
    }
  }

  getStatesByCountry(geonameId: number) {
    this._geoServ.getStatesByCountry(geonameId).subscribe({
      next: (data) => {
        this.states = data.geonames;
      },
      error: () => {}
    })
  }

  onStateChange(event: any): void {
    const geonameId = encodeURIComponent(event.value);
    if (geonameId) {
      this.getCitiesByStates(geonameId);
    } else {
      // Limpiar los estados si no se selecciona ningún país
      this.states = [];
    }
  }

  getCitiesByStates(stateName: string) {
    this._geoServ.getCitiesByState(stateName).subscribe({
      next: (data) => {
        this.cities = data.geonames;
        console.log(data.geonames)
      },
      error: () => {}
    })
  }

  backToCart(): void {
    this.dialogRef.close();
  }

  abrirPago() {
    window.open(this.url, '_blank');
  }

  generateOrder() {
    this.responser = false;
    this.cartSer.cart$.subscribe((cart) => {
      // Envías el valor del carrito (cart) a la solicitud HTTP
      this._paymentSer.createOrder(cart).subscribe((response: any) => {
        this.responser = true;
        console.log('Orden creada:', response);
      });
    });
  }

  onNext(event: MouseEvent): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto
    /*   this.generateOrder(); // Llamar al método para generar la orden*/
  }

  toStepTwo() {
   if (this.dataReviewedForm.get('firstCtrl')?.value == false) {
    this.showReviewedError = true;
    }
  }

}
