import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from './message.service';

@Component({
    templateUrl: './summary.component.html',
    styles: [
        '.message-row { margin-bottom: 10px }'
    ]
})
export class SummaryComponent {

    constructor(private messageService: MessageService,
                private router: Router) { }

    close(): void {
        this.router.navigate([{ outlets: {popup: null }}]);
        this.messageService.isDisplayed = false;
    }
}
