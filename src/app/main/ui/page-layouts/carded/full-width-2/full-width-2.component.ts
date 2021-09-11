import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { PostsService } from 'app/_services/posts.service';
import { ClientSessionOptions } from 'http2';
import { ClientService } from 'app/_services/client.service';
import { AvocatService } from 'app/_services/avocat.service';

@Component({
    selector   : 'carded-fullwidth-2',
    templateUrl: './full-width-2.component.html',
    styleUrls  : ['./full-width-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CardedFullWidth2Component implements OnInit, OnDestroy
{
    public form: FormGroup;
    timeline: any;
    postForm: FormGroup;
    commentForm: FormGroup;
    defaultImage = './../../../../../../../assets/placeholder.png';
    selectedFile: any = undefined;
    size = false;
    verif = false;
    id : any;
    posts : any;
    role : any;
    nom : any;
    prenom : any;
    image : any;
    errorMessage = '';
    idu : any;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
    
        private _formBuilder: FormBuilder,
        private token : TokenStorageService,
        private post :PostsService,
        private client :ClientService,
        private avocat : AvocatService
    )
    {

      this.form = this._formBuilder.group({
        rating0: [0],
        rating2: [2],
        rating1: [1],
        rating3: [3],
        rating4: [4],
        rating5: [5]
      });
        if (this.token.getToken()) {
            this.role = this.token.getUser().roles;
            this.idu = this.token.getUser()._id;
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

     const user =  this.token.getUser()
     this.id = user._id;

        this.postForm = this._formBuilder.group({
            message   : ['', Validators.required]
       
        });
        this.commentForm = this._formBuilder.group({
          message   : ['', Validators.required],
          rate   : ['', Validators.required]
        });


        if (this.role === "Client")
        {
            this.client.getprofile() 
            .subscribe((response: any) => {
            this.nom =response.nom;
            this.prenom =response.prenom;
            this.image = response.image;
         })}
         else       if (this.role === "Avocat")
        {
            this.avocat.getprofile() 
            .subscribe((response: any) => {
            this.nom =response.nom;
            this.prenom =response.prenom;
            this.image = response.image;
         })
        }
      
        this.post.getallposts().subscribe(data => {
            this.posts= data
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
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    onSubmit() {
        const formData = new FormData();
 
        formData.append('file', this.selectedFile);
        formData.append('message', this.postForm.value.message);
        formData.append('userid', this.id);
        formData.append('nom', this.nom);
        formData.append('prenom', this.prenom);
        formData.append('imageuser', this.image);
        formData.append('role', this.role);
     this.post.addpost(formData).subscribe(
        data => {
         this.ngOnInit()
        ///  window.location.reload();
        },
        err => {
          this.errorMessage = err.error.message;
      }
      );
  
    }

    addcomment(id) {
      const formData = new FormData();

      formData.append('postid', id);
      formData.append('message', this.commentForm.value.message);
      formData.append('rating', this.commentForm.value.rate);
      formData.append('nom', this.nom);
      formData.append('prenom', this.prenom);
      formData.append('userid', this.idu);
      formData.append('imagecomment', this.image);
 
   this.post.addcomment(formData).subscribe(
      data => {
       this.ngOnInit()
      },
      err => {
        this.errorMessage = err.error.message;
    }
    );

  }

  deletepost(id){
    this.post.deletepost(id).subscribe(
      data => {
       
       this.ngOnInit()
      },
      err => {
        this.errorMessage = err.error.message;
    }
    );
    this.ngOnInit()
  }


  deletecomment(comment,idp){
    console.log(comment)
    this.post.deletecomment(comment,idp).subscribe(
      data => {
       this.ngOnInit()
    
      },
      err => {
        this.errorMessage = err.error.message;
    }
    );
    this.ngOnInit()
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
  check(gr)
  {
 
    for (let index = 0; index < gr.length; index++) {
       if (gr[index].idUser === this.idu)
       {
       return true;
        break;
       }
    }
    return false;
  }

  like(ide)
  {
this.post.like(ide).subscribe(
    data => {
      this.ngOnInit()
  
    },
    err => {
      console.log(err);
    })
   }

   dislike(ide)
   {
this.post.dislike(ide).subscribe(
     data => {
      this.ngOnInit()
   
     },
     err => {
       console.log(err);
     })
    }
}
