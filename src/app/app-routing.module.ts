import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { ContainedBoxComponent } from './theme/layouts/contained-box/contained-box.component';
import { LoginComponent } from './core-modules/account/login/login.component';
import { FullWidthSidenavComponent } from './theme/layouts/full-width-sidenav/full-width-sidenav.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { IcheckInspectionComponent } from './modules/icheck-inspection/icheck-inspection.component';
import { IcheckChecklistComponent } from './modules/icheck-checklist/icheck-checklist.component';

const routes: Routes = [
  {
    path: '',
    component: ContainedBoxComponent,
    children: [{
      path: 'login',
      component: LoginComponent,
      canActivate: [AuthGuard],
      data: { isPublic: true }
    }]
  },
  {
    path: '',
    component: FullWidthSidenavComponent,
    children: [{
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
      data: { isPublic: false }
    },
    {
      path: 'icheck-inspection',
      component: IcheckInspectionComponent,
      canActivate: [AuthGuard],
      data: { isPublic: false }
    },
    {
      path: 'icheck-checklist/:id',
      component: IcheckChecklistComponent,
      canActivate: [AuthGuard],
      data: { isPublic: false }
    }]
  },

  /** Handle 404 Error */
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }