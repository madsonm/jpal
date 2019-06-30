import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  columns = ['id', 'name', 'reason', 'amount', 'resolved'];

  constructor() {

    this.dataSource = new MatTableDataSource([
      {id: 0, date: '2019-06-30T11:00:00Z', amount: '3', name: 'Mike', reason: 'Theft', resolved: true}
      , {id: 1, date: '2019-06-30T11:05:00Z', amount: '30', name: 'Alex', reason: 'Dick', resolved: false}
      , {id: 2, date: '2019-06-30T10:00:00Z', amount: '15', name: 'Rich', reason: 'Door fee', resolved: false}
      , {id: 3, date: '2019-06-30T13:00:00Z', amount: '-3', name: 'Mike', reason: 'Theft', resolved: true}
   ]);
  }

  ngOnInit() {
  }

}
