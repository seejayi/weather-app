import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CityService } from './city.service';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import 'd3';
import 'nvd3'
import {NvD3Module} from "ng2-nvd3";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, SearchComponent, GeneralInfoComponent, DetailInfoComponent],
  imports: [BrowserModule, HttpClientModule, NvD3Module, MatTabsModule, BrowserAnimationsModule],
  providers: [CityService],
  bootstrap: [AppComponent]
})
export class AppModule {}
