import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';
import {CityService} from "../city.service";
import {Subscription} from "rxjs/index";

@Component({
  selector: "app-detail-info",
  templateUrl: "./detail-info.component.html",
  styleUrls: ["./detail-info.component.css"]
})
export class DetailInfoComponent implements OnInit {
  public weather;

  private tempList: any[] = [];
  private windList: any[] = [];
  private pressureList: any[] = [];
  private humidityList: any[] = [];

  public chartMode: string = "temp";
  private chartCreate: boolean = false;

  subscription: Subscription;

  chart: Highcharts.ChartObject;
  options: Highcharts.Options = {
    chart: { type: "column" },
    title: { text: "" },
    xAxis: { type: "category" },
    legend: { enabled: false },
    plotOptions: {
      series: {
        dataLabels: { enabled: true, format: "{point.y}" },
        color: "#28a745"
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
    },
    series: [{ name: "", data: [] }]
  };
  @ViewChild("chartTarget") chartTarget: ElementRef;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.subscription = this.cityService.componentWeather$.subscribe(res => {
      this.weather = res;
      this.setData(res);
      if (!this.chartCreate) {
        this.renderChart(res);
      } else {
        this.redrawChart(this.chartMode);
      }
    });
  }

  setData(res) {
    this.weather = res;
    this.tempList = [];
    this.windList = [];
    this.pressureList = [];
    this.humidityList = [];
    res.list.filter((item, index) => (index - 9) % 8 === 0).map(item => {
      this.tempList.push({
        name: this.dateFormat(item.dt_txt),
        y: this.celsiusFormat(item.main.temp)
      });
      this.windList.push({
        name: this.dateFormat(item.dt_txt),
        y: item.wind.speed
      });
      this.pressureList.push({
        name: this.dateFormat(item.dt_txt),
        y: item.main.pressure
      });
      this.humidityList.push({
        name: this.dateFormat(item.dt_txt),
        y: item.main.humidity
      });
    });
  }

  switchModes(chartMode) {
    this.chartMode = chartMode;
    switch (chartMode) {
      case "temp":
        this.options.series[0].data = this.tempList;
        break;
      case "wind":
        this.options.series[0].data = this.windList;
        break;
      case "pressure":
        this.options.series[0].data = this.pressureList;
        break;
      case "humidity":
        this.options.series[0].data = this.humidityList;
        break;
    }
  }

  renderChart(res) {
    this.chartCreate = true;
    res.list.filter((item, index) => (index - 9) % 8 === 0).map(item => {
      this.options.series[0].data.push({
        name: this.dateFormat(item.dt_txt),
        y: this.celsiusFormat(item.main.temp)
      });
    });
    this.chart = chart(this.chartTarget.nativeElement, this.options);
  }

  redrawChart(chartMode) {
    this.switchModes(chartMode);
    this.chart.series[0].setData(this.options.series[0].data, true);
  }

  dateFormat(someDate: string): string {
    let date = new Date(someDate);
    switch (date.getMonth()) {
      case 0:
        return `${date.getDate()} Jan`;
      case 1:
        return `${date.getDate()} Feb`;
      case 2:
        return `${date.getDate()} Mar`;
      case 3:
        return `${date.getDate()} Apr`;
      case 4:
        return `${date.getDate()} May`;
      case 5:
        return `${date.getDate()} Jun`;
      case 6:
        return `${date.getDate()} Jul`;
      case 7:
        return `${date.getDate()} Aug`;
      case 8:
        return `${date.getDate()} Sep`;
      case 9:
        return `${date.getDate()} Oct`;
      case 10:
        return `${date.getDate()} Nov`;
      case 11:
        return `${date.getDate()} Dec`;
    }
  }

  celsiusFormat(K: number): number {
    return Math.round(K - 273.15);
  }

  convertDate(date): number {
    return new Date(date).getTime();
  }
}
