import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INotificationMySuffix } from 'app/shared/model/dbFlowServer/notification-my-suffix.model';

type EntityResponseType = HttpResponse<INotificationMySuffix>;
type EntityArrayResponseType = HttpResponse<INotificationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class NotificationMySuffixService {
  public resourceUrl = SERVER_API_URL + 'services/dbflowserver/api/notifications';

  constructor(protected http: HttpClient) {}

  create(notification: INotificationMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notification);
    return this.http
      .post<INotificationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(notification: INotificationMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notification);
    return this.http
      .put<INotificationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INotificationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INotificationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(notification: INotificationMySuffix): INotificationMySuffix {
    const copy: INotificationMySuffix = Object.assign({}, notification, {
      emittedDate:
        notification.emittedDate != null && notification.emittedDate.isValid() ? notification.emittedDate.format(DATE_FORMAT) : null,
      readDate: notification.readDate != null && notification.readDate.isValid() ? notification.readDate.format(DATE_FORMAT) : null,
      dueDate: notification.dueDate != null && notification.dueDate.isValid() ? notification.dueDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.emittedDate = res.body.emittedDate != null ? moment(res.body.emittedDate) : null;
      res.body.readDate = res.body.readDate != null ? moment(res.body.readDate) : null;
      res.body.dueDate = res.body.dueDate != null ? moment(res.body.dueDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((notification: INotificationMySuffix) => {
        notification.emittedDate = notification.emittedDate != null ? moment(notification.emittedDate) : null;
        notification.readDate = notification.readDate != null ? moment(notification.readDate) : null;
        notification.dueDate = notification.dueDate != null ? moment(notification.dueDate) : null;
      });
    }
    return res;
  }
}
