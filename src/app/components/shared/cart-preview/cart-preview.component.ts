import { Component, OnInit, OnDestroy, NgModule, Input } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import * as actions from '../../../stores/cart.actions';
import { Observable, Subscription } from 'rxjs';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { EmptyCartConsentComponent } from '../../empty-cart-consent/empty-cart-consent.component';
import { ICartState } from 'src/app/stores/cart.store';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.scss'],
})
export class CartPreviewComponent implements OnInit, OnDestroy {
  @Input('closePreviewFRef') closePreviewF;
  subs: Subscription[];

  @select((s: IAppState) => Object.values(s.cartState.cartItems)) cartItems: Observable<CartItem[]>;
  $totalPrice: number;

  emptyCartConsent: boolean;

  constructor(
    private redux: NgRedux<ICartState>,
    private cartService: CartService,
    private dialog: MatDialog,
    private localSt: LocalStorageService
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
    const dialogRef = this.dialog.open(EmptyCartConsentComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(
      (consent: boolean | undefined) => {
        if (consent) {
          this.redux.dispatch({ type: actions.REMOVE_CART_ITEMS });
          this.localSt.removeCart();
        }
      }
    );
  }

  get fetchTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}
