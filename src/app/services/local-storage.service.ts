import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get currentUser() {
    return localStorage.getItem('user-token');
  }

  set currentUser(token) {
    localStorage.setItem('user-token', token);
  }

  removeUser() {
    localStorage.removeItem('user-token');
  }

  get cart() {
    return localStorage.getItem('local-cart');
  }

  set cart(cartObj) {
    localStorage.setItem('local-cart', cartObj);
  }

  removeCart() {
    localStorage.removeItem('local-cart');
  }
}
