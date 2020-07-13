import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
    private router: Router,
    private userService: UserService
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

        if (this.userService.redirectUrl) {
          this.router.navigate([this.userService.redirectUrl]);
          this.userService.redirectUrl = null;
        }
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
