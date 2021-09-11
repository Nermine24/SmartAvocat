import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseCountdownModule } from '@fuse/components';

import { ComingSoonComponent } from 'app/main/pages/coming-soon/coming-soon.component';
import { AuthGuard } from 'app/_guard/auth.guard';

const routes = [
    {
        path     : 'coming-soon',
        component: ComingSoonComponent,
        canActivate : [AuthGuard]
    }
];

@NgModule({
    declarations: [
        ComingSoonComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
        FuseCountdownModule
    ]
})
export class ComingSoonModule
{
}
