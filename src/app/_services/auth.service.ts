import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  resetPasswordMail(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'resetPasswordMail', credentials, httpOptions);
  }
  verifCode(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'verifCode/' + credentials, null, httpOptions);
  }
  verifEmail(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'verifEmail', credentials, httpOptions);
  }
  updatePassword(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'updatePassword', credentials, httpOptions);
  }
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }
  
  loginGoogle(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'loginGoogle/' + credentials, null, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      email: user.email,
      password: user.password,
      roles : user.roles
    }, httpOptions);
  }
}
