import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { INotificationMySuffix, NotificationMySuffix } from 'app/shared/model/dbFlowServer/notification-my-suffix.model';
import { NotificationMySuffixService } from './notification-my-suffix.service';

@Component({
  selector: 'jhi-notification-my-suffix-update',
  templateUrl: './notification-my-suffix-update.component.html'
})
export class NotificationMySuffixUpdateComponent implements OnInit {
  isSaving: boolean;
  emittedDateDp: any;
  readDateDp: any;
  dueDateDp: any;

  editForm = this.fb.group({
    id: [],
    subject: [],
    body: [],
    from: [],
    to: [],
    emittedDate: [],
    readDate: [],
    dueDate: [],
    status: []
  });

  constructor(
    protected notificationService: NotificationMySuffixService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ notification }) => {
      this.updateForm(notification);
    });
  }

  updateForm(notification: INotificationMySuffix) {
    this.editForm.patchValue({
      id: notification.id,
      subject: notification.subject,
      body: notification.body,
      from: notification.from,
      to: notification.to,
      emittedDate: notification.emittedDate,
      readDate: notification.readDate,
      dueDate: notification.dueDate,
      status: notification.status
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const notification = this.createFromForm();
    if (notification.id !== undefined) {
      this.subscribeToSaveResponse(this.notificationService.update(notification));
    } else {
      this.subscribeToSaveResponse(this.notificationService.create(notification));
    }
  }

  private createFromForm(): INotificationMySuffix {
    return {
      ...new NotificationMySuffix(),
      id: this.editForm.get(['id']).value,
      subject: this.editForm.get(['subject']).value,
      body: this.editForm.get(['body']).value,
      from: this.editForm.get(['from']).value,
      to: this.editForm.get(['to']).value,
      emittedDate: this.editForm.get(['emittedDate']).value,
      readDate: this.editForm.get(['readDate']).value,
      dueDate: this.editForm.get(['dueDate']).value,
      status: this.editForm.get(['status']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotificationMySuffix>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
