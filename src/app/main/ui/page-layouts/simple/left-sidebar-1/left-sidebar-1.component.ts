import { Component } from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { GroupService } from 'app/_services/group.service';
import { TokenStorageService } from 'app/_services/token-storage.service';

@Component({
    selector   : 'simple-left-sidebar-1',
    templateUrl: './left-sidebar-1.component.html',
    styleUrls  : ['./left-sidebar-1.component.scss']
})
export class SimpleLeftSidebar1Component
{

    defaultImage = './../../../../../../../assets/placeholder.png';
    selectedFile: any = undefined;
    form: FormGroup;
    iduser: any;
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _formBuilder: FormBuilder,
        private token : TokenStorageService,
        private rout: Router,
      private  groupe : GroupService
    )
    {
        this.form = this._formBuilder.group({
       
            nom : ['', Validators.required],
            desc  : ['', Validators.required],
            cat   : ['', Validators.required],
            type   : ['', Validators.required],
            fileinput   : ['', Validators.required],
        });
        if (this.token.getToken()) {
            this.iduser = this.token.getUser()._id;
          }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar
     *
     * @param name
     */
    fileInputChange(event) {
        this.defaultImage = event.target.files[0];
        this.selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          if (this.selectedFile.size > 500000) {
            this.defaultImage = './../../../../../../../assets/placeholder.png';
       
          } else {
            this.defaultImage = event.target.result;
 
          }
        };
      }
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }


    
    onSubmit() {
        const formData = new FormData();

        formData.append('file', this.selectedFile);
        formData.append('nom', this.form.value.nom);
        formData.append('userid', this.iduser);
        formData.append('cat', this.form.value.cat);
        formData.append('type', this.form.value.type);
        formData.append('desc', this.form.value.desc);
     
      this.groupe.add(formData).subscribe(
        data => {
      
            this.rout.navigate(['ui/page-layouts/blank/', data._id]);
        },
        err => {
    
      }
      );

    }
}
