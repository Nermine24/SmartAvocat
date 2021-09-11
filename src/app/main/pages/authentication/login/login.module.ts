import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from 'app/main/pages/authentication/login/login.component';
import {NgxMatIntlTelInputModule} from 'ngx-mat-intl-tel-input';
const routes = [
    {
        path     : 'auth/avocat/:id',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NgxMatIntlTelInputModule,
        MatDatepickerModule,
        FuseSharedModule
    ]
})
export class LoginModule
{
}
