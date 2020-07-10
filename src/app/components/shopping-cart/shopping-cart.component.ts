import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  @select((s: IAppState) => Object.values(s.cartState.cartItems)) cartItems: Observable<CartItem[]>;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  get fetchTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}
