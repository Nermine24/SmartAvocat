import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { EventService } from '../../../_services/event.service'
@Injectable()
export class CalendarService implements Resolve<any>
{
    events: any;
    onEventsUpdated: Subject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient, 
        private eve :EventService
    )
    {
        // Set the defaults
        this.onEventsUpdated = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.getEvents()
            ]).then(
                ([events]: [any]) => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get events
     *
     * @returns {Promise<any>}
     */
    getEvents(): Promise<any>
    {
        return new Promise((resolve, reject) => {

     
            this.eve.getevent()
                .subscribe((response: any) => {
                    this.events = response;
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

    /**
     * Update events
     *
     * @param events
     * @returns {Promise<any>}
     */
    updateEvents(events): Promise<any>
    {
        return new Promise((resolve, reject) => {

     
            this.eve.getevent()
                .subscribe((response: any) => {
                    this.events = response;
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, reject);
        });
    }

}
