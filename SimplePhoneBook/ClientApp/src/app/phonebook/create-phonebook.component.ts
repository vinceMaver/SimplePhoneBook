import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { PhoneBookService } from '../shared/phonebook.service';
import { throwError } from 'rxjs';
import { IPhoneBook } from '../models/phonebook.model';

@Component({
  templateUrl: './create-phonebook.component.html',
})
export class CreatePhoneBookComponent {

  @Input() public edit:boolean;
  @Input() public phoneBook: IPhoneBook;

  closeResult: string;
  isDirty: boolean = true;
  constructor(private http: HttpClient,private router: Router, private phoneBookService: PhoneBookService, private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  savePhoneBook(formValues) {

    if (!this.edit) {
      this.phoneBookService.savePhoneBook(formValues).subscribe((phonebook) => {
        this.isDirty = false;
      }, error => throwError(error));

    } else {

      this.phoneBookService.editPhoneBook(formValues).subscribe((phonebook) => {
        this.isDirty = false;
      }, error => throwError(error));
    }

    //add success of failure toastr message
    this.router.navigate(['']);
    this.activeModal.dismiss('Cross click');
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.router.navigate(['']);
  }


}
