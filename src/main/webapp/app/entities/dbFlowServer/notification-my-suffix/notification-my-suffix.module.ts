import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DbFlow10GatewaySharedModule } from 'app/shared/shared.module';
import { NotificationMySuffixComponent } from './notification-my-suffix.component';
import { NotificationMySuffixDetailComponent } from './notification-my-suffix-detail.component';
import { NotificationMySuffixUpdateComponent } from './notification-my-suffix-update.component';
import { NotificationMySuffixDeleteDialogComponent } from './notification-my-suffix-delete-dialog.component';
import { notificationRoute } from './notification-my-suffix.route';

@NgModule({
  imports: [DbFlow10GatewaySharedModule, RouterModule.forChild(notificationRoute)],
  declarations: [
    NotificationMySuffixComponent,
    NotificationMySuffixDetailComponent,
    NotificationMySuffixUpdateComponent,
    NotificationMySuffixDeleteDialogComponent
  ],
  entryComponents: [NotificationMySuffixDeleteDialogComponent]
})
export class DbFlowServerNotificationMySuffixModule {}
