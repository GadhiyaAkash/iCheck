import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContainedBoxComponent } from './theme/layouts/contained-box/contained-box.component';
import { FullWidthSidenavComponent } from './theme/layouts/full-width-sidenav/full-width-sidenav.component';
import { LoginComponent } from './core-modules/account/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainedBoxComponent,
    FullWidthSidenavComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
