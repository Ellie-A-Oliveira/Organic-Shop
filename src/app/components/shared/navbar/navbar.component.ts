import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @select((s: IAppState) => s.cartState.totalCartItems) totalItems: Observable<number>;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCartPreview() {
    const cartEl = document.getElementById('cart-preview');
    const cartToggler = document.getElementById('cart-toggler');

    if (cartEl.classList.contains('show')) {
      cartEl.classList.remove('show');
      cartToggler.classList.remove('cart-open');
      cartToggler.firstElementChild.classList.replace('cart-preview-open', 'cart-preview-closed');
    } else {
      cartEl.classList.add('show');
      cartToggler.classList.add('cart-open');
      cartToggler.firstElementChild.classList.replace('cart-preview-closed', 'cart-preview-open');
    }
  }
}
