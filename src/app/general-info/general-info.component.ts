import { Component, OnInit } from '@angular/core';
import {CityService} from "../city.service";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  weather: any;
  subscription: Subscription;

  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.subscription = this.cityService.componentWeather$.subscribe(
      res => {
        this.weather = res;
        console.log(this.weather);
      });
  }

  celsiusFormat(K: number): number {
    return Math.round(K - 273.15);
  }

  convertDate(date): number {
    return new Date(date).getTime();
  }

}
