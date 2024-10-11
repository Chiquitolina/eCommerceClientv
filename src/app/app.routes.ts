import { Routes } from '@angular/router';
import { MainViewComponent } from './views/main-view/main-view.component';
import { ProductViewComponent } from './views/product-view/product-view.component';
import { ShopViewComponent } from './views/shop-view/shop-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';

export const routes: Routes = [
    { path: '', component: MainViewComponent },
    { path: 'tienda/:category/:subcategory', component: ShopViewComponent },
    {path: 'product/:id', component: ProductViewComponent},
    { path: 'login', component: LoginViewComponent },

];
