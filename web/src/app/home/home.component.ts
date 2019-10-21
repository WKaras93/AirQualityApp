import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  latitude = 51.248056;
  longitude = 22.570278;
  visible = false;
  displayColumns: string[] = ['date', 'PM25', 'PM10', 'NO2'];
  dataSource = new MatTableDataSource<ColumnNames>();
  installationList;
  urlInstallations: string = 'https://airapi.airly.eu/v2/installations/nearest?lat=51.248056&lng=22.570278&maxDistanceKM=5&maxResults=5';
  urlSingleInstallation: string = 'https://airapi.airly.eu/v2/measurements/installation?indexType=AIRLY_CAQI&installationId=';
  httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Accept-Language', 'pl')
    .set('apikey', '');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getListInstallation();
    // return this.http.get(this.url, {headers: this.httpHeaders});
  }

  getListInstallation() {
    this.http.get(this.urlInstallations, {headers: this.httpHeaders}).subscribe(data => {
      this.installationList = data;
      console.log(data);
    });
  }

  getData(installationId) {
    this.http.get(this.urlSingleInstallation + installationId, {headers: this.httpHeaders}).subscribe(data => {
      console.log(data);
      this.visible = true;
      this.createDataSource(data);
      console.log('datasource',this.dataSource.data);
    });
  }

  createDataSource(data) {
    for (let element of data.history) {
      this.dataSource.data.push({
        date: element.fromDateTime,
        PM25: element.values[0].value,
        PM10: element.values[1].value,
        NO2: element.values[2].value,
      });
    }
  }
}

export interface ColumnNames {
  date: string;
  PM25: number;
  PM10: number;
  NO2: number;
}
