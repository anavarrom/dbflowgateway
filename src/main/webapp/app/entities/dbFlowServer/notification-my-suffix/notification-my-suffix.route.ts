import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationMySuffix } from 'app/shared/model/dbFlowServer/notification-my-suffix.model';
import { NotificationMySuffixService } from './notification-my-suffix.service';
import { NotificationMySuffixComponent } from './notification-my-suffix.component';
import { NotificationMySuffixDetailComponent } from './notification-my-suffix-detail.component';
import { NotificationMySuffixUpdateComponent } from './notification-my-suffix-update.component';
import { INotificationMySuffix } from 'app/shared/model/dbFlowServer/notification-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class NotificationMySuffixResolve implements Resolve<INotificationMySuffix> {
  constructor(private service: NotificationMySuffixService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INotificationMySuffix> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((notification: HttpResponse<NotificationMySuffix>) => notification.body));
    }
    return of(new NotificationMySuffix());
  }
}

export const notificationRoute: Routes = [
  {
    path: '',
    component: NotificationMySuffixComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'dbFlow10GatewayApp.dbFlowServerNotification.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NotificationMySuffixDetailComponent,
    resolve: {
      notification: NotificationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'dbFlow10GatewayApp.dbFlowServerNotification.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NotificationMySuffixUpdateComponent,
    resolve: {
      notification: NotificationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'dbFlow10GatewayApp.dbFlowServerNotification.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NotificationMySuffixUpdateComponent,
    resolve: {
      notification: NotificationMySuffixResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'dbFlow10GatewayApp.dbFlowServerNotification.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
