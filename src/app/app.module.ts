// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CategoryPanelComponent } from './components/shared/category-panel/category-panel.component';
import { ItemsComponent } from './components/shared/items/items.component';
import { ItemComponent } from './components/shared/item/item.component';
import { AddToCartComponent } from './components/shared/add-to-cart/add-to-cart.component';
import { LoginComponent } from './components/shared/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { environment } from 'src/environments/environment';

// Redux
import { rootReducer, INITIAL_STATE, IAppState } from './store';
import { CartPreviewComponent } from './components/shared/cart-preview/cart-preview.component';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Social Login
import { SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { AdminComponent } from './components/admin/admin.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EmptyCartConsentComponent } from './components/empty-cart-consent/empty-cart-consent.component';
import { OrderCompleteComponent } from './components/order-complete/order-complete.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryPanelComponent,
    ItemsComponent,
    ItemComponent,
    AddToCartComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    CartPreviewComponent,
    AdminComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    EmptyCartConsentComponent,
    OrderCompleteComponent,
    MyOrdersComponent,
    ViewOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    SocialLoginModule,
    NgReduxModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '251278277942-3qvc4p0egq3n8mgetjao0i04l905o6dl.apps.googleusercontent.com'
            ),
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    const enhancer = isDevMode() ? [devToolsEnhancer({})] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancer);
  }
}
