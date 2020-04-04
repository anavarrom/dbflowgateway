import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DbFlow10GatewayTestModule } from '../../../../test.module';
import { NotificationMySuffixUpdateComponent } from 'app/entities/dbFlowServer/notification-my-suffix/notification-my-suffix-update.component';
import { NotificationMySuffixService } from 'app/entities/dbFlowServer/notification-my-suffix/notification-my-suffix.service';
import { NotificationMySuffix } from 'app/shared/model/dbFlowServer/notification-my-suffix.model';

describe('Component Tests', () => {
  describe('NotificationMySuffix Management Update Component', () => {
    let comp: NotificationMySuffixUpdateComponent;
    let fixture: ComponentFixture<NotificationMySuffixUpdateComponent>;
    let service: NotificationMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DbFlow10GatewayTestModule],
        declarations: [NotificationMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NotificationMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NotificationMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NotificationMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NotificationMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new NotificationMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
