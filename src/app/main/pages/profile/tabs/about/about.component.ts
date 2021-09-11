import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from 'app/main/pages/profile/profile.service';
import { ClientService } from 'app/_services/client.service';
import { AvocatService } from 'app/_services/avocat.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector     : 'profile-about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy
{
    id = this.route.snapshot.paramMap.get('id');
    about: any;
    sexe :any;
    tel :any;
    country :any;
    ville :any;
    desc :any;
    daten :any;
    dom :any;
    role : any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private client : ClientService,
        private route: ActivatedRoute,
        private avocat : AvocatService,
        private token : TokenStorageService
    )
    {
        if (this.token.getToken()) {
            this.role = this.token.getUser().roles;
          }
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        if (this.id === null){
                    if (this.role === "Client")
        {
            this.client.getprofile() 
            .subscribe((response: any) => {
            this.sexe =response.sexe;
            this.tel =response.phone;
            this.daten = response.daten;
            this.country =response.country;
            this.ville =response.city;
            this.desc = response.description;

         })}
         else       if (this.role === "Avocat")
        {
            this.avocat.getprofile() 
            .subscribe((response: any) => {
                this.sexe =response.sexe;
                this.tel =response.phone;
                this.daten = response.daten;
                this.country =response.country;
                this.ville =response.city;
                this.desc = response.description;
         })
        }
        
        }else{
         
                this.avocat.getprofilee(this.id) 
                .subscribe((response: any) => {
                    this.sexe =response.sexe;
                    this.tel =response.phone;
                    this.daten = response.daten;
                    this.country =response.country;
                    this.ville =response.city;
                    this.desc = response.description;
             })
            

        }

 
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
