import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Expense} from '../../interfaces/expense';
import {ExpenseApiService} from '../../services/expense-api.service';
import {CreateExpense} from '../../interfaces/create-expense';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  auxDate=new Date()
  constructor(
    public dialogRef:MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA)public data:Expense,
    private _expenseService:ExpenseApiService,
    private datePipe: DatePipe
  ) {
    const dateString = data.date
    const [year,month,day]=dateString.split('-').map(Number)
    this.auxDate=new Date(year,month-1,day)
  }

  updateExpense() {
    let originalData={...this.data}
    let updatedData:CreateExpense={
      title:this.data.title,
      reason:this.data.reason,
      date: this.datePipe.transform(this.auxDate,'yyyy-MM-dd') || '',
      amount:this.data.amount,
    }
    this._expenseService.updateExpense(updatedData,this.data.id).subscribe({
      next: (response)=>{
        this.dialogRef.close();
      },
      error: ()=>{
        this.data=originalData
      }
    })
  }

}
