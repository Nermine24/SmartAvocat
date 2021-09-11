import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../../_services/auth.service';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'forgot-password-2',
    templateUrl  : './forgot-password-2.component.html',
    styleUrls    : ['./forgot-password-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ForgotPassword2Component implements OnInit
{
    forgotPasswordForm: FormGroup;
    errorMessage = '';
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
        private rout: Router
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
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
      
        this.authService.resetPasswordMail(this.forgotPasswordForm.value).subscribe(
          data => {
            if (data.message === 'email sent') {
             
                this.rout.navigate(['pages/auth/mail-confirm/',this.forgotPasswordForm.value.email]);
            }
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );
      }
}
