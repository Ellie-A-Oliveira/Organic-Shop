import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart.model';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @select((s: IAppState) => Object.values(s.cartState.cartItems)) cartItems: Observable<CartItem[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
