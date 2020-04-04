import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INotificationMySuffix } from 'app/shared/model/dbFlowServer/notification-my-suffix.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { NotificationMySuffixService } from './notification-my-suffix.service';
import { NotificationMySuffixDeleteDialogComponent } from './notification-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-notification-my-suffix',
  templateUrl: './notification-my-suffix.component.html'
})
export class NotificationMySuffixComponent implements OnInit, OnDestroy {
  notifications: INotificationMySuffix[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;

  constructor(
    protected notificationService: NotificationMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.notifications = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
  }

  loadAll() {
    this.notificationService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<INotificationMySuffix[]>) => this.paginateNotifications(res.body, res.headers));
  }

  reset() {
    this.page = 0;
    this.notifications = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInNotifications();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INotificationMySuffix) {
    return item.id;
  }

  registerChangeInNotifications() {
    this.eventSubscriber = this.eventManager.subscribe('notificationListModification', () => this.reset());
  }

  delete(notification: INotificationMySuffix) {
    const modalRef = this.modalService.open(NotificationMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.notification = notification;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateNotifications(data: INotificationMySuffix[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.notifications.push(data[i]);
    }
  }
}
