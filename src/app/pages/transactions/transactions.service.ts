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
    return of(this.local.get('transactions') || []);
  }


  saveTransaction(transaction) {
    transaction.date = new Date().toISOString();

    const transactions = this.local.get('transactions') || [];

    transaction.id = this.getId(transactions);

    transactions.push(transaction);
    this.local.set('transactions', transactions);

    return of(transactions);
  }

  private getId(list: any[]): number {
    return (list
      .filter(rec => rec && rec.id)
      .map(rec => rec.id)
      .sort((a, b) => (a < b) ? 1 : -1)[0] || 0) + 1;
  }
}
