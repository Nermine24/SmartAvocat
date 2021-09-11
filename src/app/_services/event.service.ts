import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
const event_api = 'http://localhost:3000/api/event/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService
    ) { }
     user = this.tokenStorageService.getUser();

  addevent(event): Observable<any> {
    return this.http.post(event_api + 'addevent', {
    email: this.user.email,  
    userid: this.user._id,
    title : event.title,
    start : event.start,
    end : event.end,
    meta : {
      location : event.meta.location,
      note : event.meta.notes
    },
    color : {
      primary : event.color.primary,
      secondary : event.color.secondary
    }
   
    }, httpOptions);
  }
  addevent2(event,idu): Observable<any> {
    console.log(idu)
    return this.http.post(event_api + 'addevent', {
    email: this.user.email,  
    userid: idu,
    title : event.title,
    start : event.start,
    end : event.end,
    meta : {
      location : event.meta.location,
      note : event.meta.notes
    },
    color : {
      primary : event.color.primary,
      secondary : event.color.secondary
    }
   
    }, httpOptions);
  }

  getevent(): Observable<any> {
    return this.http.post(event_api + 'getevents', {
    userid: this.user._id,
    }, httpOptions);
  }

  delete(event) {
    return this.http.post(event_api + `delete`, {
      title : event.title,
      start : event.start,
      end : event.end,
      meta : {
        location : event.meta.location,
        note : event.meta.notes
      },
      color : {
        primary : event.color.primary,
        secondary : event.color.secondary
      }
    },httpOptions);
  }



}
