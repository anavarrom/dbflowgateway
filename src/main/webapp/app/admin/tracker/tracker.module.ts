import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DbFlow10GatewaySharedModule } from 'app/shared/shared.module';

import { JhiTrackerComponent } from './tracker.component';

import { trackerRoute } from './tracker.route';

@NgModule({
  imports: [DbFlow10GatewaySharedModule, RouterModule.forChild([trackerRoute])],
  declarations: [JhiTrackerComponent]
})
export class TrackerModule {}
