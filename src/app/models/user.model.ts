import { SocialUser } from 'angularx-social-login';

export interface User extends SocialUser {
    isAdmin: boolean;
}
