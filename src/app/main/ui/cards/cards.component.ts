import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';
import {AvocatService} from '../../../_services/avocat.service';
import { Router } from '@angular/router';
@Component({
    selector     : 'cards',
    templateUrl  : './cards.component.html',
    styleUrls    : ['./cards.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CardsComponent implements OnInit
{

   
    avocat: any;

    // tslint:disable-next-line:no-shadowed-variable
    constructor(private AvocatService: AvocatService,
        private rout: Router)
    {
        

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the view
     */


    ngOnInit(): void {
        this.getAvocatListe();
    }
    onsubmit(id)
    {
        this.rout.navigate(['pages/profile', id]);
    }
    getAvocatListe(): void {
        this.AvocatService.getAll()
            .subscribe(
                data => {
                    this.avocat = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });
    }
    numSequence(n: number): Array<number> {

        return Array(n);
    }

}
