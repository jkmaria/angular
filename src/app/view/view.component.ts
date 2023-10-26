import { Component, OnInit } from '@angular/core';
import { ContactInformation } from '../model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  contact: ContactInformation
  
  constructor (private ContactService: ContactService,
    private router: ActivatedRoute, private errorRoute:Router) {}

  ngOnInit(): void {
    console.log(this.router.snapshot.params['id']);
    this.ContactService.getContact(this.router.snapshot.params['id'])
    .subscribe((data) => {
      this.contact = data as ContactInformation;
    } 
    ,(error)=>(this.errorRoute.navigate(['**']))
    );

   

  }

}
