import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { FuseSharedModule } from '@fuse/shared.module';

import { PricingStyle1Component } from 'app/main/pages/pricing/style-1/style-1.component';
import { PricingStyle2Component } from 'app/main/pages/pricing/style-2/style-2.component';
import { PricingStyle3Component } from 'app/main/pages/pricing/style-3/style-3.component';
import { AuthGuard } from 'app/_guard/auth.guard';

const routes = [
    {
        path     : 'pricing/style-1',
        component: PricingStyle1Component,
        canActivate : [AuthGuard]
    },
    {
        path     : 'pricing/style-2',
        component: PricingStyle2Component,
        canActivate : [AuthGuard]
    },
    {
        path     : 'pricing/style-3',
        component: PricingStyle3Component,
        canActivate : [AuthGuard]
    }
];

@NgModule({
    declarations: [
        PricingStyle1Component,
        PricingStyle2Component,
        PricingStyle3Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,

        FuseSharedModule
    ]
})
export class PricingModule
{
}
