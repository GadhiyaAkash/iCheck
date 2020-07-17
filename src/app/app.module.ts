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
import { IcheckInspectionComponent } from './modules/icheck-inspection/icheck-inspection.component';
import { IcheckChecklistComponent } from './modules/icheck-checklist/icheck-checklist.component';
import { IcheckAccessibilityComponent } from './modules/icheck-accessibility/icheck-accessibility.component';
import { ChartsModule } from 'ng2-charts';
import { NgPipesModule } from 'ngx-pipes';
import { ChecklistTableComponent } from './core/components/ng-table/components/checklist-table/checklist-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    AppComponent,
    ContainedBoxComponent,
    FullWidthSidenavComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    NG_TABLE_DIRECTIVES,
    IcheckInspectionComponent,
    IcheckChecklistComponent,
    IcheckAccessibilityComponent,
    ChecklistTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    ChartsModule,
    NgPipesModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
