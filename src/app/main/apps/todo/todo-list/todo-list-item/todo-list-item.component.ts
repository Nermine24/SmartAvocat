import { Component, HostBinding, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import {
    StripeCardComponent,
    StripeFactoryService,
    StripeInstance,
  } from 'ngx-stripe';
  import {
    StripeCardElementOptions,
    StripeElementsOptions,
  } from '@stripe/stripe-js';
import { SuivieService } from 'app/_services/suivie.service';
import { ClientService } from 'app/_services/client.service';
import { AvocatService } from 'app/_services/avocat.service';
import { TokenStorageService } from 'app/_services/token-storage.service';

  @Component({
    selector     : 'todo-list-item',
    templateUrl  : './todo-list-item.component.html',
    styleUrls    : ['./todo-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TodoListItemComponent implements OnInit, OnDestroy
{
    @ViewChild(StripeCardComponent) card: StripeCardComponent;

    cardOptions: StripeCardElementOptions = {
      style: {
        base: {
            iconColor: '#666EE8',
            color: '#31325F',
           
            fontWeight: 300,
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSize: '18px',
            '::placeholder': {
              color: '#CFD7E0'
            }
        },
      },
    };
  
    elementsOptions: StripeElementsOptions = {
      locale: 'fr',
    };
  userid: any;
  avocatid : any;
    stripeTest: FormGroup;
    stripe: StripeInstance;
    token: string;
    @Input()
    todo: any;
    avocatr: boolean = false;
    clientr:boolean = false;
    id = this.rt.snapshot.paramMap.get('id');
    rrdvv: boolean = false;
    pm: boolean = false;
    // Private
    private _unsubscribeAll: Subject<any>;
      payer: boolean = false;

 av : any;
 cl : any;
    constructor(
        private fb: FormBuilder,
        private stripeFactory: StripeFactoryService,
        private rt : ActivatedRoute,
        private sv : SuivieService,
        private client : ClientService,
        private avocat : AvocatService,
        private router : Router,
        private tokens : TokenStorageService
    )
    {
   

 
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
user = this.tokens.getUser()
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
this.avocatr = true
      } else if(this.user.roles === "Client")
  {
this.clientr = true
  }

        this.payer = false;
        this.stripe = this.stripeFactory.create(
            'pk_test_51IZIqlEA9gTKllblpmBocNJdhkgTafWuNXSOBWhCtuMMYTVW9wrsxdvFzvWAYe71rJ0LDK5jPbnnpbtbuznOsSrE00guyauE9d'
          );
          this.stripeTest = this.fb.group({
            name: ['', [Validators.required]],
          });

          this.sv.getsuivie(this.id).subscribe(data =>
            {
              this.userid = data.userid;
              this.avocatid = data.avocatid
                console.log(data.rrdv)
                if (data.rrdv === true)
                {
                    this.rrdvv = true;
                }
                if (data.paiment === true)
                {
                    this.pm = true;
                }
            })


  
    }
    
    add(): void
    {
        
      this.avocat.getprofilee(this.avocatid).subscribe( async data =>
        {
          await data
          this.av = data
           
        })
this.client.getprofilee(this.userid).subscribe(async data => {
  await data
this.cl = data
})

setTimeout(() => {
  console.log(this.cl);
  console.log(this.av);
  this.client.add(this.cl,this.av)
  .subscribe(response => {
    window.location.href ='http://localhost:4200/apps/chat'

  });

}, 1000); 



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
    createToken(): void {
        const name = this.stripeTest.get('name').value;
        this.stripe.createToken(this.card.element, { name }).subscribe((result) => {
          if (result.token) {
         
            console.log(result.token);
            this.token = result.token.id;
            this.sv.paysuivie(this.id).subscribe(data =>
                {
                    console.log(data);
                    this.ngOnInit();
                })
          } else if (result.error) {
            // Error creating the token
            console.log(result.error.message);
          }
        });
      }
pay()
{
    this.payer = true;
}


}
