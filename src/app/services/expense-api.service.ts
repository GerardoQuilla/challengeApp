import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.development';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Expense} from '../interfaces/expense';
import {CreateExpense} from '../interfaces/create-expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseApiService {

  basePath: string = `${environment.serverBasePath}/api/v1`

  url:string=""

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private _http: HttpClient) {
    this.url=`${this.basePath}/expenses`;
  }

  getAllExpenses(){
    return this._http.get<Expense[]>(this.url,this.httpOptions)
  }

  getExpensesByMonth(month:number){
    let params = new HttpParams().set('month',month)
    return this._http.get<Expense[]>(`${this.url}/by-month`,{params})
  }

  postExpense(expense: CreateExpense){
    return this._http.post<Expense>(this.url,expense,this.httpOptions)
  }

  updateExpense(expense:CreateExpense,id:number){
    return this._http.put<Expense>(`${this.url}/${id}`,expense,this.httpOptions)
  }

  deleteExpense(id:number){
    return this._http.delete(`${this.url}/${id}`,this.httpOptions)
  }
}
