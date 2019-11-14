import { EventEmitter, Injectable, Inject } from '@angular/core';
import { Headers,RequestOptions, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { IPhoneBook } from '../models/phonebook.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

// https://xgrommx.github.io/rx-book/content/subjects/subject/index.html

@Injectable()
export class PhoneBookService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  getPhoneBooks(): Observable<IPhoneBook[]> {
    return this.http.get(this.baseUrl +'/api/phonebooks').pipe(map(
      (response: Response) => {
        return <IPhoneBook[]>response.json();
      }), catchError(this.handleError));
  }	

  getPhoneBook(id: number): Observable<IPhoneBook> {
    return this.http.get('/api/phonebooks/' + id).pipe(map((response: Response) => {
        return <IPhoneBook>response.json();
    }), catchError(this.handleError));
  }

  savePhoneBook(phoneBook): Observable<IPhoneBook> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    return this.http.post('/api/phonebooks', phoneBook).pipe(map((response: Response) => {
      return response.json();
    }), catchError(this.handleError));
  }

  editPhoneBook(phoneBook): Observable<IPhoneBook> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    return this.http.put('/api/phonebooks', phoneBook).pipe(map((response: Response) => {
      return response.json();
    }), catchError(this.handleError));
  }

  private handleError(error: Response) {
    return throwError(error.statusText);
  }

  deletePhoneBook(id) {

    this.http.delete(this.baseUrl + `api/phonebooks/${id}`).subscribe(result => {

    }, catchError(this.handleError));
  }

}
