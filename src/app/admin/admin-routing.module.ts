import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from './auth-guard.guard'
import { ProductsComponent } from './products/products.component';

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
        path: 'products',
        component: ProductsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
