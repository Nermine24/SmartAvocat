import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { runInThisContext } from 'vm';


const AUTH_API = 'http://localhost:3000/api/group/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class GroupService {
id : any;
  constructor(private http: HttpClient,
    private token : TokenStorageService) {

      const user = this.token.getUser();
this.id = user._id
     }

  add(file): Observable<any> {
    const header = new HttpHeaders();
    const options = { 
      reportProgress: true,
      headers: header
    };
    return this.http.post(AUTH_API + 'ajouter', file, options);
  
  }
  get():Observable<any>{
    return this.http.get(AUTH_API + 'getgroups');
   }


   
  mygroup(): Observable<any> {
    return this.http.post(AUTH_API + 'mygroup', {
      myid: this.id,
 
   
    }, httpOptions);
  }
  mygroups(idf): Observable<any> {
    return this.http.post(AUTH_API + 'mygroup', {
      myid: idf,
 
   
    }, httpOptions);
  }


  group(idf): Observable<any> {
    return this.http.post(AUTH_API + 'group', {
      myid: idf,
 
   
    }, httpOptions);
  }

}
