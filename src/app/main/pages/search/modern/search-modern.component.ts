import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SearchModernService } from 'app/main/pages/search/modern/search-modern.service';
import { GroupService } from 'app/_services/group.service';
import { Router } from '@angular/router';

@Component({
    selector     : 'search-modern',
    templateUrl  : './search-modern.component.html',
    styleUrls    : ['./search-modern.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchModernComponent implements OnInit
{
    searchText : any = ''; 
    searchItems: any;
    groups : any;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {SearchModernService} _searchModernService
     */
    constructor(
        private _searchModernService: SearchModernService,
        private groupe : GroupService,
        private rout: Router,
    )
    {
  
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.groupe.get()
        .subscribe(searchItems => {
            console.log(searchItems)
            this.groups = searchItems;
        });
    }

    /**
     * On destroy
     */

    go(id){
        this.rout.navigate(['ui/page-layouts/blank/',id]);
    }
}
