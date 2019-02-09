import { Component, OnInit, Input } from '@angular/core';
import {ListingService} from '../services/listing.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input('order') order: any;
  constructor(private listingService: ListingService) { }

  ngOnInit() {
    console.log(this.order);
  }

}
