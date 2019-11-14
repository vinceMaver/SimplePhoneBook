import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PhoneBookEntriesService } from 'src/app/shared/phonebook-entry.service';
import { IPhoneBookEntry } from 'src/app/models/phonebook-entry.model';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { CreatePhoneBookEntryComponent } from './create-phonebook-entry.component';

@Component({
  templateUrl: './phonebook-entries-list.component.html'
})

export class PhoneBookEntriesComponent {

  phoneBookEntries: IPhoneBookEntry[];
  searchTerm: string;
  phoneBookId: number;

  constructor(private phoneBookEntriesService: PhoneBookEntriesService, private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private modalService: NgbModal) {
    this.phoneBookId = +this.route.snapshot.params['phoneBookId'];
    this.getPhoneBookEntries(this.phoneBookId);
  }

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.phoneBookEntries = data['phoneBook'];
    });
  }

  //Move code to service
  getPhoneBookEntries(phoneBookId: number) {
    return this.http.get(this.baseUrl +`/api/phonebookentries/GetBookEntries/${ phoneBookId }`).subscribe(result => {
      this.phoneBookEntries = <IPhoneBookEntry[]>result;
    }, error => throwError(error));
  }

  addPhoneBookEntry() {
    const modalRef = this.modalService.open(CreatePhoneBookEntryComponent);
    modalRef.componentInstance.edit = false;
    modalRef.componentInstance.phoneBookId = this.phoneBookId;
  }

  editPhoneBookEntry(phoneBook) {
    const modalRef = this.modalService.open(CreatePhoneBookEntryComponent);
    modalRef.componentInstance.edit = true;
    modalRef.componentInstance.phoneBookEntry = phoneBook;
    modalRef.componentInstance.phoneBookId = this.phoneBookId;
  }

  getPhoneBookEntriesToShow() {
    if (!this.searchTerm)
      return this.phoneBookEntries;

    return this.phoneBookEntries.filter(a => a.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || a.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

}
