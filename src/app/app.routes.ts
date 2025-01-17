import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './views/main-view/main-view.component';
import { ProductViewComponent } from './views/product-view/product-view.component';
import { ShopViewComponent } from './shop/shop-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { AdminViewComponent } from './views/admin-view/admin-view.component';

export const routes: Routes = [
    { path: '', component: MainViewComponent },
    { path: 'tienda/:category/:subcategory', component: ShopViewComponent },
    { path: 'product/:id', component: ProductViewComponent},
    { path: 'login', component: LoginViewComponent },
    { path: 'admin', component: AdminViewComponent}
];

