import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private localIp: string = 'http://localhost:3000';
  private currentIp: string = this.localIp;

  constructor(private http: HttpClient) {}

  // Get method
  private get(url: string) {
    return this.http.get(url);
  }

  // Post method
  private post(url: string, body: Object) {
    return this.http.post(url, body);
  }

  // Delete method
  private delete(url: string) {
    return this.http.delete(url);
  }

  // Login User
  public loginUser(cred: { email: string; password: string }) {
    const url = this.currentIp + '/user/login';
    return this.post(url, cred);
  }

  // Create user
  public createUser(cred: { email: string; password: string; name: string }) {
    const url = this.currentIp + '/user/register';

    // Mention the role
    cred['role'] = 'user';
    return this.post(url, cred);
  }
}
