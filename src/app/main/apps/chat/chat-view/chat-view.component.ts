import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { CalendarEventFormDialogComponent } from 'app/main/apps/calendar/event-form/event-form.component';

import { ChatService } from 'app/main/apps/chat/chat.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from 'app/_services/event.service';

@Component({
    selector     : 'chat-view',
    templateUrl  : './chat-view.component.html',
    styleUrls    : ['./chat-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewInit
{
    user: any;
    chat: any;
    dialog: any;
    contact: any;
    replyInput: any;
    selectedChat: any;
    selectedDay: any;
    dialogRef: any;
    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     */
    constructor(
        private _chatService: ChatService,
        private _httpClient: HttpClient,
        public _matDialog: MatDialog,
        private event : EventService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

          
         
        this.user = this._chatService.user;
      
        this._chatService.onChatSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(chatData => {
                if ( chatData )
                {
                    this.selectedChat = chatData;
                    this.contact = chatData.contact;
                    this.dialog = chatData.dialog;
                    this.readyToReply();
                }
            });
            setInterval(() => {
                this._httpClient.get('http://localhost:3000/api/client/chat/' + this.selectedChat.chatId,)
                .subscribe((response: any) => {
                    this.dialog = response.Dialog;
                });
            },1000);
    
    }

    addEvent(): void
    {
      console.log(this.contact)
        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data      : {
                action: 'new',
                date  : null
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }
                       
                this.event.addevent(response.value)
                     .subscribe((response: any) => {
                    if ( response )
                    {
               
                    }});
                    this.event.addevent2(response.value,this.contact.contactId)
                    .subscribe((response: any) => {
                   if ( response )
                   {
              
                   }});
          
                this.reply(this.event);
            });
    }


    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Decide whether to show or not the contact's avatar in the message row
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    shouldShowContactAvatar(message, i): boolean
    {
        return (
            message.who === this.contact.id &&
            ((this.dialog[i + 1] && this.dialog[i + 1].who !== this.contact.id) || !this.dialog[i + 1])
        );
    }

    /**
     * Check if the given message is the first message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isFirstMessageOfGroup(message, i): boolean
    {
        return (i === 0 || this.dialog[i - 1] && this.dialog[i - 1].who !== message.who);
    }

    /**
     * Check if the given message is the last message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isLastMessageOfGroup(message, i): boolean
    {
        return (i === this.dialog.length - 1 || this.dialog[i + 1] && this.dialog[i + 1].who !== message.who);
    }

    /**
     * Select contact
     */
    selectContact(): void
    {
        this._chatService.selectContact(this.contact);
    }

    /**
     * Ready to reply
     */
    readyToReply(): void
    {
        setTimeout(() => {
            this.focusReplyInput();
            this.scrollToBottom();
        });
    }

    /**
     * Focus to the reply input
     */
    focusReplyInput(): void
    {
        setTimeout(() => {
            this.replyInput.focus();
        });
    }

    /**
     * Scroll to the bottom
     *
     * @param {number} speed
     */
    scrollToBottom(speed?: number): void
    {
        speed = speed || 400;
        if ( this.directiveScroll )
        {
            this.directiveScroll.update();

            setTimeout(() => {
                this.directiveScroll.scrollToBottom(0, speed);
            });
        }
    }

    /**
     * Reply
     */
    reply(event): void
    {
       

        if ( !this.replyForm.form.value.message )
        {
            return;
        }

        // Message
        const message = {
            who    : this.user.userid,
            message: this.replyForm.form.value.message,
            time   : new Date().toISOString()
        };

        // Add the message to the chat
        this.dialog.push(message);

        // Reset the reply form
        this.replyForm.reset();

        // Update the server
        this._chatService.updateDialog(this.selectedChat.chatId, message).then(response => {
            this.readyToReply();
   
        });
        setInterval(() => {
            this._httpClient.get('http://localhost:3000/api/client/chat/' + this.selectedChat.chatId,)
            .subscribe((response: any) => {
                this.dialog = response.Dialog;
                this.scrollToBottom();
            });
        },1000);
      
    }
}
