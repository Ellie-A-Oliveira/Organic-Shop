import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentUser: Promise<SocialUser> | Promise<undefined>;
  loadingDone: boolean;

  constructor(
    private authService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.localStorageService.currentUser) {
      const user = JSON.parse(this.localStorageService.currentUser) as User;
      this.currentUser = Promise.resolve(user);
    }
  }

  signIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(gUser => {
        const isAdmin = gUser.email === 'leeiinadbr@gmail.com' ? true : false;
        const user = {
          ...gUser,
          isAdmin
        };

        this.currentUser = Promise.resolve(user);
        this.localStorageService.currentUser = JSON.stringify(user);
      });
  }

  signOut() {
    this.authService.authState
      .subscribe(
        user => {
          if (user) {
            this.authService.signOut();
          }
        }
      );

    if (this.localStorageService.currentUser) {
      this.localStorageService.removeUser();
    }

    this.currentUser = undefined;
    this.router.navigate(['/']);
  }
}
