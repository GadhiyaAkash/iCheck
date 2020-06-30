import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContainedBoxComponent } from './theme/layouts/contained-box/contained-box.component';
import { FullWidthSidenavComponent } from './theme/layouts/full-width-sidenav/full-width-sidenav.component';
import { LoginComponent } from './core-modules/account/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HeaderComponent } from './theme/header/header.component';
import { NG_TABLE_DIRECTIVES } from './core/components/ng-table/components/ng-table';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    ContainedBoxComponent,
    FullWidthSidenavComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    NG_TABLE_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
