import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneBookService } from '../shared/phonebook.service';
import { IPhoneBook } from '../models/phonebook.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePhoneBookComponent } from './create-phonebook.component';

@Component({
  templateUrl: './phonebooks-list.component.html'
})

export class PhoneBookListComponent implements OnInit {
  phoneBooks: IPhoneBook[];
  errorMessage: string;
  operationSuccessful: boolean;
  searchTerm: string;

  constructor(private http: HttpClient,
              private phoneBookService: PhoneBookService,
              private route: ActivatedRoute,
              @Inject('BASE_URL') private baseUrl: string,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loadPhoneBooks();
  }

  loadPhoneBooks() {
    //move these calls to service
    this.http.get(this.baseUrl + '/api/phonebooks').subscribe(result => {
      this.phoneBooks = <IPhoneBook[]>result;
    },error => console.error(error));
  }

  editPhoneBook(phoneBook) {
    const modalRef = this.modalService.open(CreatePhoneBookComponent);
    modalRef.componentInstance.edit = true;
    modalRef.componentInstance.phoneBook = phoneBook;
  }

  addPhoneBook() {
    const modalRef = this.modalService.open(CreatePhoneBookComponent);
    modalRef.componentInstance.edit = false;
  }

  deletePhoneBook(id) {
    this.http.delete(this.baseUrl + `api/phonebooks/${id}`).subscribe(result => {
      this.operationSuccessful = true;
    }, error => throwError ("Oops! An error occurred whilst processing your request."));
  }

  getPhoneBooksToShow() {
    if (!this.searchTerm) 
      return this.phoneBooks;
    
    return this.phoneBooks.filter(a => a.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

}
