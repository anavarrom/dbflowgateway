import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { DbFlow10GatewaySharedModule } from 'app/shared/shared.module';
import { DbFlow10GatewayCoreModule } from 'app/core/core.module';
import { DbFlow10GatewayAppRoutingModule } from './app-routing.module';
import { DbFlow10GatewayHomeModule } from './home/home.module';
import { DbFlow10GatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    DbFlow10GatewaySharedModule,
    DbFlow10GatewayCoreModule,
    DbFlow10GatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    DbFlow10GatewayEntityModule,
    DbFlow10GatewayAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class DbFlow10GatewayAppModule { }
