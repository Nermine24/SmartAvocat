import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'app/_services/group.service';
import { TokenStorageService } from 'app/_services/token-storage.service';

@Component({
    selector   : 'blank',
    templateUrl: './blank.component.html',
    styleUrls  : ['./blank.component.scss']
})
export class BlankComponent
{
    nom: any;
    type: any;
    cat: any;
    image: any;
    desc: any;
like : any;
likes : any;
    id = this.route.snapshot.paramMap.get('id');
    idu: any;
    /**
     * Constructor
     */
    constructor(private groupe : GroupService,
        private token : TokenStorageService,
        private route: ActivatedRoute)
    {
        if (this.token.getToken()) {
          
            this.idu = this.token.getUser()._id;
          }
    }
    ngOnInit(): void
    {
        
        this.groupe.group(this.id).subscribe(
            data =>{
                this.nom = data.nom
                this.type = data.type
                this.cat = data.cat
                this.image = data.image
                this.desc = data.desc
                this.like = data.user.length
                this.likes = data.user
            }
        )
    }

    isEmptyObject(obj) {
        return (obj && (Object.keys(obj).length === 0));
      }
      check(gr)
      {
     
        for (let index = 0; index < gr.length; index++) {
           if (gr[index].id === this.idu)
           {
           return true;
            break;
           }
        }
        return false;
      }


}
