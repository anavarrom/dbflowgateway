import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DbFlow10GatewaySharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [DbFlow10GatewaySharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class DbFlow10GatewayHomeModule {}
