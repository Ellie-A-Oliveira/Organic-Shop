import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { ICartState } from 'src/app/stores/cart.store';
import { convertObjtoArr } from '../../helper-functions/convertObjtoArr.helper';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  converter = convertObjtoArr;

  @select((s: IAppState) => s.cartState ) $cart: Observable<ICartState>;
  form;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      address: this.fb.group({
        street: [''],
        complement: [''],
        city: ['']
      }),
    });
  }

  get fetchTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  submit() {
    this.orderService.placeOrder(this.form.value);
    this.router.navigate(['thank-you']);
  }

}
