import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
const AUTH_API = 'http://localhost:3000/api/avocat/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AvocatService {

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) { }
  user = this.tokenStorageService.getUser();

  profile(file): Observable<any> {
    const header = new HttpHeaders();
    const options = { 
      reportProgress: true,
      headers: header
    };
    return this.http.post(AUTH_API + 'profile', file, options);
  
  }
  

  getprofile(): Observable<any> {
    return this.http.post(AUTH_API + 'getprofile', {
        userid: this.user._id
    }, httpOptions);
  }

  getprofilee(id): Observable<any> {
    return this.http.post(AUTH_API + 'getprofile', {
        userid: id
    }, httpOptions);
  }
  getAll(): Observable<any> {
    return this.http.get(AUTH_API + 'getAll');
  }


}
