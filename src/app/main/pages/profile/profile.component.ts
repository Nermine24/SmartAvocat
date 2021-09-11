import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import {AvocatService } from '../../../_services/avocat.service';
import {ClientService } from '../../../_services/client.service';
import { Router } from '@angular/router';
import {TokenStorageService } from '../../../_services/token-storage.service';
@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent
{
    id = this.route.snapshot.paramMap.get('id');
    clients = false;
 role: any;
 nom: any;
 prenom: any;
 image: any;
 verifz = false;
    avocats = false;
    /**
     * Constructor
     */
    constructor( private client: ClientService,
                 private avocat: AvocatService,
                 private route: ActivatedRoute,
                 private rout: Router,
                 private token: TokenStorageService)
    {
        if (this.token.getToken()) {
            this.role = this.token.getUser().roles;
          }
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit(): void
    {
if (this.id === null){
    if (this.role === 'Client')
    {
        this.client.getprofile() 
        .subscribe((response: any) => {
        this.nom = response.nom;
        this.prenom = response.prenom;
        this.image = response.image;
     }); }
     else       if (this.role === 'Avocat')
    {
        this.avocat.getprofile() 
        .subscribe((response: any) => {
        this.nom = response.nom;
        this.prenom = response.prenom;
        this.image = response.image;
     });
    }
    this.verifz = true;
}else{
this.verifz = false;
this.avocat.getprofilee(this.id) 
        .subscribe((response: any) => {
        this.nom = response.nom;
        this.prenom = response.prenom;
        this.image = response.image;
     });
    }
}
// tslint:disable-next-line:typedef
onreserve()
{
    this.rout.navigate(['ui/forms', this.id]);
}
   
    }

