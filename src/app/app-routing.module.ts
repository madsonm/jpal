import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
  { path: '' ,component: TransactionsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
