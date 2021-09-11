import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
const AUTH_API = 'http://localhost:3000/api/suivie/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class SuivieService {
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }
user = this.tokenStorageService.getUser();

ajoutersuivie(id,id1,id2): Observable<any> {
  return this.http.post(AUTH_API + 'ajoutersuivie', {
    userid: id,
    avocatid : id1,
    rdvid : id2
    }, httpOptions);
}

rrdv(id): Observable<any> {
  return this.http.post(AUTH_API + 'rsuivie', {
    id: id,
    }, httpOptions);
}

paysuivie(id): Observable<any> {
  return this.http.post(AUTH_API + 'paysuivie', {
    id: id,
    }, httpOptions);
}

getsuivie(id): Observable<any> {
  return this.http.post(AUTH_API + 'getmysuivie', {
    id: id,
    }, httpOptions);
}
}
