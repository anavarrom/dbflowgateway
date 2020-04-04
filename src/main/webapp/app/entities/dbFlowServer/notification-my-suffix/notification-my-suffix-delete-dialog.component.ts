import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INotificationMySuffix } from 'app/shared/model/dbFlowServer/notification-my-suffix.model';
import { NotificationMySuffixService } from './notification-my-suffix.service';

@Component({
  templateUrl: './notification-my-suffix-delete-dialog.component.html'
})
export class NotificationMySuffixDeleteDialogComponent {
  notification: INotificationMySuffix;

  constructor(
    protected notificationService: NotificationMySuffixService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.notificationService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'notificationListModification',
        content: 'Deleted an notification'
      });
      this.activeModal.dismiss(true);
    });
  }
}
