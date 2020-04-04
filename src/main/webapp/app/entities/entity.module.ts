import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'notification-my-suffix',
        loadChildren: () =>
          import('./dbFlowServer/notification-my-suffix/notification-my-suffix.module').then(m => m.DbFlowServerNotificationMySuffixModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class DbFlow10GatewayEntityModule {}
