import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PhoneBookListComponent } from './phonebook/phonebooks-list.component';
import { CreatePhoneBookComponent } from './phonebook/create-phonebook.component';
import { PhoneBookEntriesComponent } from './phonebook/phonebook-entry/phonebook-entries.component';
import { CreatePhoneBookEntryComponent } from './phonebook/phonebook-entry/create-phonebook-entry.component'
import { PhoneBookService } from './shared/phonebook.service';
import { PhoneBookEntriesService } from './shared/phonebook-entry.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PhoneBookListComponent,
    CreatePhoneBookComponent,
    PhoneBookEntriesComponent,
    CreatePhoneBookEntryComponent
  ],
  entryComponents: [
    CreatePhoneBookComponent,
    PhoneBookListComponent,
    CreatePhoneBookEntryComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'phoneBookEntries/:phoneBookId', component: PhoneBookEntriesComponent },
      { path: '', component: PhoneBookListComponent, pathMatch: 'full' }
    ])
  ],
  providers: [PhoneBookService,
              PhoneBookEntriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
