import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DbFlow10GatewayTestModule } from '../../../../test.module';
import { NotificationMySuffixDetailComponent } from 'app/entities/dbFlowServer/notification-my-suffix/notification-my-suffix-detail.component';
import { NotificationMySuffix } from 'app/shared/model/dbFlowServer/notification-my-suffix.model';

describe('Component Tests', () => {
  describe('NotificationMySuffix Management Detail Component', () => {
    let comp: NotificationMySuffixDetailComponent;
    let fixture: ComponentFixture<NotificationMySuffixDetailComponent>;
    const route = ({ data: of({ notification: new NotificationMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DbFlow10GatewayTestModule],
        declarations: [NotificationMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NotificationMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NotificationMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.notification).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
