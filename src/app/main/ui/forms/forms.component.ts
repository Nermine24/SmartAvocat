import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AvocatService} from '../../../_services/avocat.service';
import {rendezVousService} from '../../../_services/rendezVous.service';
import {TokenStorageService} from '../../../_services/token-storage.service';
import {AlertService, AlertType} from '../../../_alert';
import {util} from 'prismjs';
import type = util.type;
import { SuivieService } from 'app/_services/suivie.service';

@Component({
    selector   : 'forms',
    templateUrl: './forms.component.html',
    styleUrls  : ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy
{
    options = {
        autoClose: false,
        keepAfterRouteChange: false
    };
    rdv = {
        userid: 'tfdgfdgfdg',
        avocatid: 'fdgfdgfdg',
        sujet: '',
        date: '21/06/1997',
        published: false

    };
    submitted = false;
    form: FormGroup;
    idrdv : any;
    id = this.route.snapshot.paramMap.get('id');

    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    // Vertical Stepper
    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    errorMessage = '';




    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        // tslint:disable-next-line:max-line-length
        private _formBuilder: FormBuilder, private route: ActivatedRoute, private rdvService: rendezVousService, private rout: Router, private tokenS: TokenStorageService, protected alertService: AlertService,
        private sv : SuivieService
    )
    {
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
        // Reactive Form
        this.form = this._formBuilder.group({
            company   : [
                {
                    value   : 'Google',
                    disabled: true
                }, Validators.required
            ],
            firstName : [{
                value : 'Nom',
                disabled: true
            }, Validators.required],
            lastName  : [{
                value: 'Prénom',
                disabled: true
            }, Validators.required],
            address   : ['', Validators.required],
            address2  : ['', Validators.required],
            city      : ['', Validators.required],
            state     : ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]],
            country   : ['', Validators.required]
        });

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

    /**
     * Finish the horizontal stepper
     */
    finishHorizontalStepper(): void
    {
        alert('You have finished the horizontal stepper!');
    }

    /**
     * Finish the vertical stepper
     */
    finishVerticalStepper(): void
    {
        alert('You have finished the vertical stepper!');
    }
    saveRdv(): void {
      const data = {
          userid: this.tokenS.getUser(),
          avocatid: this.id,
          date: new Date(),
          sujet: this.rdv.sujet
      }  ;
      this.rdvService.ajouterRdv(data)
          .subscribe(response => {
             console.log(response);
             this.submitted = true;
             this.sv.ajoutersuivie(this.tokenS.getUser(),this.id,response._id).subscribe(data =>
                {
                    console.log(data);
                })  
             this.idrdv = response._id;
             this.alertService.success('Rendez-Vous passé avec succès', this.options);
             window.location.href ='http://localhost:4200/apps/academy/courses'
          },
              error => {
              console.log(error);
              this.alertService.error('Veuillez verifier vos entrées', this.options);
              });

       
    }



}
