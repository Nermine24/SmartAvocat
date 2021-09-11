import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from 'app/main/pages/profile/profile.service';
import { ProfileComponent } from 'app/main/pages/profile/profile.component';
import { ProfileTimelineComponent } from 'app/main/pages/profile/tabs/timeline/timeline.component';
import { ProfileAboutComponent } from 'app/main/pages/profile/tabs/about/about.component';
import { ProfilePhotosVideosComponent } from 'app/main/pages/profile/tabs/photos-videos/photos-videos.component';
import { AuthGuard } from 'app/_guard/auth.guard';



const routes = [
    {
        path     : 'profile',
        component: ProfileComponent,
        resolve  : {
            profile: ProfileService
        },
        canActivate : [AuthGuard]
    },
    {
        path     : 'profile/:id',
        component: ProfileComponent,
        resolve  : {
            profile: ProfileService
        },
        canActivate : [AuthGuard]
    },
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileTimelineComponent,
        ProfileAboutComponent,
        ProfilePhotosVideosComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        NgxStarRatingModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        FuseSharedModule
    ],
    providers   : [
        ProfileService
    ]
})
export class ProfileModule
{
}
