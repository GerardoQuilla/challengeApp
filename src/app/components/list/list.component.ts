import {Component, OnInit} from '@angular/core';
import {Expense} from '../../interfaces/expense';
import {ExpenseApiService} from '../../services/expense-api.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdateComponent} from '../update/update.component';
import {DeleteComponent} from '../delete/delete.component';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  selectedFilter="all"
  monthNumber=1;

  expensesList:Expense[]=[];

  constructor(private _expensesService:ExpenseApiService, private dialog:MatDialog) {
  }

  ngOnInit() {
  }

  getExpenses() {
    if (this.selectedFilter==="all") {
      this._expensesService.getAllExpenses().subscribe(expenses => {
        this.expensesList=expenses;
      })
    }else if(this.selectedFilter==="month" && (this.monthNumber >= 1 && this.monthNumber <= 12)) {
      this._expensesService.getExpensesByMonth(this.monthNumber).subscribe(expenses => {
        this.expensesList=expenses;
      })
    }

  }

  editExpense(current:Expense){
    const dialogRef=this.dialog.open(UpdateComponent,{
      width: '600px',
      data:current
    })
  }

  deleteExpense(current:Expense){
    const dialogRef=this.dialog.open(DeleteComponent,{
      width: '600px',
      data:{
        expense:current,
        list:this.expensesList
      }
    })
    dialogRef.afterClosed().subscribe((result:number)=>{
      if (result){
        if(result!==-1){
          this.expensesList.splice(result,1)
        }
      }
    })

  }


}
