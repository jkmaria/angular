import { Component, Injectable } from '@angular/core';
import { ContactInformation } from '../model';
import { ContactService } from '../contact.service';


@Injectable ({
  providedIn: 'root'
})
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  myContacts: ContactInformation[]=[];
  editItem: ContactInformation;

  constructor (private ContactService : ContactService){}

  ngOnit (): void {
    this.getContacts();
  }

  getContacts() {
    this.ContactService.getContacts().subscribe((data) => {
      console.log('data!!!', data);
      this.myContacts = data as ContactInformation [];
    });
  }

  handleSubmit(data: ContactInformation) {
    this.ContactService.addContact(data).subscribe((data) => {
      this.getContacts();
    });
  }

  handleDelete(id: string) {
    this.ContactService.deleteContact(id).subscribe((data) => {
      this.getContacts();
    });
  }
  
  handleEdit(eventeditdata: ContactInformation) {
    this.editItem= eventeditdata;
  }
}
