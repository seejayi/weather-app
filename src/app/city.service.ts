import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CityService {
  api = "../assets/city.list.json";
  apiUrl = "https://api.openweathermap.org/data/2.5/forecast/";
 public currentCity: any;
 public weather: any = null;

  componentWeatherSource = new Subject<any>();
  componentWeather$ = this.componentWeatherSource.asObservable();

  constructor(public http: HttpClient) {}

  getCities() {
    return this.http.get(this.api);
  }

  getCityById(id?: number): Observable<any> {
    return this.http.get(this.apiUrl + "?id=" + id + "&APPID=87da9550e78226e20bde5cd9df010ff1");
  }

  public action(data): void {
    this.componentWeatherSource.next(data);
  }

}
