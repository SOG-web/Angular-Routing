import {Component, OnInit} from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { AuthService } from './user/auth.service';
import {slideInAnimation} from './app.animation';
import {MessageService} from './messages/message.service';
import {AppService} from './app.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get isDisplayed(): boolean {
    return this.appService.isDisplayed;
  }

  constructor(private authService: AuthService, private router: Router,
              private messageService: MessageService,
              private appService: AppService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.router.events.subscribe((routerEvent: Event) => {
      return this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  displayMessages(): void {
    if (this.router.url === '/products') {
      this.router.navigate([{ outlets: {popup: 'summary' }}]);
    } else {
      this.router.navigate([{ outlets: {popup: ['messages'] }}]);
    }
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: {popup: null }}]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/welcome');
  }

  hideOutlet(): void {
    /*
    for the multiple outlet stuff on app.html
    this.appService.isDisplayed = false;
    */

    this.router.navigate([{ outlets: {popup: 'summary' }}]);
  }

  showOutlet(): void {
    /*
    for the multiple outlet stuff on app.html
    this.appService.isDisplayed = false;
    */

    this.router.navigate([{ outlets: {popup: 'messages' }}]);
  }
}
