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

  @ViewChild('templateEdit', { static: true }) templateEdit: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;

  @ViewChild('templateEditMultiple', {static: true}) templateEditMultiple: TemplateRef<any>;

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
    this.modalTransaction({});
  }

  copyTransaction(transaction) {
    delete transaction.id;
    delete transaction.resolved;

    this.modalTransaction(transaction);
  }

  editTransaction(transaction) {
    this.modalTransaction(transaction);
  }

  modalTransaction(transaction) {
    const config = new MatDialogConfig();

    config.data = this.formBuilder.group({
      id: [transaction.id],
      name: [transaction.name, [Validators.required]],
      reason: [transaction.reason, [Validators.required]],
      amount: [transaction.amount, [Validators.required]],
      date: [null],
      resolved: [transaction.resolved]
    });

    this.dialogRef = this.dialog.open(this.templateEdit, config);
  }

  addMultipleTransaction() {
    const config = new MatDialogConfig();

    config.data = this.formBuilder.group({
      id: [null],
      name: [[], [Validators.required]],
      reason: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null],
      resolved: [null]
    });

    this.dialogRef = this.dialog.open(this.templateEditMultiple, config);
  }

  resolveTransaction(transaction) {
    this.service.resolveTransaction(transaction).subscribe(response => {
      this.dataSource.data = response;
    });
  }

  deleteTransaction(transaction) {
    this.service.deleteTransaction(transaction).subscribe(response => {
      this.dataSource.data = response;
    });
  }



  // Create a save multiple submit


  submit(data) {
    this.service.saveTransaction(data.value).subscribe(response => {
      this.dataSource.data = response;
      this.dialogRef.close();
    });
  }
}
