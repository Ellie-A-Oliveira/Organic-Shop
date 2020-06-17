// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule } from 'angularx-social-login'; // Check after

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CategoryPanelComponent } from './components/shared/category-panel/category-panel.component';
import { ItemsComponent } from './components/shared/items/items.component';
import { ItemComponent } from './components/shared/item/item.component';
import { AddToCartComponent } from './components/shared/add-to-cart/add-to-cart.component';
import { LoginComponent } from './components/shared/login/login.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

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
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    SocialLoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }