import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions`).pipe(
      catchError(this.errorHandler)
    );
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/questions`, question, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/questions/${id}`, question, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteQuestion(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/questions/${id}`, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  getQuestionCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/questionCategories`).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Sorry, our system encountered an error. Please try again a bit later.');
  }
}
