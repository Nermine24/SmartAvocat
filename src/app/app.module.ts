import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { AuthGuard } from './_guard/auth.guard';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { ReactiveFormsModule } from '@angular/forms';
import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';

import { AlertModule } from './_alert';
import { NgxStripeModule } from 'ngx-stripe';

const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule),
        canActivate : [AuthGuard]
    },
    {
        path        : 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path        : 'ui',
        loadChildren: () => import('./main/ui/ui.module').then(m => m.UIModule),
        canActivate : [AuthGuard]
    },
    {
        path        : 'documentation',
        loadChildren: () => import('./main/documentation/documentation.module').then(m => m.DocumentationModule),
        canActivate : [AuthGuard]
    },
    {
        path      : '**',
        redirectTo: '/pages/auth/login-2'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        NgxStripeModule.forRoot('pk_test_51IZIqlEA9gTKllblpmBocNJdhkgTafWuNXSOBWhCtuMMYTVW9wrsxdvFzvWAYe71rJ0LDK5jPbnnpbtbuznOsSrE00guyauE9d'),
       
        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,
        ReactiveFormsModule,
        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,
        AlertModule
    ],
    providers : [AuthGuard],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
