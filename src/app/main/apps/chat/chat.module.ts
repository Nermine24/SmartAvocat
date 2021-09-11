import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { FuseConfirmDialogModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChatService } from 'app/main/apps/chat/chat.service';
import { ChatComponent } from 'app/main/apps/chat/chat.component';
import { ChatStartComponent } from 'app/main/apps/chat/chat-start/chat-start.component';
import { ChatViewComponent } from 'app/main/apps/chat/chat-view/chat-view.component';
import { ChatChatsSidenavComponent } from 'app/main/apps/chat/sidenavs/left/chats/chats.component';
import { ChatUserSidenavComponent } from 'app/main/apps/chat/sidenavs/left/user/user.component';
import { ChatLeftSidenavComponent } from 'app/main/apps/chat/sidenavs/left/left.component';
import { ChatRightSidenavComponent } from 'app/main/apps/chat/sidenavs/right/right.component';
import { ChatContactSidenavComponent } from 'app/main/apps/chat/sidenavs/right/contact/contact.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



const routes: Routes = [
    {
        path: '**',
        component: ChatComponent,
        children: [],
        resolve: {
            chat: ChatService
        }
    }
];

@NgModule({
    declarations: [
        ChatComponent,
        ChatViewComponent,
        ChatStartComponent,
        ChatChatsSidenavComponent,
        ChatUserSidenavComponent,
        ChatLeftSidenavComponent,
        ChatRightSidenavComponent,
        ChatContactSidenavComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
        ColorPickerModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatListModule,
        MatMenuModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDialogModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        MatSlideToggleModule,
        MatTooltipModule,
        AngularCalendarModule.forRoot({
            provide   : DateAdapter,
            useFactory: adapterFactory
        }),
      
    ] ,
    providers   : [ChatService],
    entryComponents: [
        CalendarEventFormDialogComponent
    ]

})
export class ChatModule
{
}
