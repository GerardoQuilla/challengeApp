import {Component, inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ExpenseApiService} from '../../services/expense-api.service';
import{DatePipe} from '@angular/common';
import {CreateExpense} from '../../interfaces/create-expense';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  auxDate=new Date();

  title: string = "";
  reason: string = "";
  amount: number = 0.0;

  private _snackBar = inject(MatSnackBar);

  constructor(private _expensesService: ExpenseApiService, private datePipe: DatePipe) {
  }

  createExpense() {
    let expense: CreateExpense = {
      title: this.title,
      reason: this.reason,
      date: this.datePipe.transform(this.auxDate,'yyyy-MM-dd') || '',
      amount: this.amount,
    }
    if(expense.date===''){
      return
    }
    this._expensesService.postExpense(expense).subscribe({
      next: (response) => {
        this._snackBar.open('CREADO', "Close", {
          duration: 3000,
        })
        this.title=""
        this.reason=""
        this.auxDate=new Date()
        this.amount=0.0
      },
      error: (err) => {
        this._snackBar.open(`Error al crear`, "Close", {
          duration: 3000,
        })
      }
    })

  }
}
