import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Result } from '../models/quiz.model';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private localIp: string = 'http://localhost:3000';
  private currentIp: string = this.localIp;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  // Get header
  private getHeader(): HttpHeaders {
    var header = new HttpHeaders();
    header = header.set('auth-token', this.auth.getToken());
    header = header.set('Accept', 'application/json');
    header = header.set('Content-Type', 'application/json');
    return header;
  }

  // Get method
  private get(url: string, options?: object): Observable<any> {
    return this.http
      .get(url, options)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Post method
  private post(url: string, body: object, options?: object): Observable<any> {
    return this.http
      .post(url, body, options)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Delete method
  private delete(url: string, options?: object): Observable<any> {
    return this.http
      .delete(url, options)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status !== 200) {
      this.snackBar.open(error.error, '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return throwError(error.error);
    }
  }

  // Login User
  public loginUser(cred: { email: string; password: string }): Observable<any> {
    const url = this.currentIp + '/user/login';
    return this.post(url, cred);
  }

  // Create user
  public createUser(cred: {
    email: string;
    password: string;
    name: string;
  }): Observable<any> {
    const url = this.currentIp + '/user/register';

    // Mention the role
    cred['role'] = 'user';
    return this.post(url, cred);
  }

  // Get quizzes
  public getAllQuiz(): Observable<any> {
    const url = this.currentIp + '/quiz';
    return this.get(url, { headers: this.getHeader() });
  }

  // Get a quiz
  public getAQuiz(id: string): Observable<any> {
    const url = this.currentIp + '/quiz/' + String(id);
    return this.get(url, { headers: this.getHeader() });
  }

  // Save a result
  public saveResult(result: Result): Observable<any> {
    const url = this.currentIp + '/result';
    return this.post(url, result, { headers: this.getHeader() });
  }

  // Get a Result
  public getAResult(id: string): Observable<any> {
    const url = this.currentIp + '/result/' + String(id);
    return this.get(url, { headers: this.getHeader() });
  }
}
