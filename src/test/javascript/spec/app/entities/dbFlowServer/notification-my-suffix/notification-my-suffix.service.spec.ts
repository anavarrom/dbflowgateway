import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { NotificationMySuffixService } from 'app/entities/dbFlowServer/notification-my-suffix/notification-my-suffix.service';
import { INotificationMySuffix, NotificationMySuffix } from 'app/shared/model/dbFlowServer/notification-my-suffix.model';
import { NotificationStatus } from 'app/shared/model/enumerations/notification-status.model';

describe('Service Tests', () => {
  describe('NotificationMySuffix Service', () => {
    let injector: TestBed;
    let service: NotificationMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: INotificationMySuffix;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(NotificationMySuffixService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new NotificationMySuffix(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        currentDate,
        NotificationStatus.EMITTED
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            emittedDate: currentDate.format(DATE_FORMAT),
            readDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a NotificationMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            emittedDate: currentDate.format(DATE_FORMAT),
            readDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            emittedDate: currentDate,
            readDate: currentDate,
            dueDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new NotificationMySuffix(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a NotificationMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            subject: 'BBBBBB',
            body: 'BBBBBB',
            from: 'BBBBBB',
            to: 'BBBBBB',
            emittedDate: currentDate.format(DATE_FORMAT),
            readDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT),
            status: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            emittedDate: currentDate,
            readDate: currentDate,
            dueDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of NotificationMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            subject: 'BBBBBB',
            body: 'BBBBBB',
            from: 'BBBBBB',
            to: 'BBBBBB',
            emittedDate: currentDate.format(DATE_FORMAT),
            readDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT),
            status: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            emittedDate: currentDate,
            readDate: currentDate,
            dueDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a NotificationMySuffix', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
