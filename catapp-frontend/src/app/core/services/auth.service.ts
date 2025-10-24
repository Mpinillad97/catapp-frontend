import { Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginResponse, User } from '../models/auth';

const TOKEN_KEY = 'catapp_token';
const USER_KEY  = 'catapp_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: User | null = this.loadUser();

  constructor(private api: AuthApiService) {}

  get user(): User | null { return this._user; }
  get token(): string | null { return localStorage.getItem(TOKEN_KEY); }
  get isLoggedIn(): boolean { return !!this.token; }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.api.login(email, password).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        this._user = res.user;
      })
    );
  }

  register(name: string, email: string, password: string) {
    return this.api.register(name, email, password);
  }

  me() { return this.api.me(); }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user = null;
  }

  private loadUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) as User : null;
  }
}
