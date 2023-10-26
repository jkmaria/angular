import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactInformation } from './model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  
  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get('http://localhost:3000/contactlist');
  }

  getContact(id: string) {
    return this.http.get('http://localhost:3000/contactlist/' + id);
  }

  addContact(data: ContactInformation) {
    return this.http.post('http://localhost:3000/contactlist/', data);
  }

  deleteContact(id: string) {
    return this.http.delete('http://localhost:3000/contactlist/' + id);
  }

  updateContact(id: string, data: ContactInformation) {
    console.log(data);
    return this.http.put('http://localhost:3000/contactlist/' + id, data);
  }
}

