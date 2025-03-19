import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Expense} from '../../interfaces/expense';
import {ExpenseApiService} from '../../services/expense-api.service';

@Component({
  selector: 'app-delete',
  standalone: false,
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  constructor(public dialogRef:MatDialogRef<DeleteComponent>,
              @Inject(MAT_DIALOG_DATA)public data:{currentId:number,expense:Expense},
              private _expenseService:ExpenseApiService) {

  }

  delete(){

    this._expenseService.deleteExpense(this.data.expense.id).subscribe({
      next:(response)=>{

        this.dialogRef.close(this.data.currentId);
      },
      error:()=>{
        this.dialogRef.close();
      }
    })
  }
  cancel(){
    this.dialogRef.close();
  }
}
