import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionsService } from './transactions.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  columns = ['id', 'date', 'name', 'reason', 'amount', 'resolved'];

  @ViewChild('templateEdit', { static: true }) templateEdit: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;

  constructor(
    private service: TransactionsService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;

    this.service.getTransactions().subscribe(response => {
      this.dataSource.data = response;
    });
  }


  addTransaction() {
    const config = new MatDialogConfig();

    config.data = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      reason: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null],
      resolved: [null]
    });

    this.dialogRef = this.dialog.open(this.templateEdit, config);
  }

  submit(data) {
    this.service.saveTransaction(data.value).subscribe(response => {
      this.dataSource.data = response;
      this.dialogRef.close();
    });
  }
}
