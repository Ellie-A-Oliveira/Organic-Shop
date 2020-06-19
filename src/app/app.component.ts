import { Component, OnInit } from '@angular/core';
import { CartItem } from './models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'organic-shop';
  cart: CartItem[];

  constructor(
    private cartService: CartService
  ) {  }

  ngOnInit() {
    this.cart = this.cartService.items;
  }
}
