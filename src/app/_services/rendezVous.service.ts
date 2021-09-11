import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
const AUTH_API = 'http://localhost:3000/api/rendezvous/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class rendezVousService {

    constructor(private http: HttpClient,
                private tokenStorageService: TokenStorageService) { }
    user = this.tokenStorageService.getUser();

    ajouterRdv(form): Observable<any> {
        return this.http.post(AUTH_API + 'ajouterRdv', form);

    }

    getmyrdv(): Observable<any> {
        console.log(this.user._id)
        return this.http.post(AUTH_API + 'getmyrdv', {
        id: this.user._id,
        }, httpOptions);
   
      }
      getmyrdvc(): Observable<any> {
        console.log(this.user._id)
        return this.http.post(AUTH_API + 'getmyrdvc', {
        id: this.user._id,
        }, httpOptions);
   
      }

}
