import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MessageComponent } from './message.component';
import {RouterModule} from '@angular/router';
import {SummaryComponent} from './summary.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'messages',
        component: MessageComponent,
        outlet: 'popup'
      },
      {
        path: 'summary',
        component: SummaryComponent,
        outlet: 'popup'
      }
    ])
  ],
  declarations: [
    MessageComponent,
    SummaryComponent
  ]
})
export class MessageModule { }
