import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private local: LocalStorageService) {}

  getTransactions() {
    return of(this.local.get('transactions') || []);
  }
  resolveTransaction(transaction) {
    transaction.resolved = true;
    this.saveTransaction(transaction);

    const resolved = { ...transaction };
    delete resolved.id;
    resolved.amount = resolved.amount * -1;

    return this.saveTransaction(resolved);
  }

  saveTransaction(transaction) {
    transaction.date = new Date().toISOString();

    let transactions = this.local.get('transactions') || [];

    if (transaction.id) {
      transactions = transactions.filter(
        rec => rec && rec.id !== transaction.id
      );
    } else {
      transaction.id = this.getId(transactions);
    }

    transactions.push(transaction);
    this.local.set('transactions', transactions);

    return of(transactions);
  }

  private getId(list: any[]): number {
    return (
      (list
        .filter(rec => rec && rec.id)
        .map(rec => rec.id)
        .sort((a, b) => (a < b ? 1 : -1))[0] || 0) + 1
    );
  }
}
