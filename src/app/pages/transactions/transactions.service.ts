import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private local: LocalStorageService
  ) { }

  getTransactions() {
    return of(this.local.get('transactions'));
  }


  saveTransaction(transaction) {
    transaction.date = new Date().toISOString();

    const transactions = this.local.get('transactions');
    transactions.push(transaction);
    this.local.set('transactions', transactions);

    return of(transactions);
  }
}
