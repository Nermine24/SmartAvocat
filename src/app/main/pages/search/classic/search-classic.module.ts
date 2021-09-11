import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { SearchClassicComponent } from 'app/main/pages/search/classic/search-classic.component';
import { SearchClassicService } from 'app/main/pages/search/classic/search-classic.service';
import { AuthGuard } from 'app/_guard/auth.guard';


const routes = [
    {
        path     : 'search/classic',
        component: SearchClassicComponent,
        resolve  : {
            search: SearchClassicService
        },
        canActivate : [AuthGuard]
    }
];

@NgModule({
    declarations: [
        SearchClassicComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,

        FuseSharedModule
    ],
    providers   : [
        SearchClassicService
    ]
})
export class SearchClassicModule
{
}
