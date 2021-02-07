import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_TOKEN_STRING = 'auth-token';

  constructor() {}

  // Get token
  public async getToken(): Promise<string> {
    return await localStorage.getItem(this.AUTH_TOKEN_STRING);
  }

  // Set token
  public setToken(token: string) {
    localStorage.setItem(this.AUTH_TOKEN_STRING, token);
  }

  // Get token data
  public async getTokendata() {
    const token = await this.getToken();
    const data = jwt_decode(token);
    return data;
  }
}
