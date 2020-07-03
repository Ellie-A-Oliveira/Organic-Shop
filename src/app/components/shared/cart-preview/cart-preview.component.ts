import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { Observable, Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart.model';
import { ICartState } from 'src/app/stores/cart.store';
import * as actions from '../../../stores/cart.actions';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss']
})
export class CartPreviewComponent implements OnInit, OnDestroy {
  subs: Subscription[];
  @select((s: IAppState) => Object.values(s.cartState.cartItems)) cartItems: Observable<CartItem[]>;
  $totalPrice: number;

  constructor(
    private redux: NgRedux<ICartState>,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.subs = [
      this.fetchTotalPrice.subscribe(
        totalPrice => {
          this.$totalPrice = totalPrice;
        }
    )];
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  emptyCart() {
    this.redux.dispatch({ type: actions.REMOVE_CART_ITEMS });
  }

  get fetchTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}
