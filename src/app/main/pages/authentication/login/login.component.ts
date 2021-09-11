import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvocatService } from './../../../../_services/avocat.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import addresses from 'full-countries-cities';
@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    countries: any;
    defaultImage = './../../../../../../../assets/placeholder.png';
    selectedFile: any = undefined;
    cities: any;
    errorMessage = '';
    size = false;
    verif = false;
    id = this.route.snapshot.paramMap.get('id');
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private rout: Router,
        private avocat: AvocatService
    )
    {
        this.countries = addresses.getCountryNames().filter((elem) => ['Tunisia'].includes(elem));
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
    selectCities(country) {
        this.cities = addresses.getCities(country);
      }
    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            city   : ['', Validators.required],
            country: ['', Validators.required],
            daten   : ['', Validators.required],
            phone: ['', Validators.required],
            domaine   : ['', Validators.required],
            description: ['', Validators.required],
            prenom   : ['', Validators.required],
            nom: ['', Validators.required],
            sexe: ['', Validators.required]
        });
    }

    fileInputChange(event) {
        this.defaultImage = event.target.files[0];
        this.selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          if (this.selectedFile.size > 500000) {
            this.defaultImage = './../../../../../../../assets/placeholder.png';
            this.size = true;
          } else {
            this.defaultImage = event.target.result;
            this.size = false;
            this.verif = false;
          }
        };
      }

      onSubmit() {
        const formData = new FormData();

        formData.append('file', this.selectedFile);
        formData.append('nom', this.loginForm.value.nom);
        formData.append('userid', this.id);
        formData.append('prenom', this.loginForm.value.prenom);
        formData.append('country', this.loginForm.value.country);
        formData.append('daten', this.loginForm.value.daten);
        formData.append('description', this.loginForm.value.description);
        formData.append('domaine', this.loginForm.value.domaine);
        formData.append('city', this.loginForm.value.city);
        formData.append('phone', this.loginForm.value.phone);
        formData.append('sexe', this.loginForm.value.sexe);
        this.avocat.profile(formData).subscribe(
        data => {
      
            this.rout.navigate(['pages/auth/login-2']);
        },
        err => {
          this.errorMessage = err.error.message;
      }
      );

    }
}
