import { EventEmitter, Injectable, Inject } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IPhoneBookEntry } from '../models/phonebook-entry.model';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PhoneBookEntriesService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

  }

  getPhoneBookEntries(phoneBookId: number): Observable<IPhoneBookEntry[]> {
    return this.http.get('/api/phoneBookEntries/' + phoneBookId).pipe(map(
      (response: Response) => {
        return <IPhoneBookEntry[]>response.json();
      }), catchError(this.handleError));
  }

  getPhoneBook(id: number): Observable<IPhoneBookEntry[]> {
    return this.http.get('/api/phoneBookEntries/' + id).pipe(map((response: Response) => {
      return <IPhoneBookEntry[]>response.json();
    }), catchError(this.handleError));
  }

  savePhoneBookEntry(phoneBookEntry, phoneBookId): Observable<IPhoneBookEntry> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    return this.http.post(`/api/phoneBookEntries/${phoneBookId}`, phoneBookEntry).pipe(map((response: Response) => {
      return response.json();
    }), catchError(this.handleError));
  }


  editPhoneBookEntry(phoneBookEntry): Observable<IPhoneBookEntry> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });

    return this.http.put('/api/phoneBookEntries', phoneBookEntry).pipe(map((response: Response) => {
      return response.json();
    }), catchError(this.handleError));
  }

  deletePhoneBookEntry(id) {
    this.http.delete(this.baseUrl + `api/phoneBookEntries/${id}`).subscribe(result => {
    }, catchError(this.handleError));
  }

  private handleError(error: Response) {
    return throwError(error.statusText);
  }

}
