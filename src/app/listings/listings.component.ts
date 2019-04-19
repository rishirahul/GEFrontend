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
  gradeList = [{ name:'A', isSelected: false }, { name:'B', isSelected: false },{ name:'C', isSelected: false }, {name:'D', isSelected: false }];  grade = 'none';
  itemname: 'none';
  city: 'none';
  queryParams = '';
  priceIsAscending:Boolean = true
  cityQueryParams = ''
  gradeQueryParams = ''
  itemQueryParams = ''
  firstTimeLoad:Boolean = true 
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
        item1['isSelected'] = false;
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
    for ( let currentGrade of this.gradeList) {
      if (currentGrade.name == grade.name) {
        currentGrade.isSelected = !currentGrade.isSelected;
      }
    }
    this.makeQuery()
    this.callListings()
  }

  sortByPrice() {
    this.priceIsAscending = !this.priceIsAscending
    this.makeQuery()
    this.callListings()
  }

  clearSelection() {
    this.queryParams = '';
    this.callListings()
  }

  setCity(city) {
    for ( let currentCity of this.cityList) {
      if (currentCity._id == city._id) {
        currentCity.isSelected = !currentCity.isSelected;
      }
    }
    this.makeQuery()
    this.callListings()
  }

  setItemName(itemname) {
    for ( let currentItem of this.itemNameList) {
      if (currentItem.name == itemname.name) {
        currentItem.isSelected = !currentItem.isSelected;
      }
    }
    this.makeQuery()
    this.callListings()
  }

  callListings(){
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

  makeQuery() {
    this.queryParams = '';
    this.itemQueryParams = ''
    this.cityQueryParams = ''
    this.gradeQueryParams = ''

    for ( let currentItem of this.itemNameList) {
      if (currentItem.isSelected) {
        if (this.queryParams == '') {
          this.queryParams = '/?name=' + currentItem._id;;
        }
        else {
          this.itemQueryParams = this.itemQueryParams + '&name=' + currentItem._id;
        }
      }
    }
    for ( let currentCity of this.cityList) {
      if (currentCity.isSelected) {
        if (this.queryParams == '') {
          this.queryParams = '/?origin=' + currentCity._id;
        }
        else {
          this.cityQueryParams = this.cityQueryParams + '&origin=' + currentCity._id;
        }
      }
    }
    for ( let currentGrade of this.gradeList) {
      if (currentGrade.isSelected) {
        if (this.queryParams == '') {
          this.queryParams = '/?grade=' + currentGrade.name;
        }
        else {
          this.gradeQueryParams = this.gradeQueryParams + '&grade=' + currentGrade.name;
        }
      }
    }
    this.queryParams = this.queryParams + this.cityQueryParams + this.gradeQueryParams + this.itemQueryParams;
    if (this.queryParams == '') {
      this.queryParams = '/?price=' + (this.priceIsAscending == true? 'asc':'desc');
    } else {
      this.queryParams = this.queryParams +'&price=' + (this.priceIsAscending == true? 'asc':'desc');
    }
  }

  deselectAllFilters() {
    for ( let item of this.itemNameList) {
      item.isSelected = false;
    }
    for ( let city of this.cityList) {
     city.isSelected = false;
    }
    for ( let currentGrade of this.gradeList) {
      currentGrade.isSelected = false;
    }
    this.priceIsAscending = true;
  }
}

