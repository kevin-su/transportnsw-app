import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { BusReportDataModel, BusReportModel } from './BusReport.model';


@Injectable()
export class BusReportService {
  constructor(private http: HttpClient) { }

  getData(){
    return <BusReportModel[]>JSON.parse(sessionStorage.getItem('busReportData'));
  }

  getReports() {
    const url = '/assets/bus-services-data.json';
    return this.http.get<BusReportDataModel>(url)
      .pipe(
        map((data) => {
          if (!this.getData()) {
            sessionStorage.setItem('busReportData', JSON.stringify(<BusReportModel[]>data.data));
          }
          return this.getData()
            .map((item) => {
              item.busData = [];
              return item;
            });
        })
      );
  }

  getReportByOrg(org: string) {
    return <BusReportModel>this.getData()
      .find(item => item.organisation === org);
  }
}
