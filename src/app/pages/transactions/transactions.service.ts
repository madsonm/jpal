import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private local: LocalStorageService) { }

  getTransactions() {
    return of(this.local.get('transactions') || []);
  }

  resolveTransaction(transaction: any): Observable<any[]> {
    if (transaction.resolved) {
      return this.getTransactions();
    }

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
      // filter is filtering the array 
      transactions = transactions.filter(
        // && if it is false, fail out (left to right)
        // lambda
        rec => rec && rec.id !== transaction.id
      );
    } else {
      transaction.id = this.getId(transactions);
    }
    // save to local storage 
    // push adds at the end of the array
    transactions.push(transaction);
    this.local.set('transactions', transactions);

    return of(transactions);
  }

  deleteTransaction(transaction) {

    let transactions = this.local.get('transactions') || [];

    if (transaction.id) {
      transactions = transactions.filter(
        rec => rec && rec.id !== transaction.id
      );
    }

    this.local.set('transactions', transactions);

    return of(transactions);
  }



// TODO - Create a save multiple service





  // This gets the next available ID
  private getId(list: any[]): number {
    return (
      (list
        .filter(rec => rec && rec.id)
        .map(rec => rec.id)
        .sort((a, b) => (a < b ? 1 : -1))[0] || 0) + 1
    );
  }
}
