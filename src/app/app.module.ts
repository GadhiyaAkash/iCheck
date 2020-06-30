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

@NgModule({
  declarations: [
    AppComponent,
    ContainedBoxComponent,
    FullWidthSidenavComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
