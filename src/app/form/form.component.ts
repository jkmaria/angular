import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../contact.service';
import { MainComponent } from '../main/main.component';
import { ContactInformation } from '../model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() onSubmitEvent = new EventEmitter<ContactInformation>();
  @Input() fetchonedit: ContactInformation;
  
  contactForm: FormGroup;
  iseditbuttonpress: boolean= false
  tempstorage: ContactInformation

  constructor (private formBuilder: FormBuilder, private thiscontactservice: ContactService, public mainFunction: MainComponent) {
    this.contactForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required, Validators.pattern("^[0-9\-()]{11}$")]),
    });
  }

  
  onsubmit() {
    if(this.iseditbuttonpress) {
      console.log(this.tempstorage)
      alert ('Contact has been updated!')
      this.thiscontactservice.updateContact(this.tempstorage.id, this.contactForm.value).subscribe(result => {
        this.mainFunction.getContacts()
        this.contactForm.reset()
        this.iseditbuttonpress=false
      })
    }
    else {
      alert('Contact has been added')
      this.onSubmitEvent.emit(this.contactForm.value as ContactInformation);
      this.contactForm.reset();
      this.iseditbuttonpress=false
    }
  }

  ngOnInit(): void {
    
  }

  isrequired(info:string): boolean { //validation method
    const requiredinfo= this.contactForm.get(info);
    return requiredinfo !== null && requiredinfo?.invalid && (requiredinfo?.dirty || requiredinfo?.touched);
  }

  ngDoCheck() {
    if(this.fetchonedit !== undefined) {
      this.setcontact(this.fetchonedit)
      this.tempstorage= this.fetchonedit
      this.fetchonedit= undefined
      this.iseditbuttonpress= true
    }
  }

  setcontact(contact: ContactInformation) {
    this.contactForm.setValue (
      {
        name:contact.name, email:contact.email, contact:contact.contact  
      }
    )
  }


}
