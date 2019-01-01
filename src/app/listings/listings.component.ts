import { Component, OnInit } from '@angular/core';
import {ListingService} from '../services/listing.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  listings: any;
  constructor(private service: ListingService) { }

  ngOnInit() {
    this.service.getAll()
    .subscribe(response => {
      this.listings = response;
      console.log(this.listings);
    }, (error: Response) => {
      if (error.status === 400) {
        alert(' expected error, post already deleted');
        //this.form.setErrors(error.json());
      }
      console.log(error);
    });
  }

}
