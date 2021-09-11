import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../../_services/auth.service';
import { TokenStorageService } from './../../../../_services/token-storage.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';

@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{
    loginForm: FormGroup;
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService, 
        private rout: Router,
        private tokenStorage: TokenStorageService,
      
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.authService.login(this.loginForm.value).subscribe(
          data => {
              if(data){
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
   
       //     this.rout.navigate(['apps/calendar']);
      window.location.href ='http://localhost:4200/apps/calendar';
          }
          },
          err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
    }
        );
    }
}
