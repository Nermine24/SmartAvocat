import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { tap } from 'rxjs/operators';
const post_api = 'http://localhost:3000/api/post/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostsService {


 

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService
    ) { }
     user = this.tokenStorageService.getUser();

     addpost(file): Observable<any> {
      const header = new HttpHeaders();
      const options = { 
        reportProgress: true,
        headers: header
      };
      return this.http.post(post_api + 'addpost', file, options);
    
    }

    addcomment(file): Observable<any> {
      const header = new HttpHeaders();
      const options = { 
        reportProgress: true,
        headers: header
      };
      return this.http.post(post_api + 'addcomment', file, options);
    
    }

   
    
    getposts(): Observable<any> {
      return this.http.post(post_api + 'getmypost', {
      userid: this.user._id,
      }, httpOptions);
 
    }
    getpostss(id): Observable<any> {
      return this.http.post(post_api + 'getmypost', {
      userid: id,
      }, httpOptions);
 
    }
    getallposts(): Observable<any> {
      return this.http.post(post_api + 'getallpost', {
 
      }, httpOptions);
 
    }

    deletepost(id): Observable<any> {
      return this.http.post(post_api + 'deletepost', {
      postid: id,
      }, httpOptions);
 
    }

    deletecomment(comment,idp): Observable<any> {
      return this.http.post(post_api + 'deletecomment', {
        comment: comment,
      idposte:idp,
      }, httpOptions);
 
    }

    like(id): Observable<any> {
      return this.http.post(post_api + 'like', {
        idUser: this.user._id,
        postid : id
      }, httpOptions);
 
    }
    dislike(id): Observable<any> {
      return this.http.post(post_api + 'dislike', {
        idUser: this.user._id,
        postid : id
      }, httpOptions);
 
    }
}
