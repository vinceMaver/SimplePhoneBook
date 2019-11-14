import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PhoneBookEntriesService } from '../../shared/phonebook-entry.service';
import { IPhoneBookEntry } from 'src/app/models/phonebook-entry.model';
import { throwError } from 'rxjs';

@Component({
  templateUrl: './create-phonebook-entry.component.html',
})
export class CreatePhoneBookEntryComponent {

  @Input() edit;
  @Input() phoneBookEntry: IPhoneBookEntry;
  @Input() phoneBookId: number;
  closeResult: string;
  isDirty: boolean = true;

  constructor(private router: Router, private phoneBookEntryService: PhoneBookEntriesService, private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  savePhoneBookEntry(formValues) {

    if (!this.edit) {
      this.phoneBookEntryService.savePhoneBookEntry(formValues,this.phoneBookId).subscribe((phonebook) => {
        this.isDirty = false;
      }, error => throwError(error));

    } else {

      this.phoneBookEntryService.editPhoneBookEntry(formValues).subscribe((phonebook) => {
        this.isDirty = false;
      }, error => throwError(error));
    }

    //add success of failure toastr message
    this.activeModal.dismiss('Cross click');
  }

  ngOnInit() {
    console.log(this.phoneBookId);
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
