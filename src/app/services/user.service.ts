import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  redirectUrl: string;

  constructor(private local: LocalStorageService) { }

  isLoggedIn() {
    if (this.local.currentUser) {
      return true;
    }
    return false;
  }

  isAdmin() {
    const user = JSON.parse(this.local.currentUser) as User;
    if (user.isAdmin) {
      return true;
    }
    return false;
  }

  currentUser() {
    if (this.isLoggedIn) {
      return this.local.currentUser;
    }
  }
}
