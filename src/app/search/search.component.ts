import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { CityService } from '../city.service';
declare let jQuery;

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  cityList: any = [];
  cityListNames: string;
  city: any;
  currentCity: any;
  private element: any;


  constructor(private cityService: CityService,
              private elementRef: ElementRef) {}

  ngOnInit() {
    this.element = this.elementRef.nativeElement.querySelector('#search');
    this.getCityList();
    this.getCityById(709930);
  }

  getCityList() {
    this.cityService.getCities().subscribe(data => {
      this.cityList = data;
      this.cityListNames = this.cityList.map(item => item.name);
      let jqObj = jQuery(this.element).autocomplete({
        minLength: 3,
        source: this.cityListNames || []
      });
    });
  }

  search() {
    this.currentCity = this.cityListNames.indexOf(this.element.value);
    let cuurentCityObj =  this.cityList[this.currentCity];
    this.getCityById(cuurentCityObj.id);
    this.cityService.currentCity = cuurentCityObj;
  }

  getCityById(id) {
    this.cityService.getCityById(id).subscribe(data => {
    this.city = data;
    this.cityService.action(data);
    });
  }
}
