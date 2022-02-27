import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard'
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'product',
        component: ProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
