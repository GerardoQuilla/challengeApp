import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Expense} from '../../interfaces/expense';
import {ExpenseApiService} from '../../services/expense-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete',
  standalone: false,
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  private _snackBar = inject(MatSnackBar);

  constructor(public dialogRef:MatDialogRef<DeleteComponent>,
              @Inject(MAT_DIALOG_DATA)public data:{expense:Expense,list:Expense[]},
              private _expenseService:ExpenseApiService) {

  }

  delete(){
    const id = this.data.list.findIndex(item => item.id===this.data.expense.id)
    console.log(id)
    this._expenseService.deleteExpense(this.data.expense.id).subscribe({
      next:(response)=>{
        this._snackBar.open('Borrado', "Close", {
          duration: 3000,
        })
        this.dialogRef.close(id);
      },
      error:()=>{
        this._snackBar.open('Error al borrar', "Close", {
          duration: 3000,
        })
        this.dialogRef.close();
      }
    })
  }
  cancel(){
    this.dialogRef.close();
  }
}
