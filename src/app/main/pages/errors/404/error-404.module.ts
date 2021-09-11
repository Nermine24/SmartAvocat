import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';

import { Error404Component } from 'app/main/pages/errors/404/error-404.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

const routes = [
    {
        path     : 'errors/error-404',
        component: Error404Component
    }
];

@NgModule({
    declarations: [
        Error404Component
    ],
    imports     : [
        RouterModule.forChild(routes),
        NgxStarRatingModule,
        MatButtonModule,
        MatDividerModule,
        MatTabsModule,
        MatIconModule,

        FuseSharedModule
    ]
})
export class Error404Module
{
}
