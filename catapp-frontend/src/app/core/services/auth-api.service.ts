import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, User } from '../models/auth';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private base = '/api';
  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string): Observable<User> {
    const params = new HttpParams().set('name', name).set('email', email).set('password', password);
    return this.http.get<User>(`${this.base}/register`, { params });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.get<LoginResponse>(`${this.base}/login`, { params });
  }

  me(): Observable<any> {
    return this.http.get(`${this.base}/me`);
  }
}
