import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { AcademyCoursesService } from 'app/main/apps/academy/courses.service';
import { rendezVousService } from 'app/_services/rendezVous.service';
import roundToNearestMinutesWithOptions from 'date-fns/esm/fp/roundToNearestMinutesWithOptions/index.js';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { SuivieService } from 'app/_services/suivie.service';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Router } from '@angular/router';

@Component({
    selector   : 'academy-courses',
    templateUrl: './courses.component.html',
    styleUrls  : ['./courses.component.scss'],
    animations : fuseAnimations
})
export class AcademyCoursesComponent implements OnInit, OnDestroy
{

    avocat: boolean = false;
    client:boolean = false;
rdvs: any;
    // Private
    private _unsubscribeAll: Subject<any>;
  

    /**
     * Constructor
     *
     * @param {AcademyCoursesService} _academyCoursesService
     */
    constructor(
        private _academyCoursesService: AcademyCoursesService,
        private rdv : rendezVousService,
        private _fuseNavigationService: FuseNavigationService,
        private sv : SuivieService,
        private token :TokenStorageService,
        private route : Router
    )
    {


        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
user = this.token.getUser();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        if (this.user.roles === "Avocat")
        {
            this.avocat=true;
            this.rdv.getmyrdv().subscribe(data =>{
                this.rdvs = data
         
                this._fuseNavigationService.updateNavigationItem('academy', {
                    badge: {
                        title: this.rdvs.length,
                        bg       : '#F44336',
                        fg       : '#FFFFFF'
                    }
                });
                })
        } else if(this.user.roles === "Client")
    {
        this.client=true
        this.rdv.getmyrdvc().subscribe(data =>{
            this.rdvs = data
     
            this._fuseNavigationService.updateNavigationItem('academy', {
                badge: {
                    title: this.rdvs.length,
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            });
            })
    }


    }
    rrdvv(id)
{
this.sv.rrdv(id).subscribe(data =>
    {
        this.route.navigate(['apps/todo/all/', id]);
    })
}
go(id)
{
    this.route.navigate(['apps/todo/all/', id]);
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



}
