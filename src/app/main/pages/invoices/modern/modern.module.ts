import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { InvoiceService } from 'app/main/pages/invoices/invoice.service';
import { InvoiceModernComponent } from 'app/main/pages/invoices/modern/modern.component';
import { AuthGuard } from 'app/_guard/auth.guard';

const routes = [
    {
        path     : 'invoices/modern',
        component: InvoiceModernComponent,
        resolve  : {
            search: InvoiceService
        },
        canActivate : [AuthGuard]
    }
];

@NgModule({
    declarations: [
        InvoiceModernComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        FuseSharedModule
    ],
    providers   : [
        InvoiceService
    ]
})
export class InvoiceModernModule
{
}
