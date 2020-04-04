import { Moment } from 'moment';
import { NotificationStatus } from 'app/shared/model/enumerations/notification-status.model';

export interface INotificationMySuffix {
  id?: number;
  subject?: string;
  body?: string;
  from?: string;
  to?: string;
  emittedDate?: Moment;
  readDate?: Moment;
  dueDate?: Moment;
  status?: NotificationStatus;
}

export class NotificationMySuffix implements INotificationMySuffix {
  constructor(
    public id?: number,
    public subject?: string,
    public body?: string,
    public from?: string,
    public to?: string,
    public emittedDate?: Moment,
    public readDate?: Moment,
    public dueDate?: Moment,
    public status?: NotificationStatus
  ) {}
}
