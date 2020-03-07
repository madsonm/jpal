import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectPeopleService {
  constructor(private local: LocalStorageService) { }

  getPeople() {
    const transactions = this.local.get('transactions') || [];

    const people = [...new Set(transactions.map(rec => rec.name).filter(name => !!name))];
    return of(people);
  }
}
