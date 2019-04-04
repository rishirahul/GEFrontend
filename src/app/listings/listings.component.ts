import { Component, OnInit } from '@angular/core';
import {ListingService} from '../services/listing.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CityService} from '../services/city.service';
import {ItemnameService} from '../services/itemname.service';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})

export class ListingsComponent implements OnInit {
  listings: any;
  itemNameList: Array<any> = [];
  cityList: Array<any> = [];
  gradeList = ['A', 'B', 'C', 'D'];
  grade = 'none';
  itemname: 'none';
  city: 'none';
  queryParams = '';
  constructor(private listingService: ListingService, private cityService: CityService,
    private itemnameService: ItemnameService, private router: Router) { }

  ngOnInit() {
    this.listingService.getAll(this.queryParams)
    .subscribe(response => {
      this.listings = response;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });

    this.cityService.getAll()
    .subscribe(response => {
      var cityListTemp = Array<any>(response);
      console.log(response)
      for (let i =0; i < cityListTemp[0].length; ++i)  {
        var city = {};
        city['name'] = cityListTemp[0][i].name;
        city['_id'] = cityListTemp[0][i]._id;
        city['isSelected'] = false;
        this.cityList.push(city); 
        console.log(cityListTemp)

      }
      }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });

    this.itemnameService.getAll()
    .subscribe(response => {
      var itemsList = Array<any>(response);
      for (let i =0; i < itemsList.length; ++i)  {
        var item1 = {};
        item1['name'] = itemsList[i]['0'].name;
        item1['_id'] = itemsList[i]['0']._id;
        item1['isSelected'] = true;
        this.itemNameList.push(item1); 
      } 
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  setGrade(grade) {
    this.grade = grade;
    if (this.queryParams == '') {
      this.queryParams = '/?grade=' + grade;
    } else {
      this.queryParams = this.queryParams + '&grade=' + grade;
    }
    console.log(this.queryParams);
    this.listingService.getAll(this.queryParams)
    .subscribe(response => {
      this.listings = response;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  clearSelection() {
    this.queryParams = '';
    this.listingService.getAll(this.queryParams)
    .subscribe(response => {
      this.listings = response;
      for ( let item of this.itemNameList) {
          item.isSelected = false;
      }
      for ( let city of this.cityList) {
        city.isSelected = false;
      }
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  setCity(city) {
    this.city = city._id;
    if (this.queryParams == '') {
      this.queryParams = '/?origin=' + this.city;
    } else {
      this.queryParams =this.queryParams + '&origin=' + this.city;
    }
    console.log(this.queryParams);
    this.listingService.getAll(this.queryParams)
    .subscribe(response => {
      this.listings = response;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }

  setItemName(itemname) {
    this.itemname = itemname._id;
    if (this.queryParams == '') {
      this.queryParams = '/?name=' + this.itemname;
    } else {
      this.queryParams = this.queryParams + '&name=' + this.itemname;
    }
    console.log(this.queryParams);
    this.listingService.getAll(this.queryParams)
    .subscribe(response => {
      this.listings = response;
    }, (error: Response) => {
      this.router.navigate(['/errorpage']);
      if (error.status === 400) {
        alert(' expected error, post already deleted');
      }
      console.log(error);
    });
  }
}
