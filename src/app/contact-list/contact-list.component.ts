import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactInformation } from '../model';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  @Input() contact: ContactInformation [] = [];
  @Output() onDeleteEvent = new EventEmitter<string>();
  @Output() onEditInformation = new EventEmitter<ContactInformation>();

  
    constructor (private main: MainComponent) {}
  onDeleteContact(id: string) {
    this.onDeleteEvent.emit(id);
  }

  onEditContact(id: string) {  //loop
    for(var index = 0; index < this.contact.length; index++) {
      if(id === this.contact[index].id) {
        console.log(this.contact[index]);
        this.onEditInformation.emit (this.contact [index]);
      }
    }
  }

  ngOnInit () {
    this.main.getContacts()

  }
}


