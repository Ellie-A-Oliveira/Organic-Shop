import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { LoginComponent } from './components/shared/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { NewProductComponent } from './components/new-product/new-product.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'thank-you', component: OrderCompleteComponent, canActivate: [AuthGuard] },
  { path: 'my', children: [
    { path: '', pathMatch: 'full', redirectTo: 'orders' },
    { path: 'orders', component: MyOrdersComponent }
  ], canActivate: [AuthGuard] },
  { path: 'admin', children: [
    { path: '', pathMatch: 'full', redirectTo: 'orders' },
    { path: 'orders', component: AdminOrdersComponent },
    { path: 'products', component: AdminProductsComponent, children: [
      { path: 'edit/:itemId', component: EditProductComponent },
      { path: 'new', component: NewProductComponent },
    ] },
  ], canActivate: [AuthGuard, AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
